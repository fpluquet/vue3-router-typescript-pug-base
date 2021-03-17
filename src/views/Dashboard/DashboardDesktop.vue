<template>
  <div class="columns dashboard">
    <div
      class="column is-offset-1-fullhd is-8-desktop is-8-widescreen is-6-fullhd left-panel-dashboard"
    >
      <div class="left-panel-content">
        <img src="@/res/logo_central.svg" alt="logo-pago-facil" />
      </div>
    </div>
    <div class="column right-panel-dashboard">
      <div v-show="showPanelSections">
        <div class="columns" v-for="section in getSections" :key="section.id">
          <div class="column is-7-fullhd" @click="openSideBar">
            <router-link
              :disabled="!section.active"
              :to="{ name: section.routeName }"
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
            class="column is-10-desktop is-10-widescreen is-7-fullhd"
            :style="{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }"
          >
            <ProgressBar class="mt-6 progress-bar" :percentaje="'40'" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProgressBar from "../../components/ProgressBar";
import BoxSection from "../../components/BoxSection";
// import SideBar from "../../components/SideBar";

export default {
  name: "DashboardDesktop",
  components: {
    ProgressBar,
    BoxSection,
  },
  props: {
    accountType: String,
    getSections: Array,
    showPanelSections: Boolean,
    openSideBar: Function,
  },
  setup(props) {},
};
</script>

<style lang="scss" scoped>
.dashboard {
  height: 100%;
  .left-panel-dashboard {
    display: flex;
    position: relative;
    // margin-right: 20px;
  }

  .left-panel-content {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
  }

  .right-panel-dashboard {
    display: flex;
    justify-content: center;
    flex: 1;
    flex-direction: column;
  }
  .left-panel-content {
    display: flex;
    flex: 1;
    justify-content: center;
    // align-items: center;
  }

  .desactive {
    // pointer-events: none;
    background: rgba(53, 53, 53, 0.1) !important;
  }

  .progress-bar {
    width: 60%;
  }
}
</style>