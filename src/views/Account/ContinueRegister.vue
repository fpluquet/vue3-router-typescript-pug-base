<template>
  <div class="columns">
    <div class="column">
      <form @submit.prevent="continueRegister">
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
        <ButtonColor :type="'submit'" :class="'is-fullwidth mt-5'"
          >Continuar</ButtonColor
        >
      </form>
      <ButtonLink :handleClick="goBack">VOLVER</ButtonLink>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import * as Yup from 'yup';
import ButtonColor from '../../components/ButtonColor';
import ButtonLink from '../../components/ButtonLink';
import { useRouter } from 'vue-router';
export default {
  name: 'ContinueRegister',
  components: { ButtonColor, ButtonLink },
  setup() {
    let formData = {};
    let formError = ref({});
    let router = useRouter();

    let schemaForm = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
    });

    const goBack = () => {
      router.go(-1);
    };
    const continueRegister = async () => {
      try {
        await schemaForm.validate(formData, { abortEarly: false });
        // try {
        //   //   router.push({ name: "getData" });
        // } catch (error) {
        //   console.log(error);
        // }
      } catch (error) {
        error.inner.forEach((error) => {
          formError.value[error.path] = error.message;
        });
      }
    };
    return {
      formData,
      formError,
      continueRegister,
      goBack,
    };
  },
};
</script>

<style lang="scss" scoped></style>
