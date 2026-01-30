<script setup>
import { ref, computed } from "vue";

// Props
defineProps({
  open: {
    type: Boolean,
    default: true,
  },
});

const { login, loginModal, toggleModal, loginError } = useAuth();

// Form state
const phone = ref("934596919");
const password = ref("12345678");

// Computed to enable/disable login button
const isFormValid = computed(() => {
  return phone.value !== "" && password.value.trim() !== "";
});

// Function to handle form submission
const submitForm = () => {
  if (!isFormValid.value) return;

  const formData = {
    phone: phone.value,
    password: password.value,
  };

  login(formData);
};
</script>

<template>
  <Teleport to="body">
    <div
      v-if="loginModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 text-xs"
    >
      <div class="relative w-[90%] rounded-md bg-[#f5c400] p-4 font-sans">
        <!-- Close -->
        <button
          class="absolute right-3 top-3 text-lg font-bold text-white cursor-pointer"
          @click="toggleModal('login')"
        >
          ✕
        </button>

        <!-- Logo -->
        <div
          class="mb-4 text-center flex flex-col justify-center items-center gap-4"
        >
          <img
            src="https://jambobet.bet/images/originalLogo.png"
            alt=""
            class="h-20"
          />
        </div>

        <!-- Form -->
        <form class="space-y-1" @submit.prevent="submitForm">
          <!-- Phone -->
          <div>
            <div class="flex">
              <div
                class="flex items-center w-30 bg-gray-200 px-3 text-xs font-semibold text-black"
              >
                ET +251
              </div>
              <input
                type="tel"
                v-model="phone"
                class="h-9 bg-[#f5f5f5] w-full rounded-r px-2 text-sm outline-none"
                placeholder="Number"
              />
            </div>
          </div>

          <!-- Password -->
          <div>
            <input
              type="password"
              v-model="password"
              class="h-9 bg-[#f5f5f5] w-full rounded px-2 text-sm outline-none"
              placeholder="Password"
            />
          </div>

          <!-- Login Button -->
          <button
            :disabled="!isFormValid"
            type="submit"
            class="mt-2 w-full rounded py-2 text-sm font-bold"
            :class="
              isFormValid
                ? 'bg-white text-black cursor-pointer'
                : 'bg-yellow-200 text-gray-600 cursor-not-allowed'
            "
          >
            LOGIN
          </button>
        </form>

        <div class="text-red-500 text-xs textcenter my-2 text-center">
          {{ loginError }}
        </div>

        <!-- Footer -->
        <div
          class="mt-4 flex justify-center gap-1 items-center text-center text-sm font-semibold text-red-600"
        >
          <div class="hover:underline">Forgot Password</div>
          <span class="mx-2">|</span>
          <div
            @click="
              toggleModal('login');
              toggleModal('register');
            "
            class="hover:underline"
          >
            Create Account
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
