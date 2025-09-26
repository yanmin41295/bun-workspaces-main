import { sidebar } from "vuepress-theme-hope";

export default sidebar({
    "/": [
        "",
        {
            text: "计划",
            icon: "laptop-code",
            prefix: "plan/",
            link: "plan/",
            children: "structure",
        },
        {
            text: "炒股",
            icon: "laptop-code",
            prefix: "stock/",
            link: "stock/",
            children: "structure",
        },
        "portfolio",
        {
            text: "案例",
            icon: "laptop-code",
            prefix: "demo/",
            link: "demo/",
            children: "structure",
        },
        {
            text: "文档",
            icon: "book",
            prefix: "guide/",
            children: "structure",
        },
        {
            text: "幻灯片",
            icon: "person-chalkboard",
            link: "https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/demo.html",
        },
    ],
});
