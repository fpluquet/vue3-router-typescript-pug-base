<template>
  <img :src="src" alt="circulo-progreso" width="60" />
</template>

<script>
import { computed } from '@vue/runtime-core';
import svgOfArc from '../utils/svgGenerator';
import { svgOfArcGlobal } from '../utils/svgGenerator';

export default {
  name: 'ProgressCircle',
  props: {
    percent: Number,
    global: Boolean,
  },
  setup(props) {
    const src = computed(() =>
      props.global
        ? `data:image/svg+xml;base64,${svgOfArcGlobal(props.percent)}`
        : `data:image/svg+xml;base64,${svgOfArc(props.percent)}`,
    );

    return { src };
  },
};
</script>

<style></style>
