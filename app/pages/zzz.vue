<!-- MainComponent.vue -->
<template>
  <div>
    <!-- Your existing component -->
    <div class="ticket-display">
      <!-- ... your existing ticket display code ... -->
    </div>

    <!-- Print button -->
    <button @click="printTicket" class="print-button">Print Ticket</button>

    <!-- Hidden printable component -->
    <Z ref="printableTicket" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const printableTicket = ref(null);

function printTicket() {
  if (printableTicket.value) {
    printableTicket.value.printTicket();
  }
}
</script>

<style>
.print-button {
  /* position: fixed;
  bottom: 20px;
  right: 20px; */
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1000;
}

.print-button:hover {
  background: #0056b3;
}
</style>
