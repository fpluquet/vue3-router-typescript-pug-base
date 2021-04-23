<template>
  <div
    class="columns is-vcentered is-centered mt-3 is-hidden-mobile"
    :style="{
      flex: 1,
    }"
  >
    <div
      class="column is-10-desktop is-10-widescreen is-10-fullhd has-text-centered"
    >
      <ProgressBar />
    </div>
  </div>
  <div class="is-flex is-justify-content-center mb-4" v-if="apiError">
    <Notification
      :message="apiError"
      :displayError="true"
      :remove="removeNotification"
    />
  </div>
  <div
    class="is-flex is-flex-grow-1 is-justify-content-space-evenly is-align-items-flex-start mb-1 mobile"
  >
    <img
      v-show="!firstStep"
      src="/back_arrow.svg"
      class="img-arrow is-hidden-tablet"
      width="20"
      alt="back-arrow"
      @click="goBack"
    />
    <div class="column wizard-container is-relative">
      <!-- MOBILE   !-->
      <div class="columns is-vcentered is-centered is-hidden-tablet">
        <div class="column is-12-mobile is-12-tablet has-text-centered">
          <Banner :name="'pago_facil_banner'" class="mobile-banner" />
        </div>
        <div class="column is-12-mobile is-12-tablet has-text-centered">
          <ProgressBar />
        </div>
      </div>
      <!-- ---------- !-->
      <img
        v-show="!firstStep"
        src="/back_arrow.svg"
        class="img-arrow is-hidden-mobile"
        width="20"
        alt="back-arrow"
        @click="goBack"
      />
      <div class="columns is-centered">
        <div
          class="column is-12-mobile is-10-tablet is-10-desktop is-10-widescreen is-10-fullhd"
        >
          <router-view
            :formData="formData[router.currentRoute.value.name]"
            :goNext="goFordward"
            :cognitoId="cognitoId"
            :formError="formError"
          ></router-view>
          <ButtonColor
            v-show="!lastStep"
            :disabled="disabledButton"
            :accountType="accountType"
            class="mt-5 is-fullwidth"
            @click="goFordward"
            >Siguiente</ButtonColor
          >
          <ButtonColor
            :accountType="accountType"
            v-show="lastStep"
            class="mt-5 is-fullwidth"
            @click="finishAction"
            >Finalizar</ButtonColor
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ref,
  computed,
  watch,
  watchEffect,
  onMounted,
  reactive,
  onUnmounted,
} from 'vue';
import lodash from 'lodash';
import { useStore } from 'vuex';
import { useRouter, onBeforeRouteUpdate, onBeforeEach } from 'vue-router';
import * as Yup from 'yup';
import ButtonColor from '@/components/ButtonColor';
import ProgressBar from '@/components/ProgressBar';
import { saveProfile } from '@/services/api/profile.service';
import Documentation from '@/views/Documentation';
import Banner from '@/components/Banner.vue';
import Notification from '@/components/Notification';

import {
  ROUTE_DG_NAME,
  ROUTE_VB_NAME,
  ROUTE_DOC_NAME,
  ROUTE_LOC_NAME,
  EMPRESA,
  PERSONA,
} from '@/utils/constants';

