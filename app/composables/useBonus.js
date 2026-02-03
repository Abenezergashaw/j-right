import { ref } from "vue";

export function useBonus() {
  const currentBonus = (ticket) => {
    const tickets = ticket;
    if (tickets === 3) return 5 / 100;
    if (tickets === 4) return 8 / 100;
    if (tickets === 5) return 9 / 100;
    if (tickets === 6) return 10 / 100;
    if (tickets === 7) return 15 / 100;
    if (tickets === 8) return 20 / 100;
    if (tickets === 9) return 35 / 100;
    if (tickets === 10) return 30 / 100;
    if (tickets === 11) return 35 / 100;
    if (tickets === 12) return 40 / 100;
    if (tickets === 13) return 45 / 100;
    if (tickets === 14) return 50 / 100;
    if (tickets === 15) return 55 / 100;
    if (tickets === 16) return 60 / 100;
    if (tickets === 17) return 65 / 100;
    if (tickets === 18) return 70 / 100;
    if (tickets === 19) return 75 / 100;
    if (tickets === 20) return 80 / 100;
    if (tickets === 21) return 85 / 100;
    if (tickets === 22) return 90 / 100;
    if (tickets >= 23) return 100 / 100;
    return 0;
  };

  return { currentBonus };
}
