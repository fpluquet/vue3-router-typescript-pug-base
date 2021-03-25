<template>
  <img :src="src" />
</template>

<script>
import { ref, computed, onMounted } from "vue";
export default {
  props: {
    name: String,
    width: String,
    height: String,
  },
  setup(props) {
    let src = computed(() => `/${props.name}.svg`);
    return { src };
  },
};
</script>

<style>
</style>