import { ref } from "vue";

const topMatches = ref([]);
export function useTopMatches() {
  const setTopMatches = async () => {
    const { getTopMatch } = useData();

    if (topMatches.value.length === 0) {
      topMatches.value = await getTopMatch();
    }
  };

  return { topMatches, setTopMatches };
}
