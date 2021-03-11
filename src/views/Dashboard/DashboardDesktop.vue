<template>
  <div class="columns dashboard mt-6">
    <div class="column is-two-thirds left-panel-dashboard">
      is-three-quarters
    </div>
    <div class="column right-panel-dashboard">
      <div v-show="showSections">
        <div class="columns" v-for="section in getSections" :key="section.id">
          <div
            @click="openSideBar"
            :style="{ display: 'flex', flex: 1, cursor: 'pointer' }"
          >
            <BoxSection :title="section.name" />
          </div>
        </div>
        <!-- <div class="columns">
          <router-link
            to="/datos-demograficos"
            exact
            :style="{ display: 'flex', flex: 1 }"
          >
            <BoxSection title="Validación biométrica" />
          </router-link>
        </div> -->
        <!-- <div class="columns">
          <router-link
            to="/datos-demograficos"
            exact
            :style="{ display: 'flex', flex: 1 }"
          >
            <BoxSection title="Documentación" />
          </router-link>
        </div> -->
        <ProgressBar
          class="mt-6"
          :accountType="accountType"
          :percentaje="'40'"
        />
      </div>
      <SideBar />
    </div>
  </div>
</template>

<script>
import ProgressBar from "../../components/ProgressBar";
import BoxSection from "../../components/BoxSection";
import SideBar from "../../components/SideBar";
import { computed } from "vue";
import { useStore } from "vuex";

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
    const openSideBar = () => store.commit("setShowSideBar", true);
    // store.commit("setActiveSection", [{name: 'Datos demograficos', active:true}]);
    const showSections = computed(() => store.state.showSections);
    const getSections = computed(() => store.state.sections);
    return { openSideBar, getSections, showSections };
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
    padding-left: 30px;
    padding-right: 30px;
    display: flex;
    justify-content: center;
    flex: 1;
    flex-direction: column;
  }
}
</style>