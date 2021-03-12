<template>
  <div class="side-bar" :class="{ open: showSideBar }">
    <div class="header">
      <fa
        @click="setCloseSideBar"
        icon="chevron-right"
        width="12"
        type="fas"
        class="fa-chevron-down pull-right"
      ></fa>
    </div>
    <div class="side-bar-content">
      <slot />
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "SideBar",
  setup() {
    const store = useStore();
    const showSideBar = computed(() => store.state.showSideBar);
    const setCloseSideBar = () => store.commit("setShowSideBar", false);
    return { setCloseSideBar, showSideBar };
  },
};
</script>

<style lang="scss" scoped>
.side-bar {
  position: fixed;
  background: #fefefe;
  box-shadow: 0px 10px 24px 9px rgba(0, 0, 0, 0.1);
  right: 0;
  top: 0;
  height: 100vh;
  width: 30%;
  display: flex;
  flex-direction: column;
  transform: translateX(150%);
  &.open {
    transform: translateX(0);
  }
  .side-bar-content {
    display: flex;
    flex: 1;
    padding-left: 80px;
    padding-right: 80px;
    flex-direction: column;
    justify-content: center;
  }
  .header {
    position: absolute;
    top: 100px;
    left: 10px;
  }
}
</style>