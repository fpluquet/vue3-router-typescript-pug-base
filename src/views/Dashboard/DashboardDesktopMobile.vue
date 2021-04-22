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
            :save="saveData"
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
  toRefs,
  onUnmounted,
  onBeforeMount,
} from 'vue';
import lodash from 'lodash';
import { useStore } from 'vuex';
import { useRouter, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';
import * as Yup from 'yup';
import ButtonColor from '@/components/ButtonColor';
import ProgressBar from '@/components/ProgressBar';
import {
  saveProfile,
  saveProfileAddress,
  getProfile,
} from '@/services/api/profile.service';
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
        fantasyName: {
          value: '',
          saved: false,
        },
        socialReason: {
          value: '',
          saved: false,
        },
        heading: {
          value: '',
          saved: false,
        },
        website: {
          value: '',
          saved: false,
        },
      },
      [ROUTE_LOC_NAME]: {
        phone: {
          value: '',
          saved: false,
        },
        street: {
          value: '',
          saved: false,
        },
        region: {
          value: '',
          saved: false,
        },
        local: {
          value: '',
          saved: false,
        },
      },
    });

    function mergeObjects(source, defaults) {
      const common = lodash.intersection(
        Array.from(Object.keys(source)),
        Array.from(Object.keys(defaults)),
      );
      common.forEach((kk) => (defaults[kk].value = source[kk]));
      common.forEach((kk) => {
        if (
          defaults[kk].value !== null &&
          defaults[kk].value !== undefined &&
          defaults[kk].value !== ''
        ) {
          defaults[kk].saved = true;
        }
      });
    }

    // // onBeforeMount(() => window('beforeunload', algo));
    // onBeforeRouteUpdate((to, from) => alert('updated'));
    // onBeforeRouteLeave(() => alert('leave'));
    // onMounted(
    //   () =>
    //     (window.onbeforeunload = function() {
    //       console.log('mounted');
    //       return 'Are you sure you want to close the window?';
    //     }),
    // );
    // onUnmounted(() => {
    //   console.log('unmounted');
    //   window.onbeforeunload = null;
    // });

    onMounted(() => {
      const profile = store.state.profile;
      const aux = { ...profile, ...profile.address };
      mergeObjects(aux, formData[ROUTE_DG_NAME]);
      mergeObjects(aux, formData[ROUTE_LOC_NAME]);
    });

    const hasAllCompleted = () => {
      if (router.currentRoute.value.name === ROUTE_DG_NAME) {
        return (
          formData[ROUTE_DG_NAME].fantasyName.saved &&
          formData[ROUTE_DG_NAME].socialReason.saved &&
          formData[ROUTE_DG_NAME].heading.saved &&
          formData[ROUTE_DG_NAME].website.saved
        );
      }

      if (router.currentRoute.value.name === ROUTE_LOC_NAME) {
        return (
          formData[ROUTE_LOC_NAME].phone.saved &&
          formData[ROUTE_LOC_NAME].street.saved &&
          formData[ROUTE_LOC_NAME].region.saved &&
          formData[ROUTE_LOC_NAME].local.saved
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
        validateUrl(formData[ROUTE_DG_NAME].website.value)
          .then((res) => {
            if (hasAllCompleted()) {
              disabledButton.value = false;
            } else {
              disabledButton.value = true;
            }
          })
          .catch((error) => {
            disabledButton.value = true;
            console.log(error);
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
        if (formData[ROUTE_DG_NAME].website.value) {
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

    const saveData = async (attr, value, address = false) => {
      try {
        if (address) {
          await saveProfileAddress(cognitoId.value, { [attr]: value });
        } else {
          await saveProfile(cognitoId.value, { [attr]: value });
        }
        // const key = Object.keys(data)[0];
        if (value !== '') {
          formData[router.currentRoute.value.name][attr].saved = true;
        } else {
          formData[router.currentRoute.value.name][attr].saved = false;
        }
        store.commit('setProfile', { [attr]: value });
      } catch (error) {
        apiError.value = `${'Ocurrio un error al intentar guardar ' + attr}`;
        console.log(error);
      }
    };

    return {
      src,
      formData,
      formError,
      firstStep,
      lastStep,
      goFordward,
      saveData,
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
