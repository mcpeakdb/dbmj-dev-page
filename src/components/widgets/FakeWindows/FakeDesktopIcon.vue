<template>
  <div @click="open(program)" class="fake-desktop-icon-wrapper">
    <img :src="getImgUrl(programTypeImage(program.type))" :alt="program.name" />
    <p>{{ program.title }}</p>
  </div>
</template>

<style lang="scss">
.fake-desktop-icon-wrapper {
  padding: 1rem;
  color: $white;
  cursor: pointer;
  text-align: center;
  display: inline-block;
  img {
    width: 2.5rem;
  }
}
</style>

<script lang="ts">
import { FakeProgram } from "@/types";
import { defineComponent } from "vue";
import { programTypeImage, getImgUrl } from "./helpers";

export default defineComponent({
  name: "FakeDesktopIcon",
  emits: ["open"],
  setup(props, { emit }) {
    const open = (program: FakeProgram): void => {
      emit("open", program.id);
    };

    return {
      programTypeImage,
      getImgUrl,
      open,
    };
  },
  props: {
    program: {
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
});
</script>
