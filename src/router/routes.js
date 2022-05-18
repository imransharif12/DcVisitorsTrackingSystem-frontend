import Vue from "vue";
import VueRouter from "vue-router";

import Dashboard from "../components/Dashboard";
import Admins from "../components/Admins";
import Request from "../components/Request";
import Visitor from "../components/visitor/Visitor";
import StepOne from "../components/visitor/StepOne";
import StepTwo from "../components/visitor/StepTwo";
import StepThree from "../components/visitor/StepThree";
import StepFour from "../components/visitor/StepFour";
import StepFive from "../components/visitor/StepFive";
import StepSix from "../components/visitor/StepSix";
import PersonalInfo from "../components/home/PersonalInfo";
import CompanyInfo from "../components/home/CompanyInfo";
import VisitorInfo from "../components/home/VisitorInfo";
import EmailTemplate from "../components/EmailTemplate";
import Login from "../components/Login";
import AddAdmin from "../components/AddAdmin";
import store from "../store/index";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "PersonalInformation",
      component: PersonalInfo,
    },
    {
      path: "/company-info",
      name: "CompanyInfo",
      component: CompanyInfo,
    },
    {
      path: "/email-template/:id",
      name: "EmailTemplate",
      component: EmailTemplate,
    },
    {
      path: "/add-admin",
      name: "AddAdmin",
      component: AddAdmin,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/visitor-info",
      name: "VisitorInfo",
      component: VisitorInfo,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        if (!store.state.isAuthenticated) {
          return next({ path: "/login" });
        } else {
          return next();
        }
      },
    },
    {
      path: "/admins",
      name: "Admins",
      component: Admins,
      beforeEnter: (to, from, next) => {
        if (!store.state.isAuthenticated) {
          return next({ path: "/login" });
        } else {
          return next();
        }
      },
    },
    {
      path: "/visitor",
      name: "Visitor",
      component: Visitor,
      beforeEnter: (to, from, next) => {
        if (!store.state.isAuthenticated) {
          return next({ path: "/login" });
        } else {
          return next();
        }
      },
    },
    {
      path: "/internal-request-form",
      name: "StepOne",
      component: StepOne,
    },
    {
      path: "/individual-access",
      name: "StepTwo",
      component: StepTwo,
    },
    {
      path: "/internal-company-info",
      name: "StepThree",
      component: StepThree,
    },
    {
      path: "/hr-contact",
      name: "StepFour",
      component: StepFour,
    },
    {
      path: "/datacube",
      name: "StepFive",
      component: StepFive,
    },
    {
      path: "/selection",
      name: "StepSix",
      component: StepSix,
    },
    {
      path: "/request",
      name: "Request",
      component: Request,
    },
  ],
});

export default router;
