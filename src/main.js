import {createApp} from 'vue'
import App from './App.vue'
import "./assets/style/reset.css";
import "./assets/style/global.css";
import router from './router'
import store from "./store";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import api from './api/api.js'


import Loading from "./components/Loading/index.js";

const app = createApp(App)
app.use(router).use(store)
app.use(Loading)
app.config.globalProperties.$api = api

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')
