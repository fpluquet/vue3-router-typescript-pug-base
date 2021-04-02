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
  },
};
</script>

<style lang="scss" scoped>
.button-link {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  text-decoration-line: underline;
}
.button {
  & {
    border: none;
  }
}
</style>
