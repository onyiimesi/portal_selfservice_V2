import { createApp } from "vue";
import App from "./App.vue";
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import router from "./router";
import './axios'
import "./assets/main.css";
import "./assets/placeholder-loading.min.css";

const app = createApp(App);

app.use(Toast);

app.use(router);

app.mount("#app");
