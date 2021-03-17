<!--<template lang=pug>
.basic-layout
  Menu
    .container
      slot

</template>-->
<template>
  <div class="basic-layout">
    <Menu />
    <div class="custom-container">
      <slot />
    </div>
  </div>
</template>


<script>
import Menu from "../components/Menu";
import SideBar from "../components/SideBar";
export default {
  name: "BasicLayout",
  components: { Menu, SideBar },
};
</script>

<style lang="scss" scoped>
.basic-layout {
  display: flex;
  flex: 1;
  flex-direction: column;
  .custom-container {
    height: 100vh !important;
    display: flex;
    flex: 1;
  }
}
@media screen and (max-width: 1024px) {
  .basic-layout {
    display: flex;
    flex: 1;
    flex-direction: row;
  }
}
</style>