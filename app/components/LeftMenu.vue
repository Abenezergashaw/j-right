<script setup>
const { topLeaguesName } = useTopLeague();
const { sports } = usePrematchData();

const sorted = computed(() => {
  return [...sports.value].sort((a, b) => a.Id - b.Id);
});
</script>

<template>
  <div class="h-7 bg-[#FBCC01] px-4 font-bold flex items-center text-[13px]">
    Top Leagues
  </div>
  <div class="flex flex-col bg-[#e6e6e6] text-xs">
    <NuxtLink
      v-for="value in topLeaguesName[0]?.Items"
      :to="`/prematch/countries/${value.Par2}/${value.Name}/${value.Value}/All`"
      class="flex justify-between items-center h-8 px-2 border-b border-b-gray-300 cursor-pointer"
    >
      <div class="flex justify-start items-center gap-2">
        <img :src="`${value.Icon}`" alt="" class="h-7 w-7" />
        <div class="w-1 h-1 bg-black rounded-full"></div>
        <div>{{ value.Name }}</div>
      </div>
      <UIcon name="hugeicons:football" class="h-6 w-6" />
    </NuxtLink>
  </div>

  <div class="h-7 bg-[#FBCC01] px-4 font-bold flex items-center text-[13px]">
    Sports
  </div>
  <NuxtLink
    v-for="value in sorted"
    :to="`/prematch/countries?id=${value.Id}`"
    class="h-8 border-b border-gray-400 items-center gap-2 flex justify-start px-2 text-xs bg-[#e6e6e6]"
  >
    <div class="flex justify-start items-center gap-2">
      <div class="bg-white px-2 text-[11px] rounded-sm">{{ value.Count }}</div>
      <div class="w-1 h-1 bg-black rounded-full"></div>
      <div>{{ value.Name.International }}</div>
    </div>
  </NuxtLink>
</template>
