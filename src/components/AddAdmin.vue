<template>
  <div class="container pt-3 pb-5">
    <b-form @submit="onSubmit">
      <div class="row pt-4">
        <div class="col-12 text-center pb-4">
          <h1 class="font-bold">{{ $t("admin") }} {{ $t("information") }}</h1>
        </div>
        <div
          v-if="alert"
          role="alert"
          aria-live="polite"
          aria-atomic="true"
          class="alert alert-danger"
        >
          {{ alertText }}
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-12 pb-4">
          <b-form-input
            required=""
            maxlength="15"
            v-model="f_name"
            :placeholder="$t('f_name')"
          ></b-form-input>
        </div>
        <div class="col-md-6 col-12 pb-4">
          <b-form-input
            required=""
            maxlength="15"
            v-model="l_name"
            :placeholder="$t('l_name')"
          ></b-form-input>
        </div>
        <div class="col-md-6 col-12 pb-4">
          <b-form-input
            required=""
            type="number"
            v-model="phone"
            :placeholder="$t('phone')"
          ></b-form-input>
        </div>

        <div class="col-md-6 col-12 pb-4">
          <b-form-input
            required=""
            type="email"
            v-model="email"
            :placeholder="$t('email')"
          ></b-form-input>
        </div>
        <div class="col-md-6 col-12 pb-4">
          <b-form-input
            required=""
            type="password"
            v-model="password"
            :placeholder="$t('password')"
          ></b-form-input>
        </div>

        <div class="col-12">
          <button to="/" class="submit-button">
            <i
              style="color: #f1f1f1"
              class="fa fa-spinner fa-spin"
              v-if="buttonloader"
            ></i>
            {{ $t("save") }}
          </button>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
import { registerAdmin } from "../api/services";

export default {
  name: "AddAdmin",
  components: {},
  data() {
    return {
      f_name: "",
      l_name: "",
      email: "",
      buttonloader: false,
      phone: "",
      password: "",
      alert: false,
      alertText: false,
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      if (this.password.length > 0 && this.password.length < 6) {
        this.alert = true;
        this.alertText = "The Password must be at least 6 characters.";
        return false;
      }
      let data = JSON.stringify({
        f_name: this.f_name,
        l_name: this.l_name,
        phone: this.phone,
        password: this.password,
        email: this.email,
      });
      this.buttonloader = true;
      registerAdmin(data).then((responce) => {
        if (responce.code == 200) {
          this.$router.push({ path: "/admins" });
        } else {
          this.alertText = responce.message;
          this.alert = true;
          this.buttonloader = false;
        }
      });
    },
  },
  mounted() {},
};
</script>

<style scoped>
.container {
  width: 1000px;
  max-width: 100%;
}
</style>
