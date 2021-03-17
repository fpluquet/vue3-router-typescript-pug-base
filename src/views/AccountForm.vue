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
          {{ formError.email }}
        </p>
      </div>
      <div class="field">
        <div class="control has-icons-right">
          <input
            class="input"
            type="password"
            placeholder="Password"
            v-model="formData.password"
            :class="{ 'is-danger': formError.password }"
          />
        </div>
        <p v-show="formError.password" class="help is-danger">
          {{ formError.password }}
        </p>
      </div>
      <div class="field">
        <div class="control has-icons-right">
          <input
            class="input"
            type="text"
            placeholder="RUT"
            v-model="formData.rut"
            :class="{ 'is-danger': formError.rut }"
          />
        </div>
        <p v-show="formError.rut" class="help is-danger">{{ formError.rut }}</p>
      </div>
      <Button :type="'submit'" :className="'button is-fullwidth mt-5'"
        >Crear Cuenta</Button
      >
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import * as Yup from "yup";
import Button from "@/components/Button";

export default {
  name: "AccountForm",
  props: {
    accountType: String,
  },
  components: {
    Button,
  },
  setup(props) {
    let formData = {};
    let formError = ref({});
    let messageError = ref("");
    let loading = ref(false);
    const router = useRouter();

    let schemaForm = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
      rut: Yup.string().required(),
    });

    const onCreateAccount = async () => {
      formError.value = {};
      loading.value = true;
      messageError.value = "";
      try {
        await schemaForm.validate(formData, { abortEarly: false });
        router.push({
          name: "Dashboard",
          params: { accountType: props.accountType },
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
        console.log("e", error);
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
}
</style>