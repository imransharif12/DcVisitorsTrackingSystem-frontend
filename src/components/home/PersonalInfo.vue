<template>
  <div>
    <div class="container pt-3 pb-5">
      <div class="stepText">Step 1 of 3</div>
      <progress-bar :options="options" :value="value" />
      <div class="row pt-3">
        <div class="col-12">
          <div class="badgeWrapper">
            <img :src="'./svg/badge.svg'" alt="" />
            <div class="text">Visitor</div>
          </div>
        </div>
      </div>
      <b-form @submit="onSubmitPersonal" v-if="personalinfo">
        <h2 class="mb-4 mt-4">{{ $t("personal_info") }}</h2>
        <div class="row">
          <div class="col-md-6 col-12 pb-4">
            <label>{{ $t("f_name") }}<span class="danger">*</span></label>
            <b-form-input
              :v-model="f_name"
              :placeholder="$t('f_name')"
              required=""
            ></b-form-input>
          </div>
          <div class="col-md-6 col-12 pb-4">
            <label>{{ $t("l_name") }} <span class="danger">*</span></label>
            <b-form-input
              v-model="l_name"
              required=""
              :placeholder="$t('l_name')"
            ></b-form-input>
          </div>

          <div class="col-md-6 col-12 pb-4">
            <label>{{ $t("dob") }} <span class="danger">*</span></label>
            <b-form-datepicker
              v-model="birth_date"
              placeholder="DD/MM/YYYY"
              hide-header
              :date-format-options="{
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              }"
            ></b-form-datepicker>
          </div>
          <div class="col-md-6 col-12 pb-4">
            <label>{{ $t("passport") }} # </label>
            <b-form-input
              required=""
              v-model="passport_id"
              :placeholder="$t('passport')"
            ></b-form-input>
          </div>
          <div class="col-md-6 col-12 pb-4">
            <img
              style="width: 100px; height: 100px; border-radius: 16px"
              v-if="profileimageUrl"
              :src="profileimageUrl"
            /><br />
            <label>{{ $t("passport") }} </label><br />
            <span class="choose-file" @click="$refs.file.click()">
              {{ $t("choose_file") }}
            </span>
            <input
              type="file"
              ref="file"
              style="display: none"
              @change="profileImageShow"
            /><br /><br />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-12 pb-4"></div>
          <div class="col-md-6 col-12"></div>
          <div class="col-12 text-right">
            <button type="submit" class="next-button">
              {{ $t("next") }}
            </button>
          </div>
        </div>
      </b-form>
      <b-form @submit="onSubmitComapny" v-if="companyinfo">
        <h2 class="mb-4 mt-4">{{ $t("company_info") }}</h2>
        <div class="row">
          <div class="col-md-6 col-12 pb-4">
            <b-form-input
              v-model="company"
              required=""
              :placeholder="$t('company')"
            ></b-form-input>
          </div>
          <div class="col-md-6 col-12 pb-4">
            <b-form-input
              v-model="position"
              required=""
              :placeholder="$t('position')"
            ></b-form-input>
          </div>
          <div class="col-md-6 col-12 pb-4">
            <b-form-input
              v-model="email"
              required=""
              type="email"
              :placeholder="$t('email')"
            ></b-form-input>
          </div>
          <div class="col-md-6 col-12 pb-4">
            <VuePhoneNumberInput v-model="phone" />
          </div>
          <div class="col-md-6 col-12 pb-4">
            <b-form-input
              v-model="address"
              required=""
              :placeholder="$t('address')"
            ></b-form-input>
          </div>
          <div class="col-md-6 col-12 pb-4">
            <b-form-input
              v-model="city"
              required=""
              :placeholder="$t('city')"
            ></b-form-input>
          </div>
          <div class="col-md-6 col-12 pb-4">
            <b-form-input
              v-model="zipcode"
              required=""
              :placeholder="$t('zip')"
            ></b-form-input>
          </div>
          <div class="col-md-6 col-12 pb-4">
            <country-select
              v-model="country"
              :country="country"
              topCountry="PK"
            />
          </div>
          <div class="col-6 text-left pt-3">
            <span
              class="next-button"
              style="cursor: pointer"
              @click="Previou('company')"
              >{{ $t("previous") }}</span
            >
          </div>

          <div class="col-6 text-right pt-3">
            <button type="submit" class="next-button">
              {{ $t("next") }}
            </button>
          </div>
        </div>
      </b-form>
      <b-form @submit="onSubmit" v-if="vistoraccess">
        <h1 class="text-center pt-5 mb-4">{{ $t("visitor_access") }}</h1>
        <div class="row pt-4">
          <div class="col-md-6 col-12 pb-4">
            <label>{{ $t("f_name") }}<span class="danger">*</span></label>
            <b-form-input
              v-model="v_f_name"
              :placeholder="$t('f_name')"
            ></b-form-input>
          </div>
          <div class="col-md-6 col-12 pb-4">
            <label>{{ $t("l_name") }} <span class="danger">*</span></label>
            <b-form-input
              v-model="v_l_name"
              :placeholder="$t('l_name')"
            ></b-form-input>
          </div>
          <div class="col-6 text-left pt-3">
            <span
              style="cursor: pointer"
              class="next-button"
              @click="Previou('vistor')"
              >{{ $t("previous") }}</span
            >
          </div>
          <div class="col-6 text-right pt-3">
            <button class="submit-button">
              <i
                style="color: #f1f1f1"
                class="fa fa-spinner fa-spin"
                v-if="buttonloader"
              ></i>
              {{ $t("submit") }}
            </button>
          </div>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import { saveUser } from "../../api/services";
