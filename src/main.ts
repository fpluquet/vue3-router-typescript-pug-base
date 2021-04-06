import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { FontAwesomeIcon } from "@/plugins/font-awesome";
import mitt from 'mitt';

require('@/assets/main.scss');

const emitter = mitt();

const app = createApp(App)
  .use(store)
  .use(router)
  .component("fa", FontAwesomeIcon)

app.provide('emitter', emitter);
app.mount("#app");