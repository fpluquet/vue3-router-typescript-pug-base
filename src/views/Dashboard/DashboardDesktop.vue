<template>
  <div class="columns dashboard">
    <div
      class="column is-offset-1-fullhd is-8-desktop is-8-widescreen is-6-fullhd left-panel-dashboard"
    >
      <div class="left-panel-content">
        <img :src="src" alt="logo-pago-facil" :style="{ height: '70%' }" />
      </div>
    </div>
    <div class="column right-panel-dashboard">
      <div v-show="showPanelSections" class="mt-6">
        <div
          class="columns"
          v-for="section in availableSections"
          :key="section.id"
        >
          <div
            :class="{ disabled: !section.active }"
            class="column is-7-fullhd custom-column"
            @click="section.active ? openSideBar() : null"
          >
            <router-link
              :disabled="!section.active"
              :to="{ name: section.routeName }"
            >
              <BoxSection
                :title="section.name"
                :active="section.active"
                :percent="section.percentCompleted"
                :accountType="accountType"
              />
            </router-link>
          </div>
        </div>
        <div class="columns">
          <div
            class="column is-7-fullhd"
            :style="{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }"
          >
            <ProgressBar class="mt-6 custom-column" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import ProgressBar from '../../components/ProgressBar';
import ProgressCircle from '../../components/ProgressCircle';
import BoxSection from '../../components/BoxSection';

export default {
  name: 'DashboardDesktop',
  components: {
    ProgressBar,
    BoxSection,
    ProgressCircle,
  },
  props: {
    accountType: String,
    availableSections: Array,
    showPanelSections: Boolean,
    openSideBar: Function,
  },
  setup(props) {
    const src = computed(() => `/logo_central_${props.accountType}.svg`);
    return { src };
  },
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
  .custom-column {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
