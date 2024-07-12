import { createApp } from "vue";
import App from "./App.vue";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import router from "./router";
import store from "./store";
import "@/pluges/axios";
import "@/access";
import "bytemd/dist/index.css";
import "highlight.js/styles/stackoverflow-light.css";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import hljsVuePlugin from "@highlightjs/vue-plugin";
hljs.registerLanguage("javascript", javascript);

createApp(App)
  .use(ArcoVue)
  .use(store)
  .use(hljsVuePlugin)
  .use(router)
  .mount("#app");
