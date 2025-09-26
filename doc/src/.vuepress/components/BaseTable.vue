<template>
  <div style="margin: 5px;padding: 5px">
    <Table :columns="props.columns" :data-source="props.dataSource" :row-key="rowKey" :bordered="true">
      <template #bodyCell="{column,text,value,index,record}">
        <template v-if="column.renderComponent">
          <component :is="column.renderComponent" :value="value" :record="record" :column="column"></component>
        </template>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">

import {defineProps} from 'vue';
import {TableProps} from 'ant-design-vue';
import "ant-design-vue/es/table/style";
import {Table} from 'ant-design-vue';
import {ColumnGroupType, ColumnType} from "ant-design-vue/es/table/interface.js";

interface Props<RecordType = any> extends ColumnType<RecordType> {
  hide: boolean;
}

// 定义基础表格属性
const props = defineProps<{
  /** 表格列配置 */
  columns?: Props[];
  /** 表格数据源 */
  dataSource?: TableProps['dataSource'];
  /** 行数据的key字段，默认为'id' */
  rowKey?: string | ((record: any) => string);
  /** 是否显示边框 */
  bordered?: boolean;
}>();

// 默认行key
const rowKey = props.rowKey || 'id';
</script>