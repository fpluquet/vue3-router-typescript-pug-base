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
    class="conatiner is-flex is-flex-grow-1 is-justify-content-center is-align-items-flex-start mb-1"
  >
    <div
      class="column is-10-mobile is-10-tablet is-10-desktop is-10-widescreen is-8-fullhd wizard-container"
    >
      <div class="field">
        <div class="control has-icons-right">
          <input
            class="input field-custom"
            type="text"
            placeholder="Nombre fantasia"
          />
        </div>
      </div>
    </div>
  </div>
  <!--<div class="columns dashboard">
   <div
      class="column is-offset-1-fullhd is-8-desktop is-8-widescreen is-6-fullhd is-relative is-flex"
    >
      <div
        class="is-flex is-flex-grow-1 is-justify-content-center is-align-items-center"
      >
        <img :src="src" alt="logo-pago-facil" :style="{ height: '70%' }" />
      </div>
    </div>
    <div
      class="column is-flex is-justify-content-center is-flex-direction-column"
    >
      <div v-show="showPanelSections" class="mt-6">
        <div
          class="columns"
          v-for="section in availableSections"
          :key="section.id"
        >
          <div
            :class="{ disabled: !section.active }"
            class="column is-7-fullhd is-11 pl-0 pr-0"
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
            class="column is-7-fullhd is-11"
            :style="{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }"
          >
            <ProgressBar class="mt-6 pl-0 pr-0" />
          </div>
        </div>
      </div>
    </div> 
  </div>-->
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
.wizard-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #ffffff;
  box-shadow: 0px 30px 30px rgba(0, 0, 0, 0.12);
  border-radius: 15px;
  height: 400px;
  padding-left: 20px;
  padding-right: 20px;
  max-width: 500px;
  // margin: auto;
  z-index: 1;
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
