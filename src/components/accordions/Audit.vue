<template>
  <div class="accordion" role="tablist">
    <b-card no-body class="mb-0">
      <b-card-header header-tag="header" class="p-0" role="tab">
        <b-button block v-b-toggle.accordion-5 class="accordionBtn">
          5. {{ $t("audit_by") }}</b-button
        >
      </b-card-header>
      <b-form @submit="onSubmit">
        <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <div class="row">
              <div class="col-12 pb-2">
                <label>{{ $t("f_name") }}</label>
                <b-form-input
                  v-model="f_name"
                  class="accordionInput"
                ></b-form-input>
              </div>
              <div class="col-12 pb-2">
                <label>{{ $t("l_name") }}</label>
                <b-form-input
                  type="text"
                  v-model="l_name"
                  class="accordionInput"
                ></b-form-input>
              </div>
              <div class="col-12 pb-2">
                <label>{{ $t("l_name") }}{{ $t("auditor_signature") }} </label>
                <b-form-input
                  type="text"
                  v-model="auditor_signature"
                  class="accordionInput"
                ></b-form-input>
              </div>
              <div class="col-12 pb-2">
                <label>{{ $t("signature_date") }}</label>
                <b-form-input
                  type="text"
                  v-model="signature_date"
                  class="accordionInput"
                ></b-form-input>
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
    audit: {
      type: Object,
    },
  },
  data() {
    return {
      f_name: "",
      l_name: "",
      auditor_signature: "",
      signature_date: "",
      user_id: 1,
      buttonloader: false,
    };
  },
  computed: {
    setVerficatonData() {
      return this.audit;
    },
  },

  watch: {
    setVerficatonData() {
      var data = {};
      if (this.audit.audit_by_datacube) {
        data = this.audit.audit_by_datacube;
        this.f_name = data.f_name;
        this.l_name = data.l_name;
        this.auditor_signature = data.auditor_signature;
        this.signature_date = data.signature_date;
      }
      this.user_id = this.audit.id;
    },
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
          f_name: this.f_name,
          l_name: this.l_name,
          signature_date: this.signature_date,
          auditor_signature: this.auditor_signature,
          form_type: "datacube_biel",
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
  },
};
</script>
