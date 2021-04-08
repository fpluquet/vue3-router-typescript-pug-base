<template>
  <nav
    class="navbar"
    role="navigation"
    aria-label="main navigation"
    :style="{ background: '#e5e5e5', zIndex: '0' }"
  >
    <div class="navbar-brand nav-brand-custom">
      <Banner :name="'pago_facil_banner'" :style="{ width: 252, height: 62 }" />
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="nav-bar-pago-facil"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="nav-bar-pago-facil" class="navbar-menu navbar-menu-custom">
      <div class="navbar-end">
        <span v-show="Boolean(userEmail)" class="custom-text mr-1"
          >Hola, {{ userEmail }}</span
        >
        <!-- <a class="navbar-item">
          <fa icon="bell" width="18" type="far"></fa>
        </a> -->
      </div>
    </div>
  </nav>
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
.navbar-end {
  margin-left: 0 !important;
}

.custom-img {
  background: skyblue;
  border-radius: 50%;
}

.custom-img-name {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}
.custom-text {
  display: flex;
  align-items: center;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 27px;
}
.navbar-item img {
  max-height: 3.25rem;
}
.nav-brand-custom {
  display: flex;
  flex: 1;
  justify-content: center;
}
.navbar-menu-custom {
  justify-content: space-evenly;
}
</style>
