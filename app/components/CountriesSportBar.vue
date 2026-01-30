<script setup>
defineProps({
  sportName: String,
});
</script>

<template>
  <div class="h-8 bg-[#FBCC01] flex justify-between px-2 items-center text-xs">
    <div class="flex items-center gap-2 font-bold">
      <div class="w-1.25 h-1.25 rounded-full bg-white"></div>
      <span>{{ sportName }}</span>
    </div>
    <div class="flex gap-3 items-center">
      <div class="w-3 h-3 rounded-xs border border-black"></div>
      <USeparator orientation="vertical" color="neutral" class="h-full" />
      <UIcon name="ion:arrow-up-right-box-outline" class="w-4 h-4" />
    </div>
  </div>
</template>
