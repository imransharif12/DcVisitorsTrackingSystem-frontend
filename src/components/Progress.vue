<template>
  <div>
    <Verification :verfication="verfication" />
    <AccessData :accessData="verfication" />
    <Authorized :authorized="verfication" />
    <PersonAuthorized :authorized="verfication" />
    <Audit :audit="verfication" />
    <Applicable :applicable="verfication" />
    <Acknowledge :acknowledge="verfication" />
    <Return :return="verfication" />
  </div>
</template>

<script>
//Components
import Verification from "./accordions/Verification";
import Authorized from "./accordions/Authorized";
import PersonAuthorized from "./accordions/PersonAuthorized";
import Audit from "./accordions/Audit";
import Applicable from "./accordions/Applicable";
import Acknowledge from "./accordions/Acknowledge";
import Return from "./accordions/Return";
import AccessData from "./accordions/AccessData";

export default {
  name: "Progress",
  data() {
    return {
      selected: "",
      record: {},
      verfication: {},
    };
  },
  components: {
    Verification,
    Authorized,
    PersonAuthorized,
    Audit,
    Applicable,
    Acknowledge,
    Return,
    AccessData,
  },
  mounted() {
    this.record = JSON.parse(localStorage.getItem("record"));
    this.verfication = this.record;
  },
};
</script>

<style scoped></style>
