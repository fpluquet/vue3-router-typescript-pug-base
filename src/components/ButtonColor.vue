<template>
  <button
    :type="type"
    class="button custom-button"
    :class="[getClassByAccount(accountType), { 'is-loading': loading }]"
  >
    <slot />
  </button>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { getClassByAccount } from '@/utils/tools';

export default {
  name: 'Button',
  props: {
    type: String,
    className: String,
    accountType: String,
    loading: Boolean,
  },
  setup() {
    const store = useStore();

    // const account = computed(() => store.state.profile.isCompany);
    return { getClassByAccount };
  },
};
</script>

<style lang="scss" scoped>
.custom-button {
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #ffffff !important;
  min-height: 42px;
  border-radius: 0px;
}
</style>
