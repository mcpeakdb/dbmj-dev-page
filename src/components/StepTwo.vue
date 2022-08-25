<template>
  <div class="step-content step-two-content animate-screen-on">
    <div class="fake-desktop">
      <FakeDesktopIcon
        v-for="file in files"
        :key="file.filename"
        :name="file.filename"
        @openFile="
          file.open = true;
          file.minimized = false;
        "
      />
      <FakeWindowManager :files="files" />
    </div>
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
        v-for="fileOpen in filesOpen"
        :key="fileOpen"
        @click="unminimizeFile(fileOpen)"
      >
        {{ fileOpen.filename }}
      </button>

      <button class="taskbar">{{ time }}</button>
    </div>
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
    .icon-wrapper {
      padding: 1rem;
      color: $white;
      cursor: pointer;
      text-align: center;
      display: inline-block;
      img {
        width: 2.5rem;
      }
    }
  }

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
}
</style>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import FakeDesktopIcon from "@/components/widgets/FakeDesktopIcon.vue";
import FakeWindowManager from "@/components/widgets/FakeWindowManager.vue";

export default defineComponent({
  name: "StepTwo",
  components: {
    FakeDesktopIcon,
    FakeWindowManager,
  },
  setup(props, { emit }) {
    const submit = (): void => {
      emit("submit");
    };

    const menuOpened = ref<boolean>(false);

    const toggleMenu = () => {
      menuOpened.value = !menuOpened.value;
    };

    const setTime = () => {
      const date = new Date();
      const time = date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });

      return time;
    };

    const time = ref<string>("");

    const unminimizeFile = (file: any) => {
      file.minimized = false;
    };

    setInterval(() => (time.value = setTime()), 1000);

    const files = ref([
      {
        filename: "aboutme.html",
        open: false,
        minimized: false,
        data: `<div class="old-web-page">
          <span>My name is Danny McPeak Jr</span><br />
          <span>I am a Full Stack Web Developer</span>
        </div>`,
      },
      {
        filename: "dancingbaby.jpeg",
        open: false,
        minimized: false,
        data: `<img
          src="https://upload.wikimedia.org/wikipedia/en/c/ce/DancingBaby.jpg"
        />`,
      },
    ]);

    const filesOpen = computed(() => {
      return files.value.filter((file) => {
        return file.open === true;
      });
    });

    return {
      submit,
      unminimizeFile,
      toggleMenu,
      files,
      filesOpen,
      menuOpened,
      time,
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
