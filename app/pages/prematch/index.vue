<script setup>
const { getEventsPerLeague, getUpcomingMatches } = useData();

const { topLeaguesData, activeSport, topSports, topLeaguesName, activeLeague } =
  useTopLeague();

const { topMenu, setPrematchData } = usePrematchData();

const { topMatches } = useTopMatches();
const { popularMatches } = usePopMatches();

const activeLeagueData = ref([]);
const lastMinute = ref([]);

const sportPromo = [
  {
    title: null,
    subtitle: null,
    image_url:
      "https:\/\/assets.plqcdn.com\/storage\/slider\/17613180572446.jpg",
    mobile_image_url:
      "https:\/\/assets.plqcdn.com\/storage\/slider\/17613180644926.jpg",
    btn_text: "PLAY NOW",
    btn_url: "https:\/\/jambobet.bet\/jackpot\/active\/jackpot-1181",
    btn_bg_color: "rgb(12, 12, 11)",
    btn_text_color: "rgb(234, 223, 6)",
    btn_target: "_self",
    order: 1,
    type: "center",
    active: "yes",
    from: null,
    to: null,
    css_background_color: "#ffffff",
    banners: [],
    overline: null,
    overline_color: null,
    title_color: null,
    subtitle_color: null,
    autoscroll: 3000,
  },
  {
    title: null,
    subtitle: null,
    image_url:
      "https:\/\/assets.plqcdn.com\/storage\/slider\/17593217063370.jpg",
    mobile_image_url:
      "https:\/\/assets.plqcdn.com\/storage\/slider\/17593217115665.jpg",
    btn_text: "PLAY NOW",
    btn_url: "https:\/\/jambobet.bet\/jackpot\/active\/jackpot-1156",
    btn_bg_color: "#FFFFFF",
    btn_text_color: "rgb(229, 209, 14)",
    btn_target: "_self",
    order: 2,
    type: "center",
    active: "no",
    from: null,
    to: null,
    css_background_color: "#FFFFFF",
    banners: [],
    overline: null,
    overline_color: "#000000",
    title_color: "#000000",
    subtitle_color: "#000000",
    autoscroll: 3000,
  },
  {
    title: null,
    subtitle: null,
    image_url:
      "https:\/\/assets.plqcdn.com\/storage\/slider\/17543067283932.jpg",
    mobile_image_url:
      "https:\/\/assets.plqcdn.com\/storage\/slider\/17543067533556.jpg",
    btn_text: null,
    btn_url: null,
    btn_bg_color: "#FFFFFF",
    btn_text_color: "#000000",
    btn_target: "_self",
    order: 3,
    type: "center",
    active: "no",
    from: null,
    to: null,
    css_background_color: "#FFFFFF",
    banners: [],
    overline: null,
    overline_color: "#000000",
    title_color: "#000000",
    subtitle_color: "#000000",
    autoscroll: 3000,
  },
  {
    title: null,
    subtitle: null,
    image_url:
      "https:\/\/assets.plqcdn.com\/storage\/slider\/17496661657215.jpg",
    mobile_image_url:
      "https:\/\/assets.plqcdn.com\/storage\/slider\/17496661717156.jpg",
    btn_text: "PLAY NOW",
    btn_url: "https:\/\/jambobet.bet\/jackpot\/active\/jackpot-949",
    btn_bg_color: "rgb(255, 199, 24)",
    btn_text_color: "rgb(0, 0, 0)",
    btn_target: "_self",
    order: 4,
    type: "center",
    active: "no",
    from: null,
    to: null,
    css_background_color: "#FFFFFF",
    banners: [],
    overline: null,
    overline_color: "#000000",
    title_color: "#000000",
    subtitle_color: "#000000",
    autoscroll: 3000,
  },
  {
    title: null,
    subtitle: null,
    image_url:
      "https:\/\/assets.plqcdn.com\/storage\/slider\/17496659603067.jpg",
    mobile_image_url:
      "https:\/\/assets.plqcdn.com\/storage\/slider\/17496659687017.jpg",
    btn_text: "PLAY NOW",
    btn_url: "https:\/\/melabets.com\/jackpot\/active\/jackpot-941",
    btn_bg_color: "rgb(255, 255, 255)",
    btn_text_color: "rgb(65, 150, 14)",
    btn_target: "_self",
    order: 7,
    type: "center",
    active: "no",
    from: null,
    to: null,
    css_background_color: "#ffffff",
    banners: [],
    overline: null,
    overline_color: null,
    title_color: null,
    subtitle_color: null,
    autoscroll: 3000,
  },
  {
    title: null,
    subtitle: null,
    image_url:
      "https:\/\/assets.plqcdn.com\/storage\/slider\/17376525815644.jpg",
    mobile_image_url:
      "https:\/\/assets.plqcdn.com\/storage\/slider\/17376548782225.jpg",
    btn_text: "PLAY NOW",
    btn_url: "https:\/\/melabets.com\/jackpot\/active\/jackpot-839",
    btn_bg_color: "#9acd32",
    btn_text_color: "#000000",
    btn_target: "_self",
    order: 11,
    type: "center",
    active: "no",
    from: null,
    to: null,
    css_background_color: "#FFFFFF",
    banners: [],
    overline: null,
    overline_color: null,
    title_color: null,
    subtitle_color: null,
    autoscroll: 3000,
  },
  {
    title: null,
    subtitle: null,
    image_url:
      "https:\/\/assets.plqcdn.com\/storage\/slider\/17519598574925.jpg",
    mobile_image_url:
      "https:\/\/assets.plqcdn.com\/storage\/slider\/17519598708999.jpg",
    btn_text: null,
    btn_url: null,
    btn_bg_color: "#FFFFFF",
    btn_text_color: "#000000",
    btn_target: "_self",
    order: 12,
    type: "center",
    active: "no",
    from: null,
    to: null,
    css_background_color: "#FFFFFF",
    banners: [],
    overline: null,
    overline_color: "#000000",
    title_color: "#000000",
    subtitle_color: "#000000",
    autoscroll: 3000,
  },
  {
    title: null,
    subtitle: null,
    image_url:
      "https:\/\/assets.plqcdn.com\/storage\/slider\/17522226014222.jpg",
    mobile_image_url:
      "https:\/\/assets.plqcdn.com\/storage\/slider\/17522361368813.jpg",
    btn_text: null,
    btn_url: null,
    btn_bg_color: "#FFFFFF",
    btn_text_color: "#000000",
    btn_target: "_self",
    order: 13,
    type: "center",
    active: "yes",
    from: null,
    to: null,
    css_background_color: "#FFFFFF",
    banners: [],
    overline: null,
    overline_color: "#000000",
    title_color: "#000000",
    subtitle_color: "#000000",
    autoscroll: 3000,
  },
  {
    title: null,
    subtitle: null,
    image_url:
      "https:\/\/assets.plqcdn.com\/storage\/slider\/17526555778437.jpg",
    mobile_image_url:
      "https:\/\/assets.plqcdn.com\/storage\/slider\/17525980119718.jpg",
    btn_text: "PLAY NOW",
    btn_url: "https:\/\/jambobet.bet\/virtual-casino\/smartfot-prize-drop",
    btn_bg_color: "rgb(255, 199, 24)",
    btn_text_color: "#000000",
    btn_target: "_self",
    order: 14,
    type: "center",
    active: "no",
    from: null,
    to: null,
    css_background_color: "#FFFFFF",
    banners: [],
    overline: null,
    overline_color: "#000000",
    title_color: "#000000",
    subtitle_color: "#000000",
    autoscroll: 3000,
  },
  {
    title: null,
    subtitle: null,
    image_url:
      "https:\/\/assets.plqcdn.com\/storage\/slider\/17368479974443.png",
    mobile_image_url:
      "https:\/\/assets.plqcdn.com\/storage\/slider\/17422815913128.png",
    btn_text: null,
    btn_url: null,
    btn_bg_color: "#FFFFFF",
    btn_text_color: "#000000",
    btn_target: "_self",
    order: 15,
    type: "center",
    active: "no",
    from: null,
    to: null,
    css_background_color: "#FFFFFF",
    banners: [],
    overline: null,
    overline_color: "#000000",
    title_color: "#000000",
    subtitle_color: "#000000",
    autoscroll: 3000,
  },
];

