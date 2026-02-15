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
      class="fixed top-10 left-0 right-0 z-30 h-12 px-3 bg-[#49215D] text-white text-sm uppercase font-semibold border-b border-orange-500 flex items-center gap-4"
    >
      <!-- Logo (desktop only) -->
      <img
        @click="$router.push('/prematch')"
        class="hidden md:block cursor-pointer h-20"
        src="/images/logo.png"
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
          exact-active-class="bg-white text-black "
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

    <!-- Main Content -->
    <UMain class="mt-22 md:mt-22 flex-1 py-0 h-[calc(100dvh-88px)]">
      <!-- Mobile fallback -->
      <div class="w-full md:w-[100%] mx-auto">
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

    <PrintedTicket />
  </UApp>
</template>
