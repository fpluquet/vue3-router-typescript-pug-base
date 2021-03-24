<template>
  <Title class="mb-6" :title="'Datos Demográficos'" />
  <DemographicDataFormOne v-if="stepOne" />
  <DemographicDataFormTwo v-else />
  <Button className="mt-6 is-fullwidth" @click="stepOne = !stepOne">{{
    stepOne ? "Siguiente" : "Atras"
  }}</Button>
</template>

<script>
import { ref, onMounted } from "vue";
import DemographicDataFormOne from "./DemographicDataFormOne";
import DemographicDataFormTwo from "./DemographicDataFormTwo";
import Button from "@/components/Button.vue";
import Title from "@/components/Title.vue";

export default {
  name: "DemographicData",
  components: { DemographicDataFormOne, DemographicDataFormTwo, Button, Title },
  setup() {
    let stepOne = ref(true);
    return { stepOne };
  },
};
</script>

<style lang="scss" scoped>
</style>