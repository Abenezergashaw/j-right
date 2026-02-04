<script setup>
import { ref } from "vue";

definePageMeta({
  layout: "noside",
});

const router = useRouter();
const { getBets } = useBets();
const { loggedIn } = useAuth();
const { getPrintTicket } = useTicket();

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

onMounted(async () => {
  if (!loggedIn.value) return router.push("/prematch");
  // bets.value = await getBets();
});
</script>

<template>
  <div class="w-full">
    <div class="h-8 uppercase bg-[#FBCC01] flex justify-center items-center">
      bet list
    </div>

    <!-- Tabs -->
    <div class="flex border-b border-gray-100 text-sm font-semibold px-6">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.key"
        @click="selectTab(tab.value)"
        class="flex-1 md:flex-none md:w-30 px-6 py-1 text-center transition-colors"
        :class="
          activeTab === tab.value
            ? 'border-b-2 border-[#FBCC01] text-black'
            : 'text-gray-500 hover:text-black'
        "
      >
        {{ tab.label }}
      </button>
    </div>

    <DateSelect
      @change="
        async ({ start, end }) => {
          console.log(start, end);
          bets = await getBets(start, end);
        }
      "
    />

    <!-- Panels -->
    <div class="py-2 text-xs space-y-1 md:px-6 md:w-full md:mx-auto">
      <div class="md:hidden">
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

      <div class="hidden md:block">
        <div
          class="grid bg-[#ffcb00] items-center w-full p-2 font-semibold"
          style="grid-template-columns: 24% 10% 8% 8% 6% 6% 8% 10% 10% 10%"
        >
          <div>Date and ID</div>
          <div>Username</div>
          <div>Bet Type</div>
          <div>Stake</div>
          <div>No events</div>
          <div>Odds</div>
          <div></div>
          <div>Status</div>
          <div>Winning</div>
          <div></div>
        </div>

        <div v-for="b in filtered" :key="b.ticketId" class="mb-1">
          <div
            @click="toggleBet(b.ticketId)"
            class="grid items-center w-full p-2 bg-white cursor-pointer"
            style="grid-template-columns: 24% 10% 8% 8% 6% 6% 8% 10% 10% 10%"
          >
            <!-- Date & ID -->
            <div class="flex flex-col">
              <div>{{ formatDate(b.date) }}</div>
              <div class="flex items-center gap-2">
                ID: {{ b.ticketId }}
                <UIcon
                  @click="getPrintTicket(b.ticketId)"
                  name="material-symbols:print"
                />
              </div>
            </div>

            <div>{{ b.userId }}</div>
            <div>Prematch</div>
            <div>{{ b.stake.toFixed(2) }} ETB</div>
            <div>{{ b.robustbets.length }}</div>
            <div>{{ b.totalOdds.toFixed(2) }}</div>

            <div class="flex flex-col">
              <div>Possible win:</div>
              <div>{{ (b.stake * b.totalOdds).toFixed(2) }} ETB</div>
            </div>

            <div class="flex items-center justify-between gap-2 px-2">
              <span>LOST</span>
              <UIcon
                :name="
                  b.status === 1
                    ? 'ix:success-filled'
                    : b.status === 2
                      ? 'carbon:close-filled'
                      : 'stash:circle-duotone'
                "
                :style="{
                  backgroundColor:
                    b.status === 1
                      ? 'green'
                      : b.status === 2
                        ? 'red'
                        : '#E1E1E1',
                }"
              />
            </div>

            <div>
              {{ b.status === 1 ? (b.totalOdds * b.stake).toFixed(2) : 0 }} ETB
            </div>
            <div></div>
          </div>
          <div v-if="showBet.includes(b.ticketId)">
            <div
              v-for="t in b.robustbets"
              class="grid items-center gap-x-1 w-full px-2 py-1 border-b border-gray-300"
              style="grid-template-columns: 20% 25% 10% 35% 5% 5%"
            >
              <div>
                <div class="text-[#ffcb00]">{{ formatDate(t.date) }}</div>
                <div class="text-[#2b2b2b] opacity-75">
                  Football - {{ t.country }} - {{ t.tournament }}
                </div>
              </div>

              <div>
                <div class="font-semibold">{{ t.teams }}</div>
              </div>

              <div></div>

              <div>
                <div>{{ t.market }} - {{ t.priceName }}</div>
              </div>

              <div>{{ t.odd.toFixed(2) }}</div>

              <div>
                <UIcon
                  :name="
                    t.status === 1
                      ? 'ix:success-filled'
                      : t.status === 2
                        ? 'carbon:close-filled'
                        : 'stash:circle-duotone'
                  "
                  :style="{
                    backgroundColor:
                      t.status === 1
                        ? 'green'
                        : t.status === 2
                          ? 'red'
                          : '#E1E1E1',
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
