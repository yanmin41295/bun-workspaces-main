import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import "ant-design-vue/dist/reset.css";
import Antd from 'ant-design-vue';
import * as Icons from '@ant-design/icons-vue'
import router from "./router";
import pinia from "./stores";
import {type User} from '@prisma/client'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(Antd)
const user: User = {
    id: 1,
    name: 'admin',
    email: 'admin@admin.com',
}
console.log(user)
Object.keys(Icons).map(key => {
    app.component(key, Icons[key as keyof typeof Icons])
})
app.mount('#app')
