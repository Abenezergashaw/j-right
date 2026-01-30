<script setup>
const route = useRoute();
const { getEvent, getMarketStructure } = useData();

const event = route.params.event[0];

const template = ref({});
const eventData = ref({});
const eventInfo = ref(null);

onMounted(async () => {
  template.value = await getMarketStructure();
  eventData.value = await getEvent(event);
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
