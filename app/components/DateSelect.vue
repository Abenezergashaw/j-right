<script setup>
import { ref, watch, defineEmits } from "vue";

const emit = defineEmits(["change"]);

const preset = ref("all");
const fromDate = ref("");
const toDate = ref("");

// helper: format to SQL datetime
function toSQL(date) {
  return date.toISOString().slice(0, 19).replace("T", " ");
}

function emitRange(start, end) {
  emit("change", {
    start, // string | null
    end, // string | null
    preset: preset.value,
  });
}

// Handle preset changes
watch(
  preset,
  (value) => {
    if (value === "all") {
      emitRange(null, null);
      return;
    }

    const start = new Date();
    const end = new Date();

    // END = start of next day (UTC)
    end.setUTCHours(0, 0, 0, 0);
    end.setUTCDate(end.getUTCDate() + 1);

    // START = start of day (UTC)
    start.setUTCHours(0, 0, 0, 0);

    if (value === "today") {
      // already correct
    }

    if (value === "2days") {
      start.setUTCDate(start.getUTCDate() - 2);
    }

    if (value === "week") {
      start.setUTCDate(start.getUTCDate() - 7);
    }

    if (value === "30days") {
      start.setUTCDate(start.getUTCDate() - 30);
    }

    emitRange(toSQL(start), toSQL(end));
  },
  { immediate: true },
);

// Handle manual dates
watch([fromDate, toDate], ([from, to]) => {
  if (!from || !to) return;

  preset.value = "custom";

  let start = new Date(from);
  let end = new Date(to);

  // fix reversed dates
  if (start > end) [start, end] = [end, start];

  // normalize to UTC day boundaries
  start.setUTCHours(0, 0, 0, 0);

  end.setUTCHours(0, 0, 0, 0);
  end.setUTCDate(end.getUTCDate() + 1); // 🔑 next day start

  emitRange(toSQL(start), toSQL(end));
});
</script>

<template>
  <div
    class="flex flex-col md:flex-row gap-4 md:gap-8 items-end md:items-center justify-center"
  >
    <!-- Period -->
    <div class="flex flex-col gap-1 w-full md:w-48">
      <label class="text-xs">Period</label>
      <select v-model="preset" class="border h-10 md:h-7 px-2 w-full">
        <option value="all">All</option>
        <option value="today">Today</option>
        <option value="2days">Last 2 Days</option>
        <option value="week">Last Week</option>
        <option value="30days">Last 30 Days</option>
      </select>
    </div>

    <!-- From -->
    <div class="flex flex-col gap-1 w-full md:w-40">
      <label class="text-xs">From</label>
      <input
        type="date"
        v-model="fromDate"
        class="border h-10 md:h-7 px-2 w-full"
      />
    </div>

    <!-- To -->
    <div class="flex flex-col gap-1 w-full md:w-40">
      <label class="text-xs">To</label>
      <input
        type="date"
        v-model="toDate"
        class="border h-10 md:h-7 px-2 w-full"
      />
    </div>
  </div>
</template>
