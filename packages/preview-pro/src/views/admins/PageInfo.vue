<template>
  <page-container :title="route.meta.title">
    <template #content>
      <a-descriptions :column="2" size="small">
        <a-descriptions-item label="创建人">张三</a-descriptions-item>
        <a-descriptions-item label="联系方式">
          <a>421421</a>
        </a-descriptions-item>
        <a-descriptions-item label="创建时间">2017-01-10</a-descriptions-item>
        <a-descriptions-item label="更新时间">2017-10-10</a-descriptions-item>
        <a-descriptions-item label="备注">中国浙江省杭州市西湖区古翠路</a-descriptions-item>
      </a-descriptions>
    </template>
    <template #extra>
      <a-button key="3">操作</a-button>
      <a-button key="2">操作</a-button>
      <a-button key="1" type="primary">主操作</a-button>
    </template>
    <template #extraContent>
      <a-space>
        <a-statistic :value="1128" title="Feedback">
          <template #prefix>
            <LikeOutlined/>
          </template>
        </a-statistic>
        <a-statistic :value="93" suffix="/ 100" title="Unmerged"/>
      </a-space>
    </template>
    <!-- 主内容区 -->
    <div style="height: 120vh">
      <a-result
          :style="{
          height: '100%',
          background: '#fff',
        }"
          status="404"
          sub-title="Sorry, you are not authorized to access this page."
          title="Hello World"
      >
        <template #extra>
          <a-button type="primary">{{ counter }}</a-button>
        </template>
      </a-result>
    </div>
  </page-container>
</template>

<script lang="ts" setup>
import {LikeOutlined} from '@ant-design/icons-vue';
import {useRoute} from 'vue-router';
import {useInterval} from '@vueuse/core';

const counter = useInterval(1000);
const route = useRoute();
</script>
