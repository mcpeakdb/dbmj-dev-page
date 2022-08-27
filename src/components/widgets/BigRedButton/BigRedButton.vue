<template>
  <div class="button-wrapper">
    <div class="button-bolts-row">
      <ButtonScrew @unscrew="unscrew(0)" />
      <ButtonScrew @unscrew="unscrew(1)" />
    </div>
    <button @click="submit()">
      <span v-if="!pressed && showPressMe2">You know you want to</span>
      <span v-else-if="!pressed && showPressMe">Press Me</span>
      <span v-else-if="pressed">YAY!</span>
    </button>
    <div class="button-bolts-row">
      <ButtonScrew @unscrew="unscrew(2)" />
      <ButtonScrew @unscrew="unscrew(3)" />
    </div>
  </div>
</template>

<style lang="scss">
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
</style>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ButtonScrew from "./ButtonScrew.vue";

export default defineComponent({
  name: "BigRedButton",
  components: {
    ButtonScrew,
  },
  emits: ["submit"],
  setup(props, { emit }) {
    const pressed = ref<boolean>(false);

    const submit = (): void => {
      pressed.value = true;
      setTimeout(() => {
        emit("submit");
      }, 500);
    };

    const showPressMe = ref<boolean>(false);

    setTimeout(() => {
      showPressMe.value = true;
    }, 10000);

    const showPressMe2 = ref<boolean>(false);

    setTimeout(() => {
      showPressMe2.value = true;
    }, 20000);

    const unscrew = (id: number): void => {
      console.log("unscrew " + id);
    };

    return {
      submit,
      unscrew,
      pressed,
      showPressMe,
      showPressMe2,
    };
  },
});
</script>
