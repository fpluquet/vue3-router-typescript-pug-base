<template>
  <div
    class="column box-section is-flex-direction-row is-flex is-justify-content-space-around is-align-items-center has-text-centered"
    :class="{ desactive: !active }"
  >
    <div
      class="is-flex is-justify-content-center is-align-items-center has-text-centered"
      :style="{
        width: '75%',
      }"
    >
      <div :style="{ 'max-width': '60%' }">
        <span
          class="title has-text-centered has-text-weight-bold"
          :style="{
            color: active ? getColorByAccount(accountType) : '#8E8E8E',
          }"
          >{{ title }}</span
        >
      </div>
    </div>
    <ProgressCircle
      :percent="percent"
      :color="getColorByAccount(accountType)"
    />
  </div>
</template>

<script>
import ProgressCircle from './ProgressCircle';
import { PERSONA } from '@/utils/constants';
import { getColorByAccount } from '@/utils/tools';
export default {
  name: 'BoxSection',
  components: {
    ProgressCircle,
  },
  props: {
    title: String,
    active: Boolean,
    percent: Number,
    accountType: String,
  },
  setup(props) {
    return {
      PERSONA,
      getColorByAccount,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-section {
  min-height: 143px;
  margin-top: 15px;
  background: #ffffff;
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.12);
  border-radius: 15px;
  cursor: pointer;
  border: 1px #464646;
}
.title {
  font-size: 20px;
  line-height: 23px;
}
.desactive {
  // pointer-events: none;
  background: #cfcfcf !important;
  box-shadow: 0px 0px 0px 0px;
}
</style>
