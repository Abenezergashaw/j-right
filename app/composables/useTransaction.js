import { ref } from "vue";
import axios from "axios";

export function useTransaction() {
  const onDeposit = ref(false);
  const onWithdraw = ref(false);
  const depositError = ref(null);
  const depositSuccess = ref(null);
  const withdrawError = ref(null);
  const withdrawSuccess = ref(null);
  const withdraws = ref(null);

  const proceedToDepositView = () => {
    onDeposit.value = !onDeposit.value;
  };

  const proceedToWithdrawView = () => {
    onWithdraw.value = !onWithdraw.value;
  };

  const deposit = async (id) => {
    const { url } = useUrl();
    const { user, checkSession } = useAuth();

    depositError.value = null;
    depositSuccess.value = null;

    if (id === null)
      return (depositError.value = "Invalid Transaction Number.");

    if (user.value === null)
      return (depositError.value = "Please login to deposit.");

    const response = await axios.post(
      `${url}/api/manualDeposit`,
      {
        reference: id,
        phone: user.value?.phone || "",
      },
      { withCredentials: true },
    );

    if (response.data.error) {
      depositError.value = response.data.message;
      setTimeout(() => {
        depositError.value = null;
      }, 5000);
      return;
    }

    depositSuccess.value = response.data.message;

    setTimeout(() => {
      checkSession;
      depositSuccess.value = null;
    }, 2000);
  };

  const withdraw = async (amount) => {
    const { url } = useUrl();
    const { user, checkSession } = useAuth();

    withdrawError.value = null;
    withdrawSuccess.value = null;

    if (amount === null)
      return (withdrawError.value = "Invalid Transaction Number.");

    if (user.value === null)
      return (withdrawError.value = "Please login to withdraw.");

    const response = await axios.post(
      `${url}/api/withdraw`,
      {
        amount,
        method: 1,
      },
      { withCredentials: true },
    );

    if (response.data.error) {
      withdrawError.value = response.data.message;
      setTimeout(() => {
        withdrawError.value = null;
      }, 5000);
      return;
    }

    withdrawSuccess.value = response.data.message;

    checkSession();
    setTimeout(() => {
      withdrawSuccess.value = null;
    }, 5000);
  };

  const getWithdrawRequests = async () => {
    const { url } = useUrl();

    const response = await axios.get(`${url}/api/withdraw-request`, {
      withCredentials: true,
    });

    return response.data;
  };

  return {
    onDeposit,
    onWithdraw,
    depositError,
    depositSuccess,
    withdrawError,
    withdrawSuccess,
    proceedToDepositView,
    proceedToWithdrawView,
    deposit,
    withdraw,
    getWithdrawRequests,
  };
}
