<template>
  <router-view />
  <div class="content-img">
    <img class="img-bg" src="../src/res/layout.svg" />
  </div>
</template>

<style lang="scss" scoped>
#app {
  // height: 100vh;
  display: flex;
  flex: 1;
}

.content-img {
  position: fixed;
  top: 0;
  right: 0;
  /* height: 100vh; */
  width: 50%;
}

.img-bg {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
}
</style>
