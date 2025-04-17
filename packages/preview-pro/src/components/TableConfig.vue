<template>
  <div style="margin: 50px">
    <NotionTable :columns="columns" :dataSource="dataSource"
                 :table-config="{rowDrag:true,columnDrag:true,resizable:true}"></NotionTable>
  </div>
</template>
<script lang="ts" setup>
import {useTable} from "@/components/Notion/table";

const {dataSource, columns} = useTable()

</script>
<style lang="less" scoped>
</style>

