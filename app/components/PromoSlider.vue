<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
  promos: {
    type: Array,
    required: true,
  },
  interval: {
    type: Number,
    default: 5000, // 5 seconds
  },
});

const currentIndex = ref(0);
let timer = null;

const activePromos = computed(() =>
  props.promos
    .filter((p) => p.active === "yes")
    .sort((a, b) => a.order - b.order),
);

const currentPromo = computed(() => activePromos.value[currentIndex.value]);

const nextSlide = () => {
  if (!activePromos.value.length) return;
  currentIndex.value = (currentIndex.value + 1) % activePromos.value.length;
};

onMounted(() => {
  timer = setInterval(nextSlide, props.interval);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <div
    class="relative w-full overflow-hidden mt-2 bg-[#E6E6E6] p-2 flex justify-center items-center"
  >
    <div v-if="currentPromo" class="relative w-[96%] mx-auto rounded-md">
      <!-- Desktop image -->
      <img
        :src="currentPromo.image_url"
        class="hidden sm:block w-full h-full object-cover rounded-sm"
        alt=""
      />

      <!-- Mobile image -->
      <img
        :src="currentPromo.mobile_image_url || currentPromo.image_url"
        class="block sm:hidden w-full object-contain rounded-sm"
        alt=""
      />

      <!-- Optional button -->
      <a
        v-if="currentPromo.btn_text && currentPromo.btn_url"
        :href="currentPromo.btn_url"
        :target="currentPromo.btn_target"
        class="absolute bottom-4 left-4 px-4 py-2 text-sm font-semibold rounded"
        :style="{
          backgroundColor: currentPromo.btn_bg_color,
          color: currentPromo.btn_text_color,
        }"
      >
        {{ currentPromo.btn_text }}
      </a>
    </div>
  </div>
</template>
