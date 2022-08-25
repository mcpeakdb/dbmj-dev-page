<template>
  <router-view :key="route.fullPath" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "App",
  setup() {
    const route = useRoute();

    return {
      route,
    };
  },
});
</script>
