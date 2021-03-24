<template>
  <Title class="mb-6" :title="'Documentación'" />
</template>

<script>
import Title from "@/components/Title";
export default {
  props: {
    title: String,
  },
  components: {
    Title,
  },
};
</script>

<style>
</style>