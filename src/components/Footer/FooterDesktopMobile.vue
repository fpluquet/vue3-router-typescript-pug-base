<template>
  <div
    class="custom-footer is-flex is-justify-content-center is-align-items-center"
    :style="{ background: getColorByAccount(PERSONA) }"
  >
    <div class="columns mt-1">
      <div class="is-flex is-justify-content-center is-align-items-center p-0">
        <ButtonLink class="mt-0"
          ><span class="text has-text-centered"
            >Reiniciar proceso de registro</span
          ></ButtonLink
        >
      </div>
      <div
        class="is-flex is-justify-content-center is-align-items-center p-0 is-hidden-mobile"
      >
        <span class="text has-text-centered">|</span>
      </div>
      <div class="is-flex is-justify-content-center is-align-items-center p-0">
        <ButtonLink class="mt-0"
          ><span class="text has-text-centered">Ayuda</span></ButtonLink
        >
      </div>
      <div
        class="is-flex is-justify-content-center is-align-items-center p-0 is-hidden-mobile"
      >
        <span class="text has-text-centered">|</span>
      </div>
      <div class="is-flex is-justify-content-center is-align-items-center p-0">
        <ButtonLink class="mt-0"
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
import { PERSONA } from '@/utils/constants';

export default {
  name: 'Footer',
  components: {
    ButtonLink,
  },
  setup() {
    return {
      getColorByAccount,
      PERSONA,
    };
  },
};
</script>

<style lang="scss" scoped>
.custom-footer {
  flex: 1;
  margin-top: 80px;
}
.text {
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;
}
@media screen and (max-width: 768px) {
  .text {
    font-size: 9px;
    line-height: 11px;
  }
}
</style>
