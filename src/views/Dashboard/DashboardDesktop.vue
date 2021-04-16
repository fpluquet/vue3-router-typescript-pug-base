<template>
  <div
    class="columns is-vcentered is-centered mt-3"
    :style="{
      flex: 1,
    }"
  >
    <div
      class="column is-10-mobile is-10-tablet is-10-desktop is-10-widescreen is-8-fullhd has-text-centered"
    >
      <ProgressBar />
    </div>
  </div>

  <div
    class="is-flex is-flex-grow-1 is-justify-content-center is-align-items-flex-start mb-1"
  >
    <div class="column wizard-container is-relative">
      <img
        v-show="!firstStep"
        src="/back_arrow.svg"
        class="img-arrow"
        width="20"
        alt="back-arrow"
        @click="goBack"
      />
      <div class="columns is-centered">
        <div
          class="column is-10-mobile is-10-tablet is-10-desktop is-10-widescreen is-8-fullhd"
        >
          <router-view :save="saveData" :formData="formData"></router-view>
          <Button
            v-show="showNextButton"
            className="mt-5 is-fullwidth is-primary"
            @click="goFordward"
            >Siguiente</Button
          >
          <!-- <Button
            v-show="!showFinishButton && !showNextButton"
            className="mt-5 is-fullwidth is-primary"
            @click="validate"
            >Validar</Button
          > -->
          <Button
            v-show="showFinishButton"
            className="mt-5 is-fullwidth is-primary"
            @click="finishAction"
            >Finalizar</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';
import Button from '@/components/Button';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import ProgressBar from '../../components/ProgressBar';
import ProgressCircle from '../../components/ProgressCircle';
import BoxSection from '../../components/BoxSection';
import { saveProfile } from '@/services/api/profile.service';
import Documentation from '@/views/Documentation';
import {
  ROUTE_DM_NAME,
  ROUTE_VB_NAME,
  ROUTE_DOC_NAME,
  EMPRESA,
  PERSONA,
} from '@/utils/constants';

export default {
  name: 'DashboardDesktop',
  components: {
    ProgressBar,
    BoxSection,
    ProgressCircle,
    Button,
    Documentation,
  },
  props: {
    accountType: String,
    availableSections: Array,
    showPanelSections: Boolean,
    openSideBar: Function,
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const src = computed(() => `/logo_central_${props.accountType}.svg`);
    const showNextButton = ref(true);
    const showFinishButton = ref(false);

    let formData = ref({
      generalData: {
        fantasyName: '',
        socialReason: '',
        heading: '',
        url: '',
      },
      localization: {
        phone: '',
        street: '',
        region: '',
        local: '',
      },
    });

    const nextRoute = computed(() => router.currentRoute.value.meta.next);
    const firstStep = computed(
      () => router.currentRoute.value.name === ROUTE_DM_NAME,
    );

    const lastStep = computed(
      () =>
        (props.accountType === EMPRESA &&
          router.currentRoute.value.name === ROUTE_DOC_NAME) ||
        (props.accountType === PERSONA &&
          router.currentRoute.value.name === ROUTE_VB_NAME),
    );

    onMounted(() => {
      if (props.accountType === EMPRESA) {
        router.addRoute('Dashboard', {
          path: 'documentacion',
          name: 'documentacion',
          component: Documentation,
        });
      }
    });

    watch(router.currentRoute, (now, prev) => {
      if (lastStep.value) {
        showNextButton.value = false;
        showFinishButton.value = true;
      } else {
        showNextButton.value = true;
        showFinishButton.value = false;
      }
      // if (props.accountType === PERSONA) {
      //   if (router.currentRoute.value.name === ROUTE_VB_NAME) {
      //     showNextButton.value = false;
      //     showFinishButton.value = true;
      //   } else {
      //     showNextButton.value = true;
      //   }
      // }

      // if (props.accountType === EMPRESA) {
      //   if (router.currentRoute.value.name === ROUTE_DOC_NAME) {
      //     showNextButton.value = false;
      //     showFinishButton.value = true;
      //   } else {
      //   }
      // }

      // } else if (
      //   props.accountType === EMPRESA &&
      //   router.currentRoute.value.name === ROUTE_DOC_NAME
      // ) {
      //   showNextButton.value = false;
      //   showFinishButton.value = true;
      // } else if (
      //   props.accountType === EMPRESA &&
      //   router.currentRoute.value.name === ROUTE_VB_NAME
      // ) {
      //   showNextButton.value = false;
      //   showFinishButton.value = false;
      // } else {
      //   showNextButton.value = true;
      //   showFinishButton.value = false;
      // }
    });

    const finishAction = () => console.log('finish');

    const goFordward = () => {
      router.push({ name: nextRoute.value });
    };

    const goBack = () => router.go(-1);

    const saveData = async (data) => {
      try {
        await saveProfile(cognitoId.value, data);
        store.commit('setUpdateProfile', data);
      } catch (error) {
        console.log(error);
      }
    };

    const cognitoId = computed(
      () => router.currentRoute.value.params.cognitoId,
    );

    const validate = () => {
      console.log('call jumio service');
      showFinishButton.value = true;
    };

    return {
      src,
      showNextButton,
      showFinishButton,
      formData,
      firstStep,
      lastStep,
      goFordward,
      saveData,
      goBack,
      validate,
      finishAction,
    };
  },
};
</script>

<style lang="scss" scoped>
.wizard-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #ffffff;
  box-shadow: 0px 30px 30px rgba(0, 0, 0, 0.12);
  border-radius: 15px;
  height: 500px;
  padding-left: 20px;
  padding-right: 20px;
  max-width: 600px;
  z-index: 1;

  .img-arrow {
    position: absolute;
    top: 35px;
    left: 15px;
    cursor: pointer;
  }
}
.dashboard {
  height: 100%;

  .progress-bar {
    width: 60%;
  }

  .global-progress-circle {
    position: absolute;
    top: 0;
    left: 0;
  }
  .disabled {
    pointer-events: none;
  }
}
</style>
