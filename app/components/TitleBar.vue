<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "Top Matches",
  },
  data: {
    type: Array,
    default: () => [],
  },
  activeSport: {
    type: Number,
  },
});
</script>

<template>
  <div
    class="flex items-center gap-3 px-3 h-10 md:h-7.5 bg-[#FBCC02] text-xs relative"
  >
    <ThreeDots />

    <!-- Static title -->
    <span class="font-semibold text-xs shrink-0">
      {{ title }}
    </span>

    <!-- Scrollable data -->
    <div class="flex gap-3 overflow-x-auto no-scrollbar whitespace-nowrap">
      <span
        v-for="(item, i) in data"
        :key="i"
        @click="$emit('changeSport', item.Id)"
        class="text-xs px-2 py-1 rounded shrink-0 flex justify-center items-center gap-1 font-semibold"
        :class="
          activeSport === item.Id ? 'bg-[#5B5B5B] text-white' : 'bg-[#FFE000] '
        "
      >
        <UIcon
          name="ri:football-line"
          class="w-4 h-4"
          :class="activeSport === item.Id ? 'text-white' : 'text-[#666]'"
        />

        <span>
          {{ item.name }}
        </span>
      </span>
    </div>
  </div>
</template>

<style scoped>
/* assets/css/main.css */
.fade-left {
  background: linear-gradient(to right, #fbcc02, #fbcc02);
}
</style>
