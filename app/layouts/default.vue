<script setup>
const route = useRoute();
const router = useRouter();

const { ticket, totalBets, totalOdds, stake, loadFromStorage } = useTicket();
const { setTopLeagues } = useTopLeague();
const { setTopMatches } = useTopMatches();
const { setPopMatches } = usePopMatches();
const { checkSession } = useAuth();
const { topMenu, setPrematchData } = usePrematchData();

loadFromStorage();

const menus = [
  { label: "Sport", to: "/prematch", promo: false },
  { label: "Upcoming", to: "/upcoming", promo: true },
  { label: "Live", to: "/live", promo: false },
  { label: "Jackpot", to: "/jackpot", promo: true },
  { label: "Poker", to: "/poker", promo: true },
  { label: "JetX", to: "/jetx", promo: true },
  { label: "Aviator", to: "/aviator", promo: true },
  { label: "Multishot5", to: "/multishot5", promo: true },
  { label: "Virtual", to: "/virtual", promo: false },
  { label: "Special Games", to: "/special-games", promo: false },
  { label: "Race", to: "/race", promo: false },
  { label: "Promo", to: "/promo", promo: false },
];

const desktopMenu = [
  {
    name: "Sports",
    to: "/prematch",
  },
  {
    name: "Daily Events",
    to: "/prematch/countries?filter=24H",
  },
  {
    name: "All Events",
    to: "/prematch/countries?filter=All",
  },
  {
    name: "Upcoming",
    to: "/upcoming",
  },
];

const showCheckBet = computed(() => route.query.modal === "checkbet");
const showReadyBets = computed(() => route.query.modal === "bets");

function handleOpenBetModal() {
  router.push({
    path: route.path,
    query: {
      modal: "bets",
    },
  });
}

const openLeftNavigation = ref(false);
const openRightNavigation = ref(false);

const loginModal = ref(false);
const registerModal = ref(false);

onMounted(async () => {
  await checkSession();
  await setPrematchData();
  await setTopLeagues();
  await setTopMatches();
  await setPopMatches();
});
</script>

<template>
  <UApp>
    <!-- Header -->
    <Header
      @openLeftNavigation="openLeftNavigation = true"
      @openRightNavigation="openRightNavigation = true"
    />

    <!-- Top Menu -->
    <nav
      class="fixed top-10 left-0 right-0 z-40 h-12 px-3 bg-[#FBCC01] text-black text-sm uppercase font-semibold border-b border-red-500 flex items-center gap-4"
    >
      <!-- Logo (desktop only) -->
      <img
        @click="$router.push('/prematch')"
        class="hidden md:block h-8 cursor-pointer"
        src="https://jambobet.bet/images/logo.png"
        alt="Logo"
      />

      <!-- Menu -->
      <div
        class="flex-1 flex items-center gap-0.5 md:gap-0 md:justify-end overflow-x-auto whitespace-nowrap no-scrollbar md:w-[60%]"
      >
        <NuxtLink
          v-for="menu in menus"
          :key="menu.to"
          :to="menu.to"
          class="px-3 py-1 rounded transition relative"
          exact-active-class="bg-[#C8102E] text-white "
        >
          {{ menu.label }}
          <span
            v-if="menu.promo"
            class="animate-pulse absolute -top-1 right-0 z-50 text-black text-xs"
            >NEW</span
          >
        </NuxtLink>
      </div>
    </nav>

    <div
      class="hidden fixed top-22 left-0 right-0 z-50 h-7 bg-[#e6e6e6] md:flex justify-start items-center border-b border-gray-400"
    >
      <NuxtLink
        class="text-xs font-semibold px-3 cursor-pointer"
        v-for="menu in desktopMenu"
        :to="menu.to"
      >
        {{ menu.name }}
      </NuxtLink>
    </div>

    <TotalOddFloating
      v-if="totalBets > 0"
      @click="handleOpenBetModal"
      :bets="totalBets"
      :totalOdds="totalOdds"
    />

    <!-- Main Content -->
    <UMain class="mt-22 md:mt-29 flex-1 py-0 h-[calc(100dvh-88px)]">
      <div
        class="hidden md:grid fixed top-29 left-0 w-full h-screen grid-cols-[22%_1fr_22%] overflow-hidden bg-white"
      >
        <aside
          class="h-full overflow-y-auto overscroll-contain border-r border-gray-200"
        >
          <LeftMenu />
        </aside>

        <main
          class="h-full overflow-y-auto overscroll-contain border-r-6 border-l-6 border-gray-100"
        >
          <slot />
        </main>

        <aside
          class="h-full overflow-y-auto overscroll-contain border-l border-gray-200"
        >
          <Betslip />
        </aside>
      </div>

      <div class="hidden md:block h-screen"></div>

      <!-- Mobile fallback -->
      <div class="md:hidden">
        <slot />
      </div>
    </UMain>

    <CheckBetModal :open="showCheckBet" />
    <BetModal :open="showReadyBets" />
    <LeftNavigation
      :open="openLeftNavigation"
      :menus="menus"
      @close="openLeftNavigation = false"
    />
    <RightNavigation
      :open="openRightNavigation"
      @close="openRightNavigation = false"
      @openLoginModal="loginModal = true"
      @openRegisterModal="registerModal = true"
    />

    <LoginModal :open="loginModal" @close="loginModal = false" />
    <RegisterModal :open="registerModal" @close="registerModal = false" />
    <ShareTicket />
  </UApp>
</template>
