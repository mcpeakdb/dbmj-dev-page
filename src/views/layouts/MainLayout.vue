<template>
  <div id="main-layout-content">
    <slot></slot>
  </div>
</template>

<style lang="scss">
#main-layout-content {
  width: 100vw;
  height: 100vh;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainLayout",
});
</script>
