import { ref } from "vue";

const rightNavigation = ref(false);
const leftNavigation = ref(false);
const registerModal = ref(false);
const loginModal = ref(false);
const showShareTicketModal = ref(false);
const printModal = ref(false);

export function useModal() {
  const { loginError, registerError } = useAuth();

  const toggleModal = (modal) => {
    if (modal === "right") {
      rightNavigation.value = !rightNavigation.value;
    }
    if (modal === "left") {
      leftNavigation.value = !leftNavigation.value;
    }
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
    if (modal === "print") {
      printModal.value = !printModal.value;
    }
  };

  return {
    rightNavigation,
    loginModal,
    registerModal,
    showShareTicketModal,
    leftNavigation,
    printModal,
    toggleModal,
  };
}
