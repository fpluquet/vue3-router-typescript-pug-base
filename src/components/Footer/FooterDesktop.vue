<template>
  <div
    class="custom-footer is-flex is-justify-content-center is-align-items-center"
    :style="{ background: getColorByAccount('persona') }"
  >
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
import { getColorByAccount } from '@/utils/tools';
export default {
  name: 'Footer',
  components: {
    ButtonLink,
  },
  setup() {
    return {
      getColorByAccount,
    };
  },
};
</script>

<style lang="scss" scoped>
.custom-footer {
  flex: 1;
  margin-top: 100px;
}
.text {
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;
}
</style>
