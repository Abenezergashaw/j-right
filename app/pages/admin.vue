<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

definePageMeta({
  layout: "noside",
});

const router = useRouter();
const { url } = useUrl();
const { user, checkSession, loggedIn } = useAuth();

const users = ref([]);
const activeTab = ref(1);

// pagination
const page = ref(1);
const limit = 10;
const totalPages = ref(1);

// modals
const depositModal = ref(false);
const withdrawModal = ref(false);
const selectedUser = ref(null);
const createModal = ref(null);

const depositAmount = ref(0);
const withdrawAmount = ref(0);
const depositResponse = ref(null);
const withdrawResponse = ref(null);
const newUser = ref({
  phone: "",
  password: "",
});

const createResponse = ref(null);

const search = ref("");
const results = ref([]);
const loading = ref(false);

let cancelToken;

const tabs = [
  { label: "Summary", value: 1 },
  { label: "Users", value: 0 },
];

function selectTab(value) {
  activeTab.value = value;
}

async function fetchUsers() {
  const res = await axios.get(`${url}/api/fetchUsers`, {
    params: {
      id: user?.value?.id,
      page: page.value,
      limit,
    },
    withCredentials: true,
  });

  users.value = res.data.data;
  totalPages.value = res.data.pagination.totalPages;
}

function nextPage() {
  if (page.value < totalPages.value) {
    page.value++;
    fetchUsers();
  }
}

function prevPage() {
  if (page.value > 1) {
    page.value--;
    fetchUsers();
  }
}

function openDeposit(u) {
  selectedUser.value = u;
  depositModal.value = true;
}

function openWithdraw(u) {
  selectedUser.value = u;
  withdrawModal.value = true;
}

async function depositAMountToUser(userId, adminId) {
  const res = await axios.post(
    `${url}/api/manageBalanceByAdmin`,
    {
      adminId,
      userId,
      type: "Deposit",
      amount: depositAmount.value,
    },
    { withCredentials: true },
  );

  depositResponse.value = res.data.message;
  await fetchUsers();
  checkSession();
}

async function withdrawAMountToUser(userId, adminId) {
  const res = await axios.post(
    `${url}/api/manageBalanceByAdmin`,
    {
      adminId,
      userId,
      type: "Withdraw",
      amount: withdrawAmount.value,
    },
    { withCredentials: true },
  );

  withdrawResponse.value = res.data.message;
  await fetchUsers();
  checkSession();
}

watch(search, async (value) => {
  if (!value || value.length < 1) {
    fetchUsers();
    return;
  }

  // Cancel previous request
  if (cancelToken) cancelToken.cancel("New search");

  cancelToken = axios.CancelToken.source();

  loading.value = true;

  try {
    const res = await axios.get(`${url}/api/search-users`, {
      params: { q: value, id: user?.value?.id },
      cancelToken: cancelToken.token,
    });

    users.value = res.data;
  } catch (err) {
    if (!axios.isCancel(err)) console.error(err);
  } finally {
    loading.value = false;
  }
});

async function createUser() {
  if (!newUser.value.phone || !newUser.value.password) {
    createResponse.value = "All fields are required";
    return;
  }

  // call backend here
  const res = await axios.post(
    `${url}/api/createUser`,
    {
      phone: newUser.value.phone,
      password: newUser.value.password,
      userId: user.value.id,
    },
    {
      withCredentials: true,
    },
  );

  createResponse.value = res.data.message;

  fetchUsers();

  // optional reset
  newUser.value.phone = "";
  newUser.value.password = "";
}

watch(loggedIn, (newVal) => {
  if (!newVal) return router.push("/prematch");
});

const summary = ref(null);

const fetchSummary = async (start, end) => {
  const res = await axios.get(`${url}/getSummary?start=${start}&end=${end}`, {
    withCredentials: true,
  });

  if (!res?.data?.error) {
    summary.value = res.data;
  }
};

onMounted(() => {
  setTimeout(() => {
    if (!loggedIn.value) return router.push("/prematch");

    fetchUsers();
    fetchSummary(null, null);
  }, 1500);
});
</script>

