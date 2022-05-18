<template>
  <div class="container pt-5 pb-5">
    <b-form @submit="onSubmit">
      <div class="row">
        <div class="col-12 text-center pb-4">
          <h1 class="font-bold">
            {{ $t("request") }} {{ $t("access") }} Datacube Biel AG
          </h1>
        </div>
        <div class="col-12 pb-4">
          <div class="stepText">Step 4 of 6 -</div>
          <progress-bar :options="options" :value="value" />
        </div>
        <div class="col-12 pb-4">
          <h3 style="border-bottom: 1px solid #333">HR {{ $t("contact") }}</h3>
        </div>
        <div class="col-md-6 col-12 pb-4">
          <b-form-input
            type="text"
            v-model="hr_f_name"
            :placeholder="$t('f_name')"
          ></b-form-input>
        </div>
        <div class="col-md-6 col-12 pb-4">
          <b-form-input
            type="text"
            v-model="hr_l_name"
            :placeholder="$t('l_name')"
          ></b-form-input>
        </div>
        <div class="col-md-6 col-12 pb-4">
          <b-form-input
            type="email"
            required=""
            v-model="hr_email"
            :placeholder="$t('email')"
          ></b-form-input>
        </div>
        <div class="col-md-6 col-12 pb-4">
          <b-form-input
            required=""
            v-model="hr_phone"
            :placeholder="$t('phone')"
          ></b-form-input>
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
export default {
  name: "StepFour",

  data() {
    return {
      value: 66.64,
      hr_f_name: "",
      hr_l_name: "",
      hr_email: "",
      hr_phone: "",
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
      let data = {
        hr_f_name: this.hr_l_name,
        hr_l_name: this.hr_l_name,
        hr_email: this.hr_email,
        hr_phone: this.hr_phone,
      };
      this.$store.dispatch("setstepFourData", data);
      evt.preventDefault();
      this.$store.dispatch("setstepFour", false);
      this.$store.dispatch("setstepFive", true);
    },
    Previous() {
      this.$store.dispatch("setstepFour", false);
      this.$store.dispatch("setstepThree", true);
    },
  },
  mounted() {
    let data = this.$store.getters.getData;
    if (data) {
      this.hr_f_name = data.hr_f_name;
      this.hr_l_name = data.hr_l_name;
      this.hr_email = data.hr_email;
      this.hr_phone = data.hr_phone;
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
