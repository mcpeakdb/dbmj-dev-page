<template>
  <div
    v-if="program.open"
    v-show="!program.minimized"
    class="fake-window"
    :class="{ maximize: isMaximized }"
    ref="fakeWindow"
  >
    <div class="fake-window-topbar" @mousedown="dragMouseDown">
      {{ program.name }}
      <div>
        <button @click="minimize"><span>&#128469;&#xFE0E;</span></button>
        <button v-if="isMaximized" @click.prevent="unmaximize">
          <span>&#128471;&#xFE0E;</span>
        </button>
        <button v-else @click.prevent="maximize">
          <span>&#x1F5D6;&#xFE0E;</span>
        </button>
        <button @click.prevent="close"><span>&#10006;&#xFE0E;</span></button>
      </div>
    </div>
    <div
      v-if="['jpg', 'jpeg', 'png'].includes(program.type)"
      class="fake-image-window fake-window-content"
    >
      <img :src="program.data" />
    </div>
    <FakeBrowser
      v-else-if="['html'].includes(program.type)"
      :url="program.data"
    />
    <div
      v-else-if="['txt'].includes(program.type)"
      v-html="program.data"
      class="fake-editor-window fake-window-content"
      :class="program.type + '-file-type'"
    ></div>
    <div v-else class="fake-window-content">No Program for this file type</div>
  </div>
</template>

<style lang="scss">
.fake-window {
  border: 0.2rem inset #d3d3d3;
  max-height: calc(100%);
  max-width: 100%;
  width: fit-content;
  box-sizing: border-box;
  position: absolute;
  background-color: $white;
  top: 5rem;
  left: 5rem;

  &.maximize {
    width: 100%;
    height: calc(100%);
    top: 0;
    left: 0;
  }

  .fake-window-topbar {
    display: flex;
    justify-content: space-between;
    background-color: $dbm-blue;
    color: $white;
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
        border-top: ridge 0.2rem $white;
        border-left: ridge 0.2rem $white;
        border-bottom: ridge 0.2rem $black;
        border-right: ridge 0.2rem $black;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .fake-window-content {
    height: calc(100% - 32px);
    &.fake-image-window {
      background-color: $black;
      display: flex;
      justify-content: center;
      img {
        align-self: center;
        max-height: 100%;
      }
    }

    &.fake-editor-window {
      box-sizing: border-box;
      padding: 1rem;
      background-image: url("../../../assets/backgrounds/OldPaper.gif");
      width: 100%;
    }
  }
}
</style>

<script lang="ts">
import { FakeProgram } from "@/types";
import FakeBrowser from "./FakeWindowTypes/FakeBrowser.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "FakeWindow",
  components: {
    FakeBrowser,
  },
  props: {
    program: {
      type: Object,
      default: (): FakeProgram => {
        return {
          id: 0,
          name: "file.png",
          title: "file",
          open: false,
          minimized: false,
          maximized: false,
          data: `no data`,
          type: "png",
          active: false,
        };
      },
    },
  },
  emits: ["close", "minimize", "maximize", "unmaximize"],
  setup(props, { emit }) {
    const close = (e: Event): void => {
      e.stopPropagation();
      isMaximized.value = false;
      emit("close", props.program.id);
    };
    const minimize = (e: Event): void => {
      e.stopPropagation();
      emit("minimize", props.program.id);
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

    function maximize(e: Event): void {
      e.stopPropagation();
      if (fakeWindow.value) {
        fakeWindow.value.style.top = "0px";
        fakeWindow.value.style.left = "0px";
      }
      isMaximized.value = true;
      emit("maximize", props.program.id);
    }

    function unmaximize(e: Event): void {
      e.stopPropagation();
      if (fakeWindow.value) {
        fakeWindow.value.style.top = windowTop.value;
        fakeWindow.value.style.left = windowLeft.value;
      }
      isMaximized.value = false;
      emit("unmaximize", props.program.id);
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
