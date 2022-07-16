<template>
  <MainLayout>
    <span>This is an about page</span>
  </MainLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainLayout from "@/views/layouts/MainLayout.vue";

export default defineComponent({
  name: "AboutView",
  components: {
    MainLayout,
  },
});
</script>
