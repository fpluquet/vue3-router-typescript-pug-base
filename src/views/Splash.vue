<template>
  <div class="splash">
    <div class="columns is-centered">
      <div
        class="column is-10-mobile is-8-tablet is-6-desktop is-4-widescreen is-3-fullhd field mb-1 content-splash"
      >
        <div class="columns is-centered">
          <div class="column img">
            <img src="@/res/pago_facil_banner.svg" width="252" height="62" />
          </div>
        </div>
        <div class="columns is-centered is-mobile">
          <div
            class="is-10-mobile is-8-tablet column is-8 field mb-1 custom-column"
          >
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "crearCuenta",
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
  height: 500px;
  padding-left: 20px;
  padding-right: 20px;
  max-width: 500px;
  margin: auto;
  z-index: 1;
}
.splash {
  display: flex;
  flex: 1;
  min-width: 300px;
  justify-content: center;
  flex-direction: column;
  background: #00378f;

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
@media screen and (max-width: 768px) {
  .splash {
    background: #ffffff !important;
  }
}
</style>