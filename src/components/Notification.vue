<template>
  <div
    class="notification has-text-centered"
    :style="{ background: accountType === PERSONA ? '#eaf2fa' : '#EDF7E9' }"
  >
    <!-- <button type="button" class="delete"></button> -->
    <div class="content-text">
      <span class="text" :style="{ color: getColorByAccount(accountType) }">{{
        message
      }}</span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { getColorByAccount } from '@/utils/tools';
import { PERSONA } from '@/utils/constants';

export default {
  name: 'Notification',
  props: {
    message: String,
  },
  setup() {
    const store = useStore();
    const hide = ref(false);
    const accountType = PERSONA; // ToDo get from vuex. (profile)
    return { getColorByAccount, accountType, PERSONA };
  },
};
</script>
<style lang="scss" scoped>
.text {
  font-size: 14px;
  line-height: 16px;
}
</style>
