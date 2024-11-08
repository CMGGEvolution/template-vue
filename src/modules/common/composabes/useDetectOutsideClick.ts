import { onBeforeUnmount, onMounted, type Ref } from "vue";

export default function useDetectClickOutside(
  component: Ref<HTMLElement | null>,
  callback: () => void,
) {
  const listener = (event: Event): void => {
    if (
      event.target !== component.value &&
      event.composedPath().includes(component.value as HTMLElement)
    ) {
      return;
    }
    callback();
  };

  onMounted(() => {
    window.addEventListener("click", listener);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("click", listener);
  });

  return { listener };
}
