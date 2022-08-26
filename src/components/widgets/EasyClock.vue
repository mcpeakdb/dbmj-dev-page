<template>
  <span>
    {{ time }}
  </span>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "EasyClock",
  setup() {
    const setTime = (): string => {
      const date = new Date();
      const time = date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });

      return time;
    };
    const time = ref<string>("");
    time.value = setTime();
    setInterval(() => (time.value = setTime()), 1000);

    return {
      time,
    };
  },
});
</script>
