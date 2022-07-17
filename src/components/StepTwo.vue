<template>
  <div class="step-content step-two-content animate-screen-on">
    <div>
      <div @click="openFile('aboutme')" class="icon-wrapper">
        <img />
        <p>aboutme.html</p>
      </div>
      <div @click="openFile('dancingbaby')" class="icon-wrapper">
        <img />
        <p>dancingbaby.jpg</p>
      </div>

      <div v-if="filesOpen.includes('aboutme')" class="fake-window">
        <div class="old-web-page">
          <span>My name is Danny McPeak Jr</span><br />
          <span>I am a Full Stack Web Developer</span>
        </div>
      </div>
      <div v-if="filesOpen.includes('dancingbaby')">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/c/ce/DancingBaby.jpg"
        />
      </div>
    </div>
    <div class="fake-start-bar">
      <button @click="toggleMenu" :class="{ 'menu-open': menuOpened }">
        Start
      </button>

      <button class="taskbar">{{ time }}</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#app .step-content.step-two-content {
  text-align: left;
  background-color: $dbm-green;
  padding: 0;
  overflow: hidden;

  .icon-wrapper {
    padding: 1rem;
    color: white;
    cursor: pointer;
  }

  .fake-window {
    border: 0.2rem inset lightgrey;
    max-height: 100%;
    max-width: 100%;
    height: 20rem;
    width: 20rem;
    box-sizing: border-box;
    .old-web-page {
      box-sizing: border-box;
      padding: 1rem;
      width: 100%;
      height: 100%;
      background-image: url("@/assets/backgrounds/OldPaper.gif");
    }
  }

  .fake-start-bar {
    background-color: #c0c0c0;
    border-top: ridge 0.2rem #fff;
    height: 2rem;
    position: absolute;
    bottom: 0;
    width: 100%;

    button {
      background-color: transparent;
      height: 95%;
      margin: 0 0.2rem;
      padding: 0 0.4rem;
      border-top: ridge 0.2rem white;
      border-left: ridge 0.2rem white;
      border-bottom: ridge 0.2rem black;
      border-right: ridge 0.2rem black;
      &.taskbar {
        float: right;
        padding-left: 2rem;
        border-top: inset 0.2rem grey;
        border-left: inset 0.2rem grey;
        border-bottom: inset 0.2rem white;
        border-right: inset 0.2rem white;
      }
    }

    button.menu-open {
      border-top: inset 0.2rem black;
      border-left: inset 0.2rem black;
      border-bottom: inset 0.2rem white;
      border-right: inset 0.2rem white;
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "StepZero",
  setup(props, { emit }) {
    const submit = () => {
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

    const openFile = (fileName: string) => {
      filesOpen.value.push(fileName);
    };

    const filesOpen = ref<string[]>([]);

    setInterval(() => (time.value = setTime()), 1000);

    return {
      submit,
      openFile,
      toggleMenu,
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
