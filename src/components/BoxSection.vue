<template>
  <div class="column box-section">
    <div
      :style="{
        flex: 3,
        'text-align': 'center',
      }"
    >
      <span class="title">{{ title }}</span>
    </div>
    <div
      :style="{
        'background-color': 'green',
        flex: 1,
        'text-align': 'center',
      }"
    >
      circular bar
    </div>
  </div>
</template>

<script>
export default {
  name: "SectionBox",
  props: {
    title: String,
  },
};
</script>

<style lang="scss" scoped>
.box-section {
  // border: 1px solid gray;
  margin-right: 70px;
  height: 100px;
  margin-top: 35px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background: #ffffff;
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.12);
  border-radius: 20px;
}
.title {
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #3d90e0;
}
</style>