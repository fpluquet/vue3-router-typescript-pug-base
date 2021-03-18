<template>
  <div class="create-account">
    <form @submit.prevent="onCreateAccount">
      <div class="field">
        <div class="control has-icons-right">
          <input
            class="input"
            type="email"
            placeholder="Email"
            v-model="formData.email"
            :class="{ 'is-danger': formError.email }"
          />
        </div>
        <p v-show="formError.email" class="help is-danger">
          El campo E-mail no es correcto.
        </p>
      </div>
      <div class="field">
        <div class="control has-icons-right" :style="{ display: 'flex' }">
          <input
            class="input"
            :type="inputType ? 'password' : 'text'"
            placeholder="Contraseña"
            v-model="formData.password"
            :class="{ 'is-danger': formError.password }"
          />
          <div class="container-icon" @click="inputType = !inputType">
            <fa icon="eye" width="18" type="fas" class="pull-right"></fa>
          </div>
        </div>
        <p v-show="formError.password" class="help is-danger">
          El campo Contraseña no es correcto.
        </p>
      </div>
      <div class="field">
        <div class="control has-icons-right">
          <input
            class="input"
            type="text"
            :placeholder="accountType === EMPRESA ? 'R.U.T Persona' : 'R.U.T'"
            v-model="formData.rut"
            :class="{ 'is-danger': formError.rut }"
          />
          <div class="container-icon">
            <a
              class="has-tooltip-right"
              data-tooltip="Ingrese el RUT de la persona que registrará la empresa."
              :style="{ color: 'rgb(74,74,74)' }"
            >
              <fa
                data-tooltip="Tooltip Text"
                icon="info-circle"
                width="18"
                type="fas"
                class="pull-right"
              ></fa>
            </a>
          </div>
        </div>
        <p v-show="formError.rut" class="help is-danger">{{ formError.rut }}</p>
      </div>
      <div v-if="accountType === EMPRESA" class="field">
        <div class="control has-icons-right">
          <input
            class="input"
            type="text"
            placeholder="R.U.T Empresa"
            v-model="formData.rut"
            :class="{
              'is-danger': formError.rut,
            }"
          />
          <div class="container-icon">
            <a
              class="has-tooltip-right"
              data-tooltip="Ingrese el RUT de la Empresa."
              :style="{ color: 'rgb(74,74,74)' }"
            >
              <fa
                data-tooltip="Tooltip Text"
                icon="info-circle"
                width="18"
                type="fas"
                class="pull-right"
              ></fa>
            </a>
          </div>
        </div>
        <p v-show="formError.rut" class="help is-danger">{{ formError.rut }}</p>
      </div>
      <!-- <ButtonColor
        :type="'submit'"
        :className="'button is-fullwidth mt-5'"
        :style="{ color: accountType === EMPRESA ? '#6AC24B' : '#1D9ADD' }"
        >Crear Cuenta</ButtonColor
      > -->
      <ButtonColor :type="'submit'" :class="'button is-fullwidth mt-5'"
        >Crear Cuenta</ButtonColor
      >
    </form>
    <div
      :style="{
        display: 'flex',
        justifyContent: 'center',
        'margin-top': '20px',
        cursor: 'pointer',
      }"
    >
      <span @click="back" class="button-link">VOLVER</span>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import * as Yup from "yup";
import Button from "@/components/Button";
import ButtonColor from "@/components/ButtonColor";
import { PERSONA, EMPRESA } from "../utils/constants";

export default {
  name: "AccountForm",
  components: {
    Button,
    ButtonColor,
  },
  setup() {
    let formData = {};
    let formError = ref({});
    let messageError = ref("");
    let loading = ref(false);
    const router = useRouter();
    const store = useStore();
    let accountType = ref(null);
    let inputType = ref(true);

    let schemaForm = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
      rut: Yup.string().required(),
    });

    accountType = computed(() => store.state.account.type);

    const back = () => {
      store.commit("setAccountType", { accountType: null });
      router.push({ name: "Home" });
    };

    const onCreateAccount = async () => {
      formError.value = {};
      loading.value = true;
      messageError.value = "";
      try {
        await schemaForm.validate(formData, { abortEarly: false });
        router.push({
          name: "Dashboard",
          params: { accountType },
        });
        // try {
        //   const result = await reauthenticate(formData.password);
        //   if (result) {
        //     auth.currentUser.updateEmail(formData.email);
        //     auth.signOut();
        //   }
        // } catch (error) {
        //   console.log(error);
        //   messageError.value = error.message;
        // }
      } catch (error) {
        error.inner.forEach((error) => {
          formError.value[error.path] = error.message;
        });
      }
      loading.value = false;
    };
    return {
      onCreateAccount,
      formData,
      formError,
      loading,
      back,
      inputType,
      accountType,
      PERSONA,
      EMPRESA,
    };
  },
};
</script>

<style lang="scss" scoped>
.create-account {
  .input {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: #343434 !important;
    background: #f0f0f0 !important;
    border-radius: 0px;
    min-height: 42px;
    border: none;
  }
  .button-link {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    text-decoration-line: underline;
  }
  .container-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
}
</style>