<template>
  <router-view />
</template>

<style lang="scss" scoped>
#app {
  // height: 100vh;
  display: flex;
  flex: 1;
  @media screen and (max-width: 1024px) {
    .container-app {
      background: #e5e5e5 !important;
    }
  }
}
</style>
