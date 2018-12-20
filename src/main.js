import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap";

import FBSignInButton from "vue-facebook-signin-button";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(FBSignInButton);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

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

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
