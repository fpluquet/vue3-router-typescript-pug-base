<template>
  <div class="notification notif has-text-centered">
    <!-- <button type="button" class="delete"></button> -->
    <div class="content-text">
      <span class="text">{{ message }}</span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'Notification',
  props: {
    message: String,
  },
  setup() {
    const hide = ref(false);
    return { hide };
  },
};
</script>
<style lang="scss" scoped>
.notif {
  background: #edf7e9;
  // text-align: center;
}
.text {
  font-size: 14px;
  line-height: 133.19%;
  color: #6ac24b;
}
</style>
