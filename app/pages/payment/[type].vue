<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const { loggedIn } = useAuth();

const tabs = [
  { label: "Deposit", name: "deposit", key: "one" },
  { label: "Withdraw", name: "withdraw", key: "two" },
  { label: "Withdraw Request", name: "withdraw-request", key: "three" },
];

// default + validation
const validNames = tabs.map((t) => t.name);

const activeTab = ref(
  validNames.includes(route.params.type) ? route.params.type : "deposit",
);

function selectTab(tabName) {
  activeTab.value = tabName;
  router.push({ params: { type: tabName } });
}

// keep state in sync with URL
watch(
  () => route.params.type,
  (val) => {
    if (validNames.includes(val)) {
      activeTab.value = val;
    }
  },
);

onMounted(() => {
  if (!loggedIn.value) {
    router.back();
  }
});
</script>

<template>
  <div class="w-full">
    <!-- Header -->
    <div
      class="h-10 bg-[#FBCC01] uppercase flex justify-center items-center border-b border-gray-100"
    >
      Payments
    </div>

    <!-- Tabs -->
    <div class="flex text-sm font-semibold">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="selectTab(tab.name)"
        class="px-4 h-10 flex items-center transition-colors border-b-2 border-transparent"
        :class="
          activeTab == tab.name
            ? 'border-b-2 border-[#FBCC01] text-black'
            : 'text-gray-500 hover:text-black'
        "
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Panels -->
    <div class="p-4">
      <div v-show="activeTab === 'deposit'">
        <Deposit />
      </div>

      <div v-show="activeTab === 'withdraw'">
        <Withdraw />
      </div>

      <div v-show="activeTab === 'withdraw-request'">
        <WithdrawRequests />
      </div>
    </div>
  </div>
</template>
