<template>
  <img src="@/res/pago_facil_banner.svg"  />
</template>

<script>
import { ref, onMounted } from "vue";
export default {
  props: {
    name: String,
    width: String,
    height: String,
    setup(props) {
      let src = ref("");
      onMounted(() => (src = console.log("@/res/pago_facil_banner.svg")));
      return { src };
    },
  },
};
</script>

<style>
</style>