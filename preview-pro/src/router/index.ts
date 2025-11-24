import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';
import BasicLayout from '../layouts/BasicLayout.vue';
import BlankLayout from '../layouts/BlankLayout.vue';
import WelcomePage from '../views/Page1.vue';


// only githubpages preview site used, if use template please remove this check
// and use `createWebHistory` is recommend
const hasGithubPages = import.meta.env.VITE_GHPAGES;

export default createRouter({
    history: hasGithubPages ? createWebHashHistory() : createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'index',
            meta: {title: 'Home'},
            component: BasicLayout,
            redirect: '/admins',
            children: [
                {
                    path: '/welcome',
                    name: 'welcome',
                    meta: {title: '欢迎', icon: 'icon-icon-test'},
                    component: WelcomePage,
                },
                {
                    path: '/admins',
                    name: 'admins',
                    meta: {title: '管理页', icon: 'icon-tuijian', flat: true},
                    component: BlankLayout,
                    redirect: () => ({name: 'ViewTable'}),
                    children: [
                        {
                            path: 'ViewTable',
                            name: 'ViewTable',
                            meta: {title: 'ViewTable'},
                            component: () => import('../components/table/ViewTable.vue'),
                        },
                        {
                            path: 'VueWebTerminal',
                            name: 'VueWebTerminal',
                            meta: {title: '终端'},
                            component: () => import('../views/VueWebTerminal.vue'),
                        }, {
                            path: 'TableConfigurator',
                            name: 'TableConfigurator',
                            meta: {title: 'TableConfigurator'},
                            component: () => import('../components/TableConfigurator.vue'),
                        },
                        {
                            path: 'terminal',
                            name: 'terminal',
                            meta: {title: '终端'},
                            component: () => import('../views/TerminalView.vue'),
                        },
                        {
                            path: 'file-manager',
                            name: 'fileManager',
                            meta: {title: '文件管理'},
                            component: () => import('../views/FileManager.vue'),
                        },
                        {
                            path: 'page-1',
                            name: 'page1',
                            meta: {title: '一级页面'},
                            component: () => import('../views/admins/PageInfo.vue'),
                        },
                        {
                            path: 'page-2',
                            name: 'page2',
                            meta: {title: '二级页面'},
                            component: () => import('../views/admins/PageTypography.vue'),
                        },
                        {
                            path: 'dynamic-match/:id(\\d+)',
                            name: 'dynamic-match',
                            // 路由 path 默认参数再 meta.params 里
                            meta: {title: '动态参数页面', params: {id: 1}},
                            component: () => import('../views/admins/DynamicMatch.vue'),
                        },
                    ],
                },
                {
                    path: '/version',
                    name: 'version',
                    meta: {title: 'Version', icon: 'icon-antdesign'},
                    component: () => import('../views/Detail.vue'),
                },
            ],
        },
    ]

});