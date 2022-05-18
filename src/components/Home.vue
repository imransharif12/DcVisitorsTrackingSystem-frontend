<template>
  <div class="container">
    <stepper :options="stepperOptions">
      <div slot="step-1">
        <div class="row">
          <div class="col-12">
            <div class="badgeWrapper">
              <img :src="'./svg/badge.svg'" alt="" />
              <div class="text">Visitor</div>
            </div>
          </div>
        </div>
        <h2 class="mb-4 mt-4">Personal Information</h2>
        <b-form ref="refFormName">
          <div class="row">
            <div class="col-md-6 col-12 pb-4">
              <label>First Name <span class="danger">*</span></label>
              <b-form-input placeholder="First Name"></b-form-input>
            </div>
            <div class="col-md-6 col-12 pb-4">
              <label>Last Name <span class="danger">*</span></label>
              <b-form-input placeholder="Last Name"></b-form-input>
            </div>
            <div class="col-md-6 col-12 pb-4">
              <label>Birth Date <span class="danger">*</span></label>
              <b-form-input placeholder="DD/MM/YYYY"></b-form-input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 col-12 pb-4">
              <label>Passport or ID # <span class="danger">*</span></label>
              <b-form-input placeholder="Passport or ID #"></b-form-input>
            </div>
            <div class="col-md-6 col-12">
              <label>Passport / ID Card</label>
            </div>
          </div>
          <button class="next-button">Imran</button>
        </b-form>
      </div>

      <div slot="step-2">
        <div class="row">
          <div class="col-12">
            <div class="badgeWrapper">
              <img :src="'./svg/badge.svg'" alt="" />
              <div class="text">Visitor</div>
            </div>
          </div>
        </div>
        <StepThree />
      </div>

      <div slot="step-3">
        <h1 class="mb-4">Visitor Access Datacube Biel AG</h1>
        <div class="row">
          <div class="col-md-6 col-12 pb-4">
            <label>First Name <span class="danger">*</span></label>
            <b-form-input placeholder="First Name"></b-form-input>
          </div>
          <div class="col-md-6 col-12 pb-4">
            <label>Last Name <span class="danger">*</span></label>
            <b-form-input placeholder="Last Name"></b-form-input>
          </div>
        </div>
      </div>
    </stepper>
  </div>
</template>

<script>
import Stepper from "vuejs-stepper";
import StepThree from "./visitor/StepThree";

export default {
  name: "home",
  data() {
    return {
      yourValue: "",
      result: null,
      stepperOptions: {
        headers: [{ title: "" }, { title: "" }, { title: "" }],
        prevText: "Previous",
        nextText: "Next",
      },
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      console.log("Imran Sharif");
    },
  },
  components: {
    Stepper,
    StepThree,
  },
};
</script>

<style scoped>
.container {
  width: 1000px;
}
.badgeWrapper {
  border: 1px solid var(--primaryColor);
  width: 185px;
  margin: 0 auto;
  text-align: center;
}
.badgeWrapper img {
  width: 125px;
  margin: 10px 0;
}
.text {
  background: var(--primaryColor);
  color: #333;
  font-size: 14px;
  line-height: 20px;
  text-transform: uppercase;
  padding: 12px 5px;
}
</style>
