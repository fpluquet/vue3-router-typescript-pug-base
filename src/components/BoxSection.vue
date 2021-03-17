<template>
  <div class="column box-section">
    <div
      :style="{
        width: '75%',
        'text-align': 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      }"
    >
      <div :style="{ 'max-width': '60%' }">
        <span class="title">{{ title }}</span>
      </div>
    </div>
    <div :style="{}">
      <img src="@/res/progreso-circular-seccion.svg" alt="circulo-progreso" />
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
  // margin-right: 70px;
  min-height: 143px;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background: #ffffff;
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.12);
  border-radius: 20px;
}
.title {
  font-family: "Roboto";
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #3d90e0;
}
</style>