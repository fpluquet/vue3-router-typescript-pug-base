<template>
  <div class="footer is-flex  is-justify-content-center is-align-items-center">
    <div class="columns">
      <div class="is-flex is-justify-content-center is-align-items-center p-1">
        <ButtonLink :style="{ 'margin-top': '0px' }"
          ><span class="text has-text-centered"
            >Reiniciar proceso de registro</span
          ></ButtonLink
        >
      </div>
      <div class="is-flex is-justify-content-center is-align-items-center p-1">
        <span class="text has-text-centered">|</span>
      </div>
      <div class="is-flex is-justify-content-center is-align-items-center p-1">
        <ButtonLink :style="{ 'margin-top': '0px' }"
          ><span class="text has-text-centered">Ayuda</span></ButtonLink
        >
      </div>
      <div class="is-flex is-justify-content-center is-align-items-center p-1">
        <span class="text has-text-centered">|</span>
      </div>
      <div class="is-flex is-justify-content-center is-align-items-center p-1">
        <ButtonLink :style="{ 'margin-top': '0px' }"
          ><span class="text has-text-centered"
            >Términos y condiciones</span
          ></ButtonLink
        >
      </div>
    </div>
  </div>
</template>

<script>
import ButtonLink from '@/components/ButtonLink';
export default {
  name: 'Footer',
  components: {
    ButtonLink,
  },
};
</script>

<style lang="scss" scoped>
.footer {
  background: #e5e5e5;
  flex: 1;
  // flex: 1;
  .text {
    font-size: 14px;
    line-height: 16px;
    color: #343434;
  }
}
</style>
