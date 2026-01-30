<script setup>
const { getTournamentMatches } = useData();

const route = useRoute();

const league = computed(() => {
  const p = route.params.league;

  if (Array.isArray(p)) return p;
  if (typeof p === "string") return p.split("/");

  return [];
});

const country = computed(() => league.value[0] ?? null);
const leagueName = computed(() => league.value[1] ?? null);
const id = computed(() => league.value[2] ?? null);
const filter = computed(() => league.value[3] ?? null);

const leagueGames = ref([]);

onMounted(async () => {
  console.log("onMounted fetch tournament", id.value, filter.value);
  leagueGames.value = await getTournamentMatches(id.value, filter.value);
});
</script>

<template>
  <LeagueBar :info="league" />

  <SportOdds :showMore="0" :data="leagueGames" />
</template>
