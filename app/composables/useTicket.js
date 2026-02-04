import { ref } from "vue";
import axios from "axios";

const { currentBonus } = useBonus();
const { MAX_WIN, TAX } = useConfig();

const ticket = ref([]);
const totalBets = computed(() => ticket.value.length);
const totalOdds = computed(() =>
  ticket.value.length
    ? ticket.value.reduce((acc, item) => acc * Number(item.price_rate), 1)
    : 1,
);
const stake = ref("20");
const win = computed(() => {
  const w = totalOdds.value * Number(stake.value);
  return w;
});

const bonus = computed(() => {
  const b = currentBonus(totalBets.value);
  return Math.min(win.value * b, 100000);
});

const possibleWin = computed(() => {
  const w = win.value + bonus.value;
  return Math.min(w, MAX_WIN);
});

const tax = computed(() => {
  if (possibleWin.value < 1000) return 0;
  return possibleWin.value * TAX;
});

const actualWinning = computed(() => possibleWin.value - tax.value);
const bonusPercent = computed(() => {
  const b = currentBonus(totalBets.value) * 100;
  return b;
});

const shareTicketId = ref(null);
const bookedTicketLoadError = ref(null);

const placingBet = ref(false);
const placingBetError = ref(null);
const placingBetSuccess = ref(null);

const placedBetId = ref(null);
const ticketDisplay = ref("");

let placingBetTimer = null;

export function useTicket() {
  const manageBets = (bet) => {
    const normalizedBet = { ...bet };

    if (normalizedBet.sportId !== 1) return;

    const referenceId = normalizedBet.reference_id;

    // Remove exact same bet
    const exactIndex = ticket.value.findIndex(
      (b) => b.reference_id === referenceId,
    );

    if (exactIndex !== -1) {
      ticket.value.splice(exactIndex, 1);
      saveToStorage(ticket.value);
      return;
    }

    // Replace bet from same event
    const eventIndex = ticket.value.findIndex(
      (b) => b.eventId === normalizedBet.eventId,
    );

    if (eventIndex !== -1) {
      ticket.value[eventIndex] = normalizedBet;
    } else {
      ticket.value.push(normalizedBet);
    }
    saveToStorage(ticket.value);
  };

  const removeBet = (index) => {
    ticket.value.splice(index, 1);
    saveToStorage(ticket.value);
  };

  const clearBets = () => {
    ticket.value = [];
    saveToStorage(ticket.value);
  };

  const decrementStake = () => {
    if (Number(stake.value <= 10)) return;
    stake.value = Number(stake.value) - 1;
  };

  const incrementStake = () => {
    stake.value = Number(stake.value) + 1;
  };

  const setStake = (key) => {
    const str = stake.value;

    if (key === "back") {
      stake.value = str.slice(0, -1);
      if (stake.value.length === 0) {
        stake.value = "0";
      }
      return;
    }

    if (key === ".") {
      if (str.includes(".")) return;
      stake.value += str === "" ? "0." : ".";
      return;
    }

    if (str == 0) {
      stake.value = String(key);
      return;
    }

    // append key as string
    stake.value += String(key);
  };

  const clearStake = () => {
    stake.value = "0";
  };

  const fixStake = (s) => {
    stake.value = String(s);
  };

  const saveToStorage = (t) => {
    if (process.client) {
      localStorage.setItem("ticket", JSON.stringify(t));
    }
  };

  const loadFromStorage = () => {
    if (process.client) {
      const saved = localStorage.getItem("ticket");
      if (saved) {
        ticket.value = JSON.parse(saved);
      }
    }
  };

  const shareTicket = async () => {
    const { url } = useUrl();
    const { toggleModal } = useModal();

    const res = await axios.post(`${url}/api/placeFastBet`, {
      tickets: ticket.value,
      stake: Number(stake.value),
    });

    if (!res.data.error) {
      shareTicketId.value = res.data.fastBetId;
      console.log(shareTicketId.value);
      toggleModal("share");
    }
  };

  const loadBookedTicket = async (id) => {
    const { url } = useUrl();

    const res = await axios.get(`${url}/api/getFastTickets?ticketId=${id}`);

    if (res.data.error) {
      bookedTicketLoadError.value = res.data?.message;

      setTimeout(() => {
        bookedTicketLoadError.value = null;
      }, 2000);
      return;
    }

    ticket.value = res.data.ticket;
    stake.value = res.data.stake;
  };

  const placeBets = async () => {
    const { url } = useUrl();

    const { loggedIn, toggleModal, checkSession } = useAuth();

    if (!loggedIn.value) {
      toggleModal("login");
      return;
    }

    placingBet.value = true;
    placingBetError.value = null;
    placingBetSuccess.value = null;

    const res = await axios.post(
      `${url}/api/placeBets`,
      {
        tickets: ticket.value,
        stake: Number(stake.value),
        withPoints: false,
      },
      {
        withCredentials: true,
      },
    );

    placingBet.value = false;
    if (res.data.error) {
      if (res.data.message === "One or more expired bets.") {
        const errorBets =
          Array.isArray(res.data?.data) && res.data.data.length > 0
            ? res.data.data || []
            : [];
        errorBets.forEach((s) => {
          const t = ticket.value.find((x) => x.reference_id === s.reference_id);
          if (t) t.errors = s.errors;
          saveToStorage();
        });
      } else {
        placingBetError.value = res.data.message;
        placingBetTimer = setTimeout(() => {
          placingBetError.value = null;
          clearBets();
        }, 10000);
      }
      return;
    }

    placingBetSuccess.value = "Bet placed successfully.";
    placedBetId.value = res.data?.ticketId;

    placingBetTimer = setTimeout(() => {
      placingBetSuccess.value = null;
      clearBets();
    }, 10000);

    checkSession();
  };

  const repeatBet = () => {
    placingBetError.value = null;
    placingBetSuccess.value = null;
    clearInterval(placingBetTimer);
  };

  const continueBet = () => {
    placingBetError.value = null;
    placingBetSuccess.value = null;
    clearBets();
    clearInterval(placingBetTimer);
  };

  const getPrintTicket = async (id) => {
    const { printModal, toggleModal } = useModal();
    const { url } = useUrl();

    toggleModal("print");

    // Fix: Use triple equals for comparison
    if (printModal.value === true) {
      const response = await axios.get(`${url}/getPrintTicket?id=${id}`);

      if (response?.data?.error) return;
      ticketDisplay.value = response.data;

      // Create the window
      const printWindow = window.open("", "_blank", "width=800,height=600");
      printWindow.document.open();
      printWindow.document.write(response.data);
      printWindow.document.close();

      // SOLUTION: Wait for all assets (images/styles) to load
      printWindow.onload = () => {
        // Small timeout to ensure the browser has rendered the layout
        setTimeout(() => {
          printWindow.focus();
          printWindow.print();
          printWindow.close();
          toggleModal("print");
        }, 500);
      };
    }
  };

  return {
    manageBets,
    removeBet,
    incrementStake,
    decrementStake,
    setStake,
    clearStake,
    fixStake,
    loadFromStorage,
    clearBets,
    shareTicket,
    loadBookedTicket,
    placeBets,
    repeatBet,
    continueBet,
    getPrintTicket,
    ticket,
    totalBets,
    totalOdds,
    stake,
    win,
    tax,
    bonus,
    actualWinning,
    possibleWin,
    bonusPercent,
    shareTicketId,
    bookedTicketLoadError,
    placingBetError,
    placingBet,
    placingBetSuccess,
    ticketDisplay,
    placedBetId,
  };
}
