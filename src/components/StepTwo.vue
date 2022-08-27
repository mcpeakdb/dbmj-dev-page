<template>
  <div class="step-content step-two-content animate-screen-on">
    <FakeWindows @submit="submit" />
  </div>
</template>

<style scoped lang="scss">
#app .step-content.step-two-content {
  padding: 0;
  height: 100%;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import FakeWindows from "@/components/widgets/FakeWindows/FakeWindows.vue";

export default defineComponent({
  name: "StepTwo",
  components: {
    FakeWindows,
  },
  setup(props, { emit }) {
    const submit = (): void => {
      emit("submit");
    };

    return {
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
