<template>
  <div style="margin: 50px">
    <NotionTable :dataSource="dataSource" :columns="columns" :table-config="{rowDrag:true,columnDrag:true,resizable:true}"></NotionTable>
  </div>
</template>
<script setup lang="ts">
import type { ColumnType, DefaultRecordType } from '@surely-vue/table/dist/src/components/interface';

const dataSource = reactive<DefaultRecordType[]>([]);
for (let i = 0; i < 200; i++) {
  dataSource.push({
    key: i + '1',
    name: '胡彦斌' + i,
    age: 32,
    address: '西湖区湖底公园1号',
  });
}

const columns: ColumnType[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    resizable: true,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];

</script>
<style lang="less" scoped>
</style>

