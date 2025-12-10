import '@ant-design-vue/pro-layout/dist/style.css';
import 'ant-design-vue/dist/reset.css';
import 'reflect-metadata';
import {createApp} from 'vue';
import {ConfigProvider} from 'ant-design-vue';
import ProLayout, {PageContainer} from '@ant-design-vue/pro-layout';
import router from './router';
import App from './App.vue';
import STable from '@surely-vue/table';
import '@surely-vue/table/dist/index.less';
import {loader} from '@guolao/vue-monaco-editor'
import {createTerminal} from 'vue-web-terminal'
import {createLogger} from 'vue-logger-plugin'
import {userApi} from "@/api/ApiHandler";

loader.config({
    paths: {
        vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs',
    },
})

export const logger = createLogger({
    enabled: true,
    level: 'debug',
    callerInfo: true,
    consoleEnabled: true,
})
const app = createApp(App);
app.use(router);
app.use(ConfigProvider);
app.use(ProLayout).use(PageContainer);
app.use(STable);
app.use(logger)
app.use(createTerminal())
app.mount('#app');
await userApi.findByUserId({userId: 1})
