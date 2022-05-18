<template>
  <div class="navWrapper">
    <Topbar />
    <nav class="main-nav">
      <div class="container d-flex align-items-center justify-content-between">
        <div class="logo">
          <img :src="'./svg/logo.svg'" alt="" />
        </div>
        <div
          id="burger"
          :class="{ active: isBurgerActive }"
          @click.prevent="toggle"
        >
          <slot>
            <button type="button" class="burger-button" title="Menu">
              <span class="hidden">Toggle menu</span>
              <span class="burger-bar burger-bar--1"></span>
              <span class="burger-bar burger-bar--2"></span>
              <span class="burger-bar burger-bar--3"></span>
            </button>
          </slot>
        </div>
      </div>
    </nav>

    <div class="sidebar">
      <div
        class="sidebar-backdrop"
        @click="closeSidebarPanel"
        v-if="isPanelOpen"
      ></div>
      <transition name="slide">
        <div v-if="isPanelOpen" class="sidebar-panel">
          <ul class="sidebar-panel-nav">
            <li>
              <router-link to="/">Data Center Visitor Request Form</router-link>
            </li>
            <li>
              <router-link v-if="!this.$store.state.isAuthenticated" to="/login"
                >Login</router-link
              >
            </li>
            <li>
              <router-link v-if="this.$store.state.isAuthenticated" to="/admins"
                >Admin</router-link
              >
            </li>
            <li>
              <router-link
                v-if="
                  this.$store.state.isAuthenticated &&
                  this.$store.state.loginUserType == 'admin'
                "
                to="/visitor"
                >Access Request Form</router-link
              >
            </li>
            <li>
              <router-link
                v-if="this.$store.state.isAuthenticated"
                to="/dashboard"
                >Dashboard</router-link
              >
            </li>
            <li>
              <router-link v-if="this.$store.state.isAuthenticated" to="/login"
                >Logout</router-link
              >
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Topbar from "./Topbar";
const store = Vue.observable({
  isNavOpen: false,
});

const mutations = {
  setIsNavOpen(yesno) {
    store.isNavOpen = yesno;
  },
  toggleNav() {
    store.isNavOpen = !store.isNavOpen;
  },
};
export default {
  methods: {
    closeSidebarPanel: mutations.toggleNav,
    toggle() {
      return mutations.toggleNav();
    },
    logout() {
      localStorage.setItem("isAuthenticated", false);
      localStorage.removeItem("currentUser");
      localStorage.removeItem("token");
      this.$router.push({ path: "/login" });
    },
  },
  computed: {
    isPanelOpen() {
      return store.isNavOpen;
    },
    isBurgerActive() {
      return store.isNavOpen;
    },
  },
  components: {
    Topbar,
  },
};
</script>

<style scoped>
.logo {
  flex: 1;
  text-align: center;
}
.logo img {
  width: 175px;
}
.navWrapper {
  position: sticky;
  top: 0;
  z-index: 99999;
}
.container {
  width: 1280px;
}
.main-nav {
  padding: 10px;
  border-bottom: 1px solid #d8d8d8;
  background: #fff;
}

ul.sidebar-panel-nav {
  list-style-type: none;
  padding-inline-start: 0px;
}

ul.sidebar-panel-nav > li {
  padding-bottom: 15px;
}

ul.sidebar-panel-nav > li > a {
  color: #999;
  text-decoration: none;
  font-size: 1.3rem;
  display: block;
  padding-bottom: 0.3em;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease-in-out;
}

ul.sidebar-panel-nav > li > a:hover {
  color: #333;
  border-bottom: 2px solid var(--primaryColor);
  transition: all 0.3s ease-in-out;
}

.hidden {
  visibility: hidden;
}

button {
  cursor: pointer;
}

button:focus {
  outline: 0;
}

.burger-button {
  position: relative;
  height: 32px;
  width: 35px;
  display: block;
  z-index: 999;
  border: 0;
  border-radius: 0;
  background-color: transparent;
  pointer-events: all;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  margin: 0 auto;
}

.burger-bar {
  background-color: #999999;
  position: absolute;
  top: 50%;
  right: 6px;
  left: 6px;
  height: 3px;
  width: auto;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1),
    opacity 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
    background-color 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.burger-bar--1 {
  -webkit-transform: translateY(-6px);
  transform: translateY(-6px);
}

.burger-bar--2 {
  transform-origin: 100% 50%;
  transform: scaleX(1);
}

.burger-button:hover .burger-bar--2 {
  transform: scaleX(1);
}

.no-touchevents .burger-bar--2:hover {
  transform: scaleX(1);
}

.burger-bar--3 {
  transform: translateY(6px);
}

#burger.active {
  z-index: 9999;
}

#burger.active .burger-button {
  transform: rotate(-180deg);
  margin-top: -50px;
}

#burger.active .burger-bar {
  background-color: #999999;
}

#burger.active .burger-bar--1 {
  transform: rotate(45deg);
}

#burger.active .burger-bar--2 {
  opacity: 0;
}

#burger.active .burger-bar--3 {
  transform: rotate(-45deg);
}

/** sidebar **/

.slide-enter-active,
.slide-leave-active {
  transition: transform 1.3s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
  transition: transform 1.3s ease;
}

.sidebar-backdrop {
  background-color: rgba(0, 0, 0, 0.8);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;
  z-index: 2;
}

.sidebar-panel {
  overflow-y: auto;
  background-color: #fff;
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  z-index: 999;
  padding: 5rem 20px 2rem 20px;
  width: 400px;
  color: #999999;
}
</style>
