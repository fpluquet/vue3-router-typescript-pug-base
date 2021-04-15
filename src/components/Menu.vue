<template>
  <div
    class="columns is-flex is-relative"
    :style="{ background: '#E5E5E5', 'margin-bottom': '0px' }"
  >
    <div
      class="column is-flex is-justify-content-center is-align-items-flex-end"
    >
      <Banner :name="'pago_facil_banner'" />
    </div>
    <div
      :style="{
        position: 'absolute',
        top: '-10px',
        right: '15px',
        height: '100%',
        display: 'flex',
        'align-items': 'flex-end',
      }"
    >
      <span v-show="Boolean(userEmail)" class="custom-text  mr-1">{{
        userEmail
      }}</span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Banner from '../components/Banner.vue';
export default {
  name: 'Menu',
  components: {
    Banner,
  },
  setup() {
    const store = useStore();
    let userEmail = computed(() => {
      return store.state.profile.email;
    });
    return { userEmail };
  },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  .navbar {
    display: none;
  }
}
.custom-text {
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 27px;
}
</style>
