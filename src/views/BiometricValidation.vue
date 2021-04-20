<template>
  <Title class="mb-6" :title="'Validación biométrica'" />

  <!-- <Button
    :disabled="disabledButton"
    className="mt-5 is-fullwidth is-primary"
    @click="goNext"
    >Finalizar</Button
  > -->
</template>

<script>
import Title from '@/components/Title';
import Button from '@/components/Button';

export default {
  props: {
    title: String,
    showNextButton: Boolean,
    goNext: Function,
  },
  components: {
    Title,
    Button,
  },
  setup(props) {
    const validate = () => {
      console.log('call jumio service');
    };
  },
};
</script>

<style></style>
