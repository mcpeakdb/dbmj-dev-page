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
        @maximize="maximize"
        @unmaximize="unmaximize"
        @mousedown="makeActive(program.id)"
      >
      </FakeWindow>
    </div>
    <FakeStartMenu :programs="programs" @changeActive="makeActive" />
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
  name: "FakeWindows",
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
      makeActive(id);
    };

    const close = (id: number): void => {
      programs.value[id].open = false;
      changeAllToInactive();
    };

    const minimize = (id: number): void => {
      programs.value[id].minimized = true;
      changeAllToInactive();
    };

    const maximize = (id: number): void => {
      programs.value[id].maximized = true;
      makeActive(id);
    };

    const unmaximize = (id: number): void => {
      programs.value[id].maximized = false;
      makeActive(id);
    };

    const makeActive = (id: number): void => {
      changeAllToInactive();
      programs.value[id].minimized = false;
      programs.value[id].active = true;
    };

    const changeAllToInactive = (): void => {
      Object.values(programs.value).forEach((program) => {
        program.active = false;
      });
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
      maximize,
      unmaximize,
      makeActive,
      submit,
    };
  },
  emits: ["submit"],
});
</script>
