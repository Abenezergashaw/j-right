<script setup>
const { copy } = useClipboard();
const {
  proceedToWithdrawView,
  onWithdraw,
  withdraw,
  withdrawSuccess,
  withdrawError,
} = useTransaction();

const amounts = [300, 1000, 2000, 5000, 10000, 15000];
const amount = ref(null);
</script>

<template>
  <div
    v-if="!onWithdraw"
    class="mx-auto bg-white flex flex-col justify-center items-center text-sm gap-2 py-2 shadow-2xl border border-gray-300"
  >
    <img
      src="https://backoffice-new.plqservice.com/storage/payment-methods/January2026/HOi0E3jMh4HGKBy2FZNy.png"
      class="h-10"
      alt=""
    />
    <div class="font-semibold">Service Fee</div>
    <div class="border-b border-gray-200 w-full"></div>
    <div class="font-extralight">Free Withdraw</div>

    <div class="font-semibold">Process Time</div>
    <div class="border-b border-gray-200 w-full"></div>
    <div class="font-extralight">Instant</div>

    <div
      @click="proceedToWithdrawView"
      class="w-[96%] mx-auto border-2 border-green-500 flex justify-center mt-2 items-center py-1 text-green-500 cursor-pointer"
    >
      Withdraw
    </div>
  </div>

  <div
    v-if="onWithdraw"
    class="mx-auto bg-white flex flex-col justify-center items-center text-sm gap-2 py-2 shadow-2xl border border-gray-300"
  >
    <img
      src="https://backoffice-new.plqservice.com/storage/payment-methods/January2026/HOi0E3jMh4HGKBy2FZNy.png"
      class="h-10"
      alt=""
    />
    <div class="font-semibold">Service Fee</div>
    <div class="border-b border-gray-200 w-full"></div>
    <div class="font-extralight">Free Withdraw</div>

    <div class="font-semibold">Process Time</div>
    <div class="border-b border-gray-200 w-full"></div>
    <div class="font-extralight">Instant</div>

    <div class="font-semibold">Min. Amount</div>
    <div class="border-b border-gray-200 w-full"></div>
    <div class="font-extralight">100 ETB</div>

    <div class="font-semibold">Max. Amount</div>
    <div class="border-b border-gray-200 w-full"></div>
    <div class="font-extralight">50000 ETB</div>

    <div class="opacity-75 text-start flex justify-start w-full px-4">
      Receiver Mobile Number
    </div>

    <div class="opacity-75 text-start flex justify-start w-full px-4">
      <div
        class="h-8 w-full bg-[#EEEEEE] border border-gray-500 px-2 flex justify-start items-center"
      >
        956457051
      </div>
    </div>

    <div class="opacity-75 text-start flex justify-start w-full px-4">
      Select or type in the amount to be withdrawn.
    </div>

    <div class="grid grid-cols-3 gap-2 px-2">
      <div
        v-for="value in amounts"
        @click="amount = value"
        class="bg-[#1796DD] text-white px-6 py-2 text-xs flex justify-center items-center"
        style="background-color: #1796dd !important"
      >
        {{ value }}
      </div>
    </div>

    <input
      v-model="amount"
      class="h-10 border borg500 text-right w-[96%] mx-auto px-2"
      placeholder="Amount"
    />

    <div
      @click="withdraw(amount)"
      class="w-[96%] bg-[#C85E5E] mx-auto flex justify-center mt-2 items-center py-1 cursor-pointer text-white uppercase h-10 mb-8"
      style="background-color: #c85e5e !important"
    >
      Withdraw
    </div>

    <div
      v-if="withdrawError !== null"
      class="opacity-75 text-red-500 text-center flex justify-center w-full px-4"
    >
      {{ withdrawError }}
    </div>

    <div
      v-if="withdrawSuccess !== null"
      class="opacity-75 text-green-500 text-center flex justify-center w-full px-4"
    >
      {{ withdrawSuccess }}
    </div>

    <div
      @click="proceedToWithdrawView"
      class="w-full mx-auto flex justify-center h-10 items-center py-1 cursor-pointer text-black border-t border-gray-300 uppercase mt-8"
    >
      choose another withdraw method
    </div>
  </div>
</template>
