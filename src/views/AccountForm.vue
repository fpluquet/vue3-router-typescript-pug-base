<template>
  <div class="columns">
    <div class="column">
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
          <div class="control">
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
          <div class="control">
            <input
              class="input"
              type="text"
              :placeholder="accountType === EMPRESA ? 'R.U.T Persona' : 'R.U.T'"
              v-model="formData.rut"
              :class="{ 'is-danger': formError.rut }"
            />
            <div class="container-icon">
              <div
                :data-tooltip="
                  accountType === EMPRESA
                    ? 'Ingrese el RUT de la Persona que registrara la empresa.'
                    : 'Ingrese el RUT de la persona'
                "
                :style="{ color: 'rgb(74,74,74)' }"
              >
                <fa
                  icon="info-circle"
                  width="18"
                  type="fas"
                  class="pull-right"
                ></fa>
              </div>
            </div>
          </div>
          <p v-show="formError.rut" class="help is-danger">
            El campo RUT no es correcto.
          </p>
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
          <p v-show="formError.rut" class="help is-danger">
            El RUT de las empresa no es correcto
          </p>
        </div>
        <ButtonColor
          :account="accountType"
          :type="'submit'"
          :class="'button is-fullwidth mt-5'"
          >Crear Cuenta</ButtonColor
        >
      </form>
      <ButtonLink :handleClick="goBack">VOLVER</ButtonLink>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import * as Yup from "yup";
import ButtonLink from "@/components/ButtonLink";
import ButtonColor from "@/components/ButtonColor";
import { PERSONA, EMPRESA } from "../utils/constants";

export default {
  name: "AccountForm",
  components: {
    ButtonColor,
    ButtonLink,
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
    accountType = computed(() => router.currentRoute.value.params.accountType);

    const goBack = () => {
      store.commit("setAccountType", { accountType: null });
      router.push({ name: "select-account-type" });
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
        try {
          createAccount(formData.value);
        } catch (error) {
          console.log(error);
          messageError.value = error.message;
        }
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
      goBack,
      inputType,
      accountType,
      PERSONA,
      EMPRESA,
    };
  },
};
</script>

<style lang="scss" scoped>
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

.container-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
</style>