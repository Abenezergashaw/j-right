<script setup>
import { da } from "@nuxt/ui/runtime/locale/index.js";

defineProps({
  data: Array,
});

const { manageBets, ticket } = useTicket();

const ticketSet = computed(
  () => new Set(ticket.value.map((t) => t.reference_id)),
);

const formatDate = (iso) =>
  new Date(iso)
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(",", "");

const handleSelection = (data, market, marketName) => {
  const bet = {
    price_rate: market.Value,
    market_name: marketName,
    price_name: market.FieldName.International,
    price_hcap: 0,
    event_name: `${data.HomeTeamName.International} vs ${data.AwayTeamName.International}`,
    eventId: data.MatchId,
    country: data.CategoryName.International,
    competition: data.TournamentName.International,
    reference_id: market.FieldId,
    status: 0,
    startTime: data.DateOfMatch,
    errors: [],
    amount: 1,
    isLive: false,
    sportId: data.SportId,
    marketId: 23,
    fieldId: market.FieldTypeId,
  };

  manageBets(bet);
};
</script>

<template>
  <div class="bg-[#E6E6E6] p-3 flex gap-2 overflow-x-auto no-scrollbar">
    <LineLoader v-if="data.length === 0" />

    <div
      v-for="topMatch in data"
      @click="$router.push(`/prematch/event/${topMatch.Info.MatchId}`)"
      class="p-2 text-black bg-white w-90 shrink-0 rounded-md text-xs"
    >
      <div class="flex justify-between my-1">
        <div>
          {{ topMatch.Info.CategoryName.International }} -
          {{ topMatch.Info.TournamentName.International }}
        </div>
        <div>{{ formatDate(topMatch.Info.DateOfMatch) }}</div>
      </div>

      <div class="w-[80%] mx-auto flex justify-around items-center gap-4 my-1">
        <div class="flex flex-col items-center justify-center">
          <img
            class="w-11.25"
            :src="`https://adminpro.logiqsport.com/cdn/assets/teams/b/${topMatch.Info.HomeTeamId}.png`"
            alt=""
          />
          <span class="font-semibold">{{
            topMatch.Info.HomeTeamName.International
          }}</span>
        </div>
        <div class="">vs</div>
        <div class="flex flex-col justify-center items-center">
          <img
            class="w-11.25"
            :src="`https://adminpro.logiqsport.com/cdn/assets/teams/b/${topMatch.Info.AwayTeamId}.png`"
            alt=""
          />
          <span class="font-semibold">{{
            topMatch.Info.AwayTeamName.International
          }}</span>
        </div>
      </div>

      <USeparator
        :label="topMatch.Markets[0].MarketName.International"
        class="my-1"
        color="neutral"
      />

      <div class="w-[94%] mx-auto flex gap-2 justify-between items-center my-1">
        <div
          v-for="market in topMatch.Markets[0].MarketFields"
          :market="market.FieldName.International"
          :odd="market.Value"
          @click.stop="
            handleSelection(
              topMatch.Info,
              market,
              topMatch.Markets[0].MarketName.International,
            )
          "
          class="cursor-pointer bg-[#D4D4D4] text-black flex justify-between items-center p-2 rounded-md flex-1"
          :class="[
            ticketSet.has(market.FieldId)
              ? 'bg-animate-select text-white'
              : 'bg-[#D4D4D4]',
          ]"
        >
          <span>{{ market.FieldName.International }}</span>
          <span>{{ market.Value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes selectFlash {
  0% {
    background-color: #fbcc01;
  }
  50% {
    background-color: #fbcc01;
  } /* middle color */
  100% {
    background-color: #5b5b5b;
  }
}

.bg-animate-select {
  animation: selectFlash 200ms ease-in-out forwards;
}
</style>
