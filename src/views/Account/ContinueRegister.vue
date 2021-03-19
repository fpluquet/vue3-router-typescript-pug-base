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
        <Button :type="'submit'" :class="'button is-fullwidth mt-5'"
          >Continuar</Button
        >
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import * as Yup from "yup";
import Button from "../../components/Button";
export default {
  name: "ContinueRegister",
  components: { Button },
  setup() {
    let formData = {};
    let formError = ref({});
    let schemaForm = Yup.object().shape({
      email: Yup.string().email().required(),
    });
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
    };
  },
};
</script>

<style lang="scss" scoped>
</style>