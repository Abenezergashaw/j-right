<script setup>
import { watch, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
});

const { loggedIn, user, logout, registerModal } = useAuth();

const { rightNavigation, toggleModal } = useModal();

const emit = defineEmits(["close"]);

const socialMedia = ref([
  {
    name: "Instagram",
    to: "https://rightbet.org",
    icon: "mdi:instagram",
  },
  {
    name: "Tawk",
    to: "https://rightbet.org",
    icon: "tdesign:play-circle-filled",
  },
  {
    name: "Facebook",
    to: "https://rightbet.org",
    icon: "ic:baseline-facebook",
  },
  {
    name: "Tiktok",
    to: "ic:baseline-tiktok",
    icon: "mdi:instagram",
  },
  {
    name: "Telegram",
    to: "https://rightbet.org",
    icon: "fa6-brands:telegram",
  },
]);

const accountSettings = ref([
  {
    name: "Deposit",
    icon: "fluent-mdl2:money",
    to: "/payment/deposit",
  },
  {
    name: "Account History",
    icon: "foundation:clipboard-notes",
    to: "/payment/deposit",
  },
  {
    name: "Profile",
    icon: "octicon:person-fill-24",
    to: "/payment/deposit",
  },
  {
    name: "Bet History",
    icon: "foundation:clipboard-notes",
    to: "/bethistory",
  },
  {
    name: "Messages",
    icon: "wpf:message",
    to: "/payment/deposit",
  },
  {
    name: "Bonus",
    icon: "ion:gift",
    to: "/payment/deposit",
  },
]);

// Close on ESC
const onKeydown = (e) => {
  if (e.key === "Escape") emit("close");
};

watch(
  () => rightNavigation,
  (v) => {
    if (v) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  },
);

onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <transition name="fade">
      <div v-if="rightNavigation" class="fixed inset-0 z-40 bg-black/40">
        <button
          class="absolute left-3 top-1 text-2xl text-white font-bold"
          @click="toggleModal('right')"
        >
          ✕
        </button>
      </div>
    </transition>

    <!-- Panel -->
    <transition name="slide">
      <aside
        v-if="rightNavigation"
        class="fixed inset-y-0 right-0 z-40 w-[90%] max-w-sm bg-[#e6e6e6] shadow-xl flex flex-col"
      >
        <div
          v-if="!loggedIn"
          class="flex flex-col justify-center items-center px-2 gap-3 pt-4"
        >
          <div>Account already existing?</div>
          <div
            @click="toggleModal('login')"
            class="h-10 w-full px-6 flex justify-center items-center mx-1 cursor-pointer uppercase bg-[#49215D] text-white"
          >
            Login
          </div>

          <div>New user?</div>
          <div
            @click="toggleModal('register')"
            class="h-10 w-full px-6 flex justify-center items-center mx-1 cursor-pointer uppercase bg-[#49215D] text-white"
          >
            Register
          </div>
        </div>

        <div v-else class="text-sm">
          <div
            class="h-10 border-b border-gray-400 px-2 flex justify-start gap-2 items-center"
          >
            <UIcon name="octicon:person-fill-24" class="h-5 w-5" />
            {{ user?.phone }}
          </div>

          <div
            @click="
              $router.push('/admin');
              toggleModal('right');
            "
            class="h-10 border-b border-gray-400 px-2 flex justify-start gap-2 items-center text-red-900"
          >
            <UIcon name="ri:admin-fill" class="h-5 w-5" />
            Admin
          </div>

          <div
            class="py-2 border-b border-gray-400 px-2 flex justify-between gap-2 items-center"
          >
            <div class="flex flex-col justify-start">
              <span class="font-semibold">Real Balance</span>
              <span>{{ user?.rBalance }} ETB</span>
            </div>
            <div class="flex justify-between gap-2">
              <div
                @click="
                  $router.push('/payment/deposit');
                  toggleModal('right');
                "
                class="px-3 py-1 uppercase bg-[#49215D] text-white font-semibold"
              >
                Deposit
              </div>
              <div
                @click="
                  $router.push('/payment/withdraw');
                  toggleModal('right');
                "
                class="px-3 py-1 uppercase bg-[#49215D] text-white font-semibold"
              >
                Withdraw
              </div>
            </div>
          </div>

          <div
            class="flex flex-col justify-start px-2 py-2 border-b border-gray-400"
          >
            <span class="font-semibold">Bonus Balance</span>
            <span>{{ user?.bBalance.toFixed(2) }} ETB</span>
          </div>

          <div
            class="flex flex-col gap-1 justify-start px-2 py-0.5 border-b border-gray-400"
          >
            <div
              class="flex justify-between items-center font-semibold text-[#49215D]"
            >
              <div>Total Balance</div>
              <div>{{ (user?.rBalance + user?.bBalance).toFixed(2) }} ETB</div>
            </div>
            <div class="flex justify-between items-center">
              <div>Balance Withdrawable</div>
              <div>{{ user?.rBalance.toFixed(2) }} ETB</div>
            </div>
            <div class="flex justify-between items-center">
              <div>Balance Not Withdrawable</div>
              <div>{{ user?.bBalance.toFixed(2) }} ETB</div>
            </div>
            <div class="flex justify-between items-center">
              <div>Bonus Balance</div>
              <div>{{ user?.bBalance.toFixed(2) }} ETB</div>
            </div>
          </div>

          <div
            v-for="value in accountSettings"
            @click="
              $router.push(`${value.to}`);
              toggleModal('right');
            "
            class="h-10 border-b border-gray-400 px-2 flex justify-start gap-2 items-center"
          >
            <UIcon :name="value.icon" class="h-5 w-5" />
            {{ value.name }}
          </div>

          <div
            @click="logout"
            class="h-12 mt-6 text-sm border-b border-gray-400 px-2 flex justify-start gap-2 items-center bg-[#49215D] text-white font-semibold"
          >
            <UIcon name="fluent:arrow-circle-left-12-filled" class="h-6 w-6" />
            Logout
          </div>
        </div>

        <div class="text-center my-2">Follow Our Social Media</div>

        <div class="flex justify-center items-center gap-2">
          <div v-for="value in socialMedia">
            <UIcon :name="value.icon" class="h-6 w-6" />
          </div>
        </div>
      </aside>
    </transition>
  </Teleport>
</template>

<style scoped>
/* Slide animation */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.25s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

/* Fade animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
