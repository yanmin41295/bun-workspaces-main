<template>
  <pro-layout
      v-model:openKeys="baseState.openKeys"
      v-model:selectedKeys="baseState.selectedKeys"
      :breadcrumb="{ routes: breadcrumb }"
      :collapsed-button-render="false"
      :fix-siderbar="true"
      :header-render="false"
      :loading="loading"
      :menu-data="routes"
      collapsed
      disable-content-margin
      iconfont-url="//at.alicdn.com/t/font_2804900_2sp8hxw3ln8.js"
      style="min-height: 100vh"
  >
    <template #menuHeaderRender>
      <a>
        <img src="/favicon.svg"/>
      </a>
    </template>
    <WaterMark :content="watermarkContent">
      <pro-layout
          v-model:collapsed="baseState.collapsed"
          v-model:openKeys="baseState.childrenOpenKeys"
          v-model:selectedKeys="baseState.childrenSelectedKeys"
          :fix-siderbar="true"
          :is-children-layout="true"
          :menu-data="cachedMap[currentRouteKey]"
          :menu-header-render="false"
          disable-content-margin
          nav-theme="light"
          style="min-height: 100vh"
      >
        <!-- custom right-content -->
        <template #rightContentRender>
          <div style="margin-right: 12px">
            <a-avatar shape="square" size="small">
              <template #icon>
                <UserOutlined/>
              </template>
            </a-avatar>
          </div>
        </template>

        <template #headerContentRender>
          <div style="height: 100%; display: flex; align-items: center">
            <a-breadcrumb>
              <a-breadcrumb-item v-for="item of breadcrumb" :key="item.path">
                <router-link :to="{ path: item.path, item: item.params }">
                  {{ item.breadcrumbName }}
                </router-link>
              </a-breadcrumb-item>
            </a-breadcrumb>
          </div>
        </template>

        <!-- content begin -->
        <router-view v-slot="{ Component }">
          <component :is="Component"/>
        </router-view>
      </pro-layout>
    </WaterMark>
  </pro-layout>
</template>

<script lang="ts" setup>
import {computed, onMounted, reactive, ref, watchEffect} from 'vue';
import {type RouteRecordName, type RouteRecordRaw, useRouter} from 'vue-router';
import {Avatar as AAvatar, Breadcrumb as ABreadcrumb, BreadcrumbItem as ABreadcrumbItem} from 'ant-design-vue';
import type {RouteContextProps} from '@ant-design-vue/pro-layout';
import {clearMenuItem, getMenuData, WaterMark} from '@ant-design-vue/pro-layout';
import {UserOutlined} from '@ant-design/icons-vue';

const loading = ref(false);
const watermarkContent = ref('Pro Layout');
const router = useRouter();
const currentRouteKey = computed(() => router.currentRoute.value.matched.concat()[1].name);
const {menuData} = getMenuData(clearMenuItem(router.getRoutes()));
// flat menus
const routes = menuData.map(item => {
  return {
    ...item,
    children: null,
  };
});
const cachedMap = menuData.reduce((pre, cur) => {
  const key = cur.name || cur.path;
  const child = cur.children || [];
  pre[key] = child;
  return pre;
}, {} as Record<RouteRecordName, RouteRecordRaw>);

console.log('cachedMap', cachedMap);

const baseState = reactive<Omit<RouteContextProps, 'menuData'>>({
  selectedKeys: ['/welcome'],
  openKeys: [],
  childrenSelectedKeys: [],
  childrenOpenKeys: [],
  collapsed: false,
});
const breadcrumb = computed(() =>
    router.currentRoute.value.matched.concat().map(item => {
      return {
        path: item.path,
        icon: item.meta.icon,
        params: item.meta?.params,
        breadcrumbName: item.meta.title || '',
      };
    }),
);
watchEffect(() => {
  if (router.currentRoute) {
    const matched = router.currentRoute.value.matched.concat();
    baseState.selectedKeys = matched.filter(r => r.name !== 'index').map(r => r.path);
    baseState.childrenSelectedKeys = matched.filter(r => r.name !== 'index').map(r => r.path);
    baseState.childrenOpenKeys = matched.filter(r => r.path !== router.currentRoute.value.path).map(r => r.path);
  }
});
onMounted(() => {
  loading.value = true;
  new Promise<string>(resolve => {
    setTimeout(() => {
      resolve('Sendya <18x@loacg.com>');
    }, 2000);
  }).then(res => {
    watermarkContent.value = res;
    loading.value = false;
  });
});
</script>
