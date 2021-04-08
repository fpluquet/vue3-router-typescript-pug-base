<template>
  <BasicLayout>
    <div class="show-desktop">
      <DashboardDesktop
        :availableSections="availableSections"
        :showPanelSections="showPanelSections"
        :openSideBar="openSideBar"
        :accountType="accountType"
      />
    </div>
    <div class="show-mobile">
      <div class="banner-content">
        <Banner :name="'pago_facil_banner'" :style="{ width: '70%' }" />
      </div>
      <DashboardMobile
        :availableSections="availableSections"
        :showPanelSections="showPanelSections"
        :openSideBar="openSideBar"
        :accountType="accountType"
      />
    </div>
    <SideBar>
      <router-view></router-view>
    </SideBar>
  </BasicLayout>
</template>

<script>
import BasicLayout from '../../layouts/BasicLayout.vue';
import DashboardDesktop from '../Dashboard/DashboardDesktop';
import DashboardMobile from '../Dashboard/DashboardMobile';
import Banner from '../../components/Banner';
import SideBar from '../../components/SideBar';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { SECTION_DM_ID, PERSONA, EMPRESA } from '../../utils/constants';

export default {
  name: 'Dashboard',
  components: {
    BasicLayout,
    DashboardDesktop,
    DashboardMobile,
    SideBar,
    Banner,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    let accountType = ref(null);

    const openSideBar = () => {
      store.commit('setShowSideBar', true);
    };

    onMounted(() => {
      store.commit('setSectionActive', { id: SECTION_DM_ID });
      accountType.value = store.state.profile.company;
      //TODO ask backend to get accountType in the profile.

      if (accountType.value == null) {
        accountType.value = PERSONA;
      } else {
        accountType.value = EMPRESA;
      }
      store.commit('setSectionActive', { id: SECTION_DM_ID });
      if (accountType.value === PERSONA) {
        availableSections.value.splice(-1, 1);
      }
    });
    const showPanelSections = computed(() => store.state.showPanelSections);
    const availableSections = computed(() => store.state.sections);
    return {
      openSideBar,
      availableSections,
      showPanelSections,
      accountType,
    };
  },
};
</script>

<style lang="scss">
@media screen and (max-width: 768px) {
  .show-desktop {
    display: none;
  }
  .show-mobile {
    display: flex;
    flex: 1;
    flex-direction: column;
  }
  .banner-content {
    display: flex;
    justify-content: center;
    margin-bottom: 60px;
    margin-top: 60px;
  }
}
@media screen and (min-width: 769px) {
  .show-desktop {
    flex: 1;
    /* width: 100%; */
    display: flex;
    flex-direction: column;
  }
  .show-mobile {
    display: none;
  }
}
// .content-img {
//   display: none;
// }
</style>
