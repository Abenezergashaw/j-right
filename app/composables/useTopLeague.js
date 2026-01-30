import { ref } from "vue";

const topLeaguesData = ref([]);
const activeSport = ref(1);
const activeLeague = ref("1,236,1116");
const topSports = computed(() =>
  (topLeaguesData.value || [])
    .filter((l) => l?.SubCateg)
    .map((l) => ({
      Id: l.SubCateg.Id,
      name: l.SubCateg.Name,
    })),
);
const topLeaguesName = computed(() =>
  topLeaguesData.value.filter((l) => l?.SubCateg?.Id === activeSport.value),
);

export function useTopLeague() {
  const { getTopLeagues } = useData();

  const setTopLeagues = async () => {
    if (topLeaguesData.value.length === 0) {
      topLeaguesData.value = await getTopLeagues();
    }
  };

  return {
    topLeaguesData,
    topSports,
    topLeaguesName,
    activeSport,
    activeLeague,
    setTopLeagues,
  };
}
