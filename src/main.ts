import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const myApp = createApp(App);

myApp.use(store);

myApp.use(router);

myApp.mount("#app");
