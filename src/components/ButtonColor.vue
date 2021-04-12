<template>
  <button
    :type="type"
    class="button custom-button"
    :class="[getClassByAccount(account), { 'is-loading': loading }]"
  >
    <slot />
  </button>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { getClassByAccount } from '@/utils/tools';

export default {
  name: 'Button',
  props: {
    type: String,
    className: String,
    account: String,
    loading: Boolean,
  },
  setup() {
    const store = useStore();
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
