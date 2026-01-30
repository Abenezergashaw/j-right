<script setup>
import { ref } from "vue";

const menu = ref([
  "All",
  "Main",
  "Goals",
  "Handicap",
  "All",
  "All",
  "Main",
  "Goals",
  "Handicap",
  "All",
  "Main",
  "Goals",
  "Handicap",
  "Main",
  "Goals",
  "Handicap",
]);

const active = ref("All");
</script>

<template>
  <div class="h-10 font-semibold text-xs flex overflow-x-auto no-scrollbar">
    <div
      v-for="m in menu"
      :key="m + Math.random()"
      @click="active = m"
      class="px-4 flex items-center cursor-pointer whitespace-nowrap border-r border-r-gray-400"
      :class="active === m ? 'bg-[#FBCC01]' : 'bg-[#E6E6E6] text-black'"
    >
      {{ m }}
    </div>
  </div>
</template>
