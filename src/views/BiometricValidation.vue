<template>
  <Title class="mb-6" :title="'Validación biométrica'" />

  <!-- <Button
    v-show="!showNextButton"
    className="mt-5 is-fullwidth is-primary"
    @click="validate"
    >Validar</Button
  > -->
</template>

<script>
import Title from '@/components/Title';
export default {
  props: {
    title: String,
    showNextButton: Boolean,
  },
  components: {
    Title,
  },
  setup(props) {
    const validate = () => {
      console.log('call jumio service');
    };
  },
};
</script>

<style></style>
