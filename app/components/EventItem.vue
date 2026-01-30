<script setup>
import axios from "axios";
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  event: String,
  eventData: Object,
  template: Object,
});

const router = useRouter();

const { manageBets, ticket } = useTicket();

const ticketSet = computed(
  () => new Set(ticket.value.map((t) => t.reference_id)),
);

const allTabs = computed(() => props.template?.Contents?.childs ?? []);
const activeTabIndex = ref(0);
const liveMarketsMap = computed(() => {
  const map = new Map();
  props.eventData?.Contents?.Markets?.forEach((m) => {
    map.set(m.MarketTypeId, m);
  });
  return map;
});

const eventInfo = computed(() => props.eventData?.Contents?.Info ?? null);
const eventId = computed(() => props.eventData?.Contents?.MatchId ?? null);

const openedAccordions = ref([]);

const translate = (code) => {
  const c = code.trim();
  if (c === "W1") return "1";
  if (c === "X" || c.toLowerCase() === "draw") return "X";
  if (c === "W2") return "2";
  return c;
};

const toggleAccordion = (name) => {
  const index = openedAccordions.value.indexOf(name);
  if (index > -1) openedAccordions.value.splice(index, 1);
  else openedAccordions.value.push(name);
};

const getAvailableMarkets = (subgroup) => {
  if (!subgroup.childs) return [];
  return subgroup.childs
    .filter((m) => liveMarketsMap.value.has(m.data.Id))
    .map((m) => ({ ...m, liveData: liveMarketsMap.value.get(m.data.Id) }));
};

