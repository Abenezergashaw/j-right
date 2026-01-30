<script setup>
const { getFlag } = useCountryFlag();

const props = defineProps({
  data: {
    type: Object,
    default: () => ({ Categories: [] }),
  },
  filter: {
    type: String,
    default: "All",
  },
});

const sortData = (data, selectedFilter = "All") => {
  if (!data || !data.Categories) return [];

  // 1. Priority Lists
  const categoryPriority = [
    "England",
    "Europe",
    "Italy",
    "Spain",
    "Germany",
    "France",
    "Netherlands",
    "World",
    "Portugal",
  ];

  const tournamentRank = {
    // England
    "Premier League": 1,
    Championship: 2,
    "League One": 3,
    "League Two": 4,
    "FA Cup": 5,
    "EFL Cup": 6,
    // Europe
    "Champions League": 1,
    "Europa League": 2,
    "Conference League": 3,
    "Nations League": 4,
    // Spain
    "La Liga": 1,
    "Segunda Division": 2,
    "Copa del Rey": 3,
    // Italy
    "Serie A": 1,
    "Serie B": 2,
    "Coppa Italia": 3,
    // Germany
    Bundesliga: 1,
    "2. Bundesliga": 2,
    "DFB Pokal": 3,
    // France
    "Ligue 1": 1,
    "Ligue 2": 2,
    "Coupe de France": 3,
    // Portugal
    "Primeira Liga": 1,
    "Segunda Liga": 2,
    "Taca de Portugal": 3,
    // Netherlands
    Eredivisie: 1,
    "Eerste Divisie": 2,
    "KNVB Beker": 3,
    // World
    "World Cup": 1,
    "Club World Cup": 2,
    "International Friendlies": 3,
  };

  return (
    data.Categories
      // Filter Categories based on the selected time filter (e.g., "3H", "6H")
      .filter((cat) => {
        // If "All", follow original logic. Otherwise, check if Category has games in that timeframe.
        if (selectedFilter === "All") {
          return cat.CountWithoutOutrights > 0;
        }
        return cat.Counters && cat.Counters[selectedFilter] > 0;
      })
      .map((cat) => {
        return {
          ...cat,
          // Filter Tournaments within the category
          Tournaments: cat.Tournaments.filter((t) => {
            // 1. Always remove Outrights
            const isOutright =
              t.Name.International.toLowerCase().includes("outright");
            if (isOutright) return false;

            // 2. If a specific time filter is active, check the tournament's counter
            if (selectedFilter !== "All") {
              return t.Counters && t.Counters[selectedFilter] > 0;
            }
            return true;
          }),
        };
      })
      // Final check to ensure category isn't empty after tournament filtering
      .filter((cat) => cat.Tournaments.length > 0)
      .sort((a, b) => {
        // Sorting Logic (Categories)
        const nameA = a.Name.International;
        const nameB = b.Name.International;

        const indexA = categoryPriority.indexOf(nameA);
        const indexB = categoryPriority.indexOf(nameB);

        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;

        return nameA.localeCompare(nameB);
      })
      .map((cat) => {
        // Sorting Logic (Tournaments inside Categories)
        cat.Tournaments.sort((a, b) => {
          const tNameA = a.Name.International;
          const tNameB = b.Name.International;

          const rankA = tournamentRank[tNameA] || 999;
          const rankB = tournamentRank[tNameB] || 999;

          if (rankA !== rankB) return rankA - rankB;
          return tNameA.localeCompare(tNameB);
        });
        return cat;
      })
  );
};

const sortedData = computed(() => {
  if (props.data === undefined || props.data === null) return;
  return sortData(props.data, props.filter);
});

const openedCountries = ref([0, 1, 2, 3, 4, 5]);

function handleOpenedCountries(index) {
  const pos = openedCountries.value.indexOf(index);

  if (pos !== -1) {
    openedCountries.value.splice(pos, 1);
  } else {
    openedCountries.value.push(index);
  }
}
</script>

<template>
  <div v-for="(d, index) in sortedData">
    <div
      @click="handleOpenedCountries(index)"
      class="h-8 bg-[#DEDEDE] text-xs flex justify-between items-center px-2"
    >
      <div class="flex gap-2 items-center">
        <ThreeDots />
        <img
          :src="`/flags/${getFlag(d.Name.International)}`"
          class="w-6 h-4"
          alt=""
        />
        <div class="font-semibold">{{ d.Name.International }}</div>
      </div>
      <div>
        <UIcon name="ion:arrow-up-right-box-outline" class="w-4 h-4" />
      </div>
    </div>
    <div v-if="openedCountries.includes(index)">
      <div v-for="t in d.Tournaments" class="bg-white flex flex-col gap-3 p-2">
        <NuxtLink
          :to="`/prematch/countries/${d.Name.International}/${t.Name.International}/1-${d.Id}-${t.Id}/${filter}`"
          class="flex justify-start items-center gap-3 px-4 text-xs"
        >
          <div class="w-3 h-3 rounded-xs border border-black"></div>
          <div>{{ t.Name.International }}</div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
