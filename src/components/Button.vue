<template>
  <button
    :type="type"
    :class="[className, {'is-loading': loading}]"
    class="button custom-button"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    type: String,
    className: String,
    loading: Boolean,
  },
  setup() {},
};
</script>

<style lang="scss" scoped>
.custom-button {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #ffffff !important;
  background-color: #1d9add;
  min-height: 42px;
  border-radius: 0px;
}
</style>
