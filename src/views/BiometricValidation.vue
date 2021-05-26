<template>
  <Title class="mb-6" :title="'Validación biométrica'" />
</template>

<script>
import Title from '@/components/Title';
import Button from '@/components/Button';

export default {
  props: {
    title: String,
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
