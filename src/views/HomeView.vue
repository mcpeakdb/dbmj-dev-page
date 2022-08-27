<template>
  <MainLayout>
    <StepZero v-if="step === 0" :finalStep="finalStep" @submit="setStep(1)" />
    <StepOne v-if="step === 1" :finalStep="finalStep" @submit="setStep(2)" />
  </MainLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import MainLayout from "@/views/layouts/MainLayout.vue";
import StepZero from "@/components/StepZero.vue";
import StepOne from "@/components/StepOne.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "HomeView",
  components: {
    MainLayout,
    StepZero,
    StepOne,
  },
  setup() {
    const step = ref(0);
    const finalStep = 1;

    const setStep = (newStep: number): void => {
      step.value = newStep;
    };

    const route = useRoute();
    if (route.query.step && typeof route.query.step === "string") {
      setStep(parseInt(route.query.step));
    }

    return {
      step,
      setStep,
      finalStep,
    };
  },
});
</script>
