<script setup>
const { getWithdrawRequests } = useTransaction();

const data = ref([]);

function formatDateLabel(iso) {
  const date = new Date(iso);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

onMounted(async () => {
  data.value = await getWithdrawRequests();
});
</script>

<template>
  <div class="h-8 bg-[#FBCC01] flex text-xs">
    <div
      class="w-[40%] px-1 flex items-center justify-center border-r shrink-0"
      style="width: 22% !important"
    >
      Request Date
    </div>

    <div
      class="w-[30%] px-1 flex items-center justify-center border-r shrink-0"
      style="width: 14% !important"
    >
      Amount
    </div>

    <div
      class="w-[30%] px-1 flex items-center justify-center border-r shrink-0"
      style="width: 18% !important"
    >
      Status
    </div>

    <div
      class="w-[10%] px-1 flex items-center justify-center shrink-0"
      style="width: 46% !important"
    >
      Payment ID
    </div>
  </div>

  <div
    v-for="d in data.message"
    class="h-8 flex text-xs border"
    style="border-top: 0px !important"
  >
    <div
      class="w-[40%] px-1 flex items-center justify-center border-r shrink-0"
      style="width: 22% !important"
    >
      {{ formatDateLabel(d.created_at) }}
    </div>

    <div
      class="w-[30%] px-1 flex items-center justify-center border-r shrink-0"
      style="width: 14% !important"
    >
      {{ d.amount }}
    </div>

    <div
      class="w-[30%] px-1 flex items-center justify-center border-r shrink-0"
      style="width: 18% !important"
    >
      {{ d.status }}
    </div>

    <div
      class="w-[10%] px-4 flex items-center justify-center shrink-0 truncate"
      style="width: 46% !important; padding: 0 3px !important"
    >
      {{ d.txn_id }}
    </div>
  </div>
</template>
