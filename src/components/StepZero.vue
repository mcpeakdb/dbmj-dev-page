<template>
  <div class="step-zero-wrapper">
    <div class="step-content step-zero-content">
      <div>
        <span
          class="hello-text"
          :style="showHello ? 'color:black' : 'color:white'"
          >hello...?</span
        >
      </div>
      <div class="button-wrapper">
        <button @click="submit()">
          <span v-if="!pressed">Press Me</span><span v-else>YAY!</span>
        </button>
      </div>
      <div>
        <span
          class="hello-text"
          :style="showHello2 ? 'color:black' : 'color:white'"
          >are you there?</span
        >
      </div>
    </div>
    <nav>
      <router-link to="/?step=0">Start Over</router-link> |
      <router-link to="/?step=2">Skip to End</router-link>
    </nav>
  </div>
</template>

<style lang="scss">
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
      border: 0.2rem solid #333;
      border-radius: 1rem;
      height: 20rem;
      width: 20rem;
      display: flex;
      justify-content: center;
      align-items: center;

      button {
        background: #ff0000;
        box-shadow: 3px 3px 10px 0px #333;
        color: white;
        font-size: 2rem;
        border-radius: 50%;
        height: 10rem;
        width: 10rem;
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
    const showHello = ref(false);
    const showHello2 = ref(false);

    setTimeout(() => {
      showHello.value = true;
    }, 5000);

    setTimeout(() => {
      showHello2.value = true;
    }, 10000);

    return {
      submit,
      pressed,
      showHello,
      showHello2,
    };
  },
  emits: ["submit"],
});
</script>
