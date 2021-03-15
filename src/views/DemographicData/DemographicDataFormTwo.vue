<template>
  <div class="field">
    <div class="field">
      <div class="control has-icons-right">
        <input
          @onBlur="saveTel"
          class="input"
          type="text"
          placeholder="Telefono"
          v-model="formData.telefono"
        />
      </div>
      <p v-show="formError.telefono" class="help is-danger">
        {{ formError.telefono }}
      </p>
    </div>
  </div>
  <div class="field">
    <div class="control has-icons-right">
      <input
        class="input"
        type="text"
        placeholder="Calle"
        v-model="formData.calle"
      />
    </div>
  </div>
  <div class="field">
    <div class="control has-icons-right">
      <input
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
  <div class="field">
    <div class="control has-icons-right">
      <input
        class="input"
        type="text"
        placeholder="Local"
        v-model="formData.local"
      />
    </div>
  </div>
  <!-- <div class="field">
    <div class="control has-icons-right">
      <input
        class="input"
        type="text"
        placeholder="region"
        v-model="formData.region"
      />
    </div>
  </div> -->
</template>

<script>
import { ref } from "vue";
export default {
  name: "DemographicDataFormTwo",
  components: {},
  setup() {
    let formData = {};
    let formError = ref({});
    let messageError = ref("");
    let loading = ref(false);
    const saveTel = () =>
      console.log("send to backend the value ===>> ", formData.telefono);
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