import '@ant-design-vue/pro-layout/dist/style.css';
import 'ant-design-vue/dist/reset.css';

import {createApp} from 'vue';
import {ConfigProvider} from 'ant-design-vue';
import ProLayout, {PageContainer} from '@ant-design-vue/pro-layout';
import router from './router';
import App from './App.vue';
import STable from '@surely-vue/table';
import '@surely-vue/table/dist/index.less';
import {loader} from '@guolao/vue-monaco-editor'
import {Container} from "@mono/common/src/api/container";

loader.config({
    paths: {
        vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs',
    },
})
const app = createApp(App);
app.use(router);
app.use(ConfigProvider);
app.use(ProLayout).use(PageContainer);
app.use(STable);
app.mount('#app');
let container = new Container();
await container.initNestRouter()
