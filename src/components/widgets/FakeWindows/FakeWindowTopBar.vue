<template>
  <div class="fake-window-topbar" :class="{ active: program.active }">
    <div>
      <img
        :src="getImgUrl(programTypeImage(program.type))"
        :alt="program.name"
      />
      {{ program.name }}
    </div>
    <div>
      <button @click="minimize"><span>&#128469;&#xFE0E;</span></button>
      <button v-if="program.maximized" @click.prevent="unmaximize">
        <span>&#128471;&#xFE0E;</span>
      </button>
      <button v-else @click.prevent="maximize">
        <span>&#x1F5D6;&#xFE0E;</span>
      </button>
      <button @click.prevent="close"><span>&#10006;&#xFE0E;</span></button>
    </div>
  </div>
</template>

<style lang="scss">
.fake-window-topbar {
  display: flex;
  justify-content: space-between;
  background-color: $grey6;
  color: $white;
  padding: 0.2rem 0.4rem;
  align-items: center;

  &.active {
    background-color: $dbm-blue;
  }

  img {
    height: 1rem;
    padding-right: 0.2rem;
  }

  div {
    display: flex;

    button {
      width: 26px !important;
      height: 26px !important;
      font-weight: bold;
      background-color: #c0c0c0;
      margin: 0 0 0 0.4rem;
      padding: 0.1rem 0.3rem;
      border-top: ridge 0.2rem $white;
      border-left: ridge 0.2rem $white;
      border-bottom: ridge 0.2rem $black;
      border-right: ridge 0.2rem $black;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>

<script lang="ts">
import { FakeProgram } from "@/types";
import { defineComponent } from "vue";
import { programTypeImage, getImgUrl } from "./helpers";

export default defineComponent({
  name: "FakeWindowTopBar",
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
          maximized: false,
          data: `no data`,
          type: "png",
          active: false,
        };
      },
    },
  },
  emits: ["close", "minimize", "maximize", "unmaximize"],
  setup(props, { emit }) {
    const close = (e: Event): void => {
      e.stopPropagation();
      emit("close", props.program.id);
    };
    const minimize = (e: Event): void => {
      e.stopPropagation();
      emit("minimize", props.program.id);
    };
    function maximize(e: Event): void {
      e.stopPropagation();
      emit("maximize", props.program.id);
    }

    function unmaximize(e: Event): void {
      e.stopPropagation();
      emit("unmaximize", props.program.id);
    }

    return {
      close,
      minimize,
      maximize,
      unmaximize,
      programTypeImage,
      getImgUrl,
    };
  },
});
</script>
