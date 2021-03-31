<template>
  <div class="columns">
    <div class="column">
      <div class="notification notif" v-show="!removeNotif">
        <button
          type="button"
          @click="removeNotif = true"
          class="delete"
        ></button>
        <div class="content-text">
          <span v-if="sentCodeMessage" class="text"
            >Se ha enviado un mail de verificación de la cuenta con un
            código.</span
          >
          <span v-else class="text"
            >Se ha reenviado un mail de verificación de la cuenta con un
            código.</span
          >
        </div>
      </div>
      <form @submit.prevent="confirmCode">
        <div class="field">
          <div class="control has-icons-right">
            <input
              class="input"
              type="code"
              placeholder="Codigo"
              v-model="formData.code"
              :class="{ 'is-danger': formError.code }"
            />
          </div>
          <p v-show="formError.code" class="help is-danger">
            {{ formError.code }}
          </p>
        </div>
        <Button :type="'submit'" :class="'button is-fullwidth mt-5'"
          >Confirmar</Button
        >
      </form>
      <ButtonLink :handleClick="resendCode">Reenviar Codigo</ButtonLink>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import * as Yup from "yup";
import Button from "../../components/Button";
import ButtonLink from "../../components/ButtonLink";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import * as services from "@/services/api/account.service";
export default {
  name: "CodeInput",
  components: { Button, ButtonLink },
  setup() {
    let store = useStore();
    let formData = {};
    let formError = ref({});
    let router = useRouter();
    let removeNotif = ref(false);
    let sentCodeMessage = ref(true);

    // validation inputs.
    let schemaForm = Yup.object().shape({
      code: Yup.string()
        .required("El código es requerido.")
        .length(6, "El código debe contenter 6 caracteres."),
    });

    let accountType = computed(
      () => router.currentRoute.value.params.accountType
    );

    let userEmail = computed(() => store.state.account.userEmail);

    let cognitoId = computed(() => router.currentRoute.value.params.cognitoId);

    // Request to api
    const resendCode = async () => {
      try {
        formData.email = userEmail.value;
        formData.cognitoId = cognitoId.value;
        // await services.resendCode(formData);
        removeNotif.value = false;
        sentCodeMessage.value = false;
      } catch (error) {
        console.log(error);
      }
    };

    // Request to api
    const confirmCode = async () => {
      try {
        await schemaForm.validate(formData, { abortEarly: false });
        try {
          await services.confirmCode(formData, cognitoId.value);
          store.commit("setCognitoId", { cognitoId: cognitoId.value });

          router.push({
            name: "Dashboard",
            params: { accountType: accountType },
          });
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
        error.inner.forEach((error) => {
          formError.value[error.path] = error.message;
        });
      }
    };
    return {
      formData,
      formError,
      confirmCode,
      resendCode,
      removeNotif,
      sentCodeMessage,
    };
  },
};
</script>

<style lang="scss" scoped>
.notif {
  background: #edf7e9;
  text-align: center;
}
.text {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 133.19%;

  color: #6ac24b;
}
.remove-notif {
  display: none;
}
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
</style>