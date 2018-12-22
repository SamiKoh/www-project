/* Entry point to the application */
"use strict";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap"; /* scss library */

/* Facebook login */
import FBSignInButton from "vue-facebook-signin-button";

/* http requests */
import axios from "axios";
import VueAxios from "vue-axios";

const marked = require("marked");

/* Register plugins for Vue */
Vue.use(FBSignInButton);
Vue.use(VueAxios, axios);

/* disable prduction tips */
Vue.config.productionTip = false;

/* Load Facebook SDK --> */
window.fbAsyncInit = function() {
  FB.init({
    appId: "1620415398059231",
    autoLogAppEvents: true,
    xfbml: true,
    version: "v3.2"
  });
};

(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

/* <-- end of Facebook SDK */

/* Define a global mixin */
Vue.mixin({
  data() {
    return {
      api: "http://127.0.0.1:3000/api/"
    };
  },
  methods: {
    /* parse markdown */
    marked: function(data) {
      return marked(data);
    }
  }
});

/* Initialize Vue instance with vue-router
   and mount to HTML page  */
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
