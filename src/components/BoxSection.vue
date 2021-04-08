<template>
  <div class="column box-section" :class="{ desactive: !active }">
    <div
      :style="{
        width: '75%',
        'text-align': 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      }"
    >
      <div :style="{ 'max-width': '60%' }">
        <span
          class="title"
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
  // border: 1px solid gray;
  // margin-right: 70px;
  min-height: 143px;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background: #ffffff;
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.12);
  border-radius: 15px;
  cursor: pointer;
  border: 1px #464646;
}
.title {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
}
.desactive {
  // pointer-events: none;
  background: #cfcfcf !important;
  box-shadow: 0px 0px 0px 0px;
}
</style>
