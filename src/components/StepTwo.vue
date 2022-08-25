<template>
  <div class="step-content step-two-content animate-screen-on">
    <div class="fake-desktop">
      <FakeDesktopIcon
        v-for="program in programs"
        :key="program.name"
        :program="program"
      />
      <FakeWindowManager :programs="programs" />
    </div>
    <FakeStartMenu :programs="programs" />
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
import { defineComponent, ref } from "vue";
import FakeDesktopIcon from "@/components/widgets/FakeWindows/FakeDesktopIcon.vue";
import FakeWindowManager from "@/components/widgets/FakeWindows/FakeWindowManager.vue";
import { FakeProgram } from "@/types";
import FakeStartMenu from "@/components/widgets/FakeWindows/FakeStartMenu.vue";

export default defineComponent({
  name: "StepTwo",
  components: {
    FakeDesktopIcon,
    FakeWindowManager,
    FakeStartMenu,
  },
  setup(props, { emit }) {
    const submit = (): void => {
      emit("submit");
    };

    const programs = ref<FakeProgram[]>([
      {
        name: "aboutme.html",
        title: "About Me",
        open: false,
        minimized: false,
        data: `<div class="old-web-page">
          <span><h1>Hello!</h1>My name is Danny McPeak Jr</span><br />
          <span>I am a Sr. Full Stack Developer at Keeping Current Matters <i>(a link to our website is on the 'desktop')</i></span>
        </div>`,
        type: "html",
      },
      {
        name: "dancingbaby.jpg",
        title: "Dancing Baby",
        open: false,
        minimized: false,
        data: `<div><img
          src="https://upload.wikimedia.org/wikipedia/en/c/ce/DancingBaby.jpg"
        /></div>`,
        type: "jpg",
      },
      {
        name: "https://www.keepingcurrentmatters.com",
        title: "Keeping Current Matters",
        open: false,
        minimized: false,
        data: `<iframe
          src="https://www.keepingcurrentmatters.com"
        />`,
        type: "html",
      },
    ]);

    return {
      submit,
      programs,
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
