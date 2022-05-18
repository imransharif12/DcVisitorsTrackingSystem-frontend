<template>
  <div class="container pt-4">
    <div v-if="this.$store.getters.stepOne"><StepOne /></div>
    <div v-if="this.$store.getters.stepTwo"><StepTwo /></div>
    <div v-if="this.$store.getters.stepThree"><StepThree /></div>
    <div v-if="this.$store.getters.stepFour"><StepFour /></div>
    <div v-if="this.$store.getters.stepFive"><StepFive /></div>
    <div v-if="this.$store.getters.stepSix"><StepSix /></div>
  </div>
</template>

<script>
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import StepSix from "./StepSix";

export default {
  name: "home",
  data() {
    return {
      yourValue: "",
      result: null,
      visitorFormObject: {
        access_request: "",
        category: "",
        start_data: "",
        end_date: "",
        justification: "",
        company: "",
      },
    };
  },
  methods: {
    emitStepOne(object) {
      console.log(object);
    },
    stepOneVisitorFormObject(object) {
      this.visitorFormObject.access_request = object.access_request;
    },
    stepTwoVisitorFormObject(object) {
      this.visitorFormObject.company = object.company;
    },
  },

  components: {
    StepOne,
    StepTwo,
    StepThree,
    StepFour,
    StepFive,
    StepSix,
  },
};
</script>

<style scoped>
.container {
  width: 1000px;
  max-width: 100%;
}
</style>
