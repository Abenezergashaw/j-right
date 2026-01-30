<script setup>
const { getPregameData } = useData();
const { topMenu, activeSport, setPrematchData } = usePrematchData();

const route = useRoute();

const filters = ["All", "3H", "6H", "9H", "12H", "24H"];

const activeFilter = computed(() => route.query.filter ?? "All");

const activeSportId = ref(route.query.id ?? 1);

const sportName = computed(() => activeSport.value?.Name?.International || "");

watch(
  () => route.query.id,
  async (newId) => {
    activeSportId.value = newId ?? 1;
    await setPrematchData(activeSportId.value);
  },
  { immediate: true },
);

// onMounted(async () => {
//   await setPrematchData(activeSportId.value);
// });
</script>

<template>
  <div
    class="md:hidden flex justify-start items-stretch gap-1 px-1 h-10 bg-[#e6e6e6] overflow-x-auto whitespace-nowrap no-scrollbar"
  >
    <NuxtLink
      v-for="key in filters"
      :to="`/prematch/countries?filter=${key}`"
      class="text-center flex-1 text-xs px-4 border-r-[0.5px] border-r-gray-50 flex justify-center items-center cursor-pointer"
      :class="`${key === activeFilter ? 'border-b-2 border-[#FBCC01]' : ''}`"
    >
      {{ key }}
    </NuxtLink>
  </div>

  <MainMenu
    :topMenu="topMenu"
    :filter="activeFilter"
    :activeSportId="activeSportId"
  />
  <CountriesSportBar :sportName="sportName" />
  <LineLoader v-if="!activeSport || activeSport.length === 0" />
  <LeagueInCountry v-else :data="activeSport" :filter="activeFilter" />
</template>
