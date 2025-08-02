<template>
  <BaseTable :columns="data.columns" :data-source="data.dataSource" row-key="key" :bordered="true">
  </BaseTable>
</template>

<script setup lang="ts">
import BaseTable from "./BaseTable.vue";

// 定义基础表格属性
const data = {
  "columns": [
    {
      "title": "姓名",
      "dataIndex": "name",
      "key": "name",
    },
    {
      "title": "年龄",
      "dataIndex": "age",
      "key": "age"
    },
    {
      "title": "地址",
      "dataIndex": "address",
      "key": "address",
      "hide": true
    }
  ],
  "dataSource": [
    {
      "key": "1",
      "name": "严敏",
      "age": 32,
      "address": "北京市朝阳区"
    },
    {
      "key": "2",
      "name": "李四",
      "age": 42,
      "address": "上海市浦东新区"
    }
  ]
}

// 默认行key
</script>