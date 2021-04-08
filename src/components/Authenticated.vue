<template>
  <div v-show="loading" class="loading">
    <div>Loading...</div>
  </div>
  <router-view v-show="!loading"></router-view>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { getProfile } from '@/services/api/profile.service';

export default {
  name: 'Authenticated',
  setup() {
    const store = useStore();
    const router = useRouter();
    const loading = ref(false);

    onMounted(async () => {
      let cognitoId = router.currentRoute.value.params.cognitoId;
      if (cognitoId) {
        try {
          loading.value = true;
          const profile = await getProfile(cognitoId);
          store.commit('setProfile', profile);
          router.push({
            name: 'Dashboard',
            params: { accountType: 'persona' },
          });
        } catch (error) {
          console.log(error);
        }
        loading.value = false;
      } else {
        router.push({ name: 'Home' });
      }
    });
    return { loading };
  },
};
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}
</style>
