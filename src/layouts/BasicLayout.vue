<!--<template lang=pug>
.basic-layout
  Menu
    .container
      slot
 
</template>-->
<template>
  <div class="basic-layout">
    <Menu class="mt-0 mb-4" />
    <div class="custom-container">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script>
import Menu from '../components/Menu';
import Footer from '../components/Footer/Footer';

export default {
  name: 'BasicLayout',
  components: { Menu, Footer },
};
</script>

<style lang="scss" scoped>
.basic-layout {
  height: 100vh !important;
  display: flex;
  flex: 1;
  flex-direction: column;
  .custom-container {
    display: flex;
    // height: 65vh !important;
    flex: 1;
  }
}
</style>
