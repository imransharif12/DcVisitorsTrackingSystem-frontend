<template>
  <div class="boxWrapper col-md-7 offset-md-3 mt-2">
    <div class="header">{{ $t("information") }}</div>
    <div class="boxContent" style="width: 50%">
      <div class="heading col-md-12">{{ $t("personal") }}</div>
      <div class="col-md-12">
        <strong>{{ $t("f_name") }}: </strong
        ><span>{{
          this.record.f_name ? this.record.f_name : this.record.vistors.v_f_name
        }}</span>
      </div>
      <div class="col-md-12">
        <strong>{{ $t("l_name") }}: </strong
        ><span>{{
          this.record.l_name ? this.record.l_name : this.record.vistors.v_l_name
        }}</span>
      </div>
      <div class="col-md-12 pb-2">
        <strong>Birth Date: </strong><span>{{ this.record.birth_date }}</span>
      </div>
      <div class="heading col-md-12">
        {{ this.record.company_info.phone }}
      </div>
      <div class="col-md-12 pb-2">
        <strong>{{ $t("email") }}: </strong
        ><span
          ><a href="mailto:"> {{ this.record.company_info.email }} </a></span
        >
      </div>
      <div class="col-md-12 pb-2">
        <strong>{{ $t("phone") }}: </strong
        ><span
          ><a href="tel:">{{ this.record.company_info.phone }}</a></span
        >
      </div>
      <div class="heading col-md-12">{{ $t("company") }}</div>
      <div class="col-md-12 pb-2">
        <strong>{{ $t("company") }}: </strong
        ><span>{{ this.record.company_info.company }}</span>
      </div>
      <div class="col-md-12 pb-2">
        <strong>{{ $t("position") }}: </strong
        ><span>{{ this.record.company_info.position }}</span>
      </div>
      <div class="col-md-12 pb-2">
        <strong>{{ $t("address") }}: </strong
        ><span>{{ this.record.company_info.address }} </span>
      </div>
      <div class="col-md-12 pb-2">
        <button class="submit-button" @click="acceptReject('active')">
          Accept
        </button>
        <button class="next-button ml-2" @click="acceptReject('deactive')">
          Reject
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { detail, changeStatus } from "../api/services";
import Vue from "vue";

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
    let data = JSON.stringify({
      code: this.$route.params.id,
    });
    detail(data).then((responce) => {
      if (responce.code == 200) {
        this.record = responce.data;
      } else {
        this.alertText = responce.message;
        this.alert = true;
        this.buttonloader = false;
      }
    });
  },
  methods: {
    acceptReject(status) {
      let data = JSON.stringify({
        code: this.$route.params.id,
        status: status,
      });
      changeStatus(data).then((responce) => {
        if (responce.code == 200) {
          this.toasterMessageSuccess(responce.message);
        } else {
          this.toasterMessageError(responce.message);
        }
      });
    },
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
  },
};
</script>

<style scoped>
.boxWrapper {
  border: 1px solid #dddddd;
  border-radius: 20px;
  height: 100%;
}
.next-button {
  background-color: red;
  font-weight: 600;
  padding: 5px 6px;
}
.submit-button {
  font-weight: 600;
  padding: 5px 4px;
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