export default {
  name: 'DashboardDesktopMobile',
  components: {
    ProgressBar,
    ButtonColor,
    Documentation,
    Banner,
    Notification,
  },
  props: {
    accountType: String,
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const src = computed(() => `/logo_central_${props.accountType}.svg`);
    const disabledButton = ref();
    let formError = ref({});
    let lastStep = ref();
    let apiError = ref(null);

    let formData = reactive({
      [ROUTE_DG_NAME]: {
        fantasyName: '',
        socialReason: '',
        heading: '',
        website: '',
      },
      [ROUTE_LOC_NAME]: {
        phone: '',
        address: { street: '', region: '', local: '' },
      },
    });

    function mergeObjects(source, defaults) {
      const common = lodash.intersection(
        Array.from(Object.keys(source)),
        Array.from(Object.keys(defaults)),
      );
      common.forEach((kk) => (defaults[kk] = source[kk]));
    }

    function saveData() {
      const promises = Object.entries(
        formData[router.currentRoute.value.name],
      ).map((element) =>
        saveProfile(cognitoId.value, { [element[0]]: element[1] }),
      );
      try {
        Promise.all(promises).then((res) =>
          res.forEach((element) => {
            store.commit('setProfile', {
              [element[0]]: element[1],
            });
          }),
        );
      } catch (error) {
        console.log('aca1');
        apiError.value = `${'Ocurrio un error al intentar guardar uno de los campos'}`;
        throw error;
      }
      return '';
    }

    router.beforeEach((to, from, next) => {
      try {
        saveData();
        next();
      } catch (error) {}
    });

    // saving the data before close the windows.
    onMounted(() => (window.onbeforeunload = saveData));
    onUnmounted(() => {
      console.log('unmounted');
      window.onbeforeunload = null;
    });

    // pupulating the data from profile
    onMounted(() => {
      const profile = store.state.profile;
      mergeObjects(profile, formData[ROUTE_DG_NAME]);
      mergeObjects(profile, formData[ROUTE_LOC_NAME]);
    });

    const hasAllCompleted = () => {
      if (router.currentRoute.value.name === ROUTE_DG_NAME) {
        return (
          formData[ROUTE_DG_NAME].fantasyName !== '' &&
          formData[ROUTE_DG_NAME].socialReason !== '' &&
          formData[ROUTE_DG_NAME].heading !== '' &&
          formData[ROUTE_DG_NAME].website !== ''
        );
      }

      if (router.currentRoute.value.name === ROUTE_LOC_NAME) {
        return (
          formData[ROUTE_LOC_NAME].phone !== '' &&
          formData[ROUTE_LOC_NAME].address.street !== '' &&
          formData[ROUTE_LOC_NAME].address.region !== '' &&
          formData[ROUTE_LOC_NAME].address.local !== ''
        );
      }
    };

    const cognitoId = computed(
      () => router.currentRoute.value.params.cognitoId,
    );
    const nextRoute = computed(() => router.currentRoute.value.meta.next);

    watchEffect(() => {
      if (hasAllCompleted()) {
        disabledButton.value = false;
      } else {
        disabledButton.value = true;
      }
    });

    // validating url
    let schemaForm = Yup.object().shape({
      website: Yup.string().url('Por favor ingresa una url válida'),
    });

    const validateUrl = async (website) => {
      try {
        return schemaForm.validate({ website }, { abortEarly: false });
      } catch (error) {
        throw error;
      }
    };

    watch(
      formData[ROUTE_DG_NAME],
      (now, prev) => {
        validateUrl(formData[ROUTE_DG_NAME].website)
          .then((res) => {
            if (hasAllCompleted()) {
              disabledButton.value = false;
            } else {
              disabledButton.value = true;
            }
          })
          .catch((error) => {
            disabledButton.value = true;
            error.inner.forEach((err) => {
              formError.value[err.path] = err.message;
            });
          });
      },
      { deep: true },
    );

    watch(
      formData[ROUTE_DG_NAME],
      (now, prev) => {
        if (formData[ROUTE_DG_NAME].website) {
          formError.value.website = '';
        }
      },
      { deep: true },
    );

    // first step
    const firstStep = computed(
      () => router.currentRoute.value.name === ROUTE_DG_NAME,
    );

    // checking last step
    watchEffect(() => {
      if (
        (props.accountType === EMPRESA &&
          router.currentRoute.value.name === ROUTE_DOC_NAME) ||
        (props.accountType === PERSONA &&
          router.currentRoute.value.name === ROUTE_VB_NAME)
      ) {
        lastStep.value = true;
      } else {
        lastStep.value = false;
      }
    });

    // adding dynamic new route
    onMounted(() => {
      if (props.accountType === EMPRESA) {
        router.addRoute('Dashboard', {
          path: 'documentacion',
          name: ROUTE_DOC_NAME,
          component: Documentation,
        });
      }
    });

    const finishAction = () => console.log('finish');

    const goFordward = () => {
      router.push({ name: nextRoute.value });
    };
    const goBack = () => router.go(-1);

    const removeNotification = () => (apiError.value = null);

    return {
      src,
      formData,
      formError,
      firstStep,
      lastStep,
      goFordward,
      goBack,
      finishAction,
      router,
      cognitoId,
      disabledButton,
      apiError,
      removeNotification,
    };
  },
};
</script>

<style lang="scss" scoped>
// mobile
@media screen and (max-width: 768px) {
  .mobile {
    display: flex;
    align-items: center !important;
    justify-content: space-between;
  }
  .mobile-banner {
    width: 60%;
    max-width: 180px;
  }
  .wizard-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #ffffff;
    box-shadow: 0px 30px 30px rgba(0, 0, 0, 0.12);
    border-radius: 15px;
    min-height: 75%;
    padding-left: 20px;
    padding-right: 20px;
    max-width: 80%;
    // width: 80%;
    z-index: 1;
  }
  .img-arrow {
    position: absolute;
    top: 25px;
    left: 15px;
    cursor: pointer;
  }
}

// desktop
@media screen and (min-width: 769px) {
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
