<template>
  <div class="fake-browser-window fake-window-content">
    <div class="fake-browser-toolbar">
      <span>Address: </span>
      <input v-model="temporaryUrl" @keyup.enter="submit" />
    </div>
    <iframe :src="browserUrl" :onload="chkFrame" />
  </div>
</template>

<style lang="scss">
.fake-browser-window {
  min-width: 60vw;
  min-height: 60vh;

  .fake-browser-toolbar {
    background: $minisoftGrey;
    padding: 0 0.6rem;
    position: relative;
    &:after {
      position: absolute;
      content: "";
      left: 2px;
      background: $minisoftGrey;
      border-top: ridge 0.1rem $white;
      border-left: ridge 0.1rem $white;
      border-bottom: ridge 0.1rem $black;
      border-right: ridge 0.1rem $black;
      box-sizing: border-box;
      top: 10%;
      height: 80%;
    }
    input {
      margin: 0.2rem;
      height: 1.4rem;
      max-width: calc(100% - 0.8rem);
      width: 600px;
      padding: 0 0 0 0.2rem;
    }
  }

  iframe {
    position: absolute;
    border: none;
    height: calc(
      100% - 2rem - 1.8rem
    ); // 100% - height of topbar - height of toolbar
    width: 100%;
  }
}
</style>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "FakeBrowser",
  props: {
    url: {
      type: String,
      default: "https://www.google.com",
    },
  },
  setup(props) {
    const browserUrl = ref<string>(props.url);
    const temporaryUrl = ref<string>(browserUrl.value);

    const submit = (): void => {
      browserUrl.value = temporaryUrl.value;
    };

    const chkFrame = (): void => {
      alert(
        "Apologies if this page didn't load... cross-origin makes creating a mock browser tough!"
      );
    };

    return { browserUrl, temporaryUrl, submit, chkFrame };
  },
});
</script>
