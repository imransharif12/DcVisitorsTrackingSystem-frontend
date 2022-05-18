<template>
  <div class="container pt-5 pb-3">
    <b-form @submit="onSubmit">
      <div class="row">
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
        <div class="col-12 pb-4">
          <div class="stepText">Step 5 of 6 -</div>
          <progress-bar :options="options" :value="value" />
        </div>
        <div class="col-12">
          <div class="pt-3 pb-3">
            <b-form-checkbox-group
              v-model="areas"
              :options="dataOptions"
              class="grid mb-3"
              value-field="item"
              text-field="name"
            ></b-form-checkbox-group>
          </div>
          <div class="pt-3 pb-5">
            <b-form-checkbox-group
              v-model="areas"
              :options="roomOptions"
              class="grid grid-two mb-3"
              value-field="item"
              text-field="name"
            ></b-form-checkbox-group>
          </div>
        </div>
        <div class="col-6 text-left">
          <span class="next-button cursor-pointer" @click="Previous()">{{
            $t("previous")
          }}</span>
        </div>

        <div class="col-6 text-right">
          <button class="next-button">{{ $t("next") }}</button>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      areas: [],
      alert: false,
      alertText: "",
      value: 83.3,
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
      dataOptions: [
        { item: "Datacube 101 – R1.301", name: "Datacube 101 – R1.301" },
        { item: "Datacube-102-R1.302", name: "Datacube 102 – R1.302" },
        { item: "Datacube 202 – R2.302", name: "Datacube 202 – R2.302" },
        { item: "Datacube-201–R2.301", name: "Datacube 201 – R2.301" },
        { item: "Areal", name: "Areal" },
        { item: "Lager-B", name: "Lager B" },
        { item: "warenanlieferung", name: "Warenanlieferung" },
        { item: "Buro-DCB", name: "Büro DCB" },
        { item: "Büro-Netrics", name: "Büro Netrics" },
        { item: "reinigung-netrics", name: "Reinigung Netrics" },
        { item: "Lieferanten-Netrics", name: "Lieferanten Netrics" },
      ],
      roomOptions: [
        { item: "office", name: "Office" },
        { item: "meeting-room", name: "Meeting Room" },
        { item: "cleaning-room", name: "Cleaning Room" },
        { item: "break-room", name: "Break Room" },
      ],
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      if (this.areas.length == 0) {
        this.alert = true;
        this.alertText = "Select Atlease one option";
        return false;
      }
      this.$store.dispatch("setstepFiveData", this.areas);
      this.$store.dispatch("setstepFive", false);
      this.$store.dispatch("setstepSix", true);
    },
    Previous() {
      this.$store.dispatch("setstepFour", true);
      this.$store.dispatch("setstepFive", false);
    },
  },
  mounted() {
    let data = this.$store.getters.areas;
    if (data) {
      this.areas = data;
    }
  },
};
</script>

<style scoped>
.container {
  width: 1000px;
  max-width: 100%;
}
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 10px;
  row-gap: 10px;
}
.grid-two {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
</style>
