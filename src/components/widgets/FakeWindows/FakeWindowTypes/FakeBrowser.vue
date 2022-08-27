<template>
  <div class="fake-browser-window fake-window-content">
    <div class="fake-browser-toolbar">
      <input v-model="temporaryUrl" />
    </div>
    <iframe :src="browserUrl" />
  </div>
</template>

<style lang="scss">
.fake-browser-window {
  min-width: 60vw;
  min-height: 60vh;

  .fake-browser-toolbar {
    background: $minisoftGrey;
    input {
      margin: 0.2rem;
      max-width: calc(100% - 0.8rem);
      width: 600px;
    }
  }

  iframe {
    position: absolute;
    border: none;
    height: calc(100% - 2em - 28px);
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

    return { browserUrl, temporaryUrl, submit };
  },
});
</script>
