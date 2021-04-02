<template>
  <div class="footer">
    <div class="columns">
      <div class="col">
        <ButtonLink :style="{ 'margin-top': '0px' }"
          ><span class="text">Reiniciar proceso de registro</span></ButtonLink
        >
      </div>
      <div class="col">
        <span class="text">|</span>
      </div>
      <div class="col">
        <ButtonLink :style="{ 'margin-top': '0px' }"
          ><span class="text">Ayuda</span></ButtonLink
        >
      </div>
      <div class="col">
        <span class="text">|</span>
      </div>
      <div class="col">
        <ButtonLink :style="{ 'margin-top': '0px' }"
          ><span class="text">Términos y condiciones</span></ButtonLink
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
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e5e5e5;
  flex: 1;
  // flex: 1;
  .text {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #343434;
  }
  .col {
    padding: 0.3rem;
    text-align: center;
    justify-content: center;
    align-items: center;
    display: flex;
  }
}
</style>
