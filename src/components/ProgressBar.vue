<template>
  <!-- <img :src="src" /> -->
  <!-- <img src="/progress-general-bar.svg" alt="" height="20" width="450" /> -->
  <div class="container">
    <div class="steps">
      <ul class="custom-ul">
        <!-- <li class="custom-li step" :class="className[currentWizardStep].width"> -->
        <li
          class="custom-li"
          :class="[className[currentWizardStep].width, 'step-' + accountType]"
        >
          <div
            class="container-custom-button"
            :class="{
              ['container-custom-button-completed-' + accountType]:
                currentWizardStep >= 1,
            }"
          >
            <div class="custom-button">
              <div
                class="custom-button-inside"
                :class="{
                  ['custom-button-inside-completed-' + accountType]:
                    currentWizardStep > 1,
                }"
              ></div>
            </div>
          </div>
          <p>Datos generales</p>
        </li>

        <li class="custom-li" id="step2">
          <div
            class="container-custom-button"
            :class="{
              ['container-custom-button-completed-' + accountType]:
                currentWizardStep >= 2,
            }"
          >
            <div class="custom-button">
              <div
                class="custom-button-inside"
                :class="{
                  ['custom-button-inside-completed-' + accountType]:
                    currentWizardStep > 2,
                }"
              ></div>
            </div>
          </div>
          <p>Localizacion</p>
        </li>

        <li class="custom-li" id="step3">
          <div
            class="container-custom-button"
            :class="{
              ['container-custom-button-completed-' + accountType]:
                currentWizardStep >= 3,
            }"
          >
            <div class="custom-button">
              <div
                class="custom-button-inside"
                :class="{
                  ['custom-button-inside-completed-' + accountType]:
                    currentWizardStep > 3,
                }"
              ></div>
            </div>
          </div>
          <p>Datos biometricos</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { svgProgressBar } from '@/utils/svgGenerator';
import { globalPercentage } from '@/utils/tools';

export default {
  name: 'ProgressBar',
  props: {
    currentWizardStep: Number,
    accountType: String,
  },
  setup() {
    const store = useStore();
    // const accountType = computed(() => store.state.account.type);
    // const globalPercentage = computed(() => store.state.globalPercentage);

    // const src = computed(() => {
    //   return `data:image/svg+xml;base64,${svgProgressBar(
    //     globalPercentage.value,
    //     getColorByAccount(accountType.value),
    //   )}`;
    // });

    // const currentWizardStep = { step: 1 };
    const className = {
      1: { width: 'step1' },
      2: { width: 'step2' },
      3: { width: 'step3' },
    };

    return {
      // src,
      // globalPercentage,
      // getClassByAccount,
      className,
    };
  },
};
</script>

<style lang="scss" scoped>
.steps {
  flex-direction: 'column';
  display: flex;
  position: relative;
  min-width: 300px;
  // flex:1;
  justify-content: space-around;
}
.custom-li {
  display: flex;
  list-style-type: none;
  float: left;
  flex-direction: column;
  align-items: center;
  z-index: 1;
}

.custom-ul {
  display: flex;
  justify-content: space-around;
  flex: 1;
}
.custom-ul::after {
  content: '';
  background: #e4e4e4;
  height: 10px;
  width: 100%;
  display: flex;
  position: absolute;
  top: 24px;
  left: 0px;
  border-radius: 20px;
  z-index: 0;
}

.step-persona::before {
  content: '';
  background: #3d90e0;
  height: 10px;
  display: flex;
  width: 15%;
  position: absolute;
  top: 24px;
  left: 0px;
  border-radius: 20px;
  z-index: 2;
}

.step-empresa::before {
  content: '';
  background: #35a96a;
  height: 10px;
  display: flex;
  width: 15%;
  position: absolute;
  top: 24px;
  left: 0px;
  border-radius: 20px;
  z-index: 2;
}

.step1::before {
  content: '';
  width: 15%;
}
.step2::before {
  content: '';
  width: 49%;
}
.step3::before {
  content: '';
  width: 81%;
}

.custom-button {
  background: #e4e4e4;
  box-shadow: inset 0px 0px 9px rgba(0, 0, 0, 0.25);
  height: 43px;
  width: 43px;
  border-radius: 50%;
  z-index: 2;
  justify-content: center;
  display: flex;
  align-items: center;
}

.custom-button-inside {
  background: transparent;
  height: 32px;
  width: 32px;
  border-radius: 50%;
  z-index: 2;
}
.custom-button-inside-completed-persona {
  background: #3d90e0;
  box-shadow: inset 0px 0px 9px rgba(0, 0, 0, 0.25);
}

.custom-button-inside-completed-empresa {
  background: #35a96a;
  box-shadow: inset 0px 0px 9px rgba(0, 0, 0, 0.25);
}

// cuando esta completado el paso en verde sino en transparente
.container-custom-button {
  background: transparent;
  height: 57px;
  width: 57px;
  border-radius: 50%;
  justify-content: center;
  display: flex;
  align-items: center;
}

.container-custom-button-completed-persona {
  background: #3d90e0;
  box-shadow: inset 0px 0px 9px rgba(0, 0, 0, 0.25);
  height: 57px;
  width: 57px;
  border-radius: 50%;
  justify-content: center;
  display: flex;
  align-items: center;
}

.container-custom-button-completed-empresa {
  background: #35a96a;
  box-shadow: inset 0px 0px 9px rgba(0, 0, 0, 0.25);
  height: 57px;
  width: 57px;
  border-radius: 50%;
  justify-content: center;
  display: flex;
  align-items: center;
}
</style>
