import { ref } from "vue";
import { useData } from "@/composables/useData";

const prematchData = ref(null);
const sports = ref([]);
const activeSport = ref(null);

const BASE_MENU = [
  {
    name: "Check Bet",
    icon: "si:ticket-line",
    to: "/prematch?modal=checkbet",
  },
  {
    name: "Search Event",
    icon: "mingcute:search-line",
  },
  {
    name: "IN-PLAY",
    icon: "ic:outline-timer",
  },
];

const topMenu = ref([...BASE_MENU]);

export function usePrematchData() {
  const { getPregameData } = useData(); // ✅ inside composable

  const setPrematchData = async (activeSportId = 1) => {
    // ✅ fetch only once
    if (!prematchData.value) {
      prematchData.value = await getPregameData();
    }

    const apiSports = prematchData.value?.Sports ?? [];
    sports.value = apiSports;

    activeSport.value =
      apiSports.find((s) => s.Id === Number(activeSportId)) ?? null;

    // ✅ rebuild menu (no duplicates)
    topMenu.value = [
      ...BASE_MENU,
      ...apiSports.map((s) => ({
        name: s.Name?.International,
        icon: `ri:${s.Name?.International?.toLowerCase()}-line`,
        to: `/prematch/countries?id=${s.Id}`,
        All: s.Count,
        id: s.Id,
        "3H": s.Counters?.["3H"],
        "6H": s.Counters?.["6H"],
        "9H": s.Counters?.["9H"],
        "12H": s.Counters?.["12H"],
        "24H": s.Counters?.["24H"],
      })),
    ];
  };

  return {
    prematchData,
    sports,
    activeSport,
    topMenu,
    setPrematchData,
  };
}
