<template>
  <div class="columns">
    <div class="column">
      <div class="notification notif has-text-centered" v-show="!removeNotif">
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
        <ButtonColor
          :type="'submit'"
          :class="'is-fullwidth mt-5'"
          :loading="loading"
          >Confirmar</ButtonColor
        >
      </form>
      <ButtonLink :handleClick="resendCode" :loading="loadingResendCode"
        >Reenviar Codigo</ButtonLink
      >
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import * as Yup from 'yup';
import { useRouter } from 'vue-router';
import * as services from '@/services/api/account.service';
import ButtonColor from '../../components/ButtonColor.vue';
import ButtonLink from '../../components/ButtonLink.vue';

export default {
  name: 'CodeInput',
  components: { ButtonColor, ButtonLink },
  setup() {
    const store = useStore();
    const formData = {};
    const formError = ref({});
    const router = useRouter();
    const removeNotif = ref(false);
    const sentCodeMessage = ref(true);
    const loading = ref(false);
    const loadingResendCode = ref(false);

    // validation inputs.
    const schemaForm = Yup.object().shape({
      code: Yup.string()
        .required('El código es requerido.')
        .length(6, 'El código debe contenter 6 caracteres.'),
    });

    const accountType = computed(
      () => router.currentRoute.value.params.accountType,
    );

    const cognitoId = computed(
      () => router.currentRoute.value.params.cognitoId,
    );

    // Request to api
    const resendCode = async () => {
      try {
        loadingResendCode.value = true;
        await services.resendCode(cognitoId.value);
        removeNotif.value = false;
        sentCodeMessage.value = false;
      } catch (error) {
        console.log(error);
      }
      loadingResendCode.value = false;
    };

    // Request to api
    const confirmCode = async () => {
      try {
        await schemaForm.validate(formData, { abortEarly: false });
        try {
          loading.value = true;
          await services.confirmCode(formData, cognitoId.value);
          store.commit('setCognitoId', { cognitoId: cognitoId.value });

          router.push({
            name: 'Dashboard',
            // params: { accountType: },
          });
        } catch (error) {
          console.log(error);
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
      removeNotif,
      sentCodeMessage,
    };
  },
};
</script>

<style lang="scss" scoped>
.notif {
  background: #edf7e9;
  // text-align: center;
}
.text {
  font-size: 14px;
  line-height: 133.19%;
  color: #6ac24b;
}
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
