<template>
  <div class="container pt-3 pb-5">
    <div class="stepText">Step 2 of 3 -</div>
    <progress-bar :options="options" :value="value" />
    <div class="row pt-3">
      <div class="col-12">
        <div class="badgeWrapper">
          <img :src="'./svg/badge.svg'" alt="" />
          <div class="text">Visitor</div>
        </div>
      </div>
    </div>
    <h2 class="mb-4 mt-4">Company Information</h2>
    <div class="row">
      <div class="col-md-6 col-12 pb-4">
        <b-form-input placeholder="Company"></b-form-input>
      </div>
      <div class="col-md-6 col-12 pb-4">
        <b-form-input placeholder="Position"></b-form-input>
      </div>
      <div class="col-md-6 col-12 pb-4">
        <b-form-input placeholder="Email"></b-form-input>
      </div>
      <div class="col-md-6 col-12 pb-4">
        <VuePhoneNumberInput v-model="yourValue" />
      </div>
      <div class="col-md-6 col-12 pb-4">
        <b-form-input placeholder="Address"></b-form-input>
      </div>
      <div class="col-md-6 col-12 pb-4">
        <b-form-input placeholder="City"></b-form-input>
      </div>
      <div class="col-md-6 col-12 pb-4">
        <b-form-input placeholder="Zip"></b-form-input>
      </div>
      <div class="col-md-6 col-12 pb-4">
        <country-select v-model="country" :country="country" topCountry="US" />
      </div>
      <div class="col-6 text-left pt-3">
        <router-link to="/" class="next-button">Previous</router-link>
      </div>

      <div class="col-6 text-right pt-3">
        <router-link to="/visitor-info" class="next-button">Next</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import VuePhoneNumberInput from "vue-phone-number-input";

export default {
  name: "CompanyInfo",
  components: {
    VuePhoneNumberInput,
  },
  data() {
    return {
      value: "66.66",
      yourValue: "",
      country: "",
      options: {
        text: {
          color: "#FFFFFF",
          shadowEnable: true,
          shadowColor: "#000000",
          fontSize: 14,
          fontFamily: "Helvetica",
          dynamicPosition: false,
          hideText: true,
        },
        progress: {
          color: "#8aea57",
          backgroundColor: "#e9ecef",
          inverted: false,
        },
        layout: {
          height: 21,
          width: 970,
          verticalTextAlign: 61,
          horizontalTextAlign: 43,
          zeroOffset: 0,
          strokeWidth: 30,
          progressPadding: 0,
          type: "line",
        },
      },
    };
  },
};
</script>

<style scoped>
.container {
  width: 1000px;
  max-width: 100%;
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
