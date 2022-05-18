<template>
  <div class="container pt-5 pb-5">
    <div class="row">
      <div class="col-12">
        <h1 class="font-bold text-center pb-5">
          {{ $t("access") }} {{ $t("request") }} #5
        </h1>
      </div>
    </div>
    <div class="row pb-3">
      <div class="col-md-6 col-12">
        <InformationBox />
      </div>
      <div class="col-md-6 col-12">
        <DetailsBox />
      </div>
    </div>
    <div class="row pt-5">
      <div class="col-12">
        <Progress />
      </div>
    </div>
  </div>
</template>

<script>
import InformationBox from "./InformationBox";
import DetailsBox from "./DetailsBox";
import Progress from "./Progress";
export default {
  name: "Request",
  components: {
    InformationBox,
    DetailsBox,
    Progress,
  },
};
</script>
