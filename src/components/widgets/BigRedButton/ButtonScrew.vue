<template>
  <div
    @click="screwBolt"
    ref="buttonBolt"
    class="button-bolt"
    :class="{ 'bolt-lost': !screwDistance }"
    :style="`--button-bolt: rotate(${screwRotation}deg)`"
  ></div>
</template>

<style lang="scss">
.button-bolt {
  border: 1px solid $black;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  margin: 0.5rem;
  background: $grey;
  box-shadow: 0.1rem 0.1rem 0.1rem 0 $grey3;
  cursor: pointer;

  &.bolt-lost {
    background: $black;
    box-shadow: none;
    cursor: default;
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
    transform: var(--button-bolt);
  }
}
</style>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ButtonBolt",
  emits: ["unscrew"],
  setup(props, { emit }) {
    // random rotation for the 'bolts' on the button
    const screwRotation = ref<number>(Math.floor(Math.random() * 360));
    const screwDistance = ref<number>(Math.floor(Math.random() * 20) + 8);

    const screwBolt = (): void => {
      if (!screwDistance.value) {
        return;
      }

      screwRotation.value =
        screwRotation.value - (Math.floor(Math.random() * 90) + 15);

      screwDistance.value = screwDistance.value - 1;
      if (screwDistance.value === 0) {
        emit("unscrew");
        return;
      }
    };

    return {
      screwDistance,
      screwRotation,
      screwBolt,
    };
  },
});
</script>
