<template>
  <div class="fake-desktop-wrapper">
    <div class="fake-desktop">
      <FakeDesktopIcon
        v-for="program in programs"
        :key="program.name"
        :program="program"
        @open="open"
      />
      <FakeWindow
        v-for="program in openPrograms"
        :key="program.name"
        title="aboutme.html"
        :program="program"
        @close="close"
        @minimize="minimize"
      >
      </FakeWindow>
    </div>
    <FakeStartMenu :programs="programs" @changeActive="changeActive" />
  </div>
</template>

<style lang="scss">
.fake-desktop-wrapper {
  background-color: $dbm-green;
  overflow: hidden;
  height: 100%;
  .fake-desktop {
    height: calc(100% - 36px);
    overflow: hidden;
    position: relative;
  }
}
</style>

<script lang="ts">
import { FakeProgramData } from "@/types";
import { computed, defineComponent, ref } from "vue";
import FakeDesktopIcon from "./FakeDesktopIcon.vue";
import FakeStartMenu from "./FakeStartMenu.vue";
import FakeWindow from "./FakeWindow.vue";
import { programData } from "./programs";

export default defineComponent({
  name: "StepTwo",
  components: {
    FakeDesktopIcon,
    FakeStartMenu,
    FakeWindow,
  },
  setup(props, { emit }) {
    const programs = ref<FakeProgramData>(programData);

    const openPrograms = computed(() => {
      return Object.values(programs.value).filter((program) => {
        return program.open;
      });
    });

    const open = (id: number): void => {
      programs.value[id].open = true;
      programs.value[id].minimized = false;
      programs.value[id].active = true;
    };

    const close = (id: number): void => {
      programs.value[id].open = false;
    };

    const minimize = (id: number): void => {
      programs.value[id].minimized = true;
      programs.value[id].active = false;
    };

    const changeActive = (id: number): void => {
      programs.value[id].minimized = !programs.value[id].minimized;
      programs.value[id].active = !programs.value[id].active;
    };

    const submit = (): void => {
      emit("submit");
    };

    return {
      programs,
      openPrograms,
      open,
      close,
      minimize,
      changeActive,
      submit,
    };
  },
  emits: ["submit"],
});
</script>
