<template>
  <div class="dashboard-mobile" v-show="showPanelSections">
    <div class="columns is-mobile custom-columns">
      <div class="column section" @click="openSideBar">
        <router-link
          :disabled="!getSections[0]?.active"
          :to="{ name: getSections[0]?.routeName }"
        >
          <span class="text">
            {{ getSections[0]?.name }}
          </span>
        </router-link>
      </div>
    </div>
    <div
      :style="{
        flex: 1,
        display: 'flex',
        height: '115px',
        justifyContent: 'center',
      }"
    >
      <div class="custom-columns1">
        <div class="section1 text">
          <div class="section2 text" @click="openSideBar">
            <router-link
              :disabled="!getSections[1]?.active"
              :to="{ name: getSections[1]?.routeName }"
            >
              <span class="text"> {{ getSections[1]?.name }} </span>
            </router-link>
          </div>
          <div class="section3 text" @click="openSideBar">
            <router-link
              :disabled="!getSections[2]?.active"
              :to="{ name: getSections[2]?.routeName }"
              ><span class="text"> {{ getSections[2]?.name }} </span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProgressBar from "../../components/ProgressBar";
import Banner from "../../components/Banner";

export default {
  name: "DashboardDesktop",
  components: { ProgressBar, Banner },
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

.custom-columns1 {
  height: 115px;
  width: 80%;
  display: flex;
}

.section1 {
  height: 115px;
  justify-content: space-between;
  width: 100%;
  display: flex;
}
.section2 {
  height: 100%;
  width: 47%;
  display: flex;
  background: #19c37f;
  justify-content: center;
  align-items: center;
}
.section3 {
  height: 100%;
  width: 47%;
  display: flex;
  background: #19c37f;
  justify-content: center;
  align-items: center;
}
</style>