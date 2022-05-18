<template>
  <div class="container pt-3 pb-4">
    <div class="row">
      <div class="col-12 mainBadge">
        <div class="badgeWrapper">
          <img :src="'./svg/DoorAccess.svg'" alt="" />
        </div>
      </div>
      <br />
      <div
        v-if="alert"
        role="alert"
        aria-live="polite"
        aria-atomic="true"
        class="alert alert-danger col-md-4 offset-md-4 mt-3"
      >
        {{ alertText }}
      </div>
    </div>
    <b-form @submit="onSubmit">
      <div>
        <b-form-group class="col-md-6 offset-md-3" label="Email:">
          <b-form-input
            type="text"
            required=""
            v-model="email"
            :placeholder="$t('email')"
          ></b-form-input>
        </b-form-group>
        <b-form-group class="col-md-6 offset-md-3" label="Password:">
          <b-form-input
            type="password"
            required=""
            v-model="password"
            :placeholder="$t('password')"
          ></b-form-input>
        </b-form-group>

        <b-form-group class="col-md-6 offset-md-3">
          <button type="submit" class="next-button">
            <i
              style="color: #f1f1f1"
              class="fa fa-spinner fa-spin"
              v-if="buttonloader"
            ></i>
            Login
          </button>
        </b-form-group>
      </div>
    </b-form>
  </div>
</template>

<script>
import { login } from "../api/services";
// import { mapGetters } from "vuex";
export default {
  name: "StepOne",

  computed: {
    // ...mapGetters({ stepOneData: "stepOneData" }),
  },
  data() {
    return {
      password: "",
      buttonloader: false,
      email: "",
      alert: false,
      alertText: "",
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      let data = JSON.stringify({
        password: this.password,
        email: this.email,
      });
      this.buttonloader = true;
      login(data).then((responce) => {
        if (responce.code == 200) {
          this.successLogin(responce);
        } else {
          this.alertText = responce.message;
          this.alert = true;
          this.buttonloader = false;
        }
      });
    },
    accessRequest(access_request) {
      this.access_request = access_request;
    },
    successLogin(responce) {
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("currentUser", JSON.stringify(responce.data));
      localStorage.setItem("token", JSON.stringify(responce.data.token));
      this.$store.commit("isLogin", true);
      this.$store.commit("updateloginUserType", responce.data.type);
      localStorage.setItem("type", JSON.stringify(responce.data.type));
      this.$router.push({ path: "/dashboard" });
    },
  },
  mounted() {
    localStorage.setItem("isAuthenticated", false);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    this.$store.commit("isLogin", false);
    let data = this.$store.getters.getData;
    if (data) {
      this.access_request = data.access_request;
      this.start_data = data.start_data;
      this.end_date = data.end_data;
      this.category = data.category ? data.category : null;
      this.unlimited_access = data.unlimited_access;
      this.justification = data.justification;
    }
  },
};
</script>

<style scoped>
.container {
  width: 1000px;
  max-width: 100%;
}
.mainBadge {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
}
.badgeWrapper {
  border: 1px solid #efefef;
  width: 185px;
  text-align: center;
  cursor: pointer;
}
.badgeWrapper img {
  width: 125px;
  margin: 10px 0;
}

.badgeWrapper.active {
  border: 1px solid var(--primaryColor);
}
.badgeWrapper.active .text {
  background: var(--primaryColor);
}

.text {
  background: #efefef;
  color: #333;
  font-size: 14px;
  padding: 10px;
  text-transform: uppercase;
}
</style>
