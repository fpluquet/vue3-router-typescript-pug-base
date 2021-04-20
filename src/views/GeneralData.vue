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
        @change="(ev) => save({ heading: ev.target.value })"
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
        @blur="save({ website: formData.website })"
        class="input field-custom"
        type="text"
        placeholder="URL"
        v-model="formData.website"
      />
    </div>
    <p v-show="formError.website" class="help is-danger">
      {{ formError.website }}
    </p>
  </div>
  <ButtonColor
    :disabled="disabledButton"
    class="mt-5 is-fullwidth"
    @click="goNext()"
    >Siguiente</ButtonColor
  >
</template>

<script>
import { ref, watch, onMounted, toRefs, watchEffect } from 'vue';
import * as Yup from 'yup';
import ButtonColor from '@/components/ButtonColor';

export default {
  name: 'GeneralData',
  props: {
    formData: Object,
    cognitoId: String,
    save: Function,
    goNext: Function,
  },
  components: { ButtonColor },
  setup(props) {
    let formError = ref({});
    let messageError = ref('');
    let loading = ref(false);
    const headingOptions = ['a', 'b', 'c'];
    const disabledButton = ref();

    let { fantasyName, heading, socialReason, website } = toRefs(
      props.formData,
    );

    const hasAllCompleted = () =>
      fantasyName.value !== '' &&
      fantasyName.value !== undefined &&
      socialReason.value !== '' &&
      socialReason.value !== undefined &&
      heading.value !== '' &&
      heading.value !== undefined &&
      website.value!== '' &&
      website.value !== undefined;

    onMounted(async () => {
      if (!hasAllCompleted()) {
        disabledButton.value = true;
      }
    });

    //Validation inputs
    let schemaForm = Yup.object().shape({
      website: Yup.string().url('Por favor ingresa una url válida'),
    });

    const validateUrl = async (website) => {
      try {
        return schemaForm.validate(
          { website: website.value },
          { abortEarly: false },
        );
      } catch (error) {
        throw error;
      }
    };

    watch(
      props.formData,
      (now, prev) => {
        if (props.formData.website) {
          formError.value.website = '';
        }
      },
      { deep: true },
    );

    watchEffect(() => {
      if (hasAllCompleted()) {
        disabledButton.value = false;
      } else {
        disabledButton.value = true;
      }
    });

    watch(website, (now, prev) => {
      validateUrl(website)
        .then((res) => {
          if (hasAllCompleted()) {
            disabledButton.value = false;
          } else {
            disabledButton.value = true;
          }
        })
        .catch((error) => {
          error.inner.forEach((err) => {
            formError.value[err.path] = err.message;
          });
        });
    });

    return {
      formError,
      validateUrl,
      headingOptions,
      disabledButton,
    };
  },
};
</script>

<style lang="scss" scoped>
.field-custom {
  background: #f5f5f5;
  font-size: 14px;
  line-height: 16px;
  color: #343434 !important;
  border-radius: 0px;
  min-height: 42px;
  border: none;
}
</style>
