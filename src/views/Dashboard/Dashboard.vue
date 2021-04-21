<template>
  <BasicLayout>
    <div class="show-desktop">
      <DashboardDesktopMobile
        :availableSections="availableSections"
        :showPanelSections="showPanelSections"
        :accountType="accountType"
      />
    </div>
  </BasicLayout>
</template>

<script>
import BasicLayout from '../../layouts/BasicLayout.vue';
import DashboardDesktopMobile from '../Dashboard/DashboardDesktopMobile';
import Banner from '../../components/Banner';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { SECTION_DM_ID, PERSONA, EMPRESA } from '../../utils/constants';

export default {
  name: 'Dashboard',
  components: {
    BasicLayout,
    DashboardDesktopMobile,
    Banner,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const accountType = computed(
      () => router.currentRoute.value.params.accountType,
    );

    return {
      accountType,
    };
  },
};
</script>

<style lang="scss">
// @media screen and (max-width: 768px) {
//   .show-desktop {
//     display: none;
//   }
//   .show-mobile {
//     display: flex;
//     flex: 1;
//     flex-direction: column;
//   }
//   .banner-content {
//     display: flex;
//     justify-content: center;
//     margin-bottom: 60px;
//     margin-top: 60px;
//   }
// }
.show-desktop {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