import VuePhoneNumberInput from "vue-phone-number-input";

import Vue from "vue";

export default {
  name: "PersonalInfo",
  components: {
    VuePhoneNumberInput,
  },
  data() {
    return {
      vistoraccess: false,
      f_name: "",
      profileimageUrl: null,
      l_name: "",
      birth_date: "",
      passport_id: "",
      company: "",
      position: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zipcode: "",
      country: "",
      v_f_name: "",
      v_l_name: "",
      personalinfo: true,
      companyinfo: false,
      buttonloader: false,
      value: 33.33,
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
  methods: {
    profileImageShow(e) {
      const file = e.target.files[0];
      this.profileImage = file;
      this.profileimageUrl = URL.createObjectURL(file);
    },
    onSubmitPersonal(evt) {
      this.personalinfo = false;
      this.companyinfo = true;
      this.value = 66.33;
      this.vistoraccess = false;
      evt.preventDefault();
    },
    onSubmitComapny(evt) {
      this.personalinfo = false;
      this.companyinfo = false;
      this.vistoraccess = true;
      this.value = 100;
      evt.preventDefault();
    },
    onSubmit(evt) {
      try {
        evt.preventDefault();
        let data = JSON.stringify({
          f_name: this.f_name,
          l_name: this.l_name,
          birth_date: this.birth_date,
          passport_id: this.passport_id,
          company: this.company,
          position: this.position,
          email: this.email,
          phone: this.phone,
          address: this.address,
          city: this.city,
          zipcode: this.zipcode,
          country: this.country,
          v_f_name: this.v_f_name,
          v_l_name: this.v_l_name,
        });
        this.buttonloader = true;
        saveUser(data).then((responce) => {
          if (responce.code == 200) {
            this.toasterMessageSuccess("Record Added Successfully");
            this.buttonloader = false;
            this.$router.push({ name: "VisitorInfo" });
          }
        });
      } catch (err) {
        if (!err.response) {
          alert("Please Check You Internet Connection");
        }
      }
    },
    Previou(type) {
      if (type == "company") {
        this.companyinfo = false;
        this.personalinfo = true;
        this.value = 33.33;
        return false;
      }
      this.value = 66.66;
      this.companyinfo = true;
      this.vistoraccess = false;
    },
    toasterMessageSuccess(message) {
      Vue.$toast.success(message, {
        position: "top-right",
        duration: 5000,
        className: ["toasting"],
      });
    },
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
