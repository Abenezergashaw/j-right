<script setup>
defineProps({
  eventInfo: Object,
});

const router = useRouter();
</script>

<template>
  <div
    class="h-10 md:h-8 flex gap-3 items-center px-2 text-xs border-r border-b border-l border-gray-300"
  >
    <UIcon
      @click="router.back()"
      name="bxs:chevron-left"
      class="w-6 h-6 bg-[#49215D]"
    />

    <div class="border-r h-10 border-r-gray-300"></div>

    <ThreeDotsBlack class="text-black" />
    <div class="font-semibold">{{ eventInfo?.SportName.International }}</div>
    <div class="font-semibold text-[#49215D]">
      <span
        >{{ eventInfo?.CategoryName.International }} -
        {{ eventInfo?.TournamentName.International }}
      </span>
      <span class="text-black hidden md:inline"> / </span>
      <span class="text-black hidden md:inline-block">
        {{ eventInfo?.HomeTeamName.International }} vs
        {{ eventInfo?.AwayTeamName.International }}</span
      >
    </div>
  </div>
</template>
