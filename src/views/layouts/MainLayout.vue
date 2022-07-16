<template>
  <div id="main-layout-content">
    <slot></slot>
  </div>
  <NavBar />
</template>

<style lang="scss">
#main-layout-content {
  width: 100vw;
  height: calc(100vh - 25px);
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "@/components/NavBar.vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    NavBar,
  },
});
</script>
