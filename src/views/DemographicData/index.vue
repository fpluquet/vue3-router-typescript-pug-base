<template>
  <Title class="mb-6" :title="'Datos Demográficos'" />
  <DemographicDataFormOne :formData="formData" v-if="stepOne" />
  <DemographicDataFormTwo :formData="formData" v-else />
  <Button className="mt-6 is-fullwidth secondary" @click="stepOne = !stepOne">{{
    stepOne ? 'Siguiente' : 'Atras'
  }}</Button>
  <Button v-show="!stepOne" className="mt-2 is-fullwidth" @click="closeSection">
    Continuar
  </Button>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import DemographicDataFormOne from './DemographicDataFormOne';
import DemographicDataFormTwo from './DemographicDataFormTwo';
import Button from '@/components/Button.vue';
import Title from '@/components/Title.vue';
import { SECTION_DM_ID, PERSONA } from '../../utils/constants';

export default {
  name: 'DemographicData',
  components: { DemographicDataFormOne, DemographicDataFormTwo, Button, Title },

  setup() {
    const store = useStore();
    let stepOne = ref(true);
    let percentCompleted = ref(0);
    let formData = ref({
      fantasyName: '',
      socialReason: '',
      rubro: '',
      url: '',
      tel: '',
      street: '',
      region: '',
      local: '',
    });
    const storeSectionPercentageCompleted = () => {
      const quantitiFields = Object.keys(formData.value).length;
      let completedFields = 0;
      Object.entries(formData.value).forEach((value) => {
        if (value[1].trim() !== '') {
          completedFields++;
        }
      });

      percentCompleted.value = Math.round(
        (completedFields / quantitiFields) * 100,
        2,
      );

      store.commit('setSectionPercentage', {
        id: SECTION_DM_ID,
        percentCompleted: percentCompleted.value,
      });
    };

    const closeSection = () => {
      storeSectionPercentageCompleted();
      store.commit('setShowSideBar', false);

      const quantitySections = computed(() =>
        store.state.account.type === PERSONA ? 2 : 3,
      );

      const globalPercentage = Math.round(
        (store.state.globalPercentage + percentCompleted.value) /
          quantitySections.value,
        2,
      );

      store.commit('setGlobalPercent', globalPercentage);
    };
    return { stepOne, formData, closeSection, storeSectionPercentageCompleted };
  },
};
</script>

<style lang="scss" scoped></style>
