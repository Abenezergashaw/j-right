<script setup>
import { ref } from "vue";

const { getBets } = useBets();

const bets = ref([]);
const activeTab = ref(4);
const filtered = computed(() => {
  if (bets.value.length === 0) return [];

  if (activeTab.value === 4) return bets.value;

  return bets.value.filter((b) => b.status === activeTab.value);
});

const showBet = ref([]);

const toggleBet = (id) => {
  const index = showBet.value.indexOf(id);

  if (index !== -1) {
    showBet.value.splice(index, 1); // remove
  } else {
    showBet.value.push(id); // add
  }
  console.log(showBet.value);
};

const tabs = [
  { label: "All Bets", key: "one", value: 4 },
  { label: "Open", key: "two", value: 0 },
  { label: "Lost", key: "three", value: 2 },
  { label: "Won", key: "four", value: 1 },
];

function selectTab(index) {
  activeTab.value = index;
}

function formatDate(iso) {
  const d = new Date(iso);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ` +
    `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  );
}

formatDate("2026-01-14T13:31:36.000Z");

onMounted(async () => {
  bets.value = await getBets();
});
</script>

<template>
  <div class="w-full">
    <div class="h-8 uppercase bg-[#FBCC01] flex justify-center items-center">
      bet list
    </div>

    <!-- Tabs -->
    <div class="flex border-b border-gray-100 text-sm font-semibold">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.key"
        @click="selectTab(tab.value)"
        class="flex-1 px-4 py-1 text-center transition-colors"
        :class="
          activeTab === tab.value
            ? 'border-b-2 border-[#FBCC01] text-black'
            : 'text-gray-500 hover:text-black'
        "
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Panels -->
    <div class="py-2 text-xs space-y-1">
      <div>
        <div v-for="b in filtered">
          <div
            @click="toggleBet(b.ticketId)"
            class="bg-[#E1E1E1] flex py-3 items-center mb-0.5"
            style="background-color: #e1e1e1 !important"
          >
            <div
              class="flex flex-col justify-start border-black w-[46%] px-1"
              style="width: 46% !important"
            >
              <div>{{ formatDate(b.date) }}</div>
              <div>
                ID: <span class="text-[10px] opacity-75">{{ b.ticketId }}</span>
              </div>
              <div>{{ b.userId }}</div>
            </div>
            <div
              class="flex flex-col justify-start border-black w-[46%] px-1"
              style="width: 46% !important"
            >
              <div>Stake: {{ b.stake }} ETB</div>
              <div>
                Odds:
                <span class="text-red-500">{{ b.totalOdds.toFixed(2) }}</span>
              </div>
              <div>
                Possible Win: {{ (b.stake * b.totalOdds).toFixed(2) }} ETB
              </div>
            </div>
            <div
              class="w-2 h-2 rounded-full"
              :style="{
                backgroundColor:
                  b.status === 1 ? 'green' : b.status === 2 ? 'red' : '#E1E1E1',
              }"
            ></div>
          </div>

          <div v-if="showBet.includes(b.ticketId)">
            <div v-for="t in b.robustbets">
              <div
                class="bg-[#E1E1E1] flex justify-center py-1 items-center mb-0.5"
                style="background-color: #fff !important"
              >
                <div
                  class="flex flex-col justify-center items-center border-black w-[46%] px-1 font-semibold"
                  style="width: 46% !important"
                >
                  <div>{{ t.teams }}</div>
                  <div>
                    <span class="text-[10px] opacity-75">{{
                      formatDate(t.date)
                    }}</span>
                  </div>
                </div>
                <div
                  class="flex flex-col justify-center items-center border-black w-[46%] px-1 font-semibold"
                  style="width: 46% !important"
                >
                  <div>{{ t.market }} - {{ t.priceName }} / {{ t.odd }}</div>
                </div>
                <div
                  class="w-2 h-2 rounded-full"
                  :style="{
                    backgroundColor:
                      t.status === 1
                        ? 'green'
                        : t.status === 2
                          ? 'red'
                          : '#E1E1E1',
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
