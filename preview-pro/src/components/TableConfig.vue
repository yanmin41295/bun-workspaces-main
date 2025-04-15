<template>
  <div style="margin: 50px">
    <NotionTable :dataSource="dataSource" :columns="columns"
                 :table-config="{rowDrag:true,columnDrag:true,resizable:true}"></NotionTable>
  </div>
</template>
<script setup lang="ts">
import {useTable} from "@/components/Notion/table";

const {dataSource, columns} = useTable()

</script>
<style lang="less" scoped>
</style>

