<template>
  <div @click="openFile(name)" class="icon-wrapper">
    <img :src="getImgUrl('icons/' + fileType + '_95.png')" :alt="name" />
    <p>{{ title }}</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "FakeDesktopIcon",
  setup(props, { emit }) {
    const fileType = computed((): string => {
      const extension = props.name.split(".")[1];
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

    const openFile = (): void => {
      emit("openFile");
    };

    return {
      fileType,
      getImgUrl,
      openFile,
    };
  },
  emits: ["openFile"],
  props: {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
});
</script>
