 <template>
  <div class="columns">
    <div class="column custom-column">
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
    <div class="column custom-column">
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
    <div class="column custom-column">
      <Button
        @click="setAccountType(EMPRESA)"
        className="button is-fullwidth empresa"
        :class="{ hide: showButton }"
      >
        Empresa
      </Button>
    </div>
  </div>
  <div class="columns">
    <div class="column custom-column has-text-centered mt-4">
      <span class="text"
        >Continua con tu proceso de registro
        <router-link :to="{ name: 'continue-register' }"
          >aquí</router-link
        ></span
      >
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { PERSONA, EMPRESA } from "../../utils/constants";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import BasicLayout from "@/layouts/BasicLayout.vue";
import AccountForm from "@/views//Account/AccountForm";
import Button from "@/components/Button";

export default {
  name: "SelectAccountType",
  components: {
    BasicLayout,
    AccountForm,
    Button,
  },
  setup() {
    let showButton = ref(false);
    const store = useStore();
    const router = useRouter();

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
.hide {
  display: none;
}
.custom-column {
  .column {
    padding: 1px !important;
  }
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

.text {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  text-align: center;
  color: #000000;
}
</style>