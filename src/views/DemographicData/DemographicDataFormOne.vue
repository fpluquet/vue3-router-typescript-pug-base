<template>
  <div class="field">
    <div class="control has-icons-right">
      <input
        @blur="saveNF"
        class="input"
        type="text"
        placeholder="Nombre fantasia"
        v-model="formData.nombreFantasia"
      />
    </div>
  </div>
  <div class="field">
    <div class="control has-icons-right">
      <input
        class="input"
        type="text"
        placeholder="Razon social"
        v-model="formData.razonSocial"
      />
    </div>
  </div>
  <div class="field">
    <div class="control has-icons-right">
      <input
        class="input"
        type="text"
        placeholder="Rubro"
        v-model="formData.rubro"
      />
    </div>
    <p v-show="formError.rut" class="help is-danger">{{ formError.rut }}</p>
  </div>
  <div class="field">
    <div class="control has-icons-right">
      <input
        @change="formError.url = null"
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
import { ref, onMounted } from "vue";
export default {
  name: "DemographicDataFormOne",
  components: {},
  setup() {
    let formData = {};
    let formError = ref({});
    let messageError = ref("");
    let loading = ref(false);

    const saveNF = () =>
      console.log("send to backend the value ===>> ", formData.nombreFantasia);
    return {
      saveNF,
      formData,
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