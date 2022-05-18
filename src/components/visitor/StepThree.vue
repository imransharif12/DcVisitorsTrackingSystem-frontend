<template>
  <div class="container pt-3 pb-5">
    <b-form @submit="onSubmit">
      <div class="row pt-4">
        <div class="col-12 text-center pb-4">
          <h1 class="font-bold">
            {{ $t("request") }} {{ $t("access") }} Datacube Biel AG
          </h1>
        </div>
        <div
          v-if="alert"
          role="alert"
          aria-live="polite"
          aria-atomic="true"
          class="alert alert-danger"
        >
          {{ alertText }}
        </div>
        <div class="col-12">
          <div class="stepText">Step 3 of 6 -</div>
          <progress-bar :options="options" :value="value" />
        </div>
      </div>
      <h2 class="mb-4 mt-4">{{ $t("company_info") }}</h2>
      <div class="row">
        <div class="col-md-6 col-12 pb-4">
          <b-form-input
            required=""
            v-model="company"
            :placeholder="$t('company')"
          ></b-form-input>
        </div>
        <div class="col-md-6 col-12 pb-4">
          <b-form-input
            required=""
            v-model="position"
            :placeholder="$t('position')"
          ></b-form-input>
        </div>
        <div class="col-md-6 col-12 pb-4">
          <b-form-input
            type="email"
            required=""
            v-model="email"
            :placeholder="$t('email')"
          ></b-form-input>
        </div>
        <div class="col-md-6 col-12 pb-4">
          <VuePhoneNumberInput v-model="phone" />
        </div>
        <div class="col-md-6 col-12 pb-4">
          <b-form-input
            required=""
            v-model="address"
            :placeholder="$t('address')"
          ></b-form-input>
        </div>
        <div class="col-md-6 col-12 pb-4">
          <b-form-input
            required=""
            v-model="city"
            :placeholder="$t('city')"
          ></b-form-input>
        </div>
        <div class="col-md-6 col-12 pb-4">
          <b-form-input
            required=""
            v-model="zipcode"
            :placeholder="$t('zip')"
          ></b-form-input>
        </div>
        <div class="col-md-6 col-12 pb-4">
          <country-select
            v-model="country"
            :country="country"
            topCountry="US"
          />
        </div>
        <div class="col-6 text-left pt-3">
          <span class="next-button cursor-pointer" @click="Previous()">{{
            $t("previous")
          }}</span>
        </div>
        <div class="col-6 text-right pt-3">
          <button class="next-button">{{ $t("next") }}</button>
        </div>
      </div>
    </b-form>
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
      value: 49.98,
      yourValue: "",
      company: "",
      position: "",
      email: "",
      phone: "",
      alert: false,
      alertText: false,
      address: "",
      city: "",
      zipcode: "",
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
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      if (!this.phone) {
        this.alert = true;
        this.alertText = "Phone Number Required *";
        return false;
      }
      if (this.country == "") {
        this.alert = true;
        this.alertText = "Country Required";
        return false;
      }
      let data = {
        company: this.company,
        position: this.position,
        email: this.email,
        address: this.address,
        zipcode: this.zipcode,
        city: this.city,
        country: this.country,
        phone: this.phone,
      };
      this.$store.dispatch("setstepThreeData", data);
      this.$store.dispatch("setstepThree", false);
      this.$store.dispatch("setstepFour", true);
    },
    Previous() {
      this.$store.dispatch("setstepTwo", true);
      this.$store.dispatch("setstepThree", false);
    },
  },
  mounted() {
    let data = this.$store.getters.getData;
    if (data) {
      this.company = data.company;
      this.position = data.position;
      this.city = data.city;
      this.phone = data.phone;
      this.zipcode = data.zipcode;
      this.country = data.country;
      this.address = data.address;
      this.email = data.email;
    }
  },
};
</script>

<style scoped>
.container {
  width: 1000px;
  max-width: 100%;
}
</style>
