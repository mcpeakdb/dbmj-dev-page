<template>
  <div class="fake-start-bar">
    <span>
      <button @click="toggleMenu" :class="{ active: menuOpened }">
        <img src="../../../assets/icons/start.png" alt="start icon" />
        Start
      </button>

      <div v-if="menuOpened" class="fake-start-menu">
        <div style="padding: 0; margin: 0">Start Menu</div>
        <div style="padding: 0; margin: 0">Start Menu</div>
        <div style="padding: 0; margin: 0">Start Menu</div>
        <div style="padding: 0; margin: 0">Start Menu</div>
      </div>
    </span>

    <button
      v-for="programOpen in programsOpen"
      :key="programOpen"
      :class="{ active: programOpen.active }"
      @click="handleItemClick(programOpen.id)"
    >
      <img
        :src="getImgUrl(programTypeImage(programOpen.type))"
        :alt="programOpen.name"
      />
      {{ programOpen.name }}
    </button>

    <button class="taskbar"><EasyClock /></button>
  </div>
</template>

<style lang="scss">
.fake-start-bar {
  background-color: $minisoftGrey;
  border-top: ridge 0.2rem $white;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;

  button {
    background-color: transparent;
    height: 2rem;
    margin: 0.1rem 0.2rem;
    padding: 0 0.4rem;
    border-top: ridge 0.2rem $white;
    border-left: ridge 0.2rem $white;
    border-bottom: ridge 0.2rem $black;
    border-right: ridge 0.2rem $black;
    max-width: 23%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: bold;

    img {
      height: 15px;
      vertical-align: bottom;
    }

    &.taskbar {
      float: right;
      padding-left: 1rem;
      min-width: 4.8rem;
      border-top: inset 0.2rem $grey;
      border-left: inset 0.2rem $grey;
      border-bottom: inset 0.2rem $white;
      border-right: inset 0.2rem $white;
      text-overflow: clip;
      font-weight: normal;
    }
  }

  button.active {
    border-top: inset 0.2rem $black;
    border-left: inset 0.2rem $black;
    border-bottom: inset 0.2rem $white;
    border-right: inset 0.2rem $white;
  }

  .fake-start-menu {
    position: absolute;
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
import { programTypeImage, getImgUrl } from "./helpers";

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
            maximized: false,
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
      programTypeImage,
      getImgUrl,
    };
  },
});
</script>
