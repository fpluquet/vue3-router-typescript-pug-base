<template>
  <router-view></router-view>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    let cognitoId = ref(false);
    onMounted(() => {
      cognitoId = Boolean(store.state.account.cognitoId);
      if (cognitoId) {
        router.push({
          name: "Dashboard",
          params: { accountType: "persona" },
        });
      } else {
        router.push({ name: "Home" });
      }
    });

    return { cognitoId };
  },
};
</script>

<style>
</style>