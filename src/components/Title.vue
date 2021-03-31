<template>
  <div class="content-title">
    <div class="sub-content-title">
      <div class="title">
        {{ title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Title",
  props: {
    title: String,
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 34px;
  line-height: 40px;
  text-align: center;
  color: #343434;
}
</style>