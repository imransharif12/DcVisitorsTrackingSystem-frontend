<template>
  <div class="boxWrapper">
    <div class="header">{{ $t("details") }}</div>
    <div class="boxContent">
      <div class="row">
        <div class="col-12 pb-2">
          <font-awesome-icon
            icon="fa-solid fa-calendar-days"
            class="icon"
          /><span>{{
            moment.utc(this.record.created_at).local().format("d/MM/YYYY")
          }}</span>
        </div>
        <div class="col-12 pb-2">
          <font-awesome-icon icon="fa-solid fa-user-shield" class="icon" />
          <span>{{
            this.record.access_request == "door_access"
              ? "Door Access"
              : this.record.access_request == "badge"
              ? "Badg"
              : this.record.access_request == "gate_transponder"
              ? "Gate transponder"
              : ""
          }}</span>
        </div>
        <div class="col-6 pb-2">
          <font-awesome-icon icon="fa-solid fa-calendar" class="icon" />
          <span>{{ this.record.start_date }}</span>
          <span class="ml-3">{{ this.record.end_date }}</span>
        </div>
      </div>
      <div class="heading">{{ $t("justification") }}</div>
      <div>{{ this.record.justification }}</div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

import moment from "moment";
Vue.prototype.moment = moment;
export default {
  name: "DetailsBox",
  data() {
    return {
      record: {},
    };
  },
  mounted() {
    this.record = JSON.parse(localStorage.getItem("record"));
  },
};
</script>

<style scoped>
.boxWrapper {
  border: 1px solid #dddddd;
  border-radius: 20px;
  height: 100%;
}
.header {
  padding: 6px 3px 6px 3px;
  background-color: #dbdbdb;
  border-radius: 20px 20px 0px 0px;
  color: #4a5152;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
}
.boxContent {
  padding: 20px;
}
.heading {
  color: #999999;
  font-size: 20px;
  padding-bottom: 5px;
}
a {
  color: var(--primaryColor);
}
a:hover {
  text-decoration: none;
  color: #336;
}
.icon {
  color: var(--primaryColor);
  padding-right: 8px;
}
</style>
