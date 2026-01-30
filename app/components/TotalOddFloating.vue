<script setup>
defineProps({
  bets: Number,
  totalOdds: Number,
});
</script>

<template>
  <div
    class="fixed bottom-18 right-0 z-30 h-14 bg-white border-r-4 border-[#FBCC01] flex items-center pl-12 pr-4 gap-3 shadow-lg transition-all md:hidden"
    aria-label="Check Bet"
  >
    <!-- CIRCLE BADGE -->
    <div
      class="absolute left-0 -translate-x-1/2 h-16 w-16 rounded-full bg-[#FBCC01] border-2 border-white flex items-center justify-center text-lg"
    >
      {{ bets }}
    </div>

    <!-- TEXT CONTENT (GROWS NATURALLY) -->
    <div class="flex flex-col items-end leading-tight whitespace-nowrap">
      <span class="text-xs text-gray-500 uppercase">Total Odds</span>
      <span class="font-semibold text-black text-sm">{{
        totalOdds.toFixed(2)
      }}</span>
    </div>
  </div>
</template>
