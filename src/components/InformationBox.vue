<template>
  <div class="boxWrapper">
    <div class="header">{{ $t("information") }}</div>
    <div class="boxContent">
      <div class="heading">{{ $t("personal") }}</div>
      <div class="row">
        <div class="col-6 pb-2">
          <strong>{{ $t("f_name") }}: </strong
          ><span>{{
            this.record.f_name
              ? this.record.f_name
              : this.record.vistors.v_f_name
          }}</span>
        </div>
        <div class="col-6 pb-2">
          <strong>{{ $t("l_name") }}: </strong
          ><span>{{
            this.record.l_name
              ? this.record.l_name
              : this.record.vistors.v_l_name
          }}</span>
        </div>
        <div class="col-6 pb-2">
          <strong>Birth Date: </strong><span>{{ this.record.birth_date }}</span>
        </div>
      </div>
      <div class="heading">{{ this.record.company_info.phone }}</div>
      <div class="row">
        <div class="col-12 pb-2">
          <strong>{{ $t("email") }}: </strong
          ><span
            ><a href="mailto:"> {{ this.record.company_info.email }} </a></span
          >
        </div>
        <div class="col-12 pb-2">
          <strong>{{ $t("phone") }}: </strong
          ><span
            ><a href="tel:">{{ this.record.company_info.phone }}</a></span
          >
        </div>
      </div>
      <div class="heading">{{ $t("company") }}</div>
      <div class="row">
        <div class="col-6 pb-2">
          <strong>{{ $t("company") }}: </strong
          ><span>{{ this.record.company_info.company }}</span>
        </div>
        <div class="col-6 pb-2">
          <strong>{{ $t("position") }}: </strong
          ><span>{{ this.record.company_info.position }}</span>
        </div>
        <div class="col-6 pb-2">
          <strong>{{ $t("address") }}: </strong
          ><span>{{ this.record.company_info.address }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InformationBox",
  data() {
    return {
      yourValue: "",
      result: null,
      record: {},
      stepperOptions: {
        headers: [{ title: "" }, { title: "" }, { title: "" }],
        prevText: "Previous",
        nextText: "Next",
      },
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
</style>
