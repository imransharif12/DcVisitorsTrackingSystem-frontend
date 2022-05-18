<template>
  <div class="accordion" role="tablist">
    <b-card no-body class="mb-0">
      <b-card-header header-tag="header" class="p-0" role="tab">
        <b-button block v-b-toggle.accordion-1 class="accordionBtn"
          >1. {{ $t("verfication") }}</b-button
        >
      </b-card-header>
      <b-form @submit="onSubmit">
        <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <div class="row">
              <div class="col-6">
                <label>{{ $t("criminal_record") }}</label>
                <b-form-radio-group>
                  <b-form-radio
                    v-model="criminal_name"
                    value="controlled and ok"
                    >{{ $t("controlled_and_ok") }}</b-form-radio
                  >
                  <b-form-radio v-model="criminal_name" value="not necessary"
                    >{{ $t("not_necessary") }}
                  </b-form-radio>
                </b-form-radio-group>
              </div>
              <div class="col-6">
                <label>{{ $t("debt_collection_register") }} </label>
                <b-form-radio-group>
                  <b-form-radio
                    value="controlled and ok"
                    v-model="collection_name"
                    >{{ $t("controlled_and_ok") }}</b-form-radio
                  >
                  <b-form-radio value="not necessary" v-model="collection_name"
                    >{{ $t("not_necessary") }}
                  </b-form-radio>
                </b-form-radio-group>
              </div>
              <div class="col-12 pb-3">
                <label>{{ $t("debt_collection_register") }}</label>
                <b-form-input
                  v-model="operator_name"
                  class="accordionInput"
                ></b-form-input>
              </div>
              <div class="col-md-6 col-12 pb-3">
                <label>{{ $t("operator_signature") }} </label>
                <b-form-input
                  type="text"
                  v-model="operator_signature"
                  class="accordionInput"
                ></b-form-input>
              </div>
              <div class="col-md-6 col-12 pb-3">
                <label>{{ $t("signature_date") }}</label>
                <b-form-datepicker
                  required=""
                  v-model="signature_date"
                  hide-header
                  :date-format-options="{
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                  }"
                ></b-form-datepicker>
              </div>
              <button type="submit" class="btnSave">
                <i
                  style="color: #f1f1f1"
                  class="fa fa-spinner fa-spin"
                  v-if="buttonloader"
                ></i>
                {{ $t("save") }}
              </button>
            </div>
          </b-card-body>
        </b-collapse>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { saveRecord } from "../../api/services";
import Vue from "vue";

export default {
  name: "Verification",
  props: {
    verfication: {
      type: Object,
    },
  },
  computed: {
    setVerficatonData() {
      return this.verfication;
    },
  },

  watch: {
    setVerficatonData() {
      var data = {};
      if (this.verfication.verfication) {
        data = this.verfication.verfication;
        this.operator_name = data.operator_name;
        this.operator_signature = data.operator_signature;
        this.signature_date = data.signature_date;
      }
      if (this.verfication.collection_register) {
        data = this.verfication.collection_register;
        this.collection_name = data.collection_name;
      }
      if (this.verfication.criminal) {
        data = this.verfication.criminal;
        this.criminal_name = data.criminal_name;
      }
      this.user_id = this.verfication.id;
    },
  },
  data() {
    return {
      criminal_name: "",
      signature_date: "",
      operator_name: this.record ? this.record : "",
      collection_name: "",
      operator_signature: "",
      user_id: 1,
      buttonloader: false,
    };
  },

  methods: {
    toasterMessageSuccess(message) {
      Vue.$toast.success(message, {
        position: "top-right",
        duration: 5000,
        className: ["toasting"],
      });
    },

    toasterMessageError(message) {
      Vue.$toast.error(message, {
        position: "top-right",
        duration: 5000,
      });
    },
    onSubmit(evt) {
      try {
        evt.preventDefault();
        let data = JSON.stringify({
          user_id: this.user_id,
          operator_name: this.operator_name,
          operator_signature: this.operator_signature,
          signature_date: this.signature_date,
          collection_name: this.collection_name,
          criminal_name: this.criminal_name,
          form_type: "verfication",
        });
        this.buttonloader = true;

        saveRecord(data).then((responce) => {
          if (responce.code == 200) {
            this.toasterMessageSuccess("Record Added Successfully");
            this.buttonloader = false;
          }
        });
        console.log(evt);
      } catch (err) {
        if (!err.response) {
          alert("Please Check You Internet Connection");
        }
      }
    },
    mounted() {
      console.log("==>", this.verfication);
      this.record = JSON.parse(localStorage.getItem("record"));
      console.log(this.record);
    },
  },
};
</script>
