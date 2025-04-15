<template>
  <div>
    <AButton @click="addRow">添加行</AButton>
    <AButton @click="getUser">getUser</AButton>
    <STable :columns="stateData.columns" :scroll="{ y: 800, x: 2000 }" :data-source="stateData.dataSource"
            :stripe="tableConfig.striped"
            :pagination="false" :column-drag="tableConfig.columnDrag" :custom-cell="customCell"
            :custom-header-cell="customHeaderCell">
      <template #headerCell="{title, column}">
        <template v-if="column.viewTemplate==='string'">
          string -- {{ title }}
        </template>
      </template>
      <template #bodyCell="{record, column,text,value}">
        <template v-if="column.viewTemplate==='string'"> {{ value }}</template>
        <template v-else-if="column.viewTemplate==='number'"> {{ value }}</template>
        <template v-else-if="column.viewTemplate==='label'">
          <ATag>{{ value }}</ATag>
        </template>
        <template v-else-if="column.viewTemplate==='labels'">
          <ATag v-for="item in value">{{ item }}</ATag>
        </template>
        <template v-else>{{ text }}</template>
      </template>
      <template #cellEditor="{ column, modelValue, save, closeEditor, editorRef, getPopupContainer }">
        <template v-for="col in stateData.columns.filter(item=>item.editable==='cellEditorSlot')">
          <template v-if="column.dataIndex===col.dataIndex && col.editTemplate==='date'">
            <a-date-picker :ref="editorRef" :bordered="false" :value="dayjs(modelValue.value)" style="width: 100%"
                           :get-popup-container="getPopupContainer" open :allow-clear="false"
                           @update:value="v => {modelValue.value = v?.format('YYYY-MM-DD') ?? '';save();}"
                           @blur="closeEditor" @keydown.esc="closeEditor" @click.stop="closeEditor"
            ></a-date-picker>
          </template>
          <template v-else-if="column.dataIndex===col.dataIndex && col.editTemplate==='labels'">
            <!--            mode="multiple" 多选模式，只能选择已有的options，不支持新的option-->
            <a-select v-model:value="modelValue.value" mode="tags" style="width: 100%"
                      @blur="()=>{closeEditor();save()}" :options="getOptions(col.name)"/>
          </template>
        </template>
      </template>
    </STable>
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
<script setup lang="ts" generic="C  extends  TableHeader,D extends TableData">
import {useSort} from '@/components/Notion/sort';
import {STable} from '@surely-vue/table';
import {onBeforeMount, onMounted} from 'vue';
import {log, type TableData, type TableHeader} from "@/components/Notion/table";
import dayjs from "dayjs";
import {Random} from "mockjs";
import {userApi} from "@/api/controller.api";

async function getUser() {
  await userApi.findByUserId({userId: "1"}).then(user => {
    console.log(user)
  })
}

const {
  dataSource,
  columns,
  tableConfig = {striped: true, rowDrag: false, columnDrag: false, resizable: false}
} = defineProps<{
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
const stateData = reactive({
  columns: columns,
  dataSource: dataSource,
  tableConfig: tableConfig
})

onBeforeMount(() => {
  if (tableConfig.rowDrag) {
    columns[0].rowDrag = true;
  }
  log(columns, 'columns');
});

function getOptions(columnName: string) {
  return dataSource.flatMap(item => item[columnName]).map(item => ({value: item, disabled: false}));
}

function addRow() {
  //
  stateData.dataSource = [
    ...stateData.dataSource, {
      id: dataSource.length + 1,
      key: Random.id(),
      name: '新行',
      gender: '女',
      age: 20,
      birthday: dayjs().format('YYYY-MM-DD'),
      address: '新地址',
      tags: ['新标签'],
      operation: '操作'
    }
  ]
}

const customCell = ({rowIndex, column}) => {
  if (column.dataIndex === 'name') {
    return rowIndex < 3
        ? {style: {background: '#f5222d'}}
        : {style: {background: '#87e8de'}};
  } else if (column.key === 'operation') {
    return {style: {background: '#fffb8f'}};
  }
  return {};
};
const customHeaderCell = column => {
  return column.fixed ? {style: {background: '#b7eb8f'}} : {};
};
const {sortList, handleSortClick} = useSort();
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