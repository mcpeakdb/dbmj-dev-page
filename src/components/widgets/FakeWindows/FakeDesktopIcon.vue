<template>
  <div @click="open(program)" class="fake-desktop-icon-wrapper">
    <img :src="getImgUrl(programTypeImage)" :alt="program.name" />
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
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "FakeDesktopIcon",
  emits: ["open"],
  setup(props, { emit }) {
    const programTypeImage = computed((): string => {
      if (["png", "jpg", "jpeg"].includes(props.program.type)) {
        return "jpg";
      } else if (["com", "html"].includes(props.program.type)) {
        return "html";
      } else {
        return props.program.type;
      }
    });

    const getImgUrl = (pic: string): string => {
      return require("./icons/" + pic + "_95.png");
    };

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
          data: `no data`,
          type: "png",
          active: false,
        };
      },
    },
  },
});
</script>

function emit(arg0: string, id: number) { throw new Error("Function not
implemented."); }
