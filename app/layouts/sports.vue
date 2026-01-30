<script setup>
const menus = [
  { label: "Sport", to: "/prematch" },
  { label: "Upcoming", to: "/upcoming" },
  { label: "Live", to: "/live" },
  { label: "Jackpot", to: "/jackpot" },
  { label: "Poker", to: "/poker" },
  { label: "JetX", to: "/jetx" },
  { label: "Aviator", to: "/aviator" },
  { label: "Multishot5", to: "/multishot5" },
  { label: "Virtual", to: "/virtual" },
  { label: "Special Games", to: "/special-games" },
  { label: "Race", to: "/race" },
  { label: "Promo", to: "/promo" },
];
</script>

<template>
  <UApp>
    <!-- Header -->
    <Header />

    <!-- Top Menu -->
    <nav
      class="fixed top-10 left-0 right-0 z-50 h-12 flex items-center gap-1 px-1 py-4 bg-[#FBCC01] uppercase font-semibold overflow-x-auto whitespace-nowrap no-scrollbar text-sm text-black border-b border-red-500"
    >
      <NuxtLink
        v-for="menu in menus"
        :key="menu.to"
        :to="menu.to"
        class="px-2 tracking-wide rounded"
        exact-active-class="bg-[#C8102E] text-white"
      >
        {{ menu.label }}
      </NuxtLink>
    </nav>

    <MainMenu class="mt-22" />

    <!-- Main Content -->
    <UMain class="flex-1 py-0">
      <div class="p-0">
        <slot />
      </div>
    </UMain>
  </UApp>
</template>
