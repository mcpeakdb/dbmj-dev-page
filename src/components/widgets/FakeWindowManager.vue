<template>
  <div>
    <span v-for="program in programs" :key="program.name">
      <FakeWindow
        v-if="program.open"
        v-show="!program.minimized"
        title="aboutme.html"
        :program="program"
        @close="program.open = false"
        @minimize="program.minimized = true"
      >
      </FakeWindow>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { FakeProgram } from "@/types";
import FakeWindow from "@/components/widgets/FakeWindow.vue";

export default defineComponent({
  name: "FakeFileManager",
  components: {
    FakeWindow,
  },
  props: {
    programs: {
      type: Array,
      default: (): FakeProgram[] => {
        return [
          {
            name: "file.png",
            title: "file",
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
