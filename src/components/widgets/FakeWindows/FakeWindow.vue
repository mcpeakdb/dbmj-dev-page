<template>
  <div
    v-if="program.open"
    v-show="!program.minimized"
    class="fake-window"
    :class="{ maximize: program.maximized, active: program.active }"
    ref="fakeWindow"
  >
    <FakeWindowTopBar
      @close="close"
      @minimize="minimize"
      @maximize="maximize"
      @unmaximize="unmaximize"
      @mousedown="dragMouseDown"
      :program="program"
    />
    <FakeImageViewer
      v-if="['jpg', 'jpeg', 'png'].includes(program.type)"
      :file="program"
    />
    <FakeBrowser
      v-else-if="['html'].includes(program.type)"
      :url="program.data"
    />
    <FakeTextEditor
      v-else-if="['txt'].includes(program.type)"
      :file="program"
    />
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

  &.active {
    z-index: 2;
  }

  &.maximize {
    width: 100%;
    height: calc(100%);
    top: 0;
    left: 0;
  }

  .fake-window-content {
    height: calc(100% - 32px);
  }
}
</style>

<script lang="ts">
import { FakeProgram } from "@/types";
import FakeBrowser from "./FakeWindowTypes/FakeBrowser.vue";
import FakeImageViewer from "./FakeWindowTypes/FakeImageViewer.vue";
import FakeTextEditor from "./FakeWindowTypes/FakeTextEditor.vue";
import FakeWindowTopBar from "./FakeWindowTopBar.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "FakeWindow",
  components: {
    FakeBrowser,
    FakeImageViewer,
    FakeTextEditor,
    FakeWindowTopBar,
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
    const close = (): void => {
      emit("close", props.program.id);
    };
    const minimize = (): void => {
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
      if (props.program.maximized) {
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

    function maximize(): void {
      if (fakeWindow.value) {
        fakeWindow.value.style.top = "0px";
        fakeWindow.value.style.left = "0px";
      }
      emit("maximize", props.program.id);
    }

    function unmaximize(): void {
      if (fakeWindow.value) {
        fakeWindow.value.style.top = windowTop.value;
        fakeWindow.value.style.left = windowLeft.value;
      }
      emit("unmaximize", props.program.id);
    }

    return {
      fakeWindow,
      close,
      minimize,
      maximize,
      unmaximize,
      dragMouseDown,
    };
  },
});
</script>
