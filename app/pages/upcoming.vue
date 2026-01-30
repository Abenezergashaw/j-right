<script setup>
const { getUpcomingMatches } = useData();

const upcomingMatches = ref([]);

let start = 0;
let end = 50;
let page = 1;

async function handlePagination() {
  start += 50;
  end += 50;
  const data = await getUpcomingMatches(start, end);
  upcomingMatches.value.push(...data);
  page++;
}

onMounted(async () => {
  upcomingMatches.value = await getUpcomingMatches(start, end);
  page++;
});
</script>

<template>
  <UpcomingGamesBar />
  <UpcomingSportOdd
    :data="upcomingMatches"
    @loadMoreUpcomingMatches="handlePagination"
  />
</template>
