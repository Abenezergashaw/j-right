import { ref } from "vue";

export function useClipboard() {
  const copied = ref(false);
  let timeoutId = null;
  const copy = (refValue) => {
    navigator.clipboard.writeText(String(refValue));

    copied.value = true;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      copied.value = false;
    }, 1000);
  };

  return { copy, copied };
}
