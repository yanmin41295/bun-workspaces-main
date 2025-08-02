<template>
  <pro-layout v-model:collapsed="state.collapsed" v-model:openKeys="state.openKeys"
              v-model:selectedKeys="state.selectedKeys" :breadcrumb="{ routes: breadcrumb }" :loading="loading"
              :menu-data="menuData" disable-content-margin iconfont-url="//at.alicdn.com/t/font_2804900_2sp8hxw3ln8.js"
              style="min-height: 100vh" v-bind="proConfig">
    <template #menuHeaderRender>
      <router-link :to="{ path: '/' }">
        <img :src="antVLogo"/>
        <h1>Preview Pro</h1>
      </router-link>
    </template>
    <template #rightContentRender>
      <RightContent :current-user="currentUser"/>
    </template>
    <!-- custom breadcrumb itemRender  -->
    <template #breadcrumbRender="{ route, params, routes }">
      <span v-if="routes.indexOf(route) === routes.length - 1">
        <HeartOutlined/>
        {{ route.breadcrumbName }}
      </span>
      <router-link v-else :to="{ path: route.path, params }">
        <SmileOutlined/>
        {{ route.breadcrumbName }}
      </router-link>
    </template>
    <SettingDrawer v-model="proConfig"/>
    <RouterView v-slot="{ Component, route }">
      <!--      <transition mode="out-in" name="slide-left"  不能用transition，会导致子组件的keep-alive失效>-->
      <!--        <keep-alive>-->
      <!--          <component :is="Component" :key="logData(route.path,'keep-alive')" />-->
      <!--        </keep-alive>-->
      <!--      </transition>-->
      <keep-alive>
        <component :is="Component" :key="logData(route.path,'keep-alive')"/>
      </keep-alive>
    </RouterView>
  </pro-layout>
</template>

<script lang="ts" setup>
import {RouterLink, RouterView, useRouter} from 'vue-router';
import {clearMenuItem, getMenuData, ProLayout, type RouteContextProps} from '@ant-design-vue/pro-layout';
import {HeartOutlined, SmileOutlined} from '@ant-design/icons-vue';
import antVLogo from '@/assets/antv.logo.svg';

function logData<T>(data: any, label: string = '') {
  console.log(label + ' ' + JSON.stringify(data));
  return data;
}

const tabList = ref([
  {
    key: '1',
    tab: 'Tab 1',
  },
  {
    key: '2',
    tab: 'Tab 2',
  },
]);
const router = useRouter();
const {menuData} = getMenuData(clearMenuItem(router.getRoutes()));

const state = reactive<Omit<RouteContextProps, 'menuData'>>({
  collapsed: false, // default collapsed
  openKeys: [], // defualt openKeys
  selectedKeys: [], // default selectedKeys
});
const loading = ref(false);
const proConfig = ref({
  layout: 'mix',
  navTheme: 'light',
  fixedHeader: true,
  fixSiderbar: true,
  splitMenus: true,
});
const breadcrumb = computed(() =>
    router.currentRoute.value.matched.concat().map(item => {
      return {
        path: item.path,
        breadcrumbName: item.meta.title || '',
      };
    }),
);
const currentUser = reactive({
  nickname: 'Admin',
  avatar: 'A',
});

watch(router.currentRoute, () => {
  const matched = router.currentRoute.value.matched.concat();
  state.selectedKeys = matched.filter(r => r.name !== 'index').map(r => r.path);
  state.openKeys = matched.filter(r => r.path !== router.currentRoute.value.path).map(r => r.path);
}, {immediate: true});
</script>
