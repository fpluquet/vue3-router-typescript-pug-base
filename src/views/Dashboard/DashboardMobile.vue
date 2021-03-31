<template>
  <div class="dashboard-mobile" v-show="showPanelSections">
    <!-- <div class="columns is-mobile custom-columns"> -->
    <div
      class="columns is-mobile custom-columns"
      :class="[{ desactive: !section.active }, accountType]"
      v-for="section in getSections"
      :key="section.id"
    >
      <router-link
        :disabled="!section?.active"
        :to="{ name: section?.routeName }"
        class="router-link"
      >
        <div class="column section" @click="openSideBar">
          <span class="text" :class="{ 'text-desactive': !section.active }">
            {{ section?.name }}
          </span>
        </div>
      </router-link>
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
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import ProgressBar from "../../components/ProgressBar";

export default {
  name: "DashboardDesktop",
  components: { ProgressBar },
  props: {
    accountType: String,
    getSections: Array,
    showPanelSections: Boolean,
    openSideBar: Function,
  },
  setup(props) {
    const store = useStore();
    const accountType = computed(() => store.state.account.type);
    return {
      accountType,
    };
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
    font-weight: bold;
    font-size: 15px;
    line-height: 18px;
    text-align: center;
    color: #ffffff;
  }
}
.router-link {
  display: flex;
  flex: 1;
  height: 100%;
}
.content-banner {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}
.custom-columns {
  height: 115px;
  // background: #19c37f;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: auto;
  display: flex;
}
.persona {
  background-color: #1d9add;
}

.empresa {
  background-color: #19c37f;
}

.section {
  display: flex;
  width: 70%;
  margin: auto;
  justify-content: center;
  align-items: center;
}

.desactive {
  background: #d6d6d6;
}
.text-desactive {
  color: #707070 !important;
}
</style>