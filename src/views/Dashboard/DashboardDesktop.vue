<template>
  <div class="columns dashboard mt-6">
    <div class="column is-two-thirds left-panel-dashboard">
      is-three-quarters
    </div>
    <div class="column right-panel-dashboard">
      <div v-show="showPanelSections">
        <div class="columns" v-for="section in getSections" :key="section.id">
          <div
            @click="openSideBar"
            :style="{
              display: 'flex',
              flex: 1,
              cursor: section.active ? 'pointer' : 'not-allowed',
              'padding-left': '30px',
              'padding-right': '30px',
            }"
          >
            <router-link :to="{ name: section.routeName }">
              <BoxSection
                :title="section.name"
                :class="{ desactive: !section.active }"
              />
            </router-link>
          </div>
        </div>
        <ProgressBar
          class="mt-6"
          :accountType="accountType"
          :percentaje="'40'"
        />
      </div>
      <SideBar>
        <router-view></router-view>
      </SideBar>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import ProgressBar from "../../components/ProgressBar";
import BoxSection from "../../components/BoxSection";
import SideBar from "../../components/SideBar";
import { SECTION_DM_ID } from "../../utils/constants";

export default {
  name: "DashboardDesktop",
  components: {
    ProgressBar,
    BoxSection,
    SideBar,
  },
  props: {
    accountType: String,
  },
  setup(props) {
    const store = useStore();
    const openSideBar = () => {
      store.commit("setShowSideBar", true);
    };

    onMounted(() => store.commit("setSectionActive", { id: SECTION_DM_ID }));

    store.commit("setActiveSection", [{name: 'Datos demograficos', active:true}]);
    const showPanelSections = computed(() => store.state.showPanelSections);
    const getSections = computed(() => store.state.sections);
    return { openSideBar, getSections, showPanelSections };
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  .left-panel-dashboard {
    height: 500px;
    border: 1px solid gray;
    margin-right: 20px;
  }

  .right-panel-dashboard {
    // padding-left: 30px;
    // padding-right: 30px;
    display: flex;
    justify-content: center;
    flex: 1;
    flex-direction: column;
  }
  .desactive {
    pointer-events: none;
    background: rgba(53, 53, 53, 0.1) !important;
  }
}
</style>