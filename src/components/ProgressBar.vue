<template>
  <!-- <img :src="src" /> -->
  <img src="/progress-general-bar.svg" alt="" height="20" width="450" />
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { svgProgressBar } from '@/utils/svgGenerator';
import { getColorByAccount } from '@/utils/tools';

export default {
  name: 'ProgressBar',
  setup() {
    const store = useStore();
    const accountType = computed(() => store.state.account.type); // TODO get accountType from profile
    const globalPercentage = computed(() => store.state.globalPercentage);

    const src = computed(() => {
      return `data:image/svg+xml;base64,${svgProgressBar(
        globalPercentage.value,
        getColorByAccount(accountType.value),
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

<style lang="scss" scoped></style>
