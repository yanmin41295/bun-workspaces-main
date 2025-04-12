<template>
  <a-layout style="  height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo"/>
      <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
        <a-menu-item v-for="menu in state.menus" :key="menu.menuId" @click="router.push({path:menu.path})">
          <component :is="menu.icon"></component>
          <span>{{ menu.title }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)"/>
      </a-layout-header>
      <a-layout-content
          :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <!--        <a-tabs v-model:activeKey="state.currentTab" hide-add type="editable-card">-->
        <!--          <a-tab-pane v-for="pane in state.panes" :key="pane.key" :tab="pane.title" :closable="pane.closable">-->
        <!--            <keep-alive>-->
        <!--              <component :is="pane.component" :key="state.currentTab"></component>-->
        <!--            </keep-alive>-->
        <!--          </a-tab-pane>-->
        <!--        </a-tabs>-->
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import {MenuFoldOutlined, MenuUnfoldOutlined,} from '@ant-design/icons-vue';
import {onBeforeMount, reactive, ref} from 'vue';
import {createMenu, router} from "@/router";
import {useRoute} from "vue-router";

const route = useRoute()
const selectedKeys = ref<string[]>(['1'])
const collapsed = ref<boolean>(false)
const state = reactive({
  menus: createMenu(),
  // panes: [{
  //   title: route.name,
  //   key: route.hash,
  //   closable: false,
  //   component: import('../components/' + '')
  // }],
  // currentTab: ''
})

onBeforeMount(() => {
  state.menus
})
</script>
<style>
</style>
