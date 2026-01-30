import axios from "axios";

export function useData() {
  // const url = "http://localhost:3030";
  const { url } = useUrl();

  // 🧠 function to get flag by name
  const getTopMatch = async () => {
    const { data } = await axios.get(`${url}/getTopMatches`);
    return data.Contents;
  };

  const getTopLeagues = async () => {
    const { data } = await axios.get(`${url}/getTopLeagues`);
    return data.SubCategs;
  };

  const getEventsPerLeague = async (value) => {
    const { data } = await axios.get(`${url}/eventsPerLeague?value=${value}`);
    return data.Contents;
  };

  const getPopMatches = async () => {
    const { data } = await axios.get(`${url}/getPopMatches`);
    return data.Contents;
  };

  const getUpcomingMatches = async (start, end) => {
    const { data } = await axios.get(
      `${url}/upcomingGames?start=${start}&end=${end}`,
    );
    return data.Contents;
  };

  const getPregameData = async () => {
    const { data } = await axios.get(`${url}/getPregameData`);
    return data;
  };

  const getTournamentMatches = async (id, filter) => {
    const { data } = await axios.get(
      `${url}/tournamentGames?tournament=${id}&filter=${filter}`,
    );
    return data.Contents.Events;
  };

  const getMarketStructure = async () => {
    const { data } = await axios.get(`${url}/marketStructure`);
    return data;
  };

  const getEvent = async (id) => {
    const { data } = await axios.get(`${url}/getEvent?matchId=${id}`);
    return data;
  };

  return {
    getTopMatch,
    getTopLeagues,
    getEventsPerLeague,
    getPopMatches,
    getUpcomingMatches,
    getPregameData,
    getTournamentMatches,
    getMarketStructure,
    getEvent,
  };
}
