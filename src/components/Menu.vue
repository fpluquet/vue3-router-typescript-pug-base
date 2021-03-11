<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img src="@/res/pago_facil.svg" width="252" height="62" />
      </a>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-end">
        <a class="custom-img-name">
          <img
            class="is-rounded custom-img"
            width="32"
            height="32"
            src="@/assets/logo.png"
          />
          <span class="m-2 custom-text">{{ "Hola, persona" }}</span>
        </a>
        <a class="navbar-item">
          <img src="@/assets/logo.png" alt="avatar" />
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Menu",
  setup() {},
};
</script>

<style lang="scss" scoped>
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
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 27px;
}
.navbar-item img {
  max-height: 3.25rem;
}
</style>