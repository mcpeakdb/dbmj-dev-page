<template>
  <div class="step-zero-wrapper">
    <div class="step-content step-zero-content">
      <div class="button-wrapper">
        <button @click="submit()">
          <span v-if="!pressed && showPressMe2">You know you want to</span>
          <span v-else-if="!pressed && showPressMe">Press Me</span>
          <span v-else-if="pressed">YAY!</span>
        </button>
      </div>
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

    .hello-text {
      text-align: center;
      transition: all 1s;
    }
    .button-wrapper {
      background: #666;
      border-right: 0.2rem solid #333;
      border-bottom: 0.2rem solid #333;
      border-left: 0.2rem solid #999;
      border-top: 0.2rem solid #999;
      border-radius: 1rem;
      box-shadow: 0.3rem 0.3rem 1rem 0 #333;
      height: 20rem;
      width: 20rem;
      display: flex;
      justify-content: center;
      align-items: center;

      button {
        background: #ff0000;
        box-shadow: 0.3rem 0.3rem 1rem 0 #333;
        color: white;
        font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
          sans-serif;
        font-size: 1.5rem;
        border-radius: 50%;
        height: 10rem;
        width: 10rem;
        padding: 1rem;
        &:hover {
          background: #ff0000aa;
        }

        &:active {
          box-shadow: none;
          transform: translate(0.25rem, 0.25rem);
        }
      }
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "StepZero",
  setup(props, { emit }) {
    const submit = () => {
      pressed.value = true;
      setTimeout(() => {
        emit("submit");
        document.body.style.backgroundColor = "black";
      }, 500);
    };

    const pressed = ref(false);

    const showPressMe = ref(false);

    setTimeout(() => {
      showPressMe.value = true;
    }, 10000);

    const showPressMe2 = ref(false);

    setTimeout(() => {
      showPressMe2.value = true;
    }, 20000);

    return {
      submit,
      pressed,
      showPressMe,
      showPressMe2,
    };
  },
  props: {
    finalStep: {
      type: Number,
      default: 0,
    },
  },
  emits: ["submit"],
});
</script>
