<template>
  <div class="container pt-3 pb-4">
    <div class="row">
      <br />
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
        <div class="stepText">Step 1 of 6 -</div>
        <progress-bar :options="options" :value="value" />
      </div>
      <div class="col-12 mainBadge">
        <div
          class="badgeWrapper"
          :class="{ active: this.access_request == 'badge' }"
          @click="accessRequest('badge')"
        >
          <img :src="'./svg/BadgeMain.svg'" alt="" />
          <div class="text">{{ $t("badge") }}</div>
        </div>
        <div
          class="badgeWrapper"
          :class="{ active: this.access_request == 'door_access' }"
          @click="accessRequest('door_access')"
        >
          <img :src="'./svg/DoorAccess.svg'" alt="" />
          <div class="text">{{ $t("door_access_key") }}</div>
        </div>
        <div
          class="badgeWrapper"
          :class="{ active: this.access_request == 'gate_transponder' }"
          @click="accessRequest('gate_transponder')"
        >
          <img :src="'./svg/RollingGate.svg'" alt="" />
          <div class="text">{{ $t("gate_transponder") }}</div>
        </div>
      </div>
    </div>
    <b-form @submit="onSubmitStepOne">
      <div class="row pt-5">
        <div class="col-12 pb-4">
          <b-form-select
            v-model="category"
            :options="selectOptions"
          ></b-form-select>
        </div>
        <div class="col-12">
          <h3 class="pb-3">{{ $t("duration") }}</h3>
        </div>
        <div class="col-md-6 col-12 pb-4">
          <b-form-datepicker
            required=""
            :placeholder="$t('select') + ' ' + $t('start_date')"
            v-model="start_data"
            hide-header
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }"
          ></b-form-datepicker>
        </div>
        <div class="col-md-6 col-12 pb-4" v-if="!this.unlimited_access">
          <b-form-datepicker
            required=""
            v-model="end_date"
            :placeholder="$t('select') + ' ' + $t('end_date')"
            hide-header
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }"
          ></b-form-datepicker>
        </div>
        <div class="col-12 pb-4">
          <b-form-checkbox value="Unlimited" v-model="unlimited_access">
            {{ $t("Unlimited") }}
          </b-form-checkbox>
        </div>
        <div class="col-12">
          <h3 class="pb-3">{{ $t("justification") }} *</h3>
        </div>
        <div class="col-12 pb-4">
          <b-form-textarea
            required=""
            v-model="justification"
            :placeholder="$t('justification_place_hoder')"
            rows="3"
            max-rows="6"
            >{{ justification }}</b-form-textarea
          >
        </div>
        <div class="col-12 text-right">
          <button class="next-button">Next</button>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
export default {
  name: "StepOne",

  computed: {
    // ...mapGetters({ stepOneData: "stepOneData" }),
  },
  data() {
    return {
      value: 16.66,
      justification: "",
      unlimited_access: "",
      category: null,
      access_request: "",
      start_data: "",
      end_date: "",
      alert: false,
      alertText: "",
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
      selectOptions: [
        { value: null, text: "- Select - " },
        { value: "authorized", text: "Authorized" },
        { value: "uncategorized", text: "Uncategorized" },
        { value: "visitor", text: "Visitor" },
      ],
    };
  },
  methods: {
    onSubmitStepOne(evt) {
      evt.preventDefault();
      if (this.access_request == "") {
        this.alert = true;
        this.alertText = "Access Request Are Required *";
        return false;
      }
      if (this.start_data == "") {
        this.alert = true;
        this.alertText = "Start Date Are Required *";
        return false;
      }
      if (this.start_data > this.end_date) {
        this.alert = true;
        this.alertText = "Start Date Not greater than end date *";
        return false;
      }
      let data = {
        access_request: this.access_request,
        category: this.category,
        start_data: this.start_data,
        end_date: this.end_date,
        justification: this.justification,
        unlimited_access: this.unlimited_access,
      };
      this.$store.dispatch("setstepOneData", data);
      this.$store.dispatch("setstepOne", false);
      this.$store.dispatch("setstepTwo", true);
    },
    accessRequest(access_request) {
      this.access_request = access_request;
    },
  },
  mounted() {
    let data = this.$store.getters.getData;

    if (data) {
      this.access_request = data.access_request;
      this.start_data = data.start_data;
      this.end_date = data.end_data;
      this.category = data.category ? data.category : null;
      this.unlimited_access = data.unlimited_access;
      this.justification = data.justification;
    }
  },
};
</script>

<style scoped>
.container {
  width: 1000px;
  max-width: 100%;
}
.mainBadge {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
}
.badgeWrapper {
  border: 1px solid #efefef;
  width: 185px;
  text-align: center;
  cursor: pointer;
}
.badgeWrapper img {
  width: 125px;
  margin: 10px 0;
}

.badgeWrapper.active {
  border: 1px solid var(--primaryColor);
}
.badgeWrapper.active .text {
  background: var(--primaryColor);
}

.text {
  background: #efefef;
  color: #333;
  font-size: 14px;
  padding: 10px;
  text-transform: uppercase;
}
</style>
