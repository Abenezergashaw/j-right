<script setup>
const route = useRoute();
const { getEvent, getMarketStructure } = useData();

const event = route.params.event[0];

const template = ref({});
const eventData = ref({});
const eventInfo = ref(null);

onBeforeMount(async () => {
  const [marketStructureResult, eventDataResult] = await Promise.all([
    getMarketStructure(),
    getEvent(event),
  ]);

  template.value = marketStructureResult;
  eventData.value = eventDataResult;
  eventInfo.value = eventData?.value?.Contents?.Info;
});
</script>

<template>
  <EventBar :eventInfo="eventInfo" />
  <LineLoader v-if="!eventInfo" />
  <EventItem
    v-else
    :event="event"
    :template="template"
    :eventData="eventData"
  />
</template>
