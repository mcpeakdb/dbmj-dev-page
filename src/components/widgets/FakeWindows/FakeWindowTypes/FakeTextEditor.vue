<template>
  <div v-html="file.data" class="fake-editor-window fake-window-content"></div>
</template>

<style lang="scss">
.fake-editor-window {
  box-sizing: border-box;
  padding: 1rem;
  background-image: url("../../../../assets/backgrounds/OldPaper.gif");
  width: 100%;
}
</style>

<script lang="ts">
import { FakeProgram } from "@/types";
import { defineComponent } from "vue";

export default defineComponent({
  name: "FakeTextEditor",
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
    const save = (): void => {
      console.log("save");
    };

    return { save };
  },
});
</script>
