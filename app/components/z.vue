<!-- PrintableTicket.vue -->
<template>
  <div class="ticket-print-container" ref="printableContent">
    <div class="ticket-content">
      <!-- Header Section -->
      <div
        class="flex justify-between items-center p-2 border-b border-black mb-2"
      >
        <img
          src="https://assetsbm.plqcdn.com/storage/skins/logo/24_black_1729263566.png"
          alt="Logo"
          class="h-6"
        />

        <div
          class="flex flex-col justify-center items-center uppercase text-xs"
        >
          <div class="font-semibold">SCAN & CHECK TICKET</div>
          <div class="text-red-500 font-bold">Pending</div>
        </div>

        <div class="qr-code">
          <!-- QR Code SVG -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="58"
            height="58"
            viewBox="0 0 58 58"
          >
            <rect x="0" y="0" width="58" height="58" fill="#ffffff"></rect>
            <g transform="scale(2)">
              <g transform="translate(0,0)">
                <path
                  fill-rule="evenodd"
                  d="M9 0L9 1L8 1L8 2L9 2L9 3L8 3L8 4L10 4L10 7L11 7L11 4L12 4L12 5L13 5L13 6L12 6L12 9L14 9L14 13L15 13L15 12L16 12L16 13L18 13L18 14L17 14L17 15L16 15L16 14L15 14L15 15L14 15L14 14L13 14L13 12L12 12L12 11L13 11L13 10L11 10L11 11L10 11L10 9L11 9L11 8L6 8L6 9L5 9L5 8L0 8L0 9L3 9L3 10L2 10L2 11L1 11L1 10L0 10L0 12L3 12L3 13L2 13L2 15L3 15L3 14L5 14L5 16L1 16L1 13L0 13L0 16L1 16L1 17L0 17L0 21L1 21L1 17L2 17L2 19L4 19L4 21L5 21L5 20L6 20L6 21L7 21L7 20L6 20L6 19L8 19L8 18L9 18L9 21L8 21L8 23L9 23L9 24L8 24L8 29L9 29L9 28L11 28L11 27L9 27L9 26L10 26L10 23L11 23L11 22L13 22L13 21L12 21L12 20L13 20L13 19L12 19L12 20L11 20L11 19L10 19L10 18L15 18L15 19L16 19L16 20L14 20L14 21L20 21L20 22L14 22L14 23L15 23L15 24L14 24L14 25L19 25L19 24L20 24L20 28L19 28L19 26L13 26L13 25L11 25L11 26L13 26L13 27L15 27L15 28L14 28L14 29L20 29L20 28L21 28L21 29L25 29L25 28L26 28L26 29L27 29L27 28L28 28L28 26L29 26L29 23L28 23L28 25L27 25L27 24L26 24L26 25L25 25L25 23L27 23L27 22L29 22L29 20L28 20L28 19L27 19L27 16L28 16L28 15L27 15L27 14L25 14L25 13L27 13L27 12L28 12L28 11L27 11L27 12L26 12L26 11L25 11L25 9L26 9L26 8L25 8L25 9L24 9L24 8L23 8L23 9L22 9L22 8L21 8L21 2L20 2L20 4L18 4L18 3L17 3L17 2L18 2L18 1L20 1L20 0L17 0L17 2L16 2L16 1L15 1L15 0L14 0L14 1L11 1L11 2L10 2L10 0ZM14 1L14 2L12 2L12 4L13 4L13 5L14 5L14 4L15 4L15 3L16 3L16 4L17 4L17 3L16 3L16 2L15 2L15 1ZM14 2L14 3L13 3L13 4L14 4L14 3L15 3L15 2ZM10 3L10 4L11 4L11 3ZM8 5L8 7L9 7L9 5ZM17 5L17 7L16 7L16 6L15 6L15 7L14 7L14 6L13 6L13 8L14 8L14 9L15 9L15 10L17 10L17 9L16 9L16 8L18 8L18 5ZM19 5L19 9L18 9L18 11L16 11L16 12L18 12L18 13L25 13L25 11L23 11L23 12L21 12L21 11L22 11L22 10L19 10L19 9L21 9L21 8L20 8L20 5ZM15 7L15 8L16 8L16 7ZM27 8L27 9L28 9L28 10L29 10L29 9L28 9L28 8ZM6 9L6 10L8 10L8 11L6 11L6 12L9 12L9 10L8 10L8 9ZM23 9L23 10L24 10L24 9ZM3 11L3 12L5 12L5 11ZM19 11L19 12L20 12L20 11ZM10 12L10 13L9 13L9 16L11 16L11 17L13 17L13 16L14 16L14 17L15 17L15 16L16 16L16 17L17 17L17 16L19 16L19 15L21 15L21 16L20 16L20 18L19 18L19 17L18 17L18 18L16 18L16 19L17 19L17 20L19 20L19 19L20 19L20 18L21 18L21 20L22 20L22 18L21 18L21 17L23 17L23 16L24 16L24 17L25 17L25 21L26 21L26 20L27 20L27 19L26 19L26 17L25 17L25 16L27 16L27 15L25 15L25 16L24 16L24 14L23 14L23 16L22 16L22 15L21 15L21 14L19 14L19 15L17 15L17 16L16 16L16 15L15 15L15 16L14 16L14 15L13 15L13 14L12 14L12 13L11 13L11 12ZM6 13L6 14L7 14L7 15L6 15L6 16L5 16L5 17L4 17L4 19L6 19L6 18L7 18L7 17L8 17L8 14L7 14L7 13ZM10 13L10 14L11 14L11 13ZM28 13L28 14L29 14L29 13ZM12 15L12 16L13 16L13 15ZM6 16L6 17L5 17L5 18L6 18L6 17L7 17L7 16ZM28 17L28 18L29 18L29 17ZM23 19L23 20L24 20L24 19ZM10 20L10 21L11 21L11 20ZM21 21L21 24L24 24L24 21ZM9 22L9 23L10 23L10 22ZM22 22L22 23L23 23L23 22ZM17 23L17 24L18 24L18 23ZM21 25L21 26L25 26L25 25ZM17 27L17 28L18 28L18 27ZM21 27L21 28L22 28L22 27ZM23 27L23 28L25 28L25 27ZM26 27L26 28L27 28L27 27ZM12 28L12 29L13 29L13 28ZM0 0L0 7L7 7L7 0ZM1 1L1 6L6 6L6 1ZM2 2L2 5L5 5L5 2ZM22 0L22 7L29 7L29 0ZM23 1L23 6L28 6L28 1ZM24 2L24 5L27 5L27 2ZM0 22L0 29L7 29L7 22ZM1 23L1 28L6 28L6 23ZM2 24L2 27L5 27L5 24Z"
                  fill="#000000"
                ></path>
              </g>
            </g>
          </svg>
        </div>
      </div>

      <!-- Ticket Details -->
      <div class="ticket-details p-2 border border-black mb-2">
        <div class="detail-row flex justify-between items-center text-xs mb-1">
          <div class="font-semibold">Date</div>
          <div>{{ formatDate(new Date().toISOString()) }}</div>
        </div>
        <div class="detail-row flex justify-between items-center text-xs mb-1">
          <div class="font-semibold">Ticket</div>
          <div class="font-mono">22556F99F365C8DFE591</div>
        </div>
        <div class="detail-row flex justify-between items-center text-xs mb-1">
          <div class="font-semibold">Bet</div>
          <div class="font-mono">991006909</div>
        </div>
        <div class="detail-row flex justify-between items-center text-xs mb-1">
          <div class="font-semibold">Username</div>
          <div>Player123</div>
        </div>
        <div class="detail-row flex justify-between items-center text-xs">
          <div class="font-semibold">Print Date</div>
          <div>{{ formatDate(new Date().toISOString()) }}</div>
        </div>
      </div>

      <!-- Age Warning -->
      <div class="age-warning p-2 border border-black mb-2">
        <div class="flex items-center">
          <img
            src="https://assetsbm.plqcdn.com/img/harif/ticket21yearplus.png?v=1.0.0"
            class="w-10 mr-2"
            alt="21+"
          />
          <div class="text-xs text-center flex-1">
            <div class="font-bold">ከ21 ዓመት በታች ለሆኑ አይፈቀድም!</div>
            <div>ህግና ደንቦች ተፈፃሚ ናቸው</div>
          </div>
        </div>
      </div>

      <!-- Betting Events -->
      <div class="betting-events mb-2">
        <div
          v-for="(t, index) in ticket"
          :key="index"
          class="event border-b border-gray-300 py-2"
        >
          <div class="font-bold text-sm mb-1">{{ t.event_name }}</div>
          <div class="flex justify-between items-center text-xs mb-1">
            <div>Football / {{ t.country }} - {{ t.competition }}</div>
            <div>{{ formatDate(t.startTime) }}</div>
          </div>
          <div class="flex justify-between items-center text-xs font-semibold">
            <div>{{ t.market_name }}</div>
            <div>{{ t.price_name }}</div>
            <div>Q: {{ t.price_rate }}</div>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div class="summary p-2 border border-black mb-2 text-xs">
        <div class="flex justify-between mb-1">
          <div class="font-semibold">Nr Events:</div>
          <div>{{ ticket.length }}</div>
        </div>
        <div class="flex justify-between">
          <div class="font-semibold">Odds Total:</div>
          <div>{{ totalOdds.toFixed(2) }}</div>
        </div>
      </div>

      <!-- Bet Amount Details -->
      <div class="bet-amount p-2 border-2 border-black mb-2">
        <div class="flex justify-between mb-1 text-xs">
          <div class="font-semibold">Bet Amount</div>
          <div>{{ stake }} ETB</div>
        </div>
        <div v-if="bonus > 0" class="flex justify-between mb-1 text-xs">
          <div class="font-semibold">Bonus</div>
          <div>{{ bonus.toFixed(2) }} ETB</div>
        </div>
        <div v-if="tax > 0" class="flex justify-between mb-1 text-xs">
          <div class="font-semibold">Tax</div>
          <div>{{ tax.toFixed(2) }} ETB</div>
        </div>
        <div class="flex justify-between mb-1 text-xs">
          <div class="font-semibold">Possible Win</div>
          <div>{{ win.toFixed(2) }} ETB</div>
        </div>
        <div
          class="flex justify-between text-sm font-bold border-t border-black pt-1"
        >
          <div>WINNING</div>
          <div class="text-lg">{{ (win - tax).toFixed(2) }} ETB</div>
        </div>
      </div>

      <!-- Barcode -->
      <div class="barcode mb-2">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPQAAAAyAQMAAABRUGQUAAAABlBMVEX///8AAABVwtN+AAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAADhJREFUOI1juDzz8uK4Ny8ldqbr9EQWW+V59F7WcUnqlZ48zS8nt28Dw6j8qPyo/Kj8qPyoPBZ5AN4G9iF2YLAsAAAAAElFTkSuQmCC"
          alt="Barcode"
          class="w-full"
        />
      </div>

      <!-- Footer -->
      <div class="text-center text-xs mb-1">Cashier Code: 556390738</div>
      <div class="text-center text-xs mb-2">
        All Win Tickets are ONLY valid for 30 Days | Soccer Betting is 90
        Minutes and Doesn't include Extra Time or Penalties.
      </div>

      <!-- Footer Warning -->
      <div class="age-warning p-2 border border-black text-xs">
        <div class="flex items-center">
          <img
            src="https://assetsbm.plqcdn.com/img/harif/ticket21yearplus.png?v=1.0.0"
            class="w-10 mr-2"
            alt="21+"
          />
          <div class="text-center flex-1">
            <div class="font-bold">ከ21 ዓመት በታች ለሆኑ አይፈቀድም!</div>
            <div>ህግና ደንቦች ተፈፃሚ ናቸው</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const { ticket, totalOdds, stake, bonus, win, tax } = useTicket();
