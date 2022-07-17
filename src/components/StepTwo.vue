<template>
  <div class="step-content step-two-content animate-screen-on">
    <div class="fake-desktop">
      <div @click="openFile('aboutme.html')" class="icon-wrapper">
        <img src="@/assets/icons/html_95.png" alt="html icon" />
        <p>aboutme.html</p>
      </div>
      <div @click="openFile('dancingbaby.jpeg')" class="icon-wrapper">
        <img src="@/assets/icons/jpg_95.png" alt="jpg icon" />
        <p>dancingbaby.jpeg</p>
      </div>

      <FakeWindow
        v-if="filesOpen.includes('aboutme.html')"
        title="aboutme.html"
        @close="
          filesOpen = filesOpen.filter(
            (fileOpen) => fileOpen !== 'aboutme.html'
          )
        "
      >
        <div class="old-web-page">
          <span>My name is Danny McPeak Jr</span><br />
          <span>I am a Full Stack Web Developer</span>
        </div>
      </FakeWindow>
      <FakeWindow
        v-if="filesOpen.includes('dancingbaby.jpeg')"
        title="dancingbaby.jpeg"
        @close="
          filesOpen = filesOpen.filter(
            (fileOpen) => fileOpen !== 'dancingbaby.jpeg'
          )
        "
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/en/c/ce/DancingBaby.jpg"
        />
      </FakeWindow>
    </div>
    <div class="fake-start-bar">
      <button @click="toggleMenu" :class="{ 'menu-open': menuOpened }">
        Start
      </button>
      <button v-for="fileOpen in filesOpen" :key="fileOpen">
        {{ fileOpen }}
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
  .fake-desktop {
    display: relative;
    .icon-wrapper {
      padding: 1rem;
      color: white;
      cursor: pointer;
      text-align: center;
      display: inline-block;
      img {
        width: 2.5rem;
      }
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
      max-width: 23%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      &.taskbar {
        float: right;
        padding-left: 1rem;
        min-width: 4.8rem;
        border-top: inset 0.2rem grey;
        border-left: inset 0.2rem grey;
        border-bottom: inset 0.2rem white;
        border-right: inset 0.2rem white;
        text-overflow: clip;
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
import FakeWindow from "@/components/widgets/FakeWindow.vue";

export default defineComponent({
  name: "StepTwo",
  components: {
    FakeWindow,
  },
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
      if (filesOpen.value.includes(fileName)) {
        return;
      }
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
