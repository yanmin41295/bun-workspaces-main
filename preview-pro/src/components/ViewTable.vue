<template>
  <div style="margin: 50px">
    <STable :column-drag="tableConfig.columnDrag" :columns="columns" :data-source="dataSource" :on-column-drag-end="handleDragColumns"
            :pagination="false"
            :scroll="{ y: 800, x: 2000 }" :stripe="tableConfig.striped">

    </STable>
  </div>
</template>
<script lang="ts" setup>
import {STable} from '@surely-vue/table';
import type {DragColumnEventInfo} from '@surely-vue/table/dist/src/components/interface';

const tableMeta = reactive({
  pageConfig: {
    pageSize: 10,
    current: 1,
    total: 100,
  },
  tableConfig: {
    fixedHeader: true,
    columnDrag: true,
    striped: true,
    rowKey: 'key',
  },
  columns: [
    {title: '姓名', key: 'name', dataIndex: 'name', width: '400px', order: 1, resizable: true},
    {title: '生日', key: 'birthday', dataIndex: 'birthday', width: '200px', resizable: true, order: 2},
    {title: '地址', key: 'address', dataIndex: 'address', width: '400px', resizable: true, order: 3},
    {title: 'Column 1', key: 'column1', dataIndex: 'column1', width: '400px', resizable: true, order: 4},
    {title: 'Column 2', key: 'column2', dataIndex: 'column2', width: '400px', resizable: true, order: 5},
    {title: 'Column 3', key: 'column3', dataIndex: 'column3', width: '400px', resizable: true, order: 6},
    {title: 'Column 4', key: 'column4', dataIndex: 'column4', width: '400px', resizable: true, order: 7},
    {title: 'fixed right column5', key: 'column5', dataIndex: 'column5', fixed: 'right', width: '400px', order: 8},
    {title: 'Column 6', key: 'column6', dataIndex: 'column6', width: '400px', resizable: true, order: 9},
    {title: 'Column 7', key: 'column7', dataIndex: 'column7', width: '400px', resizable: true, order: 10},
    {title: 'Column 8', key: 'column8', dataIndex: 'column8', width: '400px', resizable: true, order: 11},
    {title: 'Column 9', key: 'column9', dataIndex: 'column9', width: '400px', resizable: true, order: 12},
    {
      title: 'fixed right column10',
      key: 'column10',
      dataIndex: 'column10',
      fixed: 'right',
      width: '400px',
      resizable: true,
      order: 13
    },
  ],
  dataSource: [] as DataItem[],
});
const {pageConfig, tableConfig, columns, dataSource} = toRefs(tableMeta);

interface DataItem {
  key: number;
  name: string;
  birthday: string;
  address: string;
  column1: string;
  column2: string;
  column3: string;
  column4: string;
  column5: string;
  column6: string;
  column7: string;
  column8: string;
  column9: string;
  column10: string;
}

function handleDragColumns(opt: DragColumnEventInfo) {
  // let oldOrder = opt.column.order;
  // columns.value.forEach((column) => {
  //   if (column.dataIndex === opt.column.dataIndex) {
  //     column.order = opt.targetColumn.order;
  //   } else if (column.dataIndex === opt.targetColumn.dataIndex) {
  //     column.order = oldOrder;
  //   }
  // });
  // columns.value.sort((a, b) => a.order - b.order);
  console.log(columns.value);
}

for (let i = 0; i < 1000; i++) {
  tableMeta.dataSource.push({
    key: i,
    name: `Edrward ${i}`,
    birthday: i + ' years old',
    address: `London Park no. ${i}`,
    column1: 'column' + i,
    column2: 'column' + i,
    column3: 'column' + i,
    column4: 'column' + i,
    column5: 'column' + i,
    column6: 'column' + i,
    column7: 'column' + i,
    column8: 'column' + i,
    column9: 'column' + i,
    column10: 'column' + i,
  });
}
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

