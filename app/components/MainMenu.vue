<script setup>
const props = defineProps({
  topMenu: {
    type: Array,
    default: () => [
      {
        name: "Check Bet",
        icon: "si:ticket-line",
        to: "/prematch?modal=checkbet",
      },
      {
        name: "Search Event",
        icon: "mingcute:search-line",
      },
      {
        name: "IN-PLAY",
        icon: "ic:outline-timer",
      },
    ],
  },
  filter: String,
  activeSportId: {
    type: String,
    default: "1",
  },
});

const route = useRoute();
const router = useRouter();

const PRIORITY_ORDER = [
  "Check Bet",
  "Search Event",
  "IN-PLAY",
  "Football",
  "Basketball",
  "Tennis",
  "Ice Hockey",
];

const priorityIndex = Object.fromEntries(
  PRIORITY_ORDER.map((name, index) => [name, index]),
);

const sortedItems = computed(() => {
  if (!Array.isArray(props.topMenu)) return [];

  return [...props.topMenu].sort((a, b) => {
    const aIndex = priorityIndex[a.name];
    const bIndex = priorityIndex[b.name];

    if (aIndex !== undefined && bIndex !== undefined) {
      return aIndex - bIndex;
    }
    if (aIndex !== undefined) return -1;
    if (bIndex !== undefined) return 1;
    return 0;
  });
});

function handleMenu(name, to) {
  if (name === "Check Bet") {
    router.push({
      path: route.path,
      query: {
        ...route.query, // preserve existing query params
        modal: "checkbet",
      },
    });
    return;
  }
  router.push(`${to}`);
}
</script>

<template>
  <div
    class="bg-[#5B5B5B] px-2 py-2 flex items-center gap-3 overflow-x-auto whitespace-nowrap no-scrollbar md:hidden"
  >
    <div
      v-for="menu in sortedItems"
      :key="menu.name"
      @click="handleMenu(menu.name, menu.to)"
      class="flex flex-col items-center justify-center gap-1 px-2 shrink-0 relative"
    >
      <UIcon :name="menu.icon" class="w-7 h-7 text-[#B4B3B4]" />

      <span class="text-white text-xs leading-none whitespace-nowrap">
        {{ menu.name }}
      </span>
      <span class="absolute -top-1 -right-1 text-[10px] text-white"
        >{{ menu?.[filter] }}
      </span>
      <div
        v-if="menu.id === Number(activeSportId)"
        class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-b-6 border-l-transparent border-r-transparent border-[#FBCC01]"
      ></div>
    </div>
  </div>
</template>
