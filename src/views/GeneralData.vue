<template>
  <div class="field">
    <div class="control has-icons-right">
      <input
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
        class="input field-custom"
        type="text"
        placeholder="Razon social"
        v-model="formData.socialReason"
      />
    </div>
  </div>
  <div class="field">
    <div class="select is-fullwidth">
      <select v-model="formData.heading" class="field-custom is-fullwidth">
        <option v-for="option in headingOptions" :key="option">{{
          option
        }}</option>
      </select>
    </div>
  </div>
  <div class="field">
    <div class="control has-icons-right">
      <input
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
</template>

<script>
import { ref, computed } from 'vue';
import ButtonColor from '@/components/ButtonColor';
import { useRouter } from 'vue-router';

export default {
  name: 'GeneralData',
  props: {
    formData: Object,
    formError: Object,
    cognitoId: String,
    goNext: Function,
  },
  components: { ButtonColor },
  setup(props) {
    const router = useRouter();
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
