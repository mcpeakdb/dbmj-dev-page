<template>
  <div class="fake-start-bar">
    <button @click="toggleMenu" :class="{ 'menu-open': menuOpened }">
      Start
      <div
        v-if="menuOpened"
        style="
          position: fixed;
          bottom: 36px;
          left: 0px;
          background: grey;
          margin: 0px;
          padding: 20px;
        "
      >
        <div style="padding: 0; margin: 0">Start Menu</div>
        <div style="padding: 0; margin: 0">Start Menu</div>
        <div style="padding: 0; margin: 0">Start Menu</div>
        <div style="padding: 0; margin: 0">Start Menu</div>
      </div>
    </button>
    <button
      v-for="programOpen in programsOpen"
      :key="programOpen"
      @click="handleMenuClick(programOpen)"
    >
      {{ programOpen.name }}
    </button>

    <button class="taskbar"><EasyClock /></button>
  </div>
</template>

<style lang="scss">
.fake-start-bar {
  background-color: $minisoftGrey;
  border-top: ridge 0.2rem $white;
  height: 2rem;
  position: absolute;
  bottom: 0;
  width: 100%;

  button {
    background-color: transparent;
    height: 95%;
    margin: 0 0.2rem;
    padding: 0 0.4rem;
    border-top: ridge 0.2rem $white;
    border-left: ridge 0.2rem $white;
    border-bottom: ridge 0.2rem $black;
    border-right: ridge 0.2rem $black;
    max-width: 23%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    &.taskbar {
      float: right;
      padding-left: 1rem;
      min-width: 4.8rem;
      border-top: inset 0.2rem $grey;
      border-left: inset 0.2rem $grey;
      border-bottom: inset 0.2rem $white;
      border-right: inset 0.2rem $white;
      text-overflow: clip;
    }
  }

  button.menu-open {
    border-top: inset 0.2rem $black;
    border-left: inset 0.2rem $black;
    border-bottom: inset 0.2rem $white;
    border-right: inset 0.2rem $white;
  }
}
</style>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import EasyClock from "@/components/widgets/EasyClock.vue";
import { FakeProgram } from "@/types";

export default defineComponent({
  name: "FakeStartMenu",
  components: {
    EasyClock,
  },
  props: {
    programs: {
      type: Array as () => FakeProgram[],
      default: (): FakeProgram[] => {
        return [
          {
            name: "file.png",
            title: "file",
            open: false,
            minimized: false,
            data: `no data`,
            type: "png",
          },
        ];
      },
    },
  },
  setup(props) {
    const menuOpened = ref<boolean>(false);

    const toggleMenu = (): void => {
      menuOpened.value = !menuOpened.value;
    };

    const programsOpen = computed((): FakeProgram[] => {
      return props.programs.filter((program): boolean => {
        return program.open === true;
      });
    });

    const handleMenuClick = (program: FakeProgram): void => {
      program.open = true;
      program.minimized = !program.minimized;
    };

    return {
      programsOpen,
      menuOpened,
      toggleMenu,
      handleMenuClick,
    };
  },
});
</script>
