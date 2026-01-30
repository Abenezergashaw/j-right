<script setup>
import { ref, computed } from "vue";

// Props
defineProps({
  open: {
    type: Boolean,
    default: true,
  },
});

const { register, registerModal, registerError, toggleModal } = useAuth();

// Form state
const phone = ref("");
const password = ref("");
const confirmPassword = ref("");

// Checkbox refs
const over18 = ref(true);
const termsAccepted = ref(true);

// Computed to enable/disable register button
const isFormValid = computed(() => {
  return (
    phone.value !== "" &&
    password.value.trim() !== "" &&
    confirmPassword.value.trim() !== "" &&
    password.value === confirmPassword.value &&
    over18.value &&
    termsAccepted.value
  );
});

// Function to handle form submission
const submitForm = () => {
  if (!isFormValid.value) return;

  const formData = {
    phone: phone.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    over18: over18.value,
    termsAccepted: termsAccepted.value,
  };

  register(formData);
};
</script>

<template>
  <Teleport to="body">
    <div
      v-if="registerModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 text-xs"
    >
      <div
        class="relative w-[90%] md:max-w-md rounded-md bg-[#f5c400] p-2 font-sans"
      >
        <!-- Close -->
        <button
          class="absolute right-3 top-3 text-lg font-bold text-black cursor-pointer"
          @click="toggleModal('register')"
        >
          ✕
        </button>

        <!-- Logo -->
        <div
          class="mb-2 text-center flex flex-col justify-center items-center gap-4"
        >
          <img
            src="https://jambobet.bet/images/originalLogo.png"
            alt=""
            class="h-20"
          />
          <p class="font-bold text-white text-sm">Register</p>
        </div>

        <!-- Form -->
        <form class="space-y-1" @submit.prevent="submitForm">
          <!-- Phone -->
          <div>
            <label class="mb-1 block text-xs font-semibold text-black">
              Phone number <span class="text-red-600">*</span>
            </label>
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
                placeholder="Insert your phone number"
              />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label class="mb-1 block text-xs font-semibold text-black">
              Password
            </label>
            <input
              type="password"
              v-model="password"
              class="h-9 bg-[#f5f5f5] w-full rounded px-2 text-sm outline-none"
              placeholder="Enter password"
            />
          </div>

          <!-- Confirm Password -->
          <div>
            <label class="mb-1 block text-xs font-semibold text-black">
              Confirm Password
            </label>
            <input
              type="password"
              v-model="confirmPassword"
              class="h-9 bg-[#f5f5f5] w-full rounded px-2 text-sm outline-none"
              placeholder="Confirm password"
            />
          </div>

          <!-- Checkboxes -->
          <div class="space-y-2 text-xs text-black">
            <label class="flex items-start gap-2">
              <input type="checkbox" v-model="over18" class="mt-1" />
              <span>
                I confirm that I am OVER 18
                <span class="text-red-600">*</span>
              </span>
            </label>

            <label class="flex items-start gap-2">
              <input type="checkbox" v-model="termsAccepted" class="mt-1" />
              <span>
                If you continue, you'll confirm that you've read and agree with
                the terms of use and the privacy policy
              </span>
            </label>
          </div>

          <!-- Register Button -->
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
            REGISTER
          </button>
        </form>

        <div class="text-red-500 text-xs textcenter my-2 text-center">
          {{ registerError }}
        </div>

        <!-- Footer -->
        <div class="mt-4 text-center text-sm font-semibold text-red-600">
          <a href="#" class="hover:underline">Support</a>
          <span class="mx-2">|</span>
          <a href="#" class="hover:underline">Enterr</a>
        </div>
      </div>
    </div>
  </Teleport>
</template>
