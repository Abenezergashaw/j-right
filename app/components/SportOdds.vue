<script setup>
import { convertToObject } from "typescript";
import { ref, computed } from "vue";

const { manageBets, ticket } = useTicket();

const props = defineProps({
  showMore: Number,
  data: {
    type: Array,
    default: () => [],
  },
});

const ticketSet = computed(
  () => new Set(ticket.value.map((t) => t.reference_id)),
);

const expandedDates = ref({});
const isExpanded = ref(false); // Track if list is fully shown

function toggleDate(date) {
  expandedDates.value[date] = !expandedDates.value[date];
}

function extractTime(iso) {
  return iso.split("T")[1]?.slice(0, 5) ?? "";
}

function formatDateLabel(iso) {
  const date = new Date(iso);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Computed: check if there are more than 6 matches
const hasHiddenMatches = computed(() => props.data.length > 6);

// Computed: group and slice matches
const groupedMatches = computed(() => {
  if (!props.data || props.data.length === 0) return {};

  const sorted = [...props.data].sort(
    (a, b) => new Date(a.Info.DateOfMatch) - new Date(b.Info.DateOfMatch),
  );

  const displayedMatches =
    props.showMore === 0 || isExpanded.value ? sorted : sorted.slice(0, 6);

  return displayedMatches.reduce((acc, match) => {
    const dateKey = formatDateLabel(match.Info.DateOfMatch);
    (acc[dateKey] ||= []).push(match);
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
</script>

<template>
  <div class="bg-[#e6e6e6] p-0.5">
    <!-- Loader -->
    <LineLoader v-if="!props.data || props.data.length === 0" />

    <!-- Table -->
    <div v-else>
      <!-- Header -->
      <div class="flex text-xs bg-white py-1">
        <div class="w-[8%] hidden md:block text-center">ID</div>
        <div class="w-[14%] md:w-[8%] text-center">Time</div>
        <div class="w-[50%] md:w-[48%]">Event</div>
        <div class="w-[12%] md:[10%] border-r text-center">1</div>
        <div class="w-[12%] md:[10%] border-r text-center">X</div>
        <div class="w-[12%] md:[10%] text-center">2</div>
        <div class="w-[6%] hidden md:block text-center"></div>
      </div>

      <!-- Dates & Matches -->
      <div v-for="(matches, date) in groupedMatches" :key="date">
        <div class="px-2 text-xs font-semibold my-0.5">{{ date }}</div>

        <div
          v-for="data in matches"
          :key="data?.MatchId"
          class="flex items-stretch text-xs bg-white mb-0.5 h-12 md:h-8"
        >
          <div
            class="w-[8%] hidden text-center md:flex items-center justify-center"
          >
            {{ data.Extra.SmallId }}
          </div>

          <div
            class="w-[14%] md:w-[8%] text-center flex items-center justify-center"
          >
            {{ extractTime(data?.Info?.DateOfMatch) }}
          </div>

          <NuxtLink
            :to="`/prematch/event/${data?.MatchId}`"
            class="w-[50%] md:w-[48%] flex flex-col md:flex-row justify-center items-start md:items-center md:justify-start"
          >
            <div>{{ data?.Info?.HomeTeamName.International }}</div>
            <div class="hidden md:block">-</div>
            <div>{{ data?.Info?.AwayTeamName.International }}</div>
          </NuxtLink>

          <div
            v-if="
              data?.Markets[0]?.MarketName?.International === 'Match Result'
            "
            v-for="odds in data?.Markets[0].MarketFields"
            @click="
              handleSelection(
                data.Info,
                odds,
                data?.Markets[0]?.MarketName?.International,
              )
            "
            :key="odds.FieldId"
            class="w-[12%] md:w-[10%] flex items-center justify-center font-semibold border-r border-gray-200 text-center cursor-pointer"
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
            class="w-[12%] md:w-[10%] flex items-center justify-center font-semibold bg-[#D4D4D4] border-r border-gray-200 text-center cursor-pointer"
          >
            -
          </div>

          <NuxtLink
            :to="`/prematch/event/${data?.MatchId}`"
            class="w-[6%] hidden bg-[#EBE0E0] text-center md:flex items-center justify-center cursor-pointer"
          >
            <UIcon name="uil:plus" class="w-5 h-6" />
          </NuxtLink>
        </div>
      </div>

      <!-- Show more / less button -->
      <div
        v-if="showMore === 1 && props.data.length > 6"
        @click="isExpanded = !isExpanded"
        class="flex justify-center gap-0.5 items-center cursor-pointer hover:bg-gray-200 py-1 transition-colors"
      >
        <span class="text-xs">{{
          isExpanded ? "Show less" : "Show more"
        }}</span>
        <UIcon
          :name="`${!isExpanded ? 'i-lucide-chevron-down' : 'i-lucide-chevron-up'}`"
          size="lg"
        />
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
