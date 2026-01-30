<script setup>
defineProps({
  openLeftNavigation: Boolean,
});

const { loggedIn, user } = useAuth();

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

const { login } = useAuth();

const showBalance = ref(true);

const openRegisterModal = ref(false);

const phone = ref("934596919");
const password = ref("12345678");

const isFormValid = computed(() => {
  return phone.value !== "" && password.value.trim() !== "";
});

const handleLogin = () => {
  if (!isFormValid.value) return;
  const formData = {
    phone: phone.value,
    password: password.value,
  };

  login(formData);
};
</script>

<template>
  <div
    class="fixed top-0 left-0 right-0 z-40 p-1 bg-[#FBCC01] border-b border-gray-100 h-10"
  >
    <!-- Mobile  -->
    <div class="flex justify-between items-center md:hidden">
      <UButton
        @click="$emit('openLeftNavigation')"
        icon="i-lucide-align-left"
        size="xl"
        class="text-black"
        variant="ghost"
      />

      <img
        @click="$router.push('/prematch')"
        class="w-[52%] max-w-[180px] mx-auto"
        src="https://jambobet.bet/images/logo.png"
        alt=""
      />

      <UButton
        @click="$emit('openRightNavigation')"
        icon="i-lucide-align-right"
        size="xl"
        class="text-black"
        variant="ghost"
      />
    </div>

    <!-- Desktop  -->
    <div class="hidden md:flex justify-between items-center text-xs">
      <div class="flex justify-start items-center">
        <div v-if="!loggedIn" class="flex justify-start items-center">
          <div class="h-7 bg-white flex justify-start items-center gap-2 px-2">
            <UIcon name="octicon:person-fill-24" class="h-5 w-5" />
            <span>+251 (0)</span>
          </div>
          <input
            type="tel"
            v-model="phone"
            class="h-7 w-24 bg-white px-2 border-r outline-0 border-gray-400"
            placeholder="Number"
          />
          <div class="h-7 bg-white flex justify-start items-center gap-2 px-2">
            <UIcon name="game-icons:house-keys" class="h-5 w-5" />
          </div>
          <input
            type="password"
            v-model="password"
            class="h-7 w-24 bg-white px-2 outline-0"
            placeholder="Password"
          />
          <div
            class="h-7 w-7 flex justify-center items-center border border-black mx-1 cursor-pointer"
          >
            ?
          </div>
          <div
            @click="handleLogin"
            class="h-7 px-6 flex justify-center items-center mx-1 cursor-pointer uppercase bg-[#C8102E] text-white"
          >
            Login
          </div>
          <div
            @click="openRegisterModal = true"
            class="h-7 px-6 flex justify-center items-center mx-1 cursor-pointer uppercase bg-[#C8102E] text-white"
          >
            Register
          </div>
        </div>
        <div v-else class="flex justify-start items-center gap-3">
          <UIcon name="octicon:person-fill-24" class="h-5 w-5" />
          <div
            v-if="showBalance"
            class="flex flex-col justify-center items-center font-semibold"
          >
            <div class="font-bold">Real Balance</div>
            <div>{{ user?.rBalance }} ETB</div>
          </div>
          <div
            v-if="showBalance"
            class="flex flex-col justify-center items-center font-semibold"
          >
            <div class="font-bold">Bonus Balance</div>
            <div>{{ user?.bBalance }} ETB</div>
          </div>
          <div @click="showBalance = !showBalance">
            <UIcon
              :name="`${!showBalance ? 'garden:eye-hide-fill-16' : 'garden:eye-fill-16'}`"
              class="h-6 w-6 cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div class="h-7 flex gap-2 items-center pr-6">
        <a
          v-for="s in socialMedia"
          :href="s.to"
          target="_blank"
          rel="noopener noreferrer"
        >
          <UIcon :name="s.icon" class="h-6 w-6" />
        </a>
      </div>
    </div>
  </div>

  <RegisterModal :open="openRegisterModal" @close="openRegisterModal = false" />
</template>

<style scoped>
/* Chrome, Edge, Safari */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
