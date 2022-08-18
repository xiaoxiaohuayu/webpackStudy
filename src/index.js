console.log("webpack");
import Vue from "vue";
import App from "./App";
import "./css/index.css";

new Vue({
  render: (h) => h(App),
}).$mount("#app");
