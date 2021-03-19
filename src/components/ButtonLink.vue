<template>
  <div
    :style="{
      display: 'flex',
      justifyContent: 'center',
      'margin-top': '20px',
      cursor: 'pointer',
    }"
  >
    <span @click="handleClick" class="button-link"><slot /></span>
  </div>
</template>

<script>
export default {
  name: "ButtonLink",
  props: {
    handleClick: Function,
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
</style>