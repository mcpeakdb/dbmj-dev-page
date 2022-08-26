<template>
  <router-view :key="route.fullPath" />
</template>

<style>
@font-face {
  font-family: Terminal;
  src: url("~@/assets/fonts/VT323-Regular.ttf");
}
</style>

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
