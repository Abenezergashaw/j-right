<script setup>
defineProps({
  info: Array,
});

const router = useRouter();
</script>

<template>
  <div class="h-8 bg-[#E6E6E6] text-xs flex justify-between items-center px-2">
    <div class="flex gap-2 justify-between items-center">
      <ThreeDots />
      <div class="font-semibold">Football</div>
    </div>

    <div>{{ info[0] }} - {{ info[1] }}</div>

    <div @click="router.back()">
      <UIcon name="mingcute:close-fill" class="w-4 h-4" />
    </div>
  </div>
</template>
