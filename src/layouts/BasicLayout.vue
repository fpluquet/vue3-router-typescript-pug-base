<!--<template lang=pug>
.basic-layout
  Menu
    .container
      slot

</template>-->
<template>
  <div class="basic-layout">
    <Menu />
    <div class="container">
      <!-- <div class="panel-right">pepe</div>
      <div class="panel-left">pepe2</div> -->
      <slot />
    </div>
    <!-- <SideBar /> -->
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
  height: 100%;
  .custom-content {
    display: flex;
    flex: 1;
    height: 100%;
    // flex-direction: column;
  }
  .panel-right {
    width: 60%;
    display: flex;
    flex: 1;
  }
  .panel-left {
    width: 30%;
  }
}
</style>