const printableContent = ref(null);

function formatDate(iso) {
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// Function to print the ticket
function printTicket() {
  const printWindow = window.open("", "_blank");
  const content = printableContent.value.innerHTML;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Print Ticket</title>
      <style>
        @media print {
          @page {
            size: auto;
            margin: 5mm;
          }
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
          }
          .ticket-print-container {
            width: 80mm;
            margin: 0 auto;
            padding: 0;
          }
          .ticket-content {
            border: 1px solid #000;
            padding: 2mm;
          }
          .flex {
            display: flex;
          }
          .justify-between {
            justify-content: space-between;
          }
          .items-center {
            align-items: center;
          }
          .text-center {
            text-align: center;
          }
          .font-semibold {
            font-weight: 600;
          }
          .font-bold {
            font-weight: bold;
          }
          .font-mono {
            font-family: monospace;
          }
          .uppercase {
            text-transform: uppercase;
          }
          .border {
            border: 1px solid #000;
          }
          .border-b {
            border-bottom: 1px solid #000;
          }
          .border-t {
            border-top: 1px solid #000;
          }
          .border-black {
            border-color: #000;
          }
          .border-2 {
            border-width: 2px;
          }
          .mb-1 {
            margin-bottom: 2mm;
          }
          .mb-2 {
            margin-bottom: 4mm;
          }
          .mr-2 {
            margin-right: 4mm;
          }
          .py-2 {
            padding-top: 2mm;
            padding-bottom: 2mm;
          }
          .pt-1 {
            padding-top: 2mm;
          }
          .w-full {
            width: 100%;
          }
          .text-xs {
            font-size: 8pt;
          }
          .text-sm {
            font-size: 9pt;
          }
          .text-lg {
            font-size: 12pt;
          }
          .h-6 {
            height: 6mm;
          }
          .w-10 {
            width: 10mm;
          }
          img {
            max-width: 100%;
            height: auto;
          }
        }
      </style>
    </head>
    <body>
      ${content}
    </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();

  // Trigger print after content loads
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
}

// Expose print function
defineExpose({ printTicket });
</script>

<style scoped>
.ticket-print-container {
  display: none; /* Hidden by default, only shown when printing */
}

@media print {
  .ticket-print-container {
    display: block;
    width: 80mm;
    margin: 0 auto;
    font-family: "Arial", sans-serif;
  }

  .ticket-content {
    border: 1px solid #000;
    padding: 2mm;
  }

  /* Reset styles for print */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Ensure proper spacing */
  .detail-row,
  .event {
    page-break-inside: avoid;
  }
}
</style>
