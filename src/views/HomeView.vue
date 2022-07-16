<template>
  <MainLayout>
    <StepZero v-if="step === 0" @submit="setStep(1)" />
    <StepOne v-if="step === 1" @submit="setStep(2)" />
    <StepTwo v-if="step === 2" @submit="setStep(3)" />
  </MainLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import MainLayout from "@/views/layouts/MainLayout.vue";
import StepZero from "@/components/StepZero.vue";
import StepOne from "@/components/StepOne.vue";
import StepTwo from "@/components/StepTwo.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "HomeView",
  components: {
    MainLayout,
    StepZero,
    StepOne,
    StepTwo,
  },
  setup() {
    const step = ref(0);

    const setStep = (newStep: number) => {
      step.value = newStep;
    };

    const route = useRoute();
    if (route.query.step && typeof route.query.step === "string") {
      setStep(parseInt(route.query.step));
    }

    return {
      step,
      setStep,
    };
  },
});
</script>
