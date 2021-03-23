<template>
  <router-view></router-view>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "Authenticated",
  setup() {
    const store = useStore();
    const router = useRouter();
    onMounted(() => {
      let cognitoId = Boolean(store.state.account.cognitoId);
      if (cognitoId) {
        router.push({
          name: "Dashboard",
          params: { accountType: "persona" },
        });
      } else {
        router.push({ name: "Home" });
      }
    });

    return {};
  },
};
</script>

<style>
</style>