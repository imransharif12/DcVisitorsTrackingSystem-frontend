<template>
  <div class="container pt-5 pb-5">
    <b-form @submit="onSubmitStepTwo">
      <div class="row">
        <div class="col-12 text-center pb-4">
          <h1 class="font-bold">
            {{ $t("request") }} {{ $t("access") }} Datacube Biel AG
          </h1>
        </div>
        <div class="col-12 pb-4">
          <div class="stepText">Step 2 of 6 -</div>
          <progress-bar :options="options" :value="value" />
        </div>
        <div class="col-12 pb-4">
          <h2>{{ $t("individual_access_information") }}</h2>
        </div>
        <div class="col-md-6 col-12 pb-4">
          <b-form-input
            type="text"
            required=""
            v-model="v_f_name"
            :placeholder="$t('f_name')"
          ></b-form-input>
        </div>
        <div class="col-md-6 col-12 pb-4">
          <b-form-input
            type="text"
            required=""
            v-model="v_l_name"
            :placeholder="$t('l_name')"
          ></b-form-input>
        </div>
        <div class="col-md-6 col-12 pb-4">
          <b-form-datepicker
            v-model="date"
            :placeholder="$t('select') + ' ' + $t('end_date')"
            hide-header
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }"
          ></b-form-datepicker>
        </div>
      </div>
      <div class="row pt-3">
        <div class="col-6 text-left">
          <span class="next-button cursor-pointer" @click="Previous()">{{
            $t("previous")
          }}</span>
        </div>
        <div class="col-6 text-right">
          <button to="/internal-company-info" class="next-button">
            {{ $t("next") }}
          </button>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "StepTwo",

  data() {
    return {
      v_f_name: "",
      v_l_name: "",
      date: "",
      value: 33.32,
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
    onSubmitStepTwo(evt) {
      evt.preventDefault();
      let data = {
        v_f_name: this.v_f_name,
        v_l_name: this.v_l_name,
        date: this.date,
      };
      this.$store.dispatch("setstepThree", true);
      this.$store.dispatch("setstepTwo", false);
      this.$store.dispatch("setstepTwoData", data);
    },
    Previous() {
      this.$store.dispatch("setstepOne", true);
      this.$store.dispatch("setstepTwo", false);
    },
  },
  mounted() {
    let data = this.$store.getters.getData;
    if (data) {
      this.v_f_name = data.v_f_name;
      this.v_l_name = data.v_l_name;
      this.date = data.date;
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
