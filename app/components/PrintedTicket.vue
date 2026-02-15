<script setup>
import axios from "axios";

const { ticket, totalOdds, stake, bonus, win, tax, ticketDisplay } =
  useTicket();

const { printModal, toggleModal } = useModal();

function formatDate(iso) {
  const d = new Date(iso);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ` +
    `${pad(d.getHours())}:${pad(d.getMinutes())}`
  );
}
</script>

<template>
  <div
    v-if="printModal && ticketDisplay"
    class="fixed top-0 inset-0 z-50 bg-black/90"
  />

  <!-- Bottom Sheet -->
  <div
    v-if="printModal && ticketDisplay"
    class="fixed inset-x-0 z-50 bg-white transition-transform duration-500 overflow-y-auto no-scrollbar w-[90%] max-w-100 mx-auto my-2"
    style="top: 40px"
  >
    <div
      class="h-10 bg-[#49215D] text-white flex justify-between items-center px-2"
    >
      <span>Printed Ticket</span>
      <UIcon
        name="ic:baseline-close"
        class="w-6 h-6"
        @click="toggleModal('print')"
      />
    </div>

    <div v-html="ticketDisplay" class="overflow-y-auto max-h-[80vh]"></div>
  </div>
</template>