// 1. Define the specific tabs you want to allow
const allowedFilter = {
  Main: [
    "1x2",
    "Double Chance",
    "Both Teams To Score",
    "Draw No Bet",
    "Over/under",
  ],
  Goals: [
    "Over/Under",
    "Total Goals Multi",
    "Total Goals (Bands)",
    "Total Goals (Exact)",
    "Exactly 1 Goal in The Match",
    "Exactly 2 Goal in The Match",
    "Exactly 3 Goal in The Match",
    "Exactly 4 Goal in The Match",
    "Goals In Both Halves",
    "1st Half/2nd Half Both To Score",
    "Both Teams To Score In Both Halves",
    "Half With Most Goals",
    "Half With Most Goals Double Chance",
  ],
  Handicap: ["Goals Handicap"],
  "1st Half": [
    "1st Half Result",
    "1st Half Double Chance",
    "1st Half Total Goals",
    "1st Half Both Teams To Score",
    "1st Half Total Goals (Bands)",
    "1st Half Total Goals (Exact)",
    "Goal in First Half",
    "1st Half Correct Score",
    "1st Half Outcome And Both Teams To Score",
    "1st Half Team 1 Total Goals",
    "1st Half Team 2 Total Goals",
    // "1st Half Team 1 Total Goals (Bands)",
    // "1st Half Team 1 Total Goals (Exact)",
    // "1st Half Team 2 Total Goals (Bands)",
    // "1st Half Team 2 Total Goals (Exact)",
    // "1st Half Team 1 To Win To Nil",
    // "1st Half Team 2 To Win To Nil",
  ],
  "2nd Half": [
    "2nd Half Result",
    "2nd Half Double Chance",
    "2nd Half Total Goals",
    "2nd Half Both Teams To Score",
    "2nd Half Total Goals (Bands)",
    "2nd Half Total Goals (Exact)",
    "Goal in First Half",
    "2nd Half Correct Score",
    "2nd Half Outcome And Both Teams To Score",
    "2nd Half Team 1 Total Goals",
    "2nd Half Team 2 Total Goals",
    // "2nd Half Team 1 Total Goals (Bands)",
    // "2nd Half Team 1 Total Goals (Exact)",
    // "2nd Half Team 2 Total Goals (Bands)",
    // "2nd Half Team 2 Total Goals (Exact)",
    // "2nd Half Team 1 To Win To Nil",
    // "2nd Half Team 2 To Win To Nil",
  ],
  "Half Time/ Full Time": ["Half Time/ Full Time"],
  "Correct Score": [
    "Correct Score",
    "Score Combinations",
    // "1st Half Score/Match Score",
  ],
  Combo: [
    "Fulltime & Ov/Un",
    "Fulltime & Multigoal",
    "Fulltime & Both to Score",
    "Fulltime & Total Goals (Exact)",
    // "Double Chance Combo",
    "Double Chance & Both to Score",
    "Both Teams to Score & Total Goals",
    "Half Time/Full Time & Total Goals (1.5)",
    "Half Time/Full Time & Total Goals (2.5)",
    "Half Time/Full Time & Total Goals (3.5)",
    "Half Time/Full Time & Total Goals (4.5)",
    "Half Time/Full Time & Total Goals (5.5)",
    "Half Time/Full Time & Total Goals (6.5)",
    "Team 1 Will Win 1st Half & Won't Win the Match",
    "Team 2 Will Win 1st Half & Won't Win the Match",
    "Team 1 Will Win & Score Exact (1.0) Goal",
    "Team 1 Will Win & Score Exact (2.0) Goal",
    "Team 1 Will Win & Score Exact (3.0) Goal",
    "Team 1 Will Win & Score Exact (4.0) Goal",
    "Team 1 Will Win & Score Exact (5.0) Goal",
    "Team 1 Will Win & Score Exact (6.0) Goal",
    "Team 1 Will Win & Score Exact (7.0) Goal",
    "Team 1 Will Win & Score Exact (8.0) Goal",
    "Team 2 Will Win & Score Exact (1.0) Goal",
    "Team 2 Will Win & Score Exact (2.0) Goal",
    "Team 2 Will Win & Score Exact (3.0) Goal",
    "Team 2 Will Win & Score Exact (4.0) Goal",
    "Team 2 Will Win & Score Exact (5.0) Goal",
    "Team 2 Will Win & Score Exact (6.0) Goal",
    "Team 2 Will Win & Score Exact (7.0) Goal",
    "Team 2 Will Win & Score Exact (8.0) Goal",
    "Team 1 to Score & Match Result",
    "Team 2 to Score & Match Result",
  ],
  Home: [
    "Team 1 Total Goals",
    "Team 1 Half with Most Goals",
    "Team 1 to Score",
    "Team 1 Score in First Half",
    "Team 1 Score in Second Half",
    "Team 1 Score in Both Halves",
    "Team 1 Total Goals (Bands)",
    "Team 1 Total Goals (Exact)",
    "Team 1 Will Win and Score Exact (1.0) Goal",
    "Team 1 Will Win and Score Exact (2.0) Goal",
    "Team 1 Will Win and Score Exact (3.0) Goal",
    "Team 1 Will Win and Score Exact (4.0) Goal",
    "Team 1 Will Win and Score Exact (5.0) Goal",
    "Team 1 Will Win and Score Exact (6.0) Goal",
    "Team 1 Will Win and Score Exact (7.0) Goal",
    "Team 1 Will Win and Score Exact (8.0) Goal",
    "Team 1 Will Win at Least in One of the Halves",
    "Team 1 Win Both Halves",
    "Team 1 Win By Exact (1.0) Goal",
    "Team 1 Win By Exact (2.0) Goal",
    "Team 1 Win By Exact (3.0) Goal",
    "Team 1 Win By Exact (4.0) Goal",
    "Team 1 Win By Exact (5.0) Goal",
    "Team 1 Win By Exact (6.0) Goal",
    "Team 1 Win By Exact (7.0) Goal",
    "Team 1 Win By Exact (8.0) Goal",
    "Team 1 to Win to Nil",
    "Team 1 Will Win 1st Half & Won''t Win the Match",
  ],
  Away: [
    "Team 2 Total Goals",
    "Team 2 Half with Most Goals",
    "Team 2 to Score",
    "Team 2 Score in First Half",
    "Team 2 Score in Second Half",
    "Team 2 Score in Both Halves",
    "Team 2 Total Goals (Bands)",
    "Team 2 Total Goals (Exact)",
    "Team 2 Will Win and Score Exact (1.0) Goal",
    "Team 2 Will Win and Score Exact (2.0) Goal",
    "Team 2 Will Win and Score Exact (3.0) Goal",
    "Team 2 Will Win and Score Exact (4.0) Goal",
    "Team 2 Will Win and Score Exact (5.0) Goal",
    "Team 2 Will Win and Score Exact (6.0) Goal",
    "Team 2 Will Win and Score Exact (7.0) Goal",
    "Team 2 Will Win and Score Exact (8.0) Goal",
    "Team 2 Will Win at Least in One of the Halves",
    "Team 2 Win Both Halves",
    "Team 2 Win By Exact (1.0) Goal",
    "Team 2 Win By Exact (2.0) Goal",
    "Team 2 Win By Exact (3.0) Goal",
    "Team 2 Win By Exact (4.0) Goal",
    "Team 2 Win By Exact (5.0) Goal",
    "Team 2 Win By Exact (6.0) Goal",
    "Team 2 Win By Exact (7.0) Goal",
    "Team 2 Win By Exact (8.0) Goal",
    "Team 2 to Win to Nil",
    "Team 2 Will Win 1st Half & Won''t Win the Match",
  ],
  Corners: [
    "Corners Result",
    "Corners: Total",
    "Corners Team 1 Total",
    "Corners Team 2 Total",
    "Corners: 1st Half Total",
    "Corners 2nd Half Total",
    "Corners: 1st Half Results",
    "Corners: 2nd Half Results",
    "Corners Odd/Even",
  ],
  Cards: [
    "Yellow Cards: Results",
    // "Yellow Cards: Double Chance",
    "Yellow Cards: Total",
    "Yellow Cards: Odd/Even",
    "Yellow Cards: Team 1 Total",
    "Yellow Cards: Team 2 Total",
    "Yellow Cards: 1st Half Results",
    "Yellow Cards: 2nd Half Results",
    "Yellow Cards: 1st Half Total",
    "Yellow Cards: 2nd Half Total",
  ],
};

