<template>
  <div>
    <img src="@/res/pago_facil_banner.svg" />
  </div>
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
      onMounted(() => {
        console.log("name");
        src = `@/res/${props.name}.svg`;
      });
      console.log("aca");
      return { src };
    },
  },
};
</script>

<style>
</style>