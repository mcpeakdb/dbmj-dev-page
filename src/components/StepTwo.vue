<template>
  <div class="step-content step-two-content animate-screen-on">
    <div class="fake-desktop">
      <FakeDesktopIcon
        v-for="program in programs"
        :key="program.name"
        :program="program"
        @open="open"
      />
      <span v-for="program in openPrograms" :key="program.name">
        <FakeWindow
          v-if="program.open"
          v-show="!program.minimized"
          title="aboutme.html"
          :program="program"
          @close="program.open = false"
          @minimize="minimize(program)"
        >
        </FakeWindow>
      </span>
    </div>
    <FakeStartMenu :programs="programs" @changeActive="changeActive" />
  </div>
</template>

<style lang="scss">
#app .step-content.step-two-content {
  text-align: left;
  background-color: $dbm-green;
  padding: 0;
  overflow: hidden;
  .fake-desktop {
    display: relative;
  }
}
</style>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import FakeDesktopIcon from "@/components/widgets/FakeWindows/FakeDesktopIcon.vue";
import FakeStartMenu from "@/components/widgets/FakeWindows/FakeStartMenu.vue";
import FakeWindow from "@/components/widgets/FakeWindows/FakeWindow.vue";
import { FakeProgram, FakeProgramData } from "@/types";

export default defineComponent({
  name: "StepTwo",
  components: {
    FakeDesktopIcon,
    FakeStartMenu,
    FakeWindow,
  },
  setup(props, { emit }) {
    const submit = (): void => {
      emit("submit");
    };

    const minimize = (program: FakeProgram): void => {
      program.minimized = true;
      program.active = false;
    };

    const changeActive = (id: number): void => {
      programs.value[id].minimized = !programs.value[id].minimized;
      programs.value[id].active = !programs.value[id].active;
    };

    const open = (id: number): void => {
      programs.value[id].open = true;
      programs.value[id].minimized = false;
      programs.value[id].active = true;
    };

    const programs = ref<FakeProgramData>({
      0: {
        id: 0,
        name: "aboutme.html",
        title: "About Me",
        open: false,
        minimized: false,
        data: `<div class="old-web-page">
          <span><h1>Hello!</h1>My name is Danny McPeak Jr</span><br />
          <span>I am a Sr. Full Stack Developer at Keeping Current Matters <i>(a link to our website is on the 'desktop')</i></span>
        </div>`,
        type: "html",
        active: false,
      },
      1: {
        id: 1,
        name: "dancingbaby.jpg",
        title: "Dancing Baby",
        open: false,
        minimized: false,
        data: `<div><img
          src="https://upload.wikimedia.org/wikipedia/en/c/ce/DancingBaby.jpg"
        /></div>`,
        type: "jpg",
        active: false,
      },
      2: {
        id: 2,
        name: "https://www.keepingcurrentmatters.com",
        title: "Keeping Current Matters",
        open: false,
        minimized: false,
        data: `<iframe
          src="https://www.keepingcurrentmatters.com"
        />`,
        type: "html",
        active: false,
      },
    });

    const openPrograms = computed(() => {
      return Object.values(programs.value).filter((program) => {
        return program.open;
      });
    });

    return {
      programs,
      openPrograms,
      open,
      minimize,
      changeActive,
      submit,
    };
  },
  props: {
    finalStep: {
      type: Number,
      default: 0,
    },
  },
  emits: ["submit"],
});
</script>
