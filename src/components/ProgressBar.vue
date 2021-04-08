<template>
  <img :src="src" />
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { svgProgressBar } from '@/utils/svgGenerator';
import { PERSONA } from '@/utils/constants';

export default {
  name: 'ProgressBar',
  setup() {
    const store = useStore();
    const accountType = computed(() => store.state.account.type);
    const globalPercentage = computed(() => store.state.globalPercentage);

    const src = computed(() => {
      const color = accountType.value === PERSONA ? '#3D90E0' : '#6AC24B';
      return `data:image/svg+xml;base64,${svgProgressBar(
        globalPercentage.value,
        color,
      )}`;
    });
    return {
      src,
      accountType,
      globalPercentage,
    };
  },
};
</script>

<style lang="scss" scoped>
.persona {
  &::-webkit-progress-value {
    background-color: #1d9add !important;
  }
  &::-moz-progress-bar {
    background-color: #1d9add !important;
  }
  &::-ms-fill {
    background-color: #1d9add !important;
  }
  &:indeterminate {
    background-image: linear-gradient(
      to right,
      #1d9add 30%,
      #1d9add 30%
    ) !important;
  }
}
.empresa {
  &::-webkit-progress-value {
    background-color: #19c37f !important;
  }
  &::-moz-progress-bar {
    background-color: #19c37f !important;
  }
  &::-ms-fill {
    background-color: #19c37f !important;
  }
  &:indeterminate {
    background-image: linear-gradient(
      to right,
      #19c37f 30%,
      #19c37f 30%
    ) !important;
  }
}
</style>
