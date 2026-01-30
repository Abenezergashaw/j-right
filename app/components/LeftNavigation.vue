<script setup>
import { watch, onMounted, onBeforeUnmount } from "vue";

const { sports } = usePrematchData();

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
});

const sorted = computed(() => {
  return [...sports.value].sort((a, b) => a.Id - b.Id);
});

const emit = defineEmits(["close"]);

// Close on ESC
const onKeydown = (e) => {
  if (e.key === "Escape") emit("close");
};

watch(
  () => props.open,
  (v) => {
    if (v) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  },
);

onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-40 bg-black/60"
        @click="$emit('close')"
      >
        <button
          class="absolute top-1 right-3 text-2xl font-bold text-white"
          @click="$emit('close')"
        >
          ✕
        </button>
      </div>
    </transition>

    <!-- Panel -->
    <transition name="slide">
      <aside
        v-if="open"
        class="fixed inset-y-0 left-0 z-50 w-[90%] max-w-sm bg-[#e6e6e6] shadow-xl flex flex-col"
      >
        <!-- Header -->
        <div
          class="h-10 bg-[#FBCC01] px-4 flex items-center justify-between border-b"
        >
          <span class="font-bold">Menu</span>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto p-1">
          <div
            class="h-10 bg-[#FBCC01] px-4 flex items-center justify-between border-b uppercase"
          >
            <span class="font-bold">Choose a sport</span>
          </div>
          <NuxtLink
            v-for="value in sorted"
            :to="`/prematch/countries?id=${value.Id}`"
            class="h-8 border-b border-gray-400 items-center gap-2 flex justify-between px-2"
          >
            {{ value.Name.International }}
            <UIcon name="line-md:chevron-right" />
          </NuxtLink>
        </div>
      </aside>
    </transition>
  </Teleport>
</template>

<style scoped>
/* Slide animation */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.25s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

/* Fade animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
