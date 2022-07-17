<template>
  <div class="fake-window">
    <div class="fake-window-topbar">
      {{ title }}
      <div>
        <button>_</button>
        <button>&#x26F6;</button>
        <button @click="close()">X</button>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<style lang="scss">
.fake-window {
  border: 0.2rem inset lightgrey;
  max-height: 100%;
  max-width: 100%;
  width: fit-content;
  box-sizing: border-box;
  position: absolute;
  background-color: black;

  .fake-window-topbar {
    display: flex;
    justify-content: space-between;
    background-color: navy;
    color: white;
    padding: 0.2rem 0.4rem;
    align-items: center;
    div {
      display: flex;

      button {
        width: 26px !important;
        height: 26px !important;
        font-weight: bold;
        background-color: #c0c0c0;
        margin: 0 0 0 0.4rem;
        padding: 0.1rem 0.3rem;
        border-top: ridge 0.2rem white;
        border-left: ridge 0.2rem white;
        border-bottom: ridge 0.2rem black;
        border-right: ridge 0.2rem black;
      }
    }
  }
  .old-web-page {
    box-sizing: border-box;
    padding: 1rem;
    background-image: url("@/assets/backgrounds/OldPaper.gif");
  }
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FakeWindow",
  props: {
    title: {
      type: String,
      default: "Window",
    },
  },
  emits: ["close"],
  setup(props, { emit }) {
    const close = () => {
      emit("close");
    };

    return {
      close,
    };
  },
});
</script>
