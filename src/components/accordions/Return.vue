<template>
  <div class="accordion" role="tablist">
    <b-card no-body class="mb-0">
      <b-card-header header-tag="header" class="p-0" role="tab">
        <b-button block v-b-toggle.accordion-8 class="accordionBtn">
          8. {{ $t("return_confirmation") }}</b-button
        >
      </b-card-header>
      <b-form @submit="onSubmit">
        <b-collapse id="accordion-8" accordion="my-accordion" role="tabpanel">
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
                <label>{{ $t("l_name") }} </label>
                <b-form-input
                  type="text"
                  v-model="l_name"
                  class="accordionInput"
                ></b-form-input>
              </div>
              <div class="col-12 pb-2">
                <label>{{ $t("confiramtion") }} {{ $t("signature") }} </label>
                <b-form-input
                  type="text"
                  v-model="confirmation_signature"
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
              <button type="submit" class="btnSave mt-3">
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
    return: {
      type: Object,
    },
  },
  data() {
    return {
      signature: "",
      signature_date: "",
      f_name: "",
      confirmation_signature: "",
      l_name: "",
      user_id: "",
      buttonloader: false,
    };
  },
  computed: {
    setVerficatonData() {
      return this.return;
    },
  },

  watch: {
    setVerficatonData() {
      var data = {};
      if (this.return.return_confirmation) {
        data = this.return.return_confirmation;
        this.f_name = data.f_name;
        this.l_name = data.l_name;
        this.confirmation_signature = data.confirmation_signature;
        this.signature_date = data.signature_date;
      }
      this.user_id = this.return.id;
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
          confirmation_signature: this.confirmation_signature,
          signature_date: this.signature_date,
          form_type: "return_confirmation",
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
