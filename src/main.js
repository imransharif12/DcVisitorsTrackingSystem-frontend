import Vue from "vue";
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue";
import VueRouter from "vue-router";
import router from "./router/routes";
import DataTable from "@andresouzaabreu/vue-data-table";
import vueCountryRegionSelect from "vue-country-region-select";
import VueToast from "vue-toast-notification";
import ProgressBar from "vuejs-progress-bar";

import { i18n } from "./plugins/i18n";

import "vue-toast-notification/dist/theme-sugar.css";
Vue.use(VueToast);
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
import store from "./store/index";

/* import specific icons */
import {
  faPhone,
  faEnvelope,
  faClock,
  faLocationDot,
  faCalendarDays,
  faUserShield,
  faCalendar,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import {
  faTwitter,
  faFacebook,
  faLinkedinIn,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* add icons to the library */
library.add(
  faPhone,
  faEnvelope,
  faClock,
  faLocationDot,
  faTwitter,
  faFacebook,
  faLinkedinIn,
  faInstagram,
  faYoutube,
  faCalendarDays,
  faUserShield,
  faCalendar,
  faPlus
);

/* add font awesome icon component */
Vue.component("font-awesome-icon", FontAwesomeIcon);

//CSS FIleS
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/css/style.css";
import "./assets/css/responsive.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@andresouzaabreu/vue-data-table/dist/DataTable.css";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
import "vue-tel-input/dist/vue-tel-input.css";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(ProgressBar);

Vue.component("data-table", DataTable);
Vue.use(vueCountryRegionSelect);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,

  render: (h) => h(App),
}).$mount("#app");
