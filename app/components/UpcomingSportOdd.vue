<script setup>
import { computed } from "vue";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits();

const { manageBets, ticket } = useTicket();

const ticketSet = computed(
  () => new Set(ticket.value.map((t) => t.reference_id)),
);

const scrollContainer = ref(null);
let debounceTimeout = null;

const onScroll = () => {
  if (!scrollContainer.value) return;

  // Clear previous debounce
  clearTimeout(debounceTimeout);

  debounceTimeout = setTimeout(() => {
    const container = scrollContainer.value;

    // Check if we reached the bottom
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight
    ) {
      emit("loadMoreUpcomingMatches");
    }
  }, 100); // 100ms debounce
};

// Format date + time (e.g., 25 Jan 16:06)
function formatDateTimeLabel(iso) {
  const date = new Date(iso);
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

// Group matches by full date + time
const groupedMatches = computed(() => {
  if (!props.data || props.data.length === 0) return {};

  const sorted = [...props.data].sort(
    (a, b) => new Date(a.Info.DateOfMatch) - new Date(b.Info.DateOfMatch),
  );

  return sorted.reduce((acc, match) => {
    const dateTimeKey = formatDateTimeLabel(match.Info.DateOfMatch);
    (acc[dateTimeKey] ||= []).push(match);
    return acc;
  }, {});
});

const handleSelection = (data, market, marketName) => {
  const bet = {
    price_rate: market.Value,
    market_name: marketName,
    price_name: market.FieldName.International,
    price_hcap: 0,
    event_name: `${data.HomeTeamName.International} vs ${data.AwayTeamName.International}`,
    eventId: data.MatchId,
    country: data.CategoryName.International,
    competition: data.TournamentName.International,
    reference_id: market.FieldId,
    status: 0,
    startTime: data.DateOfMatch,
    errors: [],
    amount: 1,
    isLive: false,
    sportId: data.SportId,
    marketId: 23,
    fieldId: market.FieldTypeId,
  };

  manageBets(bet);
};

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<template>
  <div class="bg-[#e6e6e6] p-0.5">
    <LineLoader v-if="!props.data || props.data.length === 0" />

    <div v-else>
      <div class="flex text-xs bg-white py-1">
        <div class="w-[52%]">Event</div>
        <div class="w-[12%] border-r text-center">1</div>
        <div class="w-[12%] border-r text-center">X</div>
        <div class="w-[12%] text-center">2</div>
        <div class="w-[12%] text-center"></div>
      </div>

      <div ref="scrollContainer" class="overflow-y-auto" @scroll="onScroll">
        <!-- Loop by full date + time -->
        <div v-for="(matches, dateTime) in groupedMatches" :key="dateTime">
          <div class="px-2 text-xs font-semibold my-0.5">{{ dateTime }}</div>

          <!-- Loop individual matches -->
          <div
            v-for="data in matches"
            :key="data?.MatchId"
            class="flex items-stretch text-xs bg-white mb-0.5 h-12 md:h-6"
          >
            <NuxtLink
              :to="`/prematch/event/${data?.MatchId}`"
              class="w-[52%] flex flex-col md:flex-row justify-center items-start md:justify-start md:items-center md:px-2"
            >
              <div>{{ data?.Info?.HomeTeamName.International }}</div>
              <div class="hidden md:block">-</div>

              <div>{{ data?.Info?.AwayTeamName.International }}</div>
              <div class="md:hidden text-[9px] truncate font-normal">
                {{ data?.Info?.SportName.International }} /
                {{ data?.Info?.CategoryName.International }} /
                {{ data?.Info?.TournamentName.International }}
              </div>
            </NuxtLink>

            <!-- Odds -->
            <div
              v-if="
                data?.Markets[0]?.MarketName?.International === 'Match Result'
              "
              v-for="odds in data?.Markets[0]?.MarketFields"
              :key="odds.FieldId"
              @click="
                handleSelection(
                  data.Info,
                  odds,
                  data?.Markets[0]?.MarketName?.International,
                )
              "
              class="w-[12%] flex items-center justify-center font-semibold border-r text-center"
              :class="[
                ticketSet.has(odds.FieldId)
                  ? 'bg-animate-select text-white'
                  : 'bg-[#D4D4D4]',
              ]"
            >
              {{ odds.Value.toFixed(2) }}
            </div>

            <div
              v-else
              v-for="odds in [1, 2, 3]"
              class="w-[12%] flex items-center justify-center font-semibold bg-[#D4D4D4] border-r text-center"
            >
              -
            </div>

            <!-- Plus icon link -->
            <NuxtLink
              :to="`/prematch/event/${data.MatchId}`"
              class="w-[12%] flex items-center justify-center font-semibold bg-[#F0F0F0] text-center"
            >
              <UIcon name="ic:baseline-plus" class="w-5 h-5" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes selectFlash {
  0% {
    background-color: #fbcc01;
  }
  50% {
    background-color: #fbcc01;
  } /* middle color */
  100% {
    background-color: #5b5b5b;
  }
}

.bg-animate-select {
  animation: selectFlash 200ms ease-in-out forwards;
}
</style>
