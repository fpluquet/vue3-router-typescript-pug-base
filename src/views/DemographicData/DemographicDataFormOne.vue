<template>
  <div class="field">
    <div class="control has-icons-right">
      <input
        @blur="save({ fantasyName: formData.fantasyName })"
        class="input"
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
        class="input"
        type="text"
        placeholder="Razon social"
        v-model="formData.socialReason"
      />
    </div>
  </div>
  <div class="field">
    <div class="control has-icons-right">
      <input
        @blur="save({ heading: formData.heading })"
        class="input"
        type="text"
        placeholder="Rubro"
        v-model="formData.heading"
      />
    </div>
  </div>
  <div class="field">
    <div class="control has-icons-right">
      <input
        @blur="save({ url: formData.url })"
        class="input"
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
