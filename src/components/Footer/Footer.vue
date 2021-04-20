<template>
  <template class="show-desktop">
    <FooterDesktopMobile />
  </template>
</template>

<script>
import FooterDesktopMobile from './FooterDesktopMobile';
export default {
  components: {
    FooterDesktopMobile,
  },
};
</script>

<style lang="scss" scoped>
.show-desktop {
  display: flex;
  height: 28vh;
  background: #3d90e0 !important;
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
