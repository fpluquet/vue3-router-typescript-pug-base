<template>
  <progress
    class="progress is-small"
    :class="accountType"
    :value="percentaje"
    max="100"
  ></progress>
</template>

<script>
export default {
  name: "ProgressBar",
  props: {
    percentaje: String,
    accountType: String,
  },
  setup(props) {},
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