<template>
  <div class="field">
    <div class="control has-icons-right">
      <input
        @blur="save({ phone: formData.phone })"
        @onBlur="save"
        class="input field-custom"
        type="text"
        placeholder="Telefono"
        v-model="formData.phone"
      />
    </div>
    <p v-show="formError.tel" class="help is-danger">
      {{ formError.phone }}
    </p>
  </div>
  <div class="field">
    <div class="control has-icons-right">
      <input
        @blur="save({ street: formData.street })"
        class="input field-custom"
        type="text"
        placeholder="Calle"
        v-model="formData.street"
      />
    </div>
  </div>
  <div class="field">
    <div class="control has-icons-right">
      <input
        @blur="save({ local: formData.local })"
        class="input field-custom"
        type="text"
        placeholder="Local"
        v-model="formData.local"
      />
    </div>
  </div>
  <div class="field">
    <div class="control has-icons-right">
      <input
        @blur="save({ region: formData.region })"
        class="input field-custom"
        type="text"
        placeholder="Region"
        v-model="formData.region"
      />
    </div>
    <p v-show="formError.region" class="help is-danger">
      {{ formError.region }}
    </p>
  </div>
  <Button
    :disabled="disabledButton"
    className="mt-5 is-fullwidth is-primary"
    @click="goNext()"
    >Siguiente</Button
  >
</template>

<script>
import { ref, watch, onMounted, toRefs, watchEffect } from 'vue';
import Button from '@/components/Button';

export default {
  name: 'Localization',
  props: {
    formData: Object,
    save: Function,
    goNext: Function,
    cognitoId: String,
  },
  components: { Button },
  setup(props) {
    let formError = ref({});
    let messageError = ref('');
    let loading = ref(false);
    let { phone, street, region, local } = toRefs(props.formData);
    const disabledButton = ref();

    const hasAllCompleted = () =>
      phone.value !== '' &&
      phone.value !== undefined &&
      street.value !== '' &&
      street.value !== undefined &&
      region.value !== '' &&
      region.value !== undefined &&
      local.value !== '' &&
      local.value !== undefined;

    onMounted(async () => {
      if (!hasAllCompleted()) {
        disabledButton.value = true;
      }
    });

    watchEffect(() => {
      if (hasAllCompleted()) {
        disabledButton.value = false;
      } else {
        disabledButton.value = true;
      }
    });

    return {
      formError,
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
