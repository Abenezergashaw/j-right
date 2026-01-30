<script setup>
const { copy } = useClipboard();
const {
  proceedToDepositView,
  onDeposit,
  deposit,
  depositError,
  depositSuccess,
} = useTransaction();

const transactionNumber = ref(null);
</script>

<template>
  <div
    v-if="!onDeposit"
    class="mx-auto bg-white flex flex-col justify-center items-center text-sm gap-2 py-2 shadow-2xl border border-gray-300"
  >
    <img
      src="https://backoffice-new.plqservice.com/storage/payment-methods/January2026/HOi0E3jMh4HGKBy2FZNy.png"
      class="h-10"
      alt=""
    />
    <div class="font-semibold">Service Fee</div>
    <div class="border-b border-gray-200 w-full"></div>
    <div class="font-extralight">Free Deposit</div>

    <div class="font-semibold">Process Time</div>
    <div class="border-b border-gray-200 w-full"></div>
    <div class="font-extralight">Instant</div>

    <div
      @click="proceedToDepositView"
      class="w-[96%] mx-auto border-2 border-green-500 flex justify-center mt-2 items-center py-1 text-green-500 cursor-pointer"
    >
      Deposit
    </div>
  </div>

  <div
    v-if="onDeposit"
    class="mx-auto bg-white flex flex-col justify-center items-center text-sm gap-2 py-2 shadow-2xl border border-gray-300"
  >
    <img
      src="https://backoffice-new.plqservice.com/storage/payment-methods/January2026/HOi0E3jMh4HGKBy2FZNy.png"
      class="h-10"
      alt=""
    />
    <div class="font-semibold">Service Fee</div>
    <div class="border-b border-gray-200 w-full"></div>
    <div class="font-extralight">Free Deposit</div>

    <div class="font-semibold">Process Time</div>
    <div class="border-b border-gray-200 w-full"></div>
    <div class="font-extralight">Instant</div>

    <div class="font-semibold">Min. Amount</div>
    <div class="border-b border-gray-200 w-full"></div>
    <div class="font-extralight">10 ETB</div>

    <div class="font-semibold">Max. Amount</div>
    <div class="border-b border-gray-200 w-full"></div>
    <div class="font-extralight">50000 ETB</div>

    <div class="opacity-75 flex justify-start w-full px-4">
      1. የተሰጠውን የስልክ ቁጥር ኮፒ ያድርጉ። የሚያስገቡበት ስልክ ቁጥር
    </div>
    <div class="opacity-75 text-start flex justify-start w-full px-4">
      Receiver Mobile Number
    </div>

    <div class="opacity-75 text-start flex justify-start w-full px-4">
      <div
        class="h-8 w-30 bg-[#EEEEEE] border border-gray-500 px-2 flex justify-start items-center"
      >
        956457051
      </div>
      <div class="h-8 bg-[#F0F0F0] px-3 flex justify-center items-center">
        <UIcon @click="copy('956457051')" name="pixel:copy-solid" />
      </div>
    </div>

    <div class="opacity-75 flex justify-start w-full px-4">
      2. ቴሌብር መተግበሪያዎ ላይ በመግባት “Send money” የሚለውን ከመረጡ በኋላ “To individual” የሚለውን
      በመጫን ኮፒ ያደረጉትን ቁጥር አስገብተው ገቢ ማድረግ የፈለጉትን መጠን ይላኩ።
    </div>

    <div class="opacity-75 flex justify-start w-full px-4">
      3. የማረጋገጫ መልዕክት ሲደርስዎ የሚመጣልዎትን የግብይት ቁጥር ኮፒ አድርገው “Transaction Reference”
      ከሚለው በታች ያስገቡ። ማሳሰቢያ፦ የቴሌብር አገልግሎት ክፍያዎች ተፈጻሚ ናቸው።
    </div>

    <div class="opacity-75 text-start flex justify-start w-full px-4">
      Transaction ID
    </div>

    <input
      type="text"
      v-model="transactionNumber"
      class="h-8 w-[96%] mx-auto border border-gray-500 px-2"
      placeholder="ABCD123456"
    />

    <div
      @click="deposit(transactionNumber)"
      class="w-[96%] bg-[#C85E5E] mx-auto flex justify-center mt-2 items-center py-1 cursor-pointer text-white uppercase h-8 mb-8"
      style="background-color: #c85e5e !important"
    >
      Deposit
    </div>

    <div
      v-if="depositError !== null"
      class="opacity-75 text-red-500 text-center flex justify-center w-full px-4"
    >
      {{ depositError }}
    </div>

    <div
      v-if="depositSuccess !== null"
      class="opacity-75 text-green-500 text-center flex justify-center w-full px-4"
    >
      {{ depositSuccess }}
    </div>

    <div
      @click="proceedToDepositView"
      class="w-full mx-auto flex justify-center h-10 items-center py-1 cursor-pointer text-black border-t border-gray-300 uppercase mt-8"
    >
      choose another deposit method
    </div>
  </div>
</template>
