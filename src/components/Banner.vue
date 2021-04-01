<template>
  <img :src="src" />
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    name: String,
    width: String,
    height: String,
  },
  setup(props) {
    const src = computed(() => `/${props.name}.svg`);
    return { src };
  },
};
</script>

<style></style>
