<script setup>
const { loadBookedTicket, bookedTicketLoadError } = useTicket();

const bookedTicket = ref("");
</script>

<template>
  <div class="bg-[#E6E6E6] pb-4">
    <div
      class="h-10 md:h-8 px-2 bg-[#FBCC01] flex justify-between items-center text-xs"
    >
      <span class="font-semibold">Load booked bet</span>
    </div>

    <div class="text-sm md:text-xs text-gray-700 mt-4 px-2">
      <div class="font-bold text-center">Insert the code to load</div>
      <div class="flex justify-center items-center mt-2">
        <input
          type="text"
          v-model="bookedTicket"
          class="bg-white text-black placeholder-gray-400 h-8 md:h-7 w-[75%] px-2 outline-none"
          placeholder="Insert the code here..."
        />
        <button
          @click="loadBookedTicket(bookedTicket)"
          class="bg-[#FBCC01] cursor-pointer w-[25%] h-8 md:h-7 text-center font-bold"
        >
          Load
        </button>
      </div>
      <div
        v-if="bookedTicketLoadError !== null"
        class="text-center text-red-500 font-semibold mt-2"
      >
        Ticket Not Found
      </div>
    </div>

    <div
      class="h-10 md:h-8 mt-4 px-2 bg-[#FBCC01] flex justify-between items-center text-xs"
    >
      <span class="font-semibold">Load Ticket</span>
    </div>

    <div class="text-sm md:text-xs text-gray-700 mt-4 px-2">
      <div class="font-bold text-center">Insert the id to load ticket</div>
      <div class="flex justify-center items-center mt-2">
        <input
          type="text"
          class="bg-white h-8 w-[75%] px-2 md:h-7"
          placeholder="Insert the id here..."
        />
        <button
          class="bg-[#FBCC01] cursor-pointer w-[25%] h-8 md:h-7 text-center font-bold"
        >
          Load
        </button>
      </div>
    </div>

    <div
      class="h-10 md:h-8 mt-4 px-2 bg-[#FBCC01] flex justify-between items-center text-xs"
    >
      <span class="font-semibold">Check Your Bet</span>
    </div>

    <div class="text-sm md:text-xs text-gray-700 mt-4 px-2">
      <div class="font-bold text-center">Your Bet ID</div>
      <div class="flex justify-center items-center mt-2">
        <input
          type="text"
          class="bg-white h-8 md:h-7 w-[75%] px-2"
          placeholder="Insert the code here..."
        />
        <button
          class="bg-[#FBCC01] cursor-pointer w-[25%] h-8 md:h-7 text-center font-bold"
        >
          Load
        </button>
      </div>
    </div>
  </div>
</template>
