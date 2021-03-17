<template>
  <router-view />
</template>

<style lang="scss" scoped>
#app {
  // height: 100vh;
  display: flex;
  flex: 1;
  @media screen and (max-width: 768px) {
    .container-app {
      background: #e5e5e5 !important;
    }
  }
}
</style>
