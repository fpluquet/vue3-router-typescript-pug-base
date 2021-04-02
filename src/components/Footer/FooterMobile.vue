<template>
  <div class="footer">
    <div class="column">
      <span class="text"> Reiniciar proceso de registro</span>
    </div>
    <div class="column"><span class="text">Ayuda</span></div>
    <div class="column"><span class="text">Términos y condiciones</span></div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .text {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #343434;
  }
}
</style>
