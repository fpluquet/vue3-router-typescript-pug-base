<template>
  <div class="dashboard-mobile" v-show="showPanelSections">
    <!-- <div class="columns is-mobile custom-columns"> -->
    <div
      class="columns is-mobile custom-columns"
      v-for="section in getSections"
      :key="section.id"
    >
      <div class="column section" @click="openSideBar">
        <router-link
          :disabled="!section?.active"
          :to="{ name: section?.routeName }"
        >
          <span class="text">
            {{ section?.name }}
          </span>
        </router-link>
      </div>
    </div>
    <div
      :style="{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }"
    >
      <ProgressBar
        class="mt-6 progress-bar"
        :percentaje="'40'"
        :style="{
          width: '80%',
          justifyContent: 'center',
          alignItems: 'center',
        }"
      />
    </div>
    <Footer />
  </div>
</template>

<script>
import ProgressBar from "../../components/ProgressBar";
import Footer from "../../components/Footer";

export default {
  name: "DashboardDesktop",
  components: { ProgressBar, Footer },
  props: {
    accountType: String,
    getSections: Array,
    showPanelSections: Boolean,
    openSideBar: Function,
  },
  setup(props) {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.dashboard-mobile {
  display: flex;
  justify-content: center;
  // align-items: center;
  flex-direction: column;
  // flex: 1;
  .text {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #ffffff;
  }
}
.content-banner {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}
.custom-columns {
  height: 115px;
  background: #19c37f;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: auto;
  display: flex;
}

.section {
  display: flex;
  width: 70%;
  margin: auto;
  justify-content: center;
  align-items: center;
}

.custom-columns-one {
  height: 115px;
  width: 80%;
  display: flex;
}

.section-one {
  height: 115px;
  justify-content: space-between;
  width: 100%;
  display: flex;
}
.section-two {
  height: 100%;
  width: 47%;
  display: flex;
  background: #19c37f;
  justify-content: center;
  align-items: center;
}
.section-three {
  height: 100%;
  width: 47%;
  display: flex;
  background: #19c37f;
  justify-content: center;
  align-items: center;
}
</style>