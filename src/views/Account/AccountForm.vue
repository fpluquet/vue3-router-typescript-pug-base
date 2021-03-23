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
            {{ formError.email }}
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
            {{ formError.password }}
          </p>
        </div>
        <div class="field">
          <div class="control">
            <input
              class="input"
              type="text"
              :placeholder="accountType === EMPRESA ? 'R.U.T Persona' : 'R.U.T'"
              v-model="formData.userRut"
              :class="{ 'is-danger': formError.userRut }"
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
          <p v-show="formError.userRut" class="help is-danger">
            {{ formError.userRut }}
          </p>
        </div>
        <div v-if="accountType === EMPRESA" class="field">
          <div class="control has-icons-right">
            <input
              class="input"
              type="text"
              placeholder="R.U.T Empresa"
              v-model="formData.companyRut"
              :class="{
                'is-danger': formError.companyRut,
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
          <p v-show="formError.companyRut" class="help is-danger">
            {{ formError.companyRut }}
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
import { PERSONA, EMPRESA } from "../../utils/constants";
import * as services from "../../services/api/account.service";
import { validateRut } from "@/utils/validations";

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

    //Validation inputs
    let schemaForm = Yup.object().shape({
      email: Yup.string()
        .email("El campo e-mail no es correcto.")
        .required("Por favor ingresa el email."),
      password: Yup.string()
        .required("Por favor ingresa la contraseña.")
        .matches(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
          "La contraseña debe contener al menos 8 caracteres,uno en mayúsculas, uno en minúsculas, un numero y un carácter especial."
        ),
      userRut: Yup.string()
        .required("Por favor ingresa el Rut de la persona.")
        .test(
          "is-valid-rut",
          "El formato del rut no es válido",
          function (value) {
            return validateRut(value);
          }
        ),
      companyRut:
        accountType === EMPRESA
          ? Yup.string().required("Por favor ingresa el Rut de la empresa.")
          : "",
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
        try {
          formData.isCompany = false;
          if (accountType === EMPRESA) {
            formData.isCompany = true;
          }
          const cognitoId = await services.createAccount(formData);

          router.push({
            name: "code-input",
            params: { cognitoId: "80f20faa-bc1e-4c39-962f-be23b5451778" },
          });
        } catch (error) {
          console.log(error);
          messageError.value = error.message;
        }
      } catch (error) {
        error.inner.forEach((error) => {
          console.log(error.message);
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