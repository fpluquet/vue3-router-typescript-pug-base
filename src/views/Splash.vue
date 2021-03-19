<template>
  <div class="splash">
    <div class="columns is-centered">
      <div
        class="column is-6-desktop is-4-widescreen is-3-fullhd field mb-1 content-splash"
      >
        <div class="columns is-centered">
          <div class="column img">
            <img src="@/res/pago_facil_banner.svg" width="252" height="62" />
          </div>
        </div>
        <div class="columns is-centered">
          <div class="column is-10 field mb-1 custom-column">
            <template v-if="!accountType">
              <div class="columns">
                <div class="column">
                  <Button @click="show" className="button is-fullwidth"
                    >Seleccionar tipo de cuenta
                    <fa
                      v-if="showButton"
                      icon="chevron-down"
                      width="20"
                      type="fas"
                      class="fa-chevron"
                    ></fa>
                    <fa
                      v-else
                      icon="chevron-up"
                      width="20"
                      type="fas"
                      class="fa-chevron"
                    ></fa>
                  </Button>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <Button
                    @click="setAccountType(PERSONA)"
                    className="button is-fullwidth persona"
                    :class="{ hide: showButton }"
                  >
                    Persona
                  </Button>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <Button
                    @click="setAccountType(EMPRESA)"
                    className="button is-fullwidth empresa"
                    :class="{ hide: showButton }"
                  >
                    Empresa
                  </Button>
                </div>
              </div>
            </template>
            <router-view v-else></router-view>
          </div>
        </div>
      </div>
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
  display: flex;
  justify-content: center;
  flex-direction: column;
  justify-content: center;
  background: #ffffff;
  box-shadow: 0px 30px 30px rgba(0, 0, 0, 0.12);
  border-radius: 15px;
  height: 600px;
  padding-left: 50px;
  padding-right: 50px;
  max-width: 500px;
  margin: auto;
}
.splash {
  display: flex;
  flex: 1;
  min-width: 300px;
  justify-content: center;
  flex-direction: column;
  background: #00378f;

  .field {
    margin-bottom: 0px;
  }
  .custom-column {
    .column {
      padding: 1px !important;
    }
  }

  .img {
    margin-bottom: 50px;
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
    position: absolute;
    top: 10px;
    right: 10px;
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