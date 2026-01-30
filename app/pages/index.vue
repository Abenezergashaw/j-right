<script setup>
// const url = useUrl();

onMounted(async () => {
  //   const { data } = await useFetch("/json/pregame.json");

  //   if (data.value) {
  //     dataStore.setPregameData(data.value.Sports);
  //   }

  navigateTo("/prematch");
});
</script>

<template>
  <LineLoader />
</template>
