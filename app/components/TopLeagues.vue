<script setup>
const props = defineProps({
  topLeaguesName: Array,
  activeLeague: String,
});
</script>

<template>
  <div
    class="flex items-center justify-start gap-2 bg-[#e6e6e6] p-1 overflow-x-auto no-scrollbar"
  >
    <div
      v-for="league in topLeaguesName[0]?.Items"
      @click="$emit('changeActiveLeague', league.Value)"
      class="flex justify-center items-center gap-2 py-1 px-4 rounded-sm text-xs shrink-0 font-semibold"
      :class="
        activeLeague === league.Value ? 'bg-[#5B5B5B] text-white' : 'bg-white'
      "
    >
      <img :src="`${league.Icon}`" class="w-8 h-8" alt="" />
      <span>{{ league.Name }}</span>
    </div>
  </div>
</template>
