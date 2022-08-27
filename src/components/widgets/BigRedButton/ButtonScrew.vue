<template>
  <div
    @click="screwBolt"
    class="button-bolt"
    :class="{ 'bolt-lost': lostBolt }"
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
    background: black;
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
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "ButtonBolt",
  emits: ["unscrew"],
  setup(props, { emit }) {
    // random rotation for the 'bolts' on the button
    const screwRotation = ref<number>(Math.floor(Math.random() * 360));
    const screwDistance = ref<number>(Math.floor(Math.random() * 20) + 8);

    onMounted(() => {
      Object.values(
        document.getElementsByClassName(
          "button-bolt"
        ) as HTMLCollectionOf<HTMLElement>
      ).forEach((buttonBolt) => {
        buttonBolt.style.setProperty(
          "--button-bolt",
          `rotate(${screwRotation.value}deg)`
        );
      });
    });

    const lostBolt = ref<boolean>(false);

    const screwBolt = (e: PointerEvent): void => {
      if (e === null || e.target === null) {
        return;
      }

      const target = e.target as HTMLElement;

      if (lostBolt.value) {
        return;
      }

      screwRotation.value =
        screwRotation.value - (Math.floor(Math.random() * 90) + 15);
      target.style.setProperty(
        "--button-bolt",
        `rotate(${screwRotation.value}deg)`
      );

      screwDistance.value = screwDistance.value - 1;
      if (screwDistance.value === 0) {
        lostBolt.value = true;
        emit("unscrew");
        return;
      }
    };

    return {
      lostBolt,
      screwBolt,
    };
  },
});
</script>
