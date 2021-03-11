<template>
  <div class="splash">
    <div class="content-splash">
      <div class="img">
        <img src="@/res/pago_facil.svg" width="252" height="62" />
      </div>
      <div v-show="!accountType" class="crear-cuenta are-normal">
        <Button @click="show" className="button is-fullwidth"
          >Crear Cuenta
          <fa
            icon="chevron-down"
            width="12"
            type="fas"
            class="fa-chevron-down pull-right"
          ></fa
        ></Button>
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
      <div v-show="accountType">
        <AccountForm />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { PERSONA, EMPRESA } from "../utils/constants";
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

    const show = () => (showButton.value = !showButton.value);
    const setAccountType = (type) => {
      console.log(type);
      return (accountType.value = type);
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
  padding: 60px 60px;
  background: white;
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
  }
  .crear-cuenta {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  .fa-chevron-down {
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