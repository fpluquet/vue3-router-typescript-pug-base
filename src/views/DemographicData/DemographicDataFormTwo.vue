<template>
  <div class="field">
    <div class="field">
      <div class="control has-icons-right">
        <input
          @blur="save({ phone: formData.phone })"
          @onBlur="save"
          class="input"
          type="text"
          placeholder="Telefono"
          v-model="formData.phone"
        />
      </div>
      <p v-show="formError.tel" class="help is-danger">
        {{ formError.phone }}
      </p>
    </div>
  </div>
  <div class="field">
    <div class="control has-icons-right">
      <input
        @blur="save({ street: formData.street })"
        class="input"
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
        class="input"
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
        class="input"
        type="text"
        placeholder="Region"
        v-model="formData.region"
      />
    </div>
    <p v-show="formError.region" class="help is-danger">
      {{ formError.region }}
    </p>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'DemographicDataFormTwo',
  props: {
    formData: Object,
  },
  components: {},
  setup() {
    let formError = ref({});
    let messageError = ref('');
    let loading = ref(false);

    return {
      formError,
    };
  },
};
</script>

<style lang="scss" scoped>
.input {
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