const allAllowedMarkets = [...new Set(Object.values(allowedFilter).flat())];
allowedFilter["All"] = allAllowedMarkets;

// 1. Filter tabs to only show those defined in allowedFilter keys
// const filteredTabs = computed(() => {
//   return allTabs.value.filter((tab) => {
//     // Check if the tab name exists as a key in our filter
//     const isAllowedTab = Object.keys(allowedFilter).includes(tab.name);

//     // Optional: Check if the tab has any available markets
//     const hasMarkets = tab.childs.some(
//       (subgroup) => getAvailableMarkets(subgroup).length > 0,
//     );

//     return isAllowedTab && hasMarkets;
//   });
// });

const filteredTabs = computed(() => {
  // Get the original filtered tabs
  const tabs = allTabs.value.filter((tab) => {
    const isAllowedTab = Object.keys(allowedFilter).includes(tab.name);
    const hasMarkets = tab.childs.some(
      (subgroup) => getAvailableMarkets(subgroup).length > 0,
    );
    return isAllowedTab && hasMarkets;
  });

  // Create the "All" tab object if there are any markets at all
  if (tabs.length > 0) {
    const allTab = {
      name: "All",
      // Flatten all childs from all tabs into one array for the "All" view
      childs: allTabs.value.flatMap((tab) => tab.childs),
    };
    return [allTab, ...tabs];
  }

  return tabs;
});

// 2. Updated activeSubgroups to filter by the tab's specific allowed list
// const activeSubgroups = computed(() => {
//   if (!filteredTabs.value.length) return [];

//   const currentTab = filteredTabs.value[activeTabIndex.value];
//   const tabName = currentTab.name;

//   // Get the list of allowed subgroups for THIS specific tab
//   const allowedSubgroupsForTab = allowedFilter[tabName] || [];

//   return currentTab.childs.filter((subgroup) => {
//     const isAllowedSub = allowedSubgroupsForTab.includes(subgroup.name);
//     const hasMarkets = getAvailableMarkets(subgroup).length > 0;

//     return isAllowedSub && hasMarkets;
//   });
// });

const activeSubgroups = computed(() => {
  if (!filteredTabs.value.length) return [];

  const currentTab = filteredTabs.value[activeTabIndex.value];
  const tabName = currentTab.name;

  const allowedSubgroupsForTab = allowedFilter[tabName] || [];

  // Use a Map to filter out duplicate subgroup names (since 'All' flattens all tabs)
  const uniqueSubgroups = new Map();

  currentTab.childs.forEach((subgroup) => {
    const isAllowedSub = allowedSubgroupsForTab.includes(subgroup.name);
    const availableMarkets = getAvailableMarkets(subgroup);

    if (isAllowedSub && availableMarkets.length > 0) {
      // Only keep the first instance of a subgroup name
      if (!uniqueSubgroups.has(subgroup.name)) {
        uniqueSubgroups.set(subgroup.name, subgroup);
      }
    }
  });

  return Array.from(uniqueSubgroups.values());
});

function formatMatchDate(dateStr) {
  const date = new Date(dateStr);

  return date
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(",", "");
}

const onImgError = (e) => {
  e.target.src =
    "https://sport.jambobet.bet/assets/images/817570577d4625fae859c1078d11d5c1.png";
};

watchEffect(() => {
  if (activeSubgroups.value.length) {
    openedAccordions.value = [activeSubgroups.value[0].name];
  }
});

const gridColsClass = (len) => {
  if (len === 3) return "grid-cols-3";
  return "grid-cols-2"; // default for 2 and >3
};

