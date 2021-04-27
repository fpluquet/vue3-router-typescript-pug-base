<template>
  <div class="columns">
    <div class="column">
      <Notification :message="message" v-show="message !== ''" />
      <form @submit.prevent="confirmCode">
        <div class="field">
          <div class="control has-icons-right">
            <input
              class="input"
              type="code"
              placeholder="Código"
              v-model="formData.code"
              :class="{ 'is-danger': formError.code }"
            />
          </div>
          <p v-show="formError.code" class="help is-danger">
            {{ formError.code }}
          </p>
        </div>
        <ButtonColor
          :accountType="accountType"
          :type="'submit'"
          :class="'is-fullwidth mt-5'"
          :loading="loading"
          >Confirmar</ButtonColor
        >
      </form>
      <ButtonLink
        :decorationTextUnderling="true"
        :handleClick="resendCode"
        :loading="loadingResendCode"
        >Reenviar Código</ButtonLink
      >
      <ButtonLink :decorationTextUnderling="true" :handleClick="goBack"
        >VOLVER</ButtonLink
      >
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import * as Yup from 'yup';
import { useRouter } from 'vue-router';
import * as services from '@/services/api/account.service';
import ButtonColor from '@/components/ButtonColor.vue';
import ButtonLink from '@/components/ButtonLink.vue';
import { ClientError } from '@/utils/exceptions';
import { INVALID_CODE, FIRST_WIZARD_STEP } from '@/utils/constants';
import Notification from '@/components/Notification';

export default {
  name: 'CodeInput',
  components: { ButtonColor, ButtonLink, Notification },
  setup() {
    const store = useStore();
    const formData = ref({});
    const formError = ref({});
    const router = useRouter();
    const loading = ref(false);
    const loadingResendCode = ref(false);
    const message = ref(
      'Se ha enviado un mail de verificación de la cuenta con un código.',
    );

    // validation inputs.
    const schemaForm = Yup.object().shape({
      code: Yup.string()
        .required('El código es requerido.')
        .length(6, 'El código debe contenter 6 caracteres.'),
    });

    const accountType = computed(
      () => router.currentRoute.value.params.accountType,
    );

    const goBack = () => {
      router.push({ name: 'create-account' });
    };

    const cognitoId = computed(
      () => router.currentRoute.value.params.cognitoId,
    );

    watch(
      formData,
      (now, prev) => {
        try {
          formError.value = {};
        } catch (error) {
          console.log(error);
        }
      },
      { deep: true },
    );

    // Request to api
    const resendCode = async () => {
      message.value = '';
      try {
        loadingResendCode.value = true;
        await services.resendCode(cognitoId.value);
        message.value =
          'Se ha reenviado un mail de verificación de la cuenta con un código.';
      } catch (error) {
        console.log(error);
      }
      loadingResendCode.value = false;
    };

    // Request to api
    const confirmCode = async () => {
      try {
        await schemaForm.validate(formData.value, { abortEarly: false });
        try {
          loading.value = true;
          await services.confirmCode(formData.value, cognitoId.value);
          store.commit('setCognitoId', { cognitoId: cognitoId.value });
          router.push({
            name: 'Auth',
            params: { cognitoId: cognitoId.value },
          });
        } catch (error) {
          if (error instanceof ClientError) {
            if (error.code === INVALID_CODE) {
              messageError.value = errorCodes.get(error.code);
            }
          }
        }
        loading.value = false;
      } catch (error) {
        console.log(error);
        error.inner.forEach((err) => {
          formError.value[err.path] = err.message;
        });
      }
    };
    return {
      loading,
      loadingResendCode,
      formData,
      formError,
      confirmCode,
      resendCode,
      message,
      goBack,
      accountType,
    };
  },
};
</script>

<style lang="scss" scoped>
.input {
  font-size: 14px;
  line-height: 16px;
  color: #343434 !important;
  background: #f0f0f0 !important;
  border-radius: 0px;
  min-height: 42px;
  border: none;
}
</style>
