<template>
  <div class="step-zero-wrapper">
    <div class="step-content step-zero-content">
      <BigRedButton @submit="submit" />
    </div>
    <nav>
      <router-link to="/?step=0">Start Over</router-link> |
      <router-link :to="'/?step=' + finalStep">Skip to End</router-link>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.step-zero-wrapper {
  height: 100vh;
  nav {
    text-align: center;
    padding-top: 0.2rem;
    position: absolute;
    bottom: 0;
    width: 100vw;

    a {
      font-weight: bold;
      color: $dbm-blue-secondary;

      &.router-link-exact-active {
        color: $dbm-green;
      }
    }
  }
  .step-zero-content {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 0 auto;

    > * {
      margin: 1rem;
    }
  }
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import BigRedButton from "./widgets/BigRedButton/BigRedButton.vue";

export default defineComponent({
  name: "StepZero",
  components: {
    BigRedButton,
  },
  props: {
    finalStep: {
      type: Number,
      default: 0,
    },
  },
  emits: ["submit"],
  setup(props, { emit }) {
    const submit = (): void => {
      emit("submit");
    };

    return {
      submit,
    };
  },
});
</script>
