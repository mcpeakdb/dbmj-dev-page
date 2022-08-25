<template>
  <div>
    <span v-for="file in files" :key="file.filename">
      <FakeWindow
        v-if="file.open"
        v-show="!file.minimized"
        title="aboutme.html"
        :file="file"
        @close="file.open = false"
        @minimize="file.minimized = true"
      >
      </FakeWindow>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import FakeWindow from "@/components/widgets/FakeWindow.vue";

export default defineComponent({
  name: "FakeFileManager",
  components: {
    FakeWindow,
  },
  emits: [],
  props: {
    files: {
      type: Array,
      default: () => {
        return [
          {
            filename: "file.png",
            open: false,
            minimized: false,
            data: `no data`,
          },
        ];
      },
    },
  },
});
</script>
