<template>
  <Title class="mb-6" :title="'Datos Demográficos'" />
  <DemographicDataFormOne
    :formData="formData"
    :save="saveData"
    v-if="stepOne"
  />
  <DemographicDataFormTwo :formData="formData" :save="saveData" v-else />
  <Button className="mt-6 is-fullwidth secondary" @click="stepOne = !stepOne">{{
    stepOne ? 'Siguiente' : 'Atras'
  }}</Button>
  <Button v-show="!stepOne" className="mt-2 is-fullwidth" @click="closeSection">
    Continuar
  </Button>
</template>

<script>
import { ref, watch, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import DemographicDataFormOne from './DemographicDataFormOne';
import DemographicDataFormTwo from './DemographicDataFormTwo';
import Button from '@/components/Button.vue';
import Title from '@/components/Title.vue';
import { SECTION_DM_ID, PERSONA } from '../../utils/constants';
import { useGlobalPercentage } from '../../hooks/useGlobalPercent';
import { saveProfile } from '@/services/api/profile.service';

export default {
  name: 'DemographicData',
  components: { DemographicDataFormOne, DemographicDataFormTwo, Button, Title },

  setup(props) {
    const store = useStore();
    const router = useRouter();

    let stepOne = ref(true);
    let formData = ref({
      fantasyName: '',
      socialReason: '',
      heading: '',
      url: '',
      phone: '',
      street: '',
      region: '',
      local: '',
    });

    const cognitoId = computed(
      () => router.currentRoute.value.params.cognitoId,
    );

    const saveData = async (data) => {
      try {
        await saveProfile(cognitoId.value, data);
        store.commit('setUpdateProfile', data);
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(async () => {
      const profile = store.state.profile;
      formData.value.fantasyName = profile.profile.fantasyName;
      formData.value.socialReason = profile.profile.socialReason;
      formData.value.heading = profile.profile.heading;
    });

    const calculateSectionPercent = () => {
      const quantitiFields = Object.keys(formData.value).length;
      let completedFields = 0;
      Object.entries(formData.value).forEach((value) => {
        if (value[1] && value[1].trim() !== '') {
          completedFields++;
        }
      });
      const percentCompleted = Math.round(
        (completedFields / quantitiFields) * 100,
        2,
      );
      return percentCompleted;
    };

    watch(
      () => store.state.showSideBar,
      (showSideBar, prevShowSideBar) => {
        if (prevShowSideBar) {
          const percentCompleted = calculateSectionPercent();
          store.commit('setSectionPercentage', {
            id: SECTION_DM_ID,
            percentCompleted,
          });
          const globalPercentage = useGlobalPercentage(store);
          store.commit('setGlobalPercent', {
            globalPercentage,
          });
        }
      },
    );

    const closeSection = () => {
      store.commit('setShowSideBar', false);
    };

    return { stepOne, formData, closeSection, saveData };
  },
};
</script>

<style lang="scss" scoped></style>