const handleSelection = (field, market) => {
  const bet = {
    price_rate: Number(field.Value),
    market_name: market.MarketName.International,
    price_name: field.FieldName.International,
    price_hcap: 0,
    event_name: `${eventInfo.value.HomeTeamName.International} vs ${eventInfo.value.AwayTeamName.International}`,
    eventId: eventId.value,
    country: eventInfo.value.CategoryName.International,
    competition: eventInfo.value.TournamentName.International,
    reference_id: field.FieldId,
    status: 0,
    startTime: eventInfo.value.DateOfMatch,
    errors: [],
    amount: 1,
    isLive: false,
    sportId: eventInfo.value.SportId,
    marketId: market.MarketTypeId,
    fieldId: field.FieldTypeId,
  };

  manageBets(bet);
};
</script>

<template>
  <div class="block md:flex gap-4 justify-center overflow-y-auto no-scrollbar">
    <div class="w-full h-screen overflow-y-auto no-scrollbar">
      <div
        v-if="eventInfo"
        class="rounded-md bg-gray-100 md:w-full text-center text-black relative"
      >
        <div class="bg-[#D4D4D4] text-xs p-2">
          <div class="text-center mb-3">
            {{ formatMatchDate(eventInfo.DateOfMatch) }}
          </div>
          <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-3 mb-2">
            <!-- HOME -->
            <div class="flex items-center gap-2 justify-end text-right">
              <div
                class="font-bold text-sm leading-tight wrap-break-word max-w-35"
              >
                {{ eventInfo.HomeTeamName.International }}
              </div>
              <img
                :src="`https://adminpro.logiqsport.com/cdn/assets/teams/b/${eventInfo.HomeTeamId}.png`"
                class="h-10 shrink-0"
                alt=""
                @error="onImgError"
              />
            </div>

            <!-- CENTER (ALWAYS FIXED) -->
            <div class="font-bold text-lg text-center px-2 whitespace-nowrap">
              VS
            </div>

            <!-- AWAY -->
            <div class="flex items-center gap-2 justify-start text-left">
              <img
                :src="`https://adminpro.logiqsport.com/cdn/assets/teams/b/${eventInfo.AwayTeamId}.png`"
                class="h-10 shrink-0"
                alt=""
                @error="onImgError"
              />
              <div
                class="font-bold text-sm leading-tight wrap-break-word max-w-35"
              >
                {{ eventInfo.AwayTeamName.International }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="h-10 md:h-auto font-semibold text-xs flex flex-nowrap overflow-x-auto no-scrollbar md:grid md:grid-cols-4 lg:grid-cols-6 md:overflow-x-visible"
      >
        <div
          v-for="(m, index) in filteredTabs"
          :key="index"
          @click="activeTabIndex = index"
          class="px-4 h-10 md:h-8 flex items-center justify-center cursor-pointer whitespace-nowrap border-r border-b border-gray-400 flex-none md:w-full"
          :class="
            activeTabIndex === index
              ? 'bg-[#FBCC01]'
              : 'bg-[#E6E6E6] text-black'
          "
        >
          {{ m.name }}
        </div>
      </div>

      <div class="overflow-y-auto no-scrollbar">
        <div
          v-for="(subgroup, sIdx) in activeSubgroups"
          :key="sIdx"
          class="bg-gray-200 overflow-hidden md:w-full"
        >
          <div
            @click="toggleAccordion(subgroup.name)"
            class="w-full flex justify-start items-center gap-2 px-2 h-10 md:h-8 bg-white text-xs border-b border-gray-300"
          >
            <UIcon
              name="lineicons:chevron-down"
              class="w-5 h-5 text-[#949494]"
              :class="{
                'rotate-180': openedAccordions.includes(subgroup.name),
              }"
            />
            <UIcon name="ic:round-star" class="w-5 h-5 text-[#949494]" />
            <span class="text-black">{{ subgroup.name }}</span>
          </div>

          <div v-show="openedAccordions.includes(subgroup.name)" class="">
            <div
              v-for="(market, mIdx) in getAvailableMarkets(subgroup)"
              :key="mIdx"
              class="last:border-0"
            >
              <div
                class="grid gap-y-0 text-xs"
                :class="gridColsClass(market.liveData.MarketFields.length)"
              >
                <button
                  v-for="(field, fIdx) in market.liveData.MarketFields"
                  :key="fIdx"
                  @click="handleSelection(field, market.liveData)"
                  class="flex items-center justify-between px-2 py-1.5 hover:border-primary transition-all cursor-pointer text-xs border-b border-r border-gray-200"
                  :class="[
                    ticketSet.has(field.FieldId)
                      ? 'bg-animate-select text-white'
                      : 'bg-[#D4D4D4]',
                  ]"
                >
                  <span class="">{{ field.FieldName.International }}</span>
                  <span class="">{{ field.Value.toFixed(2) }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}
.no-scrollbar {
  -ms-overflow-style: none; /* IE 10+ */
  scrollbar-width: none; /* Firefox */
}

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
