<template>
  <div class="container mt-5 pt-5 pb-3">
    <b-form @submit="onSubmit">
      <div class="row">
        <div class="col-12 text-center pb-4">
          <h1 class="font-bold">
            {{ $t("request") }} {{ $t("access") }} Datacube Biel AG
          </h1>
        </div>
        <div class="col-12 pb-4">
          <div class="stepText">Step 6 of 6 -</div>
          <progress-bar :options="options" :value="value" />
        </div>
        <div class="col-12 pb-4">
          <b-form-select
            v-model="selected"
            :options="selectAuthorized"
          ></b-form-select>
        </div>
        <div class="col-6 text-left pt-3">
          <span class="next-button cursor-pointer" @click="Previous()">{{
            $t("previous")
          }}</span>
        </div>

        <div class="col-6 text-right pt-3">
          <button to="/" class="submit-button">
            <i
              style="color: #f1f1f1"
              class="fa fa-spinner fa-spin"
              v-if="buttonloader"
            ></i>
            {{ $t("submit") }}
          </button>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
import { saveUser } from "../../api/services";
import Vue from "vue";

export default {
  name: "StepSix",
  data() {
    return {
      selected: null,
      buttonloader: false,

      value: 100,
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
      selectAuthorized: [
        { value: null, text: "- Select Authorized Personnel - " },
        { value: "bob-smith", text: "Bob Smith" },
        { value: "fred-savage", text: "Fred Savage" },
        { value: "joe-mathews", text: "Joe Mathews" },
      ],
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      let formData = this.$store.getters.getData;
      let data = JSON.stringify({
        access_request: formData.access_request,
        category: formData.category,
        start_date: formData.start_data,
        end_date: formData.end_date,
        unlimited_access: formData.unlimited_access,
        justification: formData.justification,
        v_f_name: formData.v_f_name,
        v_l_name: formData.v_l_name,
        date: formData.date,
        company: formData.company,
        position: formData.position,
        email: formData.email,
        address: formData.address,
        zipcode: formData.zipcode,
        city: formData.city,
        country: formData.country,
        phone: formData.phone,
        hr_f_name: formData.hr_f_name,
        hr_l_name: formData.hr_l_name,
        hr_email: formData.hr_email,
        hr_phone: formData.hr_phone,
        areas: this.$store.getters.areas,
      });
      this.buttonloader = true;
      saveUser(data).then((responce) => {
        if (responce.code == 200) {
          this.toasterMessageSuccess("Record Added Successfully");
          this.buttonloader = false;
          this.$router.push({ name: "VisitorInfo" });
          this.$store.dispatch("setstepSix", false);
          this.$store.dispatch("setstepOne", true);
        }
      });
    },
    Previous() {
      this.$store.dispatch("setstepSix", false);
      this.$store.dispatch("setstepFive", true);
    },
    toasterMessageSuccess(message) {
      Vue.$toast.success(message, {
        position: "top-right",
        duration: 5000,
        className: ["toasting"],
      });
    },
  },
};
</script>

<style scoped>
.container {
  width: 1000px;
  max-width: 100%;
}
</style>