async function handleChangeSport(id) {
  activeSport.value = id;
  activeLeague.value = topLeaguesName.value[0].Items[0].Value;
  activeLeagueData.value = await getEventsPerLeague(activeLeague.value);
}

async function handleChangeActiveLeague(value) {
  activeLeague.value = value;
  activeLeagueData.value = await getEventsPerLeague(activeLeague.value);
}

onMounted(async () => {
  activeLeagueData.value = await getEventsPerLeague(activeLeague.value);
  lastMinute.value = await getUpcomingMatches(0, 50);
});
</script>

<template>
  <MainMenu :topMenu="topMenu" filter="All" />

  <PromoSlider v-if="true" :promos="sportPromo" />

  <TitleBar />

  <TopMatchCard :data="topMatches" />

  <TitleBar
    class="md:hidden"
    title="Top Leagues"
    :data="topSports"
    :activeSport="activeSport"
    @changeSport="handleChangeSport"
  />

  <TopLeagues
    class="md:hidden"
    :topLeaguesName="topLeaguesName"
    :activeLeague="activeLeague"
    @changeActiveLeague="handleChangeActiveLeague"
  />

  <SportOdds class="md:hidden" :showMore="1" :data="activeLeagueData" />

  <TitleBar title="Popular Matches" />

  <SportOdds :showMore="1" :data="popularMatches" />

  <TitleBar title="Last minute" :data="topSports" />

  <SportOdds :showMore="1" :data="lastMinute" />

  <TitleBar
    title="Live Events"
    :data="[
      'Football',
      'Basketball',
      'Tennis',
      'Ice Hockey',
      'American Football',
    ]"
  />

  <LiveSportOdd v-if="false" />
</template>
