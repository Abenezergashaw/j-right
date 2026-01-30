import axios from "axios";
import { ref } from "vue";

export function useBets() {
  const bets = ref([]);

  const getBets = async () => {
    const { url } = useUrl();

    const response = await axios.get(`${url}/api/betHistory`, {
      withCredentials: true,
    });

    return response.data.data;
  };

  return { bets, getBets };
}
