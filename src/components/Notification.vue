<template>
  <div
    class="notification has-text-centered content-notification"
    :style="{
      background: accountType === PERSONA ? '#eaf2fa' : '#EDF7E9',
    }"
  >
    <button
      v-show="displayError"
      type="button"
      class="delete"
      @click="remove"
    ></button>
    <div class="content-text">
      <span
        class="text"
        :style="{
          color: displayError ? '#F56E6E' : getColorByAccount(accountType),
        }"
        >{{ message }}</span
      >
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { getColorByAccount } from '@/utils/tools';
import { PERSONA } from '@/utils/constants';

export default {
  name: 'Notification',
  props: {
    message: String,
    displayError: Boolean,
    remove: Function,
  },
  setup() {
    const store = useStore();
    const accountType = computed(() => store.state.profile.isCompany);

    return { getColorByAccount, accountType, PERSONA };
  },
};
</script>
<style lang="scss" scoped>
.text {
  font-size: 14px;
  line-height: 16px;
}
// @media screen and (min-width: 769px) {
//   .content-notification {
//     // width: 30%;
//   }
// }

</style>