<template>
  <div class="w-full max-w-4xl mx-auto">
    <div
      class="h-8 uppercase bg-[#49215D] text-white flex justify-center items-center"
    >
      admin
    </div>

    <!-- Tabs -->
    <div class="flex border-b text-sm font-semibold">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        @click="selectTab(tab.value)"
        class="flex-1 px-4 py-1 cursor-pointer"
        :class="activeTab === tab.value ? 'border-b-2 border-[#49215D]' : ''"
      >
        {{ tab.label }}
      </button>
    </div>

    <div v-if="activeTab == 0">
      <div class="flex justify-center px-2 my-3 items-center cursor-pointer">
        <div
          @click="createModal = true"
          class="p-2 bg-[#49215D] text-white w-full flex justify-center cursor-pointer"
        >
          Create new user
        </div>
      </div>

      <div class="my-3 flex gap-1 px-2">
        <input
          v-model="search"
          type="text"
          class="h-10 px-2 bg-white border outline-0 flex-1"
          placeholder="Search user by phone"
        />
      </div>

      <div class="text-sm my-2 flex justify-around items-center">
        <button
          @click="prevPage"
          :disabled="page === 1"
          class="disabled:opacity-30"
        >
          ◀
        </button>

        <div>Page {{ page }} / {{ totalPages }}</div>

        <button
          @click="nextPage"
          :disabled="page === totalPages"
          class="disabled:opacity-30"
        >
          ▶
        </button>
      </div>

      <div v-if="users.length === 0">
        <div class="text-sm text-center my-1 text-red-900 flex justify-around">
          No user
        </div>
      </div>

      <div v-else-if="loading">Searching...</div>

      <div v-else>
        <div
          v-for="u in users"
          :key="u.id"
          class="h-10 bg-white my-0.5 flex justify-between items-center text-xs px-2"
        >
          <div>
            <div>{{ u.phone }}</div>
            <div class="opacity-50">{{ u.id }}</div>
          </div>

          <div>
            <div>Withdrawable: {{ u.rBalance }} ETB</div>
            <div class="opacity-50">Bonus: {{ u.bBalance }} ETB</div>
          </div>

          <div class="flex gap-2">
            <button
              @click="openDeposit(u)"
              class="px-2 py-1 bg-[#FBCC01] rounded"
            >
              Deposit
            </button>

            <button
              @click="openWithdraw(u)"
              class="px-2 py-1 bg-red-500 text-white rounded"
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="activeTab === 1" class="py-4">
      <DateSelect
        @change="
          async ({ start, end }) => {
            await fetchSummary(start, end);
          }
        "
      />

      <div
        class="w-full max-w-2xl my-3 mx-auto bg-slate-300 text-slate-900 rounded-xl p-4 shadow-lg"
      >
        <!-- Header -->
        <div class="text-sm text-slate-700 mb-1">
          User ID: {{ summary?.id }}
        </div>

        <div class="text-xs text-slate-800 mb-4">
          {{ new Date(summary?.startDate).toLocaleDateString() }}
          →
          {{ new Date(summary?.endDate).toLocaleDateString() }}
        </div>

        <!-- Stats -->
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span>Total Bets</span>
            <span class="font-semibold">{{ summary?.count }}</span>
          </div>

          <div class="flex justify-between">
            <span class="text-green-400">Total Bet</span>
            <span class="font-semibold text-green-400">
              {{ summary?.totalStake.toFixed(2) }}
            </span>
          </div>

          <div class="flex justify-between">
            <span class="text-red-400">Total Win </span>
            <span class="font-semibold text-red-400">
              {{ summary?.totalWin.toFixed(2) }}
            </span>
          </div>

          <div class="flex justify-between">
            <span class="text-blue-400">Bonus</span>
            <span class="font-semibold text-blue-400">
              {{ summary?.totalCashback.toFixed(2) }}
            </span>
          </div>
        </div>

        <!-- Divider -->
        <div class="my-3 border-t border-slate-700"></div>
      </div>
    </div>

    <div
      v-if="depositModal || withdrawModal"
      class="fixed inset top-0 left-0 right-0 bottom-0 bg-black/50"
    ></div>

    <div v-if="depositModal" class="fixed inset-0 bg-black/50 z-50">
      <div
        class="w-[90%] max-w-80 mx-auto bg-[#e6e6e6] p-2 mt-20 md:mt-30 rounded"
      >
        <div class="flex justify-between border-b">
          <span>Deposit</span>
          <button
            @click="
              depositModal = false;
              depositResponse = null;
            "
          >
            ✕
          </button>
        </div>

        <div class="mt-3 text-center">
          <div>Phone: {{ selectedUser.phone }}</div>
          <div>ID: {{ selectedUser.id }}</div>
          <input
            v-model="depositAmount"
            type="number"
            class="border h-10 w-full my-2 px-2"
          />
          <button
            @click="depositAMountToUser(selectedUser.id, user.id)"
            class="bg-[#FBCC01] px-4 py-2 rounded"
          >
            Deposit
          </button>
          <div>{{ depositResponse }}</div>
        </div>
      </div>
    </div>

    <div v-if="withdrawModal" class="fixed inset-0 bg-black/50 z-50">
      <div
        class="w-[90%] max-w-80 mx-auto bg-[#e6e6e6] p-2 mt-20 md:mt-30 rounded"
      >
        <div class="flex justify-between border-b">
          <span>Withdraw</span>
          <button
            @click="
              withdrawModal = false;
              withdrawResponse = null;
            "
          >
            ✕
          </button>
        </div>

        <div class="mt-3 text-center">
          <div>Phone: {{ selectedUser.phone }}</div>
          <div>ID: {{ selectedUser.id }}</div>
          <input
            v-model="withdrawAmount"
            type="number"
            class="border h-10 w-full my-2 px-2"
          />
          <button
            @click="withdrawAMountToUser(selectedUser.id, user.id)"
            class="bg-[#FBCC01] px-4 py-2 rounded"
          >
            Witdraw
          </button>
          <div>{{ withdrawResponse }}</div>
        </div>
      </div>
    </div>

    <div v-if="createModal" class="fixed inset-0 bg-black/50 z-50">
      <div
        class="w-[90%] max-w-80 mx-auto bg-[#e6e6e6] p-2 mt-20 md:mt-30 rounded"
      >
        <!-- Header -->
        <div class="flex justify-between border-b">
          <span>Create User</span>
          <button
            @click="
              createModal = false;
              createResponse = null;
            "
          >
            ✕
          </button>
        </div>

        <!-- Body -->
        <div class="mt-3 text-center">
          <input
            v-model="newUser.phone"
            type="text"
            placeholder="Phone"
            class="border h-10 w-full my-2 px-2"
          />

          <input
            v-model="newUser.password"
            type="password"
            placeholder="Password"
            class="border h-10 w-full my-2 px-2"
          />

          <button
            @click="createUser"
            class="bg-[#FBCC01] px-4 py-2 rounded w-full"
          >
            Create
          </button>

          <div class="mt-2 text-sm">{{ createResponse }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
