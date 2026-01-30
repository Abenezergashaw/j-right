<script setup>
const props = defineProps({
  market: String,
  odd: String,
});
</script>

<template>
  <div
    class="cursor-pointer bg-[#D4D4D4] text-black flex justify-between items-center p-2 rounded-md flex-1"
  >
    <span>{{ market }}</span>
    <span>{{ odd }}</span>
  </div>
</template>
