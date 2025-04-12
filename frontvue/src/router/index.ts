import {createRouter, createWebHashHistory, type RouteRecordRaw} from "vue-router";
import Home from "@/views/Home.vue";
import type {MenuItem, MenuMeta, RouterItem} from "@mono/common";
import Login from "@/views/Login.vue";
import {logger} from "../log";
import NotFound from "@/views/NotFound.vue";

const home = 'home'

const routes: RouteRecordRaw[] = [
    {
        path: '/', name: home, component: Home, children: [] as RouteRecordRaw[]
    },
    {
        path: "/login", name: 'login', component: Login,
        meta: {}
    },
    {
        path: '/:pathMatch(.*)', name: 'notFound', component: NotFound,
    }
];


//todo 后端路由，从后端获取
const menuRoutes: RouterItem[] = [
    {
        routerId: "111",
        name: "Component1",
        path: "/component1",
        component: "Component1",
        children: [],
        menuMeta: {
            icon: 'ApiOutlined',
            title: 'api',
            menuId: '111'
        }
    },
    {
        routerId: "222",
        name: "Component2",
        path: "/component2",
        component: "Component2",
        children: [],
        menuMeta: {
            icon: 'ApiOutlined',
            title: 'rom',
            menuId: '222'
        }
    },
];

export function createMenu() {
    const filterMapFun = (routerItems: RouterItem[]) => routerItems.filter(item => item.menuMeta).map(item => menuMap(item as (RouterItem & {
        menuMeta: MenuMeta
    })));
    const menuMap = (routerItem: RouterItem & { menuMeta: MenuMeta }): MenuItem => {
        return {
            ...routerItem.menuMeta,
            path: routerItem.path,
            children: filterMapFun(routerItem.children)
        }
    }
    return filterMapFun(menuRoutes)
}

function addRoutesFromBackend(backendRoutes: RouterItem[]) {
    const mapFun = (routeItem: RouterItem): RouteRecordRaw => {
        return {
            name: routeItem.name,
            path: routeItem.path,
            component: () => import(`@/components/${routeItem.component}.vue`),
            children: routeItem.children.map(item => mapFun(item))
        }
    }
    backendRoutes.forEach((routeItem) => {
        router.addRoute(home, mapFun(routeItem))
    });
}


export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
addRoutesFromBackend(menuRoutes);
const needLogin = true;
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token'); // 假设通过localStorage中是否存在token判断是否登录，实际可按真实情况替换
    logger.info(`${from.path}  ${to.path} ${isAuthenticated !== null}`)
    // 本身是登录页直接跳转，需要认证登录并且
    if (to.name != 'login' && (needLogin || to.matched.some(record => record.meta.requiresAuth))) {
        // 如果要访问的路由需要认证
        if (isAuthenticated) {
            next(); // 已登录，放行
        } else {
            next({name: 'login'}); // 未登录，跳转到登录页
        }
    } else {
        next(); // 不需要认证的路由，直接放行
    }
});

export default router