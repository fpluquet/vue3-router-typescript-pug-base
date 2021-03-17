<template>
  <h1>dashboard mobile</h1>
</template>

<script>
import ProgressBar from "../../components/ProgressBar";
import BoxSection from "../../components/BoxSection";
import { ref, onMounted } from "vue";

export default {
  name: "DashboardDesktop",
  components: {
  },
  props: {
    accountType: String,
  },
  setup(props) {
    onMounted(() => {});
    return {};
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
    display: flex;
    justify-content: center;
    flex: 1;
    flex-direction: column;
  }
}
</style>