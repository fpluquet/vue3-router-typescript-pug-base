<template>
  <template class="show-mobile">
    <FooterMobile />
  </template>
  <template class="show-desktop">
    <FooterDesktop />
  </template>
</template>

<script>
import FooterMobile from "./FooterMobile";
import FooterDesktop from "./FooterDesktop";
export default {
  components: {
    FooterMobile,
    FooterDesktop,
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 769px) {
  .show-desktop {
    display: flex;
  }
  .show-mobile {
    display: none;
  }
}
@media screen and (max-width: 769px) {
  .show-desktop {
    display: none;
  }
  .show-mobile {
    display: flex;
  }
}
</style>