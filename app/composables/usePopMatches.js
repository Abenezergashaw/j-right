import { ref } from "vue";

const popularMatches = ref([]);
export function usePopMatches() {
  const setPopMatches = async () => {
    const { getPopMatches } = useData();

    if (popularMatches.value.length === 0) {
      popularMatches.value = await getPopMatches();
    }
  };

  return { popularMatches, setPopMatches };
}
