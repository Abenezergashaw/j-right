<template>
  <div class="h-40 flex items-start">
    <div class="loader">
      <div class="loader-line"></div>
    </div>
  </div>
</template>

<style scoped>
.loader {
  width: 100%;
  height: 2px;
  background: #e5e5e5;
  overflow: hidden;
  position: relative;
}

.loader-line {
  width: 70%;
  height: 100%;
  background: #666;
  position: absolute;
  left: -40%;
  animation: slide-right 1.2s linear infinite;
}

@keyframes slide-right {
  from {
    left: -40%;
  }
  to {
    left: 100%;
  }
}
</style>
