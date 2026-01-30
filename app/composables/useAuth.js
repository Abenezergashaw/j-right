import { ref } from "vue";
import axios from "axios";

const STORAGE_KEY = "isLoggedIn";

const loggedIn = ref(false);
const user = ref(null);
const rBalance = ref(0);
const bBalance = ref(0);
let saved = null;
if (process.client) {
  saved = localStorage.getItem(STORAGE_KEY);
}
if (saved !== null) {
  loggedIn.value = saved === "true";
}

const registerModal = ref(false);
const loginModal = ref(false);
const showShareTicketModal = ref(false);

const loginError = ref(null);
const registerError = ref(null);

export function useAuth() {
  watch(
    loggedIn,
    (val) => {
      if (process.client) {
        localStorage.setItem(STORAGE_KEY, String(val));
      }
    },
    { immediate: true },
  );

  const register = async (form) => {
    const { url } = useUrl();

    registerError.value = null;

    const response = await axios.post(
      `${url}/api/register`,
      {
        phone: form.phone,
        password: form.password,
        confirmPassword: form.confirmPassword,
      },
      { withCredentials: true },
    );

    if (!response.data.success) {
      registerError.value = response.data.message;
      return;
    }

    const ok = checkSession();
    if (ok) {
      registerModal.value = false;
    }
  };

  const login = async (form) => {
    const { url } = useUrl();

    loginError.value = null;

    const response = await axios.post(
      `${url}/api/login`,
      {
        phone: form.phone,
        password: form.password,
      },
      { withCredentials: true },
    );

    if (!response.data.success) {
      loginError.value = response.data.message;
      return;
    }

    const ok = checkSession();
    if (ok) {
      loginModal.value = false;
    }
  };

  const checkSession = async () => {
    const { url } = useUrl();

    try {
      const res = await axios.get(`${url}/api/check-session`, {
        withCredentials: true,
      });

      if (res.data.loggedIn) {
        user.value = res.data.user;
        loggedIn.value = true;
        bBalance.value = user.bBalance;
        rBalance.value = user.rBalance;
        return true;
      }

      user.value = null;
      loggedIn.value = false;
      return false;
    } catch {
      user.value = null;
      loggedIn.value = false;
      return false;
    }
  };

  const logout = async () => {
    const { url } = useUrl();
    await axios.get(`${url}/api/logout`, { withCredentials: true });
    user.value = null;
    loggedIn.value = false;
  };

  const toggleModal = (modal) => {
    if (modal === "login") {
      loginError.value = null;
      loginModal.value = !loginModal.value;
    }
    if (modal === "register") {
      registerError.value = null;
      registerModal.value = !registerModal.value;
    }
    if (modal === "share") {
      showShareTicketModal.value = !showShareTicketModal.value;
    }
  };

  return {
    user,
    loggedIn,
    rBalance,
    bBalance,
    loginModal,
    registerModal,
    showShareTicketModal,
    loginError,
    registerError,
    register,
    login,
    checkSession,
    logout,
    toggleModal,
  };
}
