<template>
  <div>
    <SortTag :sortList="sortList" @onSortClick="handleSortClick"></SortTag>
  </div>
  <div>
    <STable :columns="columns" :scroll="{ y: 800, x: 2000 }" :data-source="dataSource" :stripe="tableConfig.striped" :pagination="false" :column-drag="tableConfig.columnDrag"  :custom-cell="customCell"
            :custom-header-cell="customHeaderCell"/>
    <a-pagination
      v-model:current="current"
      v-model:pageSize="pageSize"
      style="margin-top: 30px; justify-content: flex-end; display: flex"
      :page-size-options="pageSizeOptions"
      :total="total"
      show-size-changer
    >
      <template #buildOptionText="props">
      <span v-if="+props.value <= 500" style="width: 60px; display: inline-block">
        {{ props.value }}条/页
      </span>
        <span v-else style="width: 60px; display: inline-block">全部</span>
      </template>
    </a-pagination>
  </div>

</template>
<script setup lang="ts" generic="C  extends  ColumnType,D extends DefaultRecordType">
import SortTag from './SortTag.vue';
import { useSort } from '@/components/Notion/sort';
import { STable } from '@surely-vue/table';
import type { DefaultRecordType, ColumnType } from '@surely-vue/table/dist/src/components/interface';
import { onBeforeMount, onMounted } from 'vue';

const { dataSource, columns, tableConfig = { striped: true, rowDrag: false, columnDrag: false, resizable: false } } = defineProps<{
  dataSource: D[],
  columns: C[],
  tableConfig?: {
    striped?: boolean;
    // 拖拽
    rowDrag?: boolean;
    resizable?: boolean;
    columnDrag?: boolean;
  };
}>();
onBeforeMount(() => {
  if (tableConfig.rowDrag) {
    columns[0].rowDrag = true;
  }
});

const customCell = ({ rowIndex, column }) => {
  if (column.dataIndex === 'name') {
    return rowIndex < 3
      ? { style: { background: '#f5222d' } }
      : { style: { background: '#87e8de' } };
  } else if (column.key === 'operation') {
    return { style: { background: '#fffb8f' } };
  }
  return {};
};
const customHeaderCell = column => {
  return column.fixed ? { style: { background: '#b7eb8f' } } : {};
};
const { sortList, handleSortClick } = useSort();
const current = ref(1);
const pageSize = ref(10);
const total = ref(dataSource.length);
const pageSizeOptions = computed<string[]>(() => [
  '10',
  '20',
  '50',
  String(dataSource.length),
]);

onMounted(() => {
  pageSizeOptions.value[3] = String(dataSource.length);
});
</script>
<style lang="less" scoped>
:deep(.surely-table) {
  font-size: 16px;
  // Unlicensed Product   带有滚动条的table
  .surely-table-horizontal-scroll + div {
    visibility: hidden !important;
  }

  .surely-table-unselectable {
    // Powered by Surely Vue
    .surely-table-body-viewport-container + div {
      // 使用CSS的clip属性来隐藏元素。这样可以根据元素的尺寸和位置来裁剪显示区域，将其设为与元素相同大小的矩形，即可隐藏该元素。
      clip: rect(0, 0, 0, 0);
    }

    // Unlicensed Product   不带带有滚动条的table
    //+ div {
    //  visibility: hidden !important;
    //}
  }
}
</style>