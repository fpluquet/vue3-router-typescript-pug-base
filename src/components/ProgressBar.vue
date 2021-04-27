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
          <p class="text">Datos generales</p>
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
          <p class="text">Localizacion</p>
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
          <p class="text">Datos biometricos</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import '@/assets/progressBar.scss';

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
    };

    return {
      className,
    };
  },
};
</script>

<style lang="scss" scoped></style>
