<template>
  <BasicLayout>
    <div class="show-desktop">
      <DashboardDesktop
        :availableSections="availableSections"
        :showPanelSections="showPanelSections"
        :accountType="accountType"
      />
    </div>
  </BasicLayout>
</template>

<script>
import BasicLayout from '../../layouts/BasicLayout.vue';
import DashboardDesktop from '../Dashboard/DashboardDesktop';
import Banner from '../../components/Banner';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { SECTION_DM_ID, PERSONA, EMPRESA } from '../../utils/constants';

export default {
  name: 'Dashboard',
  components: {
    BasicLayout,
    DashboardDesktop,
    Banner,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    let accountType = ref(null);

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
      availableSections,
      showPanelSections,
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
