<template>
  <img :src="src" alt="circulo-progreso" width="60" />
</template>

<script>
import { computed } from 'vue';
import { svgOfArc } from '../utils/svgGenerator';

export default {
  name: 'ProgressCircle',
  props: {
    percent: Number,
  },
  setup(props) {
    const src = computed(
      () => `data:image/svg+xml;base64,${svgOfArc(props.percent)}`,
    );

    return { src };
  },
};
</script>

<style></style>
