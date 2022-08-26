<template>
  <div class="fake-start-bar">
    <button @click="toggleMenu" :class="{ active: menuOpened }">
      Start
      <div v-if="menuOpened" class="fake-start-menu">
        <div style="padding: 0; margin: 0">Start Menu</div>
        <div style="padding: 0; margin: 0">Start Menu</div>
        <div style="padding: 0; margin: 0">Start Menu</div>
        <div style="padding: 0; margin: 0">Start Menu</div>
      </div>
    </button>
    <button
      v-for="programOpen in programsOpen"
      :key="programOpen"
      :class="{ active: programOpen.active }"
      @click="handleItemClick(programOpen.id)"
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
  left: 0;
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

  button.active {
    border-top: inset 0.2rem $black;
    border-left: inset 0.2rem $black;
    border-bottom: inset 0.2rem $white;
    border-right: inset 0.2rem $white;
  }

  .fake-start-menu {
    position: fixed;
    bottom: 36px;
    left: 0px;
    background: grey;
    margin: 0px;
    padding: 20px;
  }
}
</style>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import EasyClock from "../EasyClock.vue";
import { FakeProgramData } from "@/types";

export default defineComponent({
  name: "FakeStartMenu",
  components: {
    EasyClock,
  },
  props: {
    programs: {
      type: Object as () => FakeProgramData,
      default: (): FakeProgramData => {
        return {
          0: {
            id: 0,
            name: "file.png",
            title: "file",
            open: false,
            minimized: false,
            data: `no data`,
            type: "png",
            active: false,
          },
        };
      },
    },
  },
  emits: ["changeActive"],
  setup(props, { emit }) {
    const menuOpened = ref<boolean>(false);

    const toggleMenu = (): void => {
      menuOpened.value = !menuOpened.value;
    };

    const programsOpen = computed((): FakeProgramData => {
      const prgmsOpn: FakeProgramData = {};
      for (let i = 0; i < Object.values(props.programs).length; i++) {
        if (props.programs[i].open) {
          prgmsOpn[i] = props.programs[i];
        }
      }
      return prgmsOpn;
    });

    const handleItemClick = (key: number): void => {
      emit("changeActive", key);
    };

    return {
      programsOpen,
      menuOpened,
      toggleMenu,
      handleItemClick,
    };
  },
});
</script>
