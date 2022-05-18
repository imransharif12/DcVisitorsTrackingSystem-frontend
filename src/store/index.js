import Vue from "vue";
// import axios from "axios";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loginUserData: localStorage.getItem("currentUser")
      ? JSON.parse(localStorage.getItem("currentUser"))
      : {},
    isAuthenticated: localStorage.getItem("isAuthenticated")
      ? JSON.parse(localStorage.getItem("isAuthenticated"))
      : false,
    loginUserType: localStorage.getItem("type")
      ? JSON.parse(localStorage.getItem("type"))
      : "",
    formObject: {
      access_request: "",
      category: "",
      start_data: "",
      end_date: "",
      unlimited_access: "",
      justification: "",
      v_f_name: "",
      v_l_name: "",
      date: "",
      company: "",
      position: "",
      email: "",
      address: "",
      zipcode: "",
      city: "",
      country: "",
      phone: "",
      hr_f_name: "",
      hr_l_name: "",
      hr_email: "",
      hr_phone: "",
    },
    areas: [],
    stepOne: true,
    stepTwo: false,
    stepThree: false,
    stepFour: false,
    stepFive: false,
    stepSix: false,
  },

  mutations: {
    isLogin(state, data) {
      state.isAuthenticated = data;
    },
    updateloginUserType(state, data) {
      state.loginUserType = data;
    },
    isstepOne(state, data) {
      state.stepOne = data;
    },
    isstepTwo(state, data) {
      state.stepTwo = data;
    },
    isstepThree(state, data) {
      state.stepThree = data;
    },
    isstepFour(state, data) {
      state.stepFour = data;
    },
    isstepFive(state, data) {
      state.stepFive = data;
    },
    isstepSix(state, data) {
      state.stepSix = data;
    },
    isstepOneData(state, data) {
      state.formObject.access_request = data.access_request;
      state.formObject.category = data.category;
      state.formObject.start_data = data.start_data;
      state.formObject.unlimited_access = data.unlimited_access;
      state.formObject.end_date = data.end_date;
      state.formObject.justification = data.justification;
    },
    isstepTwoData(state, data) {
      state.formObject.v_f_name = data.v_f_name;
      state.formObject.v_l_name = data.v_l_name;
      state.formObject.date = data.date;
    },
    isstepThreeData(state, data) {
      state.formObject.company = data.company;
      state.formObject.position = data.position;
      state.formObject.phone = data.phone;
      state.formObject.city = data.city;
      state.formObject.country = data.country;
      state.formObject.email = data.email;
      state.formObject.zipcode = data.zipcode;
      state.formObject.address = data.address;
    },
    isstepFourData(state, data) {
      state.formObject.hr_f_name = data.hr_f_name;
      state.formObject.hr_l_name = data.hr_l_name;
      state.formObject.hr_email = data.hr_email;
      state.formObject.hr_phone = data.hr_phone;
    },
    isstepFiveData(state, data) {
      state.areas = data;
    },
  },

  actions: {
    setstepOne({ commit }, data) {
      commit("isstepOne", data);
    },
    setstepTwo({ commit }, data) {
      commit("isstepTwo", data);
    },
    setstepThree({ commit }, data) {
      commit("isstepThree", data);
    },
    setstepFour({ commit }, data) {
      commit("isstepFour", data);
    },
    setstepFive({ commit }, data) {
      commit("isstepFive", data);
    },
    setstepSix({ commit }, data) {
      commit("isstepSix", data);
    },
    setstepOneData({ commit }, data) {
      commit("isstepOneData", data);
    },
    setstepTwoData({ commit }, data) {
      commit("isstepTwoData", data);
    },
    setstepThreeData({ commit }, data) {
      commit("isstepThreeData", data);
    },
    setstepFourData({ commit }, data) {
      commit("isstepFourData", data);
    },
    setstepFiveData({ commit }, data) {
      commit("isstepFiveData", data);
    },
  },

  getters: {
    stepOne: (state) => state.stepOne,
    stepTwo: (state) => state.stepTwo,
    stepThree: (state) => state.stepThree,
    stepFour: (state) => state.stepFour,
    stepFive: (state) => state.stepFive,
    stepSix: (state) => state.stepSix,
    getData: (state) => state.formObject,
    areas: (state) => state.areas,
  },

  modules: [
    // criterias,
  ],
});

export default store;
