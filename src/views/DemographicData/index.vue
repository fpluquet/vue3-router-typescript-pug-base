<template>
  <DemographicDataFormOne v-if="step1" />
  <DemographicDataFormTwo v-else />
  <Button className="mt-6 is-fullwidth" @click="step1 = !step1">{{
    step1 ? "Siguiente" : "Atras"
  }}</Button>
</template>

<script>
import { ref, onMounted } from "vue";
import DemographicDataFormOne from "./DemographicDataFormOne";
import DemographicDataFormTwo from "./DemographicDataFormTwo";
import Button from "@/components/Button.vue";
export default {
  name: "DemographicData",
  components: { DemographicDataFormOne, DemographicDataFormTwo, Button },
  setup() {
    let step1 = ref(true);
    return { step1 };
  },
};
</script>

<style lang="scss" scoped>
</style>