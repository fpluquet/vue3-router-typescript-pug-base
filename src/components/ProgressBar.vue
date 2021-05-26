<template>
  <div class="container">
    <div class="steps">
      <ul class="custom-ul">
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
          <p
            class="text"
            :style="{ color: currentWizardStep > 1 ? '#343434' : '#848484' }"
          >
            Datos generales
          </p>
        </li>

        <li class="custom-li">
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
          <p
            class="text"
            :style="{ color: currentWizardStep > 2 ? '#343434' : '#848484' }"
          >
            Localización
          </p>
        </li>

        <li class="custom-li">
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
          <p
            class="text"
            :style="{ color: currentWizardStep > 3 ? '#343434' : '#848484' }"
          >
            Validación biométrica
          </p>
        </li>
        <li v-if="accountType === EMPRESA" class="custom-li">
          <div
            class="container-custom-button"
            :class="{
              ['container-custom-button-completed-' + accountType]:
                currentWizardStep >= 4,
            }"
          >
            <div class="custom-button">
              <div
                class="custom-button-inside"
                :class="{
                  ['custom-button-inside-completed-' + accountType]:
                    currentWizardStep > 4,
                }"
              ></div>
            </div>
          </div>
          <p
            class="text"
            :style="{ color: currentWizardStep > 4 ? '#343434' : '#848484' }"
          >
            eRUT
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import '@/assets/progressBar.scss';
import { EMPRESA } from '@/utils/constants';

export default {
  name: 'ProgressBar',
  props: {
    currentWizardStep: Number,
    accountType: String,
  },
  setup() {
    const store = useStore();
    const className = {
      1: { width: 'step1' },
      2: { width: 'step2' },
      3: { width: 'step3' },
      4: { width: 'step4' },
    };

    return {
      className,
      EMPRESA,
    };
  },
};
</script>

<style lang="scss" scoped></style>
