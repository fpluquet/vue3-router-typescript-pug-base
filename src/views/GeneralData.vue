<template>
  <div class="field">
    <div class="control has-icons-right">
      <input
        @blur="save('fantasyName', formData.fantasyName.value)"
        class="input field-custom"
        type="text"
        placeholder="Nombre fantasia"
        v-model="formData.fantasyName.value"
      />
    </div>
  </div>
  <div class="field">
    <div class="control has-icons-right">
      <input
        @blur="save('socialReason', formData.socialReason.value)"
        class="input field-custom"
        type="text"
        placeholder="Razon social"
        v-model="formData.socialReason.value"
      />
    </div>
  </div>
  <div class="field">
    <div class="select is-fullwidth">
      <select
        @change="(ev) => save('heading', ev.target.value)"
        v-model="formData.heading.value"
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
        @blur="save('website', formData.website.value)"
        class="input field-custom"
        type="text"
        placeholder="URL"
        v-model="formData.website.value"
      />
    </div>
    <p v-show="formError.website" class="help is-danger">
      {{ formError.website }}
    </p>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import * as Yup from 'yup';
import ButtonColor from '@/components/ButtonColor';
import { useRouter } from 'vue-router';

export default {
  name: 'GeneralData',
  props: {
    formData: Object,
    formError: Object,
    cognitoId: String,
    save: Function,
    goNext: Function,
  },
  components: { ButtonColor },
  setup(props) {
    const router = useRouter();
    let messageError = ref('');
    let loading = ref(false);
    const headingOptions = ['a', 'b', 'c'];
    const disabledButton = ref();

    const accountType = computed(
      () => router.currentRoute.value.params.accountType,
    );

    return {
      headingOptions,
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
