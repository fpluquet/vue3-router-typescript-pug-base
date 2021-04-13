<template>
  <div class="columns">
    <div class="column custom-column">
      <Button @click="setAccountType(PERSONA)" className="is-fullwidth persona">
        Crear Persona
      </Button>
    </div>
  </div>
  <div class="columns">
    <div class="column custom-column">
      <Button @click="setAccountType(EMPRESA)" className="is-fullwidth empresa">
        Crear Empresa
      </Button>
    </div>
  </div>
  <div class="columns">
    <div class="column custom-column has-text-centered mt-4">
      <span class="text has-text-centered"
        >Continua con tu proceso de registro
        <router-link :to="{ name: 'continue-register' }"
          >aquí</router-link
        ></span
      >
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { PERSONA, EMPRESA } from '../../utils/constants';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import BasicLayout from '@/layouts/BasicLayout.vue';
import AccountForm from '@/views//Account/AccountForm';
import Button from '@/components/Button';

export default {
  name: 'SelectAccountType',
  components: {
    BasicLayout,
    AccountForm,
    Button,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const setAccountType = (type) => {
      store.commit('setAccountType', { accountType: type });
      router.push({ name: 'create-account', params: { accountType: type } });
    };

    return {
      setAccountType,
      EMPRESA,
      PERSONA,
    };
  },
};
</script>

<style lang="scss" scoped>
.fa-chevron {
  position: absolute;
  top: 10px;
  right: 10px;
}
.custom-column {
  .column {
    padding: 0.5rem !important;
  }
}
.button {
  background: #1d9add;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #ffffff;
  &.persona {
    background: #ededed;
    color: #7a7a7a !important;
    min-height: 36px;
    &:hover {
      background-color: #3d90e0 !important;
      color: white !important;
    }
  }
  &.empresa {
    background: #ededed;
    color: #7a7a7a !important;
    min-height: 36px;
    &:hover {
      background-color: #6ac24b !important;
      color: white !important;
    }
  }
}
input.error {
  color: #faa;
  background: #ffeded;
}

.text {
  font-size: 16px;
  line-height: 16px;
  color: #000000;
}
</style>
