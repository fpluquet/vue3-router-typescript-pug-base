<template>
  <div class="splash">
    <div class="columns is-centered">
      <div
        class="column is-10-mobile is-8-tablet is-6-desktop is-4-widescreen is-3-fullhd field mb-1 content-splash"
      >
        <div class="columns is-centered">
          <div class="column img">
            <Banner
              :name="'pago_facil_banner'"
              :style="{ width: 252, height: 62 }"
            />
          </div>
        </div>
        <div class="columns is-centered is-mobile">
          <div
            class="is-10-mobile is-8-tablet column is-10-fullhd field mb-1 custom-column"
          >
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="img-bg"></div>
  <div class="arc">
    <div class="content-arc">
      <img src="/arco.svg" />
    </div>
  </div> -->
</template>

<script>
import Banner from '../components/Banner.vue';
export default {
  name: 'crearCuenta',
  components: {
    Banner,
  },
};
</script>

<style lang="scss" scoped>
.content-splash {
  display: flex;
  justify-content: center;
  flex-direction: column;
  justify-content: center;
  background: #ffffff;
  box-shadow: 0px 30px 30px rgba(0, 0, 0, 0.12);
  border-radius: 15px;
  height: 600px;
  padding-left: 20px;
  padding-right: 20px;
  max-width: 500px;
  // margin: auto;
  z-index: 1;
}
.splash {
  display: flex;
  flex: 1;
  min-width: 300px;
  justify-content: center;
  flex-direction: column;
  background: linear-gradient(180deg, #5e98d5 0%, rgba(94, 152, 213, 0) 100%);

  .field {
    margin-bottom: 0px;
  }
  .custom-column {
    .column {
      padding: 1px !important;
    }
  }

  .img {
    margin-bottom: 50px;
    display: flex;
    justify-content: center;
  }
}
// @media screen and (max-width: 768px) {
//   .splash {
//     background: #ffffff !important;
//   }
// }

// .img-bg {
//   background-image: url('/layout.svg');
//   position: absolute;
//   bottom: 0;
//   right: 0;
//   width: 50%;
//   height: 100%;
//   flex: 1;
// }

// @media screen and (max-width: 768px) {
//   .img-bg {
//     display: none;
//   }
//   .arc {
//     display: none;
//   }
// }

// .arc {
//   width: 50%;
//   height: 30%;
//   bottom: 0;
//   left: 0;
//   position: fixed;
// }

// .content-arc {
//   display: flex;
//   justify-content: flex-end;
//   margin-right: 60px;
// }
</style>
