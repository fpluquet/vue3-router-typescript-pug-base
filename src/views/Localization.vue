<template>
  <div class="field">
    <div class="control has-icons-right">
      <input
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
        class="input field-custom"
        type="text"
        placeholder="Calle"
        v-model="formData.address.street"
      />
    </div>
  </div>
  <div class="field">
    <div class="control has-icons-right">
      <input
        class="input field-custom"
        type="text"
        placeholder="Local"
        v-model="formData.address.local"
      />
    </div>
  </div>
  <div class="field">
    <div class="control has-icons-right">
      <input
        class="input field-custom"
        type="text"
        placeholder="Region"
        v-model="formData.address.region"
      />
    </div>
    <p v-show="formError.region" class="help is-danger">
      {{ formError.region }}
    </p>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import ButtonColor from '@/components/ButtonColor';

export default {
  name: 'Localization',
  props: {
    formData: Object,
    formError: Object,
    goNext: Function,
    cognitoId: String,
  },
  components: { ButtonColor },
  setup(props) {
    const router = useRouter();
    let messageError = ref('');
    let loading = ref(false);
    const disabledButton = ref();

    const accountType = computed(
      () => router.currentRoute.value.params.accountType,
    );

    return {
      disabledButton,
      accountType,
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
