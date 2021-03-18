<template>
  <button :type="type" class="button custom-button" :class="accountType">
    <slot />
  </button>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Button",
  props: {
    type: String,
    className: String,
  },
  setup() {
    let accountType = ref(null);
    const store = useStore();
    accountType = computed(() => store.state.account.type);
    return { accountType };
  },
};
</script>

<style lang="scss" scoped>
.custom-button {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #ffffff !important;
  min-height: 42px;
  border-radius: 0px;
  &.persona {
    background-color: #1d9add;
  }
  &.empresa {
    background-color: #6ac24b;
  }
}
</style>