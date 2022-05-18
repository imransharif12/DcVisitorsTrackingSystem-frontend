<template>
  <div class="container pt-5 pb-5">
    <h1 class="text-center pt-5 mb-4">
      {{ $t("vistor") }} {{ $t("access") }} Datacube Biel AG
    </h1>
    <p class="thankyou">
      {{ $t("thankyou") }}
    </p>
  </div>
</template>

<script>
export default {
  name: "VisitorInfo",
  data() {
    return {
      value: "100",
      options: {
        text: {
          color: "#FFFFFF",
          shadowEnable: true,
          shadowColor: "#000000",
          fontSize: 14,
          fontFamily: "Helvetica",
          dynamicPosition: false,
          hideText: true,
        },
        progress: {
          color: "#8aea57",
          backgroundColor: "#e9ecef",
          inverted: false,
        },
        layout: {
          height: 21,
          width: 970,
          verticalTextAlign: 61,
          horizontalTextAlign: 43,
          zeroOffset: 0,
          strokeWidth: 30,
          progressPadding: 0,
          type: "line",
        },
      },
    };
  },
};
</script>

<style scoped>
.container {
  width: 1000px;
  max-width: 100%;
}
.badgeWrapper {
  border: 1px solid var(--primaryColor);
  width: 185px;
  margin: 0 auto;
  text-align: center;
}
.badgeWrapper img {
  width: 125px;
  margin: 10px 0;
}
.text {
  background: var(--primaryColor);
  color: #333;
  font-size: 14px;
  line-height: 20px;
  text-transform: uppercase;
  padding: 12px 5px;
}
</style>
