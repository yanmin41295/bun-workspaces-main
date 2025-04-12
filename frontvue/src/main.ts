import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import "ant-design-vue/dist/reset.css";
import Antd from 'ant-design-vue';
import * as Icons from '@ant-design/icons-vue'
import router from "./router";
import pinia from "./stores";

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(Antd)

Object.keys(Icons).map(key => {
    app.component(key, Icons[key as keyof typeof Icons])
})
app.mount('#app')
