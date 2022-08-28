<template>
  <div class="fake-image-window fake-window-content">
    <img :src="file.data" />
  </div>
</template>

<style lang="scss">
.fake-image-window {
  background-color: $black;
  display: flex;
  justify-content: center;
  img {
    align-self: center;
    max-height: 100%;
  }
}
</style>

<script lang="ts">
import { FakeProgram } from "@/types";
import { defineComponent } from "vue";

export default defineComponent({
  name: "FakeImageViewer",
  props: {
    file: {
      type: Object as () => FakeProgram,
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
  setup() {
    const zoomIn = (): void => {
      console.log("zoomIn");
    };

    const zoomOut = (): void => {
      console.log("zoomOut");
    };

    return { zoomIn, zoomOut };
  },
});
</script>
