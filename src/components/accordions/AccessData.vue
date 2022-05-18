<template>
  <div class="accordion" role="tablist">
    <b-card no-body class="mb-0">
      <b-card-header header-tag="header" class="p-0" role="tab">
        <b-button block v-b-toggle.accordion-2 class="accordionBtn">
          2. {{ $t("access") }} Data</b-button
        >
      </b-card-header>
      <b-form @submit="onSubmit">
        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <div class="row">
              <div class="col-12">
                <div class="pb-2">{{ $t("Building") }}</div>
                <b-form-checkbox
                  v-model="building_name"
                  value="Datacube Biel AG, Tennisweg 6, CH-2504 Biel/Bienne"
                >
                  Datacube Biel AG, Tennisweg 6, CH-2504 Biel/Bienne
                </b-form-checkbox>
                <div class="row pt-4">
                  <div class="col-md-6 col-12">
                    <label for="">{{ $t("badge_number") }}</label>
                    <b-form-input
                      type="text"
                      required=""
                      v-model="badge_number"
                      class="accordionInput"
                    ></b-form-input>
                  </div>
                  <div class="col-md-6 col-12">
                    <label for="">{{ $t("transponder_number") }}</label>
                    <b-form-input
                      type="text"
                      v-model="transponder_number"
                      class="accordionInput"
                    ></b-form-input>
                  </div>
                </div>
                <div class="pt-3 pb-3">
                  <b-form-checkbox-group
                    v-model="selected"
                    :options="options"
                    class="mb-3 grid"
                    value-field="item"
                    text-field="name"
                  ></b-form-checkbox-group>
                  <div>+ {{ $t("add_new_choice") }}</div>
                </div>
                <label for="">{{ $t("rack_access") }}</label>
                <b-form-input
                  type="text"
                  v-model="rank_access"
                  class="accordionInput"
                ></b-form-input>
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
    accessData: {
      type: Object,
    },
  },
  computed: {
    setVerficatonData() {
      return this.accessData;
    },
  },

  watch: {
    setVerficatonData() {
      var data = {};
      if (this.accessData.access_data) {
        data = this.accessData.access_data;
        this.badge_number = data.badge_number;
        this.transponder_number = data.transponder_number;
        this.rank_access = data.rank_access;
      }
      if (this.accessData.access_data_building) {
        data = this.accessData.access_data_building;
        this.building_name = data.building_name;
      }
      if (this.accessData.access_data_area) {
        data = this.accessData.access_data_area;
        data.map((x) => {
          this.selected.push(x.name);
        });
      }
      this.user_id = this.accessData.id;
    },
  },
  data() {
    return {
      selected: [],
      buttonloader: false,
      badge_number: "",
      transponder_number: "",
      rank_access: "",
      building_name: "",
      options: [
        { item: "Datacube 101 – R1.301", name: "Datacube 101 – R1.301" },
        { item: "Datacube 202 – R2.302", name: "Datacube 202 – R2.302" },
        { item: "warenanlieferung", name: "Warenanlieferung" },
        { item: "reinigung-netrics", name: "Reinigung Netrics" },
        { item: "Datacube-102-R1.302", name: "Datacube 102 – R1.302" },
        { item: "Areal", name: "Areal" },
        { item: "Buro-DCB", name: "Büro DCB" },
        { item: "Lieferanten-Netrics", name: "Lieferanten Netrics" },
        { item: "Datacube-201–R2.301", name: "Datacube 201 – R2.301" },
        { item: "Lager-B", name: "Lager B" },
      ],
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
        console.log(this.selected);
        let data = JSON.stringify({
          user_id: this.user_id,
          areas: this.selected,
          badge_number: this.badge_number,
          transponder_number: this.transponder_number,
          rank_access: this.rank_access,
          building_name: this.building_name,
          form_type: "access_data",
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

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 10px;
  row-gap: 20px;
}
</style>
