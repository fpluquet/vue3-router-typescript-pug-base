<template>
  <BasicLayout>
    <template v-if="isDesktop">
      <DashboardDesktop :accountType="type" />
    </template>
    <template v-else>
      <DashboardMobile :accountType="type" />
    </template>
  </BasicLayout>
</template>

<script>
import BasicLayout from "../../layouts/BasicLayout.vue";
import DashboardDesktop from "../Dashboard/DashboardDesktop";
import DashboardMobile from "../Dashboard/DashboardMobile";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Dashboard",
  components: {
    BasicLayout,
    DashboardDesktop,
    DashboardMobile,
  },
  // props: {
  //   accountType: String,
  // },
  setup(props) {
    let type = ref(null);
    let isDesktop = ref(null);
    const router = useRouter();
    onMounted(() => {
      isDesktop.value = true;
      type.value = router.currentRoute.value.params.accountType;
    });
    return { isDesktop, type };
  },
};
</script>

<style lang="scss" scoped>
</style>