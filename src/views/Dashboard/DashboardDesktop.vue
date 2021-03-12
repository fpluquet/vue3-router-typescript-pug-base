<template>
  <div class="columns dashboard mt-6">
    <div class="column is-7 left-panel-dashboard">is-three-quarters</div>
    <div class="column right-panel-dashboard">
      <div v-show="showPanelSections">
        <div class="columns" v-for="section in getSections" :key="section.id">
          <div class="column is-offset-1 is-10" @click="openSideBar">
            <router-link
              :to="{ name: section.routeName }"
              :style="{
                cursor: section.active ? 'pointer' : 'not-allowed',
              }"
            >
              <BoxSection
                :title="section.name"
                :class="{ desactive: !section.active }"
              />
            </router-link>
          </div>
        </div>
        <div class="columns">
          <div
            class="column is-offset-1 is-10"
            :style="{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }"
          >
            <ProgressBar
              class="mt-6 progress-bar"
              :accountType="accountType"
              :percentaje="'40'"
            />
          </div>
        </div>
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

    store.commit("setSectionActive", [
      { name: "Datos demograficos", active: true },
    ]);
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

  .progress-bar {
    width: 60%;
  }
}
</style>