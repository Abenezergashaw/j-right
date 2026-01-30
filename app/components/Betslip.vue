<script setup>
const {
  ticket,
  totalBets,
  totalOdds,
  stake,
  win,
  tax,
  bonus,
  placingBet,
  placingBetError,
  placingBetSuccess,
  removeBet,
  incrementStake,
  decrementStake,
  setStake,
  clearStake,
  fixStake,
  clearBets,
  shareTicket,
  placeBets,
  continueBet,
  repeatBet,
} = useTicket();

const { loggedIn } = useAuth();

const quickStakes = [20, 50, 1000, 500];
</script>

<template>
  <div
    class="h-10 md:h-7 bg-[#FBCC01] flex justify-between items-center px-2 text-xs border-t border-red-500 md:border-0"
  >
    <div
      class="font-semibold flex items-center justify-between relative w-full"
    >
      <span>Betslip</span>

      <span
        class="h-5 w-5 rounded-full bg-[#5B5B5B] text-white flex items-center justify-center text-xs md:static md:ml-2 absolute -top-3 -right-3"
      >
        {{ totalBets }}
      </span>
    </div>
  </div>

  <div
    v-if="totalBets === 0"
    class="text-center text-xs mt-5 md:mt-0 p-4 bg-[#e6e6e6]"
  >
    <span
      >No bet has been selected. To select a bet, please click on the respective
      odds.</span
    >
  </div>

  <div
    v-else-if="placingBet"
    class="bg-[#e6e6e6] h-20 flex flex-col justify-center items-center"
  >
    <UIcon name="memory:time-sand" class="h-7 w-7 animate-spin" />
    <div>Proccessing...</div>
  </div>

  <div
    v-else-if="placingBetError !== null"
    class="bg-[#e6e6e6] h-24 flex flex-col gap-1 justify-center items-center text-xs"
  >
    <UIcon name="oi:ban" class="text-red-500 h-7 w-7" />
    <div>{{ placingBetError }}</div>
    <div class="flex gap-1 py-1 text-xs px-1">
      <div
        @click="repeatBet()"
        class="bg-white w-30 py-1 font-semibold rounded-sm border border-gray-200 flex justify-center items-center uppercase cursor-pointer"
      >
        Repeat Bet
      </div>
      <div
        @click="continueBet()"
        class="bg-[#FBCC01] w-30 py-1 font-semibold rounded-sm border border-gray-200 flex justify-center items-center uppercase cursor-pointer"
      >
        Continue
      </div>
    </div>
  </div>

  <div
    v-else-if="placingBetSuccess !== null"
    class="bg-[#e6e6e6] h-24 flex flex-col gap-1 justify-center items-center text-xs"
  >
    <UIcon name="mdi:check-circle" class="text-green-500 h-7 w-7" />
    <div>Bet placed successfully.</div>
    <div class="flex gap-1 py-1 text-xs px-1">
      <div
        @click="repeatBet()"
        class="bg-white w-30 py-1 font-semibold rounded-sm border border-gray-200 flex justify-center items-center uppercase cursor-pointer"
      >
        Repeat Bet
      </div>
      <div
        @click="continueBet()"
        class="bg-[#FBCC01] w-30 py-1 font-semibold rounded-sm border border-gray-200 flex justify-center items-center uppercase cursor-pointer"
      >
        Continue
      </div>
    </div>
  </div>

  <div v-else class="p-1 text-xs space-y-0.5">
    <!-- Bet Item -->
    <div
      v-for="(t, index) in ticket"
      :class="`${t.errors.length > 0 ? 'border-2 border-red-500' : 'border-white'}`"
    >
      <div
        class="h-8 px-1 bg-[#E6E6E6] flex justify-between items-center border border-b-0 border-white"
      >
        <span>{{ t.event_name }}</span>
        <UIcon
          name="mdi:close"
          class="w-4 h-4 cursor-pointer"
          @click="removeBet(index)"
        />
      </div>

      <div
        v-if="t.errors.length > 0"
        class="text-red-500 text-start px-1 bg-[#E6E6E6]"
      >
        Market Suspended! Click 'x' to remove the event from the ticket!
      </div>

      <div
        class="p-1 flex justify-between items-center"
        :class="`${t.errors.length > 0 ? 'bg-[#E6E6E6]' : 'bg-white'}`"
      >
        <div>
          <div class="italic opacity-70">
            Football - {{ t.country }} - {{ t.competition }}
          </div>
          <div>{{ t.market_name }}: {{ t.price_name }}</div>
        </div>
        <div
          class="font-bold"
          :class="`${t.errors.length > 0 ? ' line-through text-red-500' : ''}`"
        >
          {{ t.price_rate.toFixed(2) }}
        </div>
      </div>
    </div>

    <!-- Bet Type -->
    <div
      class="h-12 md:h-8 bg-[#5B5B5B] flex justify-center items-center uppercase font-bold text-[#FBCC01] my-1"
    >
      {{ totalBets === 1 ? "Single" : totalBets > 1 ? "multiple" : "" }}
    </div>

    <!-- Odd  -->
    <div
      v-if="totalBets > 1"
      class="flex justify-between items-center font-bold h-10 md:h-8 text-sm md:text-xs px-1"
    >
      <span>Odds</span>

      <div>{{ totalOdds.toFixed(2) }}</div>
    </div>

    <div class="border-b border-gray-300 w-[94%] mx-auto" />

    <!-- Stake -->
    <div
      class="flex justify-between items-center font-bold h-10 md:h-8 text-sm md:text-xs px-1"
    >
      <span>Stake</span>
      <div
        class="md:hidden flex items-center justify-between w-[50%] h-10 md:h-8 bg-[#D4D4D4] rounded-md px-1.5"
      >
        <div
          @click="decrementStake()"
          class="h-8 w-8 md:h-6 md:w-6 rounded-full bg-[#e6e6e6] flex items-center justify-center"
        >
          -
        </div>
        <div @click="showKeypad = !showKeypad">{{ stake }}</div>
        <div
          @click="incrementStake()"
          class="h-8 w-8 md:h-6 md:w-6 rounded-full bg-[#e6e6e6] flex items-center justify-center"
        >
          +
        </div>
      </div>

      <div
        class="hidden md:flex items-center justify-between w-[50%] h-10 md:h-8 bg-[#D4D4D4] rounded-md px-1.5"
      >
        <!-- Minus -->
        <div
          @click="decrementStake()"
          class="h-8 w-8 md:h-6 md:w-6 rounded-full bg-[#e6e6e6] flex items-center justify-center cursor-pointer select-none"
        >
          −
        </div>

        <!-- Input -->
        <input
          type="number"
          v-model.number="stake"
          @focus="showKeypad = true"
          class="w-full mx-2 bg-transparent text-center font-semibold outline-none appearance-none [appearance:textfield]"
        />

        <!-- Plus -->
        <div
          @click="incrementStake()"
          class="h-8 w-8 md:h-6 md:w-6 rounded-full bg-[#e6e6e6] flex items-center justify-center cursor-pointer select-none"
        >
          +
        </div>
      </div>
    </div>

    <div class="border-b border-gray-300 w-[94%] mx-auto" />

    <!-- Keypad -->
    <Transition name="slide-down">
      <div
        v-show="showKeypad"
        class="md:hidden grid grid-cols-3 w-[96%] mx-auto"
      >
        <div
          v-for="key in keypad"
          :key="key"
          @click="setStake(key)"
          class="h-10 bg-white border border-gray-300 flex items-center justify-center font-bold cursor-pointer select-none hover:bg-gray-200 active:scale-95 transition"
        >
          <UIcon v-if="key === 'back'" name="fa-solid:backspace" />
          <span v-else>{{ key }}</span>
        </div>
      </div>
    </Transition>

    <!-- Clear / OK -->
    <div
      v-if="showKeypad"
      class="md:hidden flex w-[96%] mx-auto text-base gap-1"
    >
      <div
        @click="clearStake"
        class="flex-1 h-10 bg-white flex justify-center items-center font-semibold cursor-pointer"
      >
        Clear
      </div>
      <div
        @click="showKeypad = false"
        class="flex-1 h-10 bg-white flex justify-center items-center font-semibold cursor-pointer"
      >
        Ok
      </div>
    </div>

    <div class="md:hidden border-b border-gray-300 w-[94%] mx-auto" />

    <!-- Quick Stakes -->
    <div class="flex items-center gap-1 w-[96%] mx-auto">
      <div
        v-for="v in quickStakes"
        :key="v"
        @click="fixStake(v)"
        class="flex-1 h-10 md:h-8 bg-[#E6E6E6] rounded-md flex items-center justify-center font-semibold cursor-pointer"
      >
        {{ v }}
      </div>
      <div
        class="flex-1 h-10 md:h-8 bg-white flex items-center justify-center cursor-pointer"
      >
        <UIcon name="bxs:edit" class="w-6 h-6" />
      </div>
    </div>

    <div class="border-b border-gray-300 w-[94%] mx-auto" />

    <!-- Winning  -->
    <div
      v-if="win > 0"
      class="h-20 md:h-14 bg-[#5B5B5B] rounded-md flex flex-col items-center justify-center gap-1 text-white font-semibold my-1"
    >
      <span class="text-xs">Potential Winning</span>
      <span class="text-base md:text-lg">{{ win.toFixed(2) }} ETB</span>
    </div>

    <!-- After Tax  -->
    <div
      v-if="tax > 0"
      class="h-20 md:h-14 bg-[#5B5B5B] rounded-md flex flex-col items-center justify-center gap-1 text-white font-semibold my-1"
    >
      <span class="text-xs">After Tax</span>
      <span class="text-lg">{{ (win - tax).toFixed(2) }} ETB</span>
    </div>

    <!-- Bonus  -->
    <div
      v-if="bonus > 0"
      class="h-10 border border-dotted border-black flex justify-between px-2 items-center text-xs bg-white my-1"
    >
      <span>Bonus 10%</span>
      <span>+ {{ bonus.toFixed(2) }}</span>
    </div>

    <!-- Tax  -->
    <div
      v-if="tax > 0"
      class="h-10 flex justify-between px-2 items-center text-xs bg-white my-1"
    >
      <span>Taxes 15%</span>
      <span>{{ tax.toFixed(2) }}</span>
    </div>

    <div class="border-b border-gray-300 w-[94%] mx-auto" />

    <!-- Warning -->
    <div v-if="!loggedIn" class="flex items-center gap-2 text-xs">
      <UIcon name="gg:danger" class="w-4 h-4 text-red-500" />
      <span>You need to login to be able to place a bet.</span>
    </div>

    <!-- Share -->
    <div
      @click="shareTicket()"
      class="h-12 md:h-9 bg-black text-white flex items-center justify-center relative uppercase font-semibold rounded-sm cursor-pointer"
    >
      <UIcon
        name="material-symbols:save"
        class="absolute left-2 w-6 h-6 md:h-5"
      />
      Share
    </div>

    <!-- Actions -->
    <div class="flex gap-1 uppercase">
      <div
        @click="clearBets()"
        class="flex-1 h-12 md:h-9 bg-[#CD4141] text-white rounded-sm flex items-center justify-center gap-2 font-semibold cursor-pointer"
      >
        <UIcon name="material-symbols:cancel" class="w-6 h-6" />
        Cancel
      </div>
      <div
        @click="placeBets"
        class="flex-1 h-12 md:h-9 bg-[#38C538] text-white rounded-sm flex items-center justify-center gap-2 font-semibold cursor-pointer"
      >
        Place bet
        <UIcon name="heroicons:document-check" class="w-6 h-6" />
      </div>
    </div>
  </div>

  <CheckTicket />
  <div class="h-30 bg-[#e6e6e6]"></div>
</template>

<style scoped>
/* Chrome, Edge, Safari */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
