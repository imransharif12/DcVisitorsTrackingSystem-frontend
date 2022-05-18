<template>
  <div class="accordion" role="tablist">
    <b-card no-body class="mb-0">
      <b-card-header header-tag="header" class="p-0" role="tab">
        <b-button block v-b-toggle.accordion-3 class="accordionBtn"
          >3. {{ $t("person_escort") }}</b-button
        >
      </b-card-header>
      <b-form @submit="onSubmit">
        <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <div class="row">
              <div class="col-md-6 col-12 pb-3">
                <label>{{ $t("f_name") }}</label>
                <b-form-input
                  v-model="escort_f_name"
                  class="accordionInput"
                ></b-form-input>
              </div>
              <div class="col-md-6 col-12 pb-3">
                <label>{{ $t("l_name") }}</label>
                <b-form-input
                  type="text"
                  v-model="escort_l_name"
                  class="accordionInput"
                ></b-form-input>
              </div>
              <div class="col-12 pb-3">
                <label>{{ $t("badge_number") }}</label>
                <b-form-input
                  type="text"
                  v-model="escort_badge_number"
                  class="accordionInput"
                ></b-form-input>
              </div>
              <div class="col-12 pb-3">
                <label>{{ $t("escort_signature") }}</label>
                <b-form-input
                  type="text"
                  v-model="escort_authorized_signature"
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
    authorized: {
      type: Object,
    },
  },
  data() {
    return {
      escort_f_name: "",
      escort_l_name: "",
      escort_badge_number: "",
      escort_authorized_signature: "",
      user_id: "",
      buttonloader: false,
    };
  },
  computed: {
    setVerficatonData() {
      return this.authorized;
    },
  },

  watch: {
    setVerficatonData() {
      var data = {};
      if (this.authorized.escort) {
        data = this.authorized.escort;
        this.escort_f_name = data.escort_f_name;
        this.escort_l_name = data.escort_l_name;
        this.escort_badge_number = data.escort_badge_number;
        this.escort_badge_number = data.escort_badge_number;
        this.escort_authorized_signature = data.escort_authorized_signature;
      }
      this.user_id = this.authorized.id;
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
          escort_f_name: this.escort_f_name,
          escort_l_name: this.escort_l_name,
          escort_badge_number: this.escort_badge_number,
          escort_authorized_signature: this.escort_authorized_signature,
          form_type: "escort_authorized_person",
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
