<template>
  <page-container :title="`${route.meta.title} ${route.params.id}`">
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
    <div style="height: 300px">
      <p>路由参数联动 分页器 组件</p>
      <a-space>
        <a-button type="dashed" @click="prev">跳转上一页</a-button>
        <a-button type="dashed" @click="next">跳转下一页</a-button>
      </a-space>
      <a-divider/>
      <a-pagination :current="currentId" :total="total" show-less-items @change="handlePageChange"/>
    </div>
  </page-container>
</template>

<script lang="ts" setup>
import {LikeOutlined} from '@ant-design/icons-vue';
import {useRoute, useRouter} from 'vue-router';

const route = useRoute();
const router = useRouter();

const currentId = computed(() => Number.parseInt(route.params.id as string, 10));
const total = computed(() => {
  const v = currentId.value * 20;
  if (v >= Number.MAX_SAFE_INTEGER) {
    return Number.MAX_SAFE_INTEGER;
  }
  return v;
});

const next = () => {
  router.push({
    name: 'dynamic-match',
    params: {id: currentId.value + 1},
  });
};
const prev = () => {
  router.push({
    name: 'dynamic-match',
    params: {id: currentId.value > 1 ? currentId.value - 1 : 1},
  });
};
const handlePageChange = (currentPage: number) => {
  router.push({
    name: 'dynamic-match',
    params: {id: currentPage},
  });
};
</script>
