<template>
  <div class="step-zero-wrapper">
    <div class="step-content step-zero-content">
      <div class="button-wrapper">
        <div class="button-bolts-row">
          <div @click="screwBolt" class="button-bolt button-bolt-1"></div>
          <div @click="screwBolt" class="button-bolt button-bolt-2"></div>
        </div>
        <button @click="submit()">
          <span v-if="!pressed && showPressMe2">You know you want to</span>
          <span v-else-if="!pressed && showPressMe">Press Me</span>
          <span v-else-if="pressed">YAY!</span>
        </button>
        <div class="button-bolts-row">
          <div @click="screwBolt" class="button-bolt button-bolt-3"></div>
          <div @click="screwBolt" class="button-bolt button-bolt-4"></div>
        </div>
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
      background: $grey6;
      border-right: 0.2rem solid $grey3;
      border-bottom: 0.2rem solid $grey3;
      border-left: 0.2rem solid $grey9;
      border-top: 0.2rem solid $grey9;
      border-radius: 1rem;
      box-shadow: 0.3rem 0.3rem 1rem 0 $grey3;
      height: 20rem;
      width: 20rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      .button-bolts-row {
        display: flex;
        justify-content: space-between;
        width: 100%;

        .button-bolt {
          border: 1px solid $black;
          border-radius: 50%;
          width: 1rem;
          height: 1rem;
          margin: 0.5rem;
          background: $grey;
          box-shadow: 0.1rem 0.1rem 0.1rem 0 $grey3;

          &.bolt-lost {
            background: black;
            box-shadow: none;
          }
          &:after {
            position: relative;
            left: 0;
            top: 50%;
            height: 1px;
            background: $black;
            content: "";
            width: 100%;
            display: block;
            transition: transform 0.3s linear;
          }
          &.button-bolt-1:after {
            transform: var(--button-bolt);
          }
          &.button-bolt-2:after {
            transform: var(--button-bolt);
          }
          &.button-bolt-3:after {
            transform: var(--button-bolt);
          }
          &.button-bolt-4:after {
            transform: var(--button-bolt);
          }
        }
      }

      button {
        background: $red;
        box-shadow: 0.3rem 0.3rem 1rem 0 $grey3;
        color: $white;
        font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
          sans-serif;
        font-size: 1.5rem;
        border-radius: 50%;
        height: 10rem;
        width: 10rem;
        padding: 1rem;
        &:hover {
          background: $red + "aa";
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
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "StepZero",
  setup(props, { emit }) {
    // random rotation for the 'bolts' on the button
    onMounted(() => {
      Object.values(
        document.getElementsByClassName(
          "button-bolt"
        ) as HTMLCollectionOf<HTMLElement>
      ).forEach((buttonBolt) => {
        buttonBolt.style.setProperty(
          "--button-bolt",
          `rotate(${Math.floor(Math.random() * 360)}deg)`
        );
      });
    });

    const submit = (): void => {
      pressed.value = true;
      setTimeout(() => {
        emit("submit");
        setTimeout(() => {
          document.body.style.backgroundColor = "black";
        }, 500);
      }, 500);
    };

    const pressed = ref<boolean>(false);

    const showPressMe = ref<boolean>(false);

    setTimeout(() => {
      showPressMe.value = true;
    }, 10000);

    const showPressMe2 = ref<boolean>(false);

    setTimeout(() => {
      showPressMe2.value = true;
    }, 20000);

    const screwBolt = (e: PointerEvent): void => {
      if (e === null || e.target === null) {
        return;
      }

      const target = e.target as HTMLElement;

      if (target.classList.contains("bolt-lost")) {
        return;
      }

      const loseBolt = Math.floor(Math.random() * 50);
      if (loseBolt === 0) {
        target.classList.add("bolt-lost");
        return;
      }

      target.style.setProperty(
        "--button-bolt",
        `rotate(${Math.floor(Math.random() * 360)}deg)`
      );
    };

    return {
      submit,
      screwBolt,
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
