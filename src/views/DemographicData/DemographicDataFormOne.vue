<template>
  <div class="field">
    <div class="control has-icons-right">
      <input
        @blur="save({ fantasyName: formData.fantasyName })"
        class="input field-custom"
        type="text"
        placeholder="Nombre fantasia"
        v-model="formData.fantasyName"
      />
    </div>
  </div>
  <div class="field">
    <div class="control has-icons-right">
      <input
        @blur="save({ socialReason: formData.socialReason })"
        class="input field-custom"
        type="text"
        placeholder="Razon social"
        v-model="formData.socialReason"
      />
    </div>
  </div>
  <div class="field">
    <div class="select is-fullwidth">
      <select
        @change="(ev) => save(ev.target.value)"
        v-model="formData.heading"
        class="field-custom is-fullwidth"
      >
        <option v-for="option in headingOptions" :key="option">{{
          option
        }}</option>
      </select>
    </div>
  </div>
  <div class="field">
    <div class="control has-icons-right">
      <input
        @blur="validateUrl({ url: formData.url })"
        class="input field-custom"
        type="text"
        placeholder="URL"
        v-model="formData.url"
      />
    </div>
    <p v-show="formError.url" class="help is-danger">{{ formError.url }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import * as Yup from 'yup';

export default {
  name: 'DemographicDataFormOne',
  props: {
    formData: Object,
    cognitoId: String,
    save: Function,
  },
  components: {},
  setup(props) {
    let formError = ref({});
    let messageError = ref('');
    let loading = ref(false);
    const headingOptions = ['a', 'b', 'c'];

    //Validation inputs
    let schemaForm = Yup.object().shape({
      url: Yup.string().url('Por favor ingresa una url válida'),
    });

    const validateUrl = async (url) => {
      try {
        await schemaForm.validate(url, { abortEarly: false });
        try {
          props.save(url);
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        error.inner.forEach((err) => {
          formError.value[err.path] = err.message;
        });
      }
    };

    return {
      formError,
      validateUrl,
      headingOptions,
    };
  },
};
</script>

<style lang="scss" scoped>
.field-custom {
  background: #f5f5f5;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #343434 !important;
  border-radius: 0px;
  min-height: 42px;
  border: none;
}
</style>
