<template>
  <router-view :key="route.fullPath" />
</template>

<style lang="scss">
body {
  margin: 0;
}

#app {
  .step-content {
    width: 100%;
    height: 100%;
    padding: 1rem;
    box-sizing: border-box;

    &.animate-screen-on {
      animation: screen-on 0.5s;
    }
  }

  button {
    cursor: pointer;
  }
}

@font-face {
  font-family: Terminal;
  src: url("@/assets/fonts/VT323-Regular.ttf");
}

@keyframes screen-on {
  0% {
    overflow: hidden;
    position: absolute;
    height: 0%;
    top: 50%;
    opacity: 0;
  }
  75% {
    opacity: 50%;
  }
  100% {
    overflow: auto;
    position: absolute;
    height: calc(100vh - 25px);
    top: 0%;
    opacity: 100%;
  }
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
