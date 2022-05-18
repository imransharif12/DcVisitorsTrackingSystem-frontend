<template>
  <div class="accordion" role="tablist">
    <b-card no-body class="mb-0">
      <b-card-header header-tag="header" class="p-0" role="tab">
        <b-button block v-b-toggle.accordion-7 class="accordionBtn">
          7. {{ $t("acknowledgement_of_receipt") }}</b-button
        >
      </b-card-header>
      <b-form @submit="onSubmit">
        <b-collapse id="accordion-7" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <div class="row">
              <div class="col-12 pb-2">
                <label>{{ $t("signature") }}</label>
                <b-form-input
                  v-model="signature"
                  class="accordionInput"
                ></b-form-input>
              </div>
              <div class="col-12 pb-2">
                <label>{{ $t("signature_date") }} </label>
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
    acknowledge: {
      type: Object,
    },
  },
  data() {
    return {
      signature: "",
      buttonloader: false,
      signature_date: "",
      user_id: "",
    };
  },
  computed: {
    setVerficatonData() {
      return this.acknowledge;
    },
  },

  watch: {
    setVerficatonData() {
      var data = {};
      if (this.acknowledge.acknowledgement_receipt) {
        data = this.acknowledge.acknowledgement_receipt;
        this.signature = data.signature;
        this.signature_date = data.signature_date;
      }
      this.user_id = this.acknowledge.id;
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
          signature: this.signature,
          signature_date: this.signature_date,
          form_type: "acc_receipt",
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
