<template>
  <div
    class="fake-window"
    :class="isMaximized ? 'maximize' : ''"
    ref="fakeWindow"
  >
    <div class="fake-window-topbar" @mousedown="dragMouseDown">
      {{ file.filename }}
      <div>
        <button @click="minimize()"><span>&#128469;&#xFE0E;</span></button>
        <button v-if="isMaximized" @click="unmaximize()">
          <span>&#128471;&#xFE0E;</span>
        </button>
        <button v-else @click="maximize()">
          <span>&#x1F5D6;&#xFE0E;</span>
        </button>
        <button @click="close()"><span>&#10006;&#xFE0E;</span></button>
      </div>
    </div>
    <div v-html="file.data" class="content-wrapper"></div>
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

  .content-wrapper {
    width: 100%;
    height: 100%;
  }

  &.maximize {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    .content-wrapper > * {
      width: 100%;
      height: 100%;
    }
  }

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
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .old-web-page {
    box-sizing: border-box;
    padding: 1rem;
    background-image: url("@/assets/backgrounds/OldPaper.gif");
    width: 100%;
    height: 100%;
  }
}
</style>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "FakeWindow",
  props: {
    file: {
      type: Object,
      default: () => {
        return {
          filename: "file.png",
          open: false,
          minimized: false,
          data: `no data`,
        };
      },
    },
  },
  emits: ["close", "minimize"],
  setup(props, { emit }) {
    const close = (): void => {
      isMaximized.value = false;
      emit("close");
    };
    const minimize = (): void => {
      emit("minimize");
    };
    const fakeWindow = ref<HTMLElement>();
    const windowTop = ref<string>("5rem");
    const windowLeft = ref<string>("5rem");

    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    const dragMouseDown = (e: MouseEvent): void => {
      if (isMaximized.value) {
        return;
      }
      e = e || window.event;
      e.preventDefault();

      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;

      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    };

    function elementDrag(e: MouseEvent): void {
      e = e || window.event;
      e.preventDefault();

      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      // set the element's new position:
      if (fakeWindow.value) {
        windowTop.value = fakeWindow.value.offsetTop - pos2 + "px";
        windowLeft.value = fakeWindow.value.offsetLeft - pos1 + "px";

        fakeWindow.value.style.top = windowTop.value;
        fakeWindow.value.style.left = windowLeft.value;
      }
    }

    function closeDragElement(): void {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }

    const isMaximized = ref<boolean>(false);

    function maximize(): void {
      if (fakeWindow.value) {
        fakeWindow.value.style.top = "0px";
        fakeWindow.value.style.left = "0px";
      }
      isMaximized.value = true;
    }

    function unmaximize(): void {
      if (fakeWindow.value) {
        fakeWindow.value.style.top = windowTop.value;
        fakeWindow.value.style.left = windowLeft.value;
      }
      isMaximized.value = false;
    }

    return {
      fakeWindow,
      isMaximized,
      close,
      minimize,
      maximize,
      unmaximize,
      dragMouseDown,
    };
  },
});
</script>
