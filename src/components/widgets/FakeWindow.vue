<template>
  <div class="fake-window" ref="fakeWindow">
    <div class="fake-window-topbar" @mousedown="dragMouseDown">
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
  position: fixed;
  background-color: black;
  top: 5rem;
  left: 5rem;

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
import { defineComponent, nextTick, onMounted, ref } from "vue";

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
    const fakeWindow = ref<HTMLElement>();

    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    const dragMouseDown = (e: MouseEvent) => {
      e = e || window.event;
      e.preventDefault();

      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;

      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    };

    function elementDrag(e: MouseEvent) {
      e = e || window.event;
      e.preventDefault();

      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      // set the element's new position:
      if (fakeWindow.value) {
        fakeWindow.value.style.top = fakeWindow.value.offsetTop - pos2 + "px";
        fakeWindow.value.style.left = fakeWindow.value.offsetLeft - pos1 + "px";
      }

      return null;
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
      return null;
    }

    return {
      fakeWindow,
      close,
      dragMouseDown,
    };
  },
});
</script>
