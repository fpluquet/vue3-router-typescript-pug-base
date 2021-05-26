<template>
  <div class="content-title has-text-centered">Bienvenido/a,</div>
  <div class="content-name has-text-centered">
    <span :style="{ color: getColorByAccount(accountType) }" class="name mb-5"
      >{{name}}</span
    >
  </div>
  <ButtonColor
    :class="'is-fullwidth mt-5'"
    :accountType="accountType"
    @click="goToPagoFacil"
  >
    INICIAR SESION
  </ButtonColor>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import ButtonColor from '@/components/ButtonColor';
import { getColorByAccount } from '@/utils/tools';

export default {
  name: 'Login',
  components: {
    ButtonColor,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const name = computed(() => store.state.profile.email);
    const accountType = computed(
      () => router.currentRoute.value.params.accountType,
    );

    const goToPagoFacil = () => {
      console.log('Go To Pago Facil system ??');
    };

    return {
      accountType,
      getColorByAccount,
      goToPagoFacil,
      name,
    };
  },
};
</script>

<style>
.content-title {
  font-size: 20px;
  line-height: 23px;
  color: #707070;
}
.content-name {
  word-wrap: break-word;
}
.name {
  font-weight: bold;
  font-size: 45px;
  line-height: 53px;
}
</style>
