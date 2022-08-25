<template>
  <div @click="open(program)" class="fake-desktop-icon-wrapper">
    <img
      :src="getImgUrl('icons/' + programType + '_95.png')"
      :alt="program.name"
    />
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
  setup(props, { emit }) {
    const programType = computed((): string => {
      const extension = props.program.name.split(".")[1];
      if (["png", "jpg", "jpeg"].includes(extension)) {
        return "jpg";
      } else if (["com", "html"].includes(extension)) {
        return "html";
      } else {
        return extension;
      }
    });

    const getImgUrl = (pic: string): string => {
      return require("@/assets/" + pic);
    };

    const open = (program: FakeProgram): void => {
      program.open = true;
      program.minimized = false;
    };

    return {
      programType,
      getImgUrl,
      open,
    };
  },
  props: {
    program: {
      type: Object as () => FakeProgram,
      default: (): FakeProgram => {
        return {
          name: "file.png",
          title: "file",
          open: false,
          minimized: false,
          data: `no data`,
        };
      },
    },
  },
});
</script>
