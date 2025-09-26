import {defineUserConfig} from "vuepress";

import theme from "./theme.js";
import path from "node:path";
import {registerComponentsPlugin,} from '@vuepress/plugin-register-components'

export default defineUserConfig({
    base: "/",

    lang: "zh-CN",
    title: "文档演示",
    description: "vuepress-theme-hope 的文档演示",

    theme,

    // 和 PWA 一起启用
    // shouldPrefetch: false,

    plugins: [
        registerComponentsPlugin({
            // 配置项
            components: {
                Quote: path.resolve(__dirname, './components/Quote.vue'),
                BaseTable: path.resolve(__dirname, './components/BaseTable.vue'),
                DemoTable: path.resolve(__dirname, './components/DemoTable.vue'),
                TextCell: path.resolve(__dirname, './components/TextCell.vue'),
            },
        }),
    ],
});
