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
  height: 100%;
}
</style>