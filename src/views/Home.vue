<template>
  <Splash />
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Splash from "../views/Splash.vue";
export default {
  name: "Home",
  components: {
    Splash,
  },
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
      }
    });
  },
};
</script>
