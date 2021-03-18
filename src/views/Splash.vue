<template>
  <div class="splash">
    <div class="content-splash">
      <div class="img">
        <img src="@/res/pago_facil_banner.svg" width="252" height="62" />
      </div>
      <div v-if="!accountType" class="crear-cuenta are-normal">
        <Button @click="show" className="button is-fullwidth"
          >Seleccionar tipo de cuenta
          <fa
            v-if="showButton"
            icon="chevron-down"
            width="12"
            type="fas"
            class="fa-chevron pull-right"
          ></fa>
          <fa
            v-else
            icon="chevron-up"
            width="12"
            type="fas"
            class="fa-chevron pull-right"
          ></fa>
        </Button>
        <Button
          @click="setAccountType(PERSONA)"
          className="button is-fullwidth persona"
          :class="{ hide: showButton }"
        >
          Persona
        </Button>
        <Button
          @click="setAccountType(EMPRESA)"
          className="button is-fullwidth empresa"
          :class="{ hide: showButton }"
        >
          Empresa
        </Button>
      </div>
      <router-view v-else></router-view>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { PERSONA, EMPRESA } from "../utils/constants";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import BasicLayout from "@/layouts/BasicLayout.vue";
import AccountForm from "@/views/AccountForm";
import Button from "@/components/Button";

export default {
  name: "crearCuenta",
  components: {
    BasicLayout,
    AccountForm,
    Button,
  },
  setup() {
    let showButton = ref(false);
    let accountType = ref(null);
    const store = useStore();
    const router = useRouter();

    accountType = computed(() => store.state.account.type);

    const show = () => (showButton.value = !showButton.value);

    const setAccountType = (type) => {
      store.commit("setAccountType", { accountType: type });
      router.push({ name: "create-account", params: { accountType: type } });
    };

    return {
      show,
      showButton,
      setAccountType,
      EMPRESA,
      PERSONA,
      accountType,
    };
  },
};
</script>

<style lang="scss" scoped>
.content-splash {
  padding: 100px 40px;
  background: #ffffff;
  box-shadow: 0px 30px 30px rgba(0, 0, 0, 0.12);
  border-radius: 15px;
  width: 20%;
}
.splash {
  justify-content: center;
  align-items: center;
  height: 100vh;
  // width: 500px;
  margin: auto;
  display: flex;
  flex-direction: column;
  flex: 1;

  .img {
    margin-bottom: 20%;
    display: flex;
    justify-content: center;
  }
  .crear-cuenta {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  .fa-chevron {
    margin-left: 12px;
  }
  .hide {
    display: none;
  }
  .button {
    background: #1d9add;
    font-style: normal;
    font-family: Roboto;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #ffffff;
    &.persona {
      background: #ededed;
      color: #7a7a7a !important;
      min-height: 36px;
    }
    &.empresa {
      background: #ededed;
      color: #7a7a7a !important;
      min-height: 36px;
    }
  }
  input.error {
    color: #faa;
    background: #ffeded;
  }
}
</style>