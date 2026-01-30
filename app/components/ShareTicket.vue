<script setup>
const { toggleModal, showShareTicketModal } = useAuth();
const { ticket, shareTicketId, stake, win, tax, bonus } = useTicket();
const { copy, copied } = useClipboard();

function formatDateLabel(iso) {
  const date = new Date(iso);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="showShareTicketModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 text-xs"
    >
      <div
        class="relative w-[90%] md:w-[70%] bg-[#e6e6e6] rounded-sm font-sans overflow-y-auto max-h-[80%]"
      >
        <div class="h-10 bg-[#f5c400] flex px-2 justify-between items-center">
          <span>Share on Socials</span>
          <button
            class="text-lg font-bold text-black cursor-pointer"
            @click="toggleModal('share')"
          >
            ✕
          </button>
        </div>

        <div
          class="flex flex-col md:flex-row md:justify-between md:items-center px-8 md:py-4"
        >
          <div>
            <div
              class="mt-4 md:mt-0 text-center italic opacity-75 mb-0.5 text-sm"
            >
              Your bet has been booked
            </div>
            <div
              class="flex justify-center items-center gap-5 uppercase font-bold text-lg md:text-base text-center opacity-75 mb-2"
            >
              <span>*{{ shareTicketId }}*</span>
              <div class="flex flex-col justify-center items-center relative">
                <UIcon @click="copy(shareTicketId)" name="pixel:copy-solid" />
                <span
                  v-if="copied"
                  class="absolute -bottom-4 text-xs lowercase font-light italic ml-3"
                  >coppied</span
                >
              </div>
            </div>
          </div>
          <div>
            <div
              class="uppercase font-bold text-sm md:text-xs text-center opacity-75 mb-2"
            >
              Betting Date
            </div>
            <div
              class="uppercase text-sm md:text-xs text-center opacity-75 mb-2"
            >
              29/01/2026
            </div>
          </div>
          <div>
            <div
              class="uppercase font-bold text-sm md:text-xs text-center opacity-75 mb-2"
            >
              Total stake
            </div>
            <div
              class="uppercase text-sm md:text-xs text-center opacity-75 mb-2"
            >
              {{ Number(stake).toFixed(2) }}
            </div>
          </div>
          <div>
            <div
              class="uppercase font-bold text-sm md:text-xs text-center opacity-75 mb-2"
            >
              win amount
            </div>
            <div
              class="uppercase text-sm md:text-xs text-center opacity-75 mb-2"
            >
              {{ win.toFixed(2) }}
            </div>
          </div>
        </div>

        <div
          class="h-10 bg-[#D4D4D4] text-center uppercase font-black flex justify-center items-center"
        >
          Events played
        </div>

        <div v-for="t in ticket" class="md:hidden flex justify-center">
          <div class="flex flex-col justify-center items-center p-2 flex-1">
            <div class="font-bold text-center">{{ t.event_name }}</div>
            <div>{{ formatDateLabel(t.startTime) }}</div>
          </div>
          <div class="flex flex-col justify-center items-center p-2 flex-1">
            <div class="">
              {{ t.market_name }} {{ t.price_name }} {{ t.price_rate }}
            </div>
          </div>
        </div>

        <div class="hidden md:grid grid-cols-5 bg-[#FBCC01] h-8">
          <div
            class="border-r border-b border-r-gray-400 flex justify-center items-center font-semibold"
          >
            Event Date
          </div>
          <div
            class="border-r border-r-gray-400 flex justify-center items-center font-semibold"
          >
            Tournament
          </div>
          <div
            class="border-r border-r-gray-400 flex justify-center items-center font-semibold"
          >
            Event
          </div>
          <div
            class="border-r border-r-gray-400 flex justify-center items-center font-semibold"
          >
            Market
          </div>
          <div
            class="border-r border-r-gray-400 flex justify-center items-center font-semibold"
          >
            Odd
          </div>
        </div>

        <div class="hidden md:flex flex-col bg-white text-xs opacity-70">
          <div v-for="t in ticket" :key="t.id" class="grid grid-cols-5 h-8">
            <div
              class="border-r border-b flex justify-center items-center font-semibold text-center px-1"
            >
              {{ t.startTime }}
            </div>
            <div
              class="border-r border-b flex justify-center items-center font-semibold text-center px-1"
            >
              {{ t.competition }}
            </div>
            <div
              class="border-r border-b flex justify-center items-center font-semibold text-center px-1"
            >
              {{ t.event_name }}
            </div>
            <div
              class="border-r border-b flex justify-center items-center font-semibold text-center px-1"
            >
              {{ t.market_name }}: {{ t.price_name }}
            </div>
            <div
              class="border-b flex justify-center items-center font-semibold text-center px-1"
            >
              {{ t.price_rate }}
            </div>
          </div>
        </div>

        <div
          @click="toggleModal('share')"
          class="w-[90%] h-10 flex justify-center items-center uppercase font-semibold my-3 bg-[#FBCC01] mx-auto cursor-pointer"
        >
          continue on website
        </div>
      </div>
    </div>
  </Teleport>
</template>
