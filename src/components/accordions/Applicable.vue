<template>
  <div class="accordion" role="tablist">
    <b-card no-body class="mb-0">
      <b-card-header header-tag="header" class="p-0" role="tab">
        <b-button block v-b-toggle.accordion-6 class="accordionBtn">
          6. {{ $t("applicable_document") }}</b-button
        >
      </b-card-header>
      <b-form @submit="onSubmit">
        <b-collapse id="accordion-6" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <div class="row">
              <div class="col-12">
                <div class="pb-2">{{ $t("applicable_document") }}</div>
                <div class="pb-2">
                  {{ $t("applicable_document_desc") }}
                </div>
                <b-form-checkbox-group
                  v-model="document"
                  :options="options"
                  class="mb-3"
                  value-field="item"
                  text-field="name"
                  stacked
                ></b-form-checkbox-group>
                <button type="submit" class="btnSave mt-3">
                  <i
                    style="color: #f1f1f1"
                    class="fa fa-spinner fa-spin"
                    v-if="buttonloader"
                  ></i>
                  {{ $t("save") }}
                </button>
              </div>
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
    applicable: {
      type: Object,
    },
  },

  data() {
    return {
      document: [],
      buttonloader: false,
      options: [
        {
          item: "Confidentiality and non-disclosure agreement",
          name: this.$t("confidentiality"),
        },
        {
          item: "Customer Manual Datacube Biel AG",
          name: this.$t("Customer_manual"),
        },
        {
          item: "Emergency Manual Datacube Biel AG",
          name: this.$t("Emergency"),
        },
        {
          item: "Policy for work in Security Areas (including information security and safety note on fire extinguishing equipment)",
          name: this.$t("Policy"),
        },
      ],
    };
  },
  computed: {
    setVerficatonData() {
      return this.applicable;
    },
  },

  watch: {
    setVerficatonData() {
      var data = {};
      if (this.applicable.applicable_document) {
        data = this.applicable.applicable_document;
        data.map((x) => {
          this.document.push(x.name);
        });
      }
      this.user_id = this.applicable.id;
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
          document: this.document,
          form_type: "applicable_document",
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
