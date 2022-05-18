<template>
  <div class="topBar">
    <div class="container d-flex align-items-center justify-content-between">
      <div>
        <font-awesome-icon icon="fa-solid fa-phone" class="icon" />
        <a href="tel:+41585313131">+41 58 531 31 31</a>
      </div>
      <div>
        <font-awesome-icon icon="fa-solid fa-envelope" class="icon" />
        <a href="#"> Contact Netrics</a>
      </div>
      <div>
        <font-awesome-icon icon="fa-solid fa-clock" class="icon" />
        <span>Mon - Fri: 7:00 - 18:00</span>
      </div>
      <div>
        <font-awesome-icon icon="fa-solid fa-location-dot" class="icon" />
        <a href="https://goo.gl/maps/8atckwdG1abHA1eJ6" target="_blank"
          >Tennisweg 6, 2504 Biel, Switzerland</a
        >
      </div>
      <div class="language">
        <span @click="handleChange('en')" class="cursor-pointer">EN</span> |
        <span @click="handleChange('de')" class="cursor-pointer">DE</span>
      </div>
      <div class="socialIcons">
        <span>
          <a
            href="https://www.facebook.com/Sora-Solutions-Services-101261768824977"
            target="_blank"
            ><font-awesome-icon icon="fa-brands fa-facebook"
          /></a>
        </span>
        <span>
          <a href="https://twitter.com/soraservices" target="_blank"
            ><font-awesome-icon icon="fa-brands fa-twitter"
          /></a>
        </span>
        <span>
          <a
            href="https://www.instagram.com/sorasolutionsservices"
            target="_blank"
            ><font-awesome-icon icon="fa-brands fa-instagram" /> </a
        ></span>
        <span>
          <a
            href="https://www.youtube.com/channel/UCmCsWFSwrvIOsSKeldy59Xw"
            target="_blank"
            ><font-awesome-icon icon="fa-brands fa-youtube"
          /></a>
        </span>
        <span
          ><a href="https://www.linkedin.com/company/72759135" target="_blank"
            ><font-awesome-icon icon="fa-brands fa-linkedin-in"
          /></a>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    handleChange(event) {
      var locale = event;
      console.log(locale);
      import(`../langs/${locale}.json`).then((msgs) => {
        this.$i18n.setLocaleMessage(locale, msgs);
        this.$i18n.locale = locale;
      });
    },
  },
};
</script>
<style scoped>
.container {
  max-width: 1200px;
}
.topBar {
  background: #262a2b;
  min-height: 45px;
  line-height: 45px;
}
.icon {
  color: var(--primaryColor);
  padding-right: 8px;
}
a {
  text-decoration: none;
  color: #fff;
  font-weight: 100;
  font-size: 14px;
}
a:hover {
  color: #fff;
  text-decoration: none;
}
span {
  color: #fff;
  font-weight: 100;
  font-size: 14px;
}
.socialIcons .svg-inline--fa {
  color: #fff;
}
.language {
  color: #fff;
  font-size: 12px;
}
.socialIcons span a {
  padding: 0 15px;
  min-height: 45px;
  display: inline-block;
  cursor: pointer;
}
.socialIcons span a:hover {
  background: var(--primaryColor);
}
</style>
