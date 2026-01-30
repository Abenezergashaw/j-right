<script setup>
const router = useRouter();

defineProps({
  open: Boolean,
});

const { loadBookedTicket, bookedTicketLoadError } = useTicket();

const bookedTicket = ref("");

const close = () => {
  router.back();
};
</script>

<template>
  <!-- Overlay -->
  <div v-if="open" class="fixed top-20 inset-0 z-50 md:hidden" @click="close" />

  <!-- Bottom Sheet -->
  <div
    class="fixed inset-x-0 bottom-0 z-50 bg-[#e6e6e6] transition-transform duration-500 md:hidden"
    :class="open ? 'translate-y-0' : 'translate-y-full'"
    style="top: 80px"
  >
    <div
      class="h-10 border-t border-red-400 px-2 bg-[#FBCC01] flex justify-between items-center text-xs"
    >
      <span class="font-semibold">Check Your Bet</span>
      <UIcon @click="close" name="mdi:close" class="w-5 h-5" />
    </div>

    <div class="text-sm text-gray-700 mt-4 px-2">
      <div class="font-bold text-center">Your Bet ID</div>
      <div class="flex justify-center items-center mt-2">
        <input
          type="text"
          class="bg-white h-8 w-[75%] px-2"
          placeholder="Insert the code here..."
        />
        <button class="bg-[#FBCC01] w-[25%] h-8 text-center font-bold">
          Load
        </button>
      </div>
    </div>

    <div
      class="h-10 mt-4 px-2 bg-[#FBCC01] flex justify-between items-center text-xs"
    >
      <span class="font-semibold">Load booked bet</span>
    </div>

    <div class="text-sm text-gray-700 mt-4 px-2">
      <div class="font-bold text-center">Insert the code to load</div>
      <div class="flex justify-center items-center mt-2">
        <input
          type="text"
          v-model="bookedTicket"
          class="bg-white h-8 w-[75%] px-2"
          placeholder="Insert the code here..."
        />
        <button
          @click="
            loadBookedTicket(bookedTicket);
            router.back();
          "
          class="bg-[#FBCC01] w-[25%] h-8 text-center font-bold"
        >
          Load
        </button>
      </div>
      <div v-if="bookedTicketLoadError !== null">
        {{ bookedTicketLoadError }}
      </div>
    </div>

    <div
      class="h-10 mt-4 px-2 bg-[#FBCC01] flex justify-between items-center text-xs"
    >
      <span class="font-semibold">Load Ticket</span>
    </div>

    <div class="text-sm text-gray-700 mt-4 px-2">
      <div class="font-bold text-center">Insert the id to load ticket</div>
      <div class="flex justify-center items-center mt-2">
        <input
          type="text"
          class="bg-white h-8 w-[75%] px-2"
          placeholder="Insert the id here..."
        />
        <button class="bg-[#FBCC01] w-[25%] h-8 text-center font-bold">
          Load
        </button>
      </div>
    </div>
  </div>
</template>
