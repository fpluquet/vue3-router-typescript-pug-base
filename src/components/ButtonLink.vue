<template>
  <div
    :style="{
      display: 'flex',
      justifyContent: 'center',
      'margin-top': '20px',
      cursor: 'pointer',
    }"
    :class="{ 'is-loading': loading }"
  >
    <span
      @click="handleClick"
      :class="{ 'is-loading': loading }"
      class="button button-link"
      :style="{
        'text-decoration': decorationTextUnderling ? 'underline' : 'none',
      }"
      ><slot
    /></span>
  </div>
</template>

<script>
export default {
  name: 'ButtonLink',
  props: {
    handleClick: Function,
    loading: Boolean,
    decorationTextUnderling: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.button-link {
  font-size: 14px;
  line-height: 16px;
  text-align: center;
}
.button {
  & {
    border: none;
    background-color: transparent;
  }
}
</style>
