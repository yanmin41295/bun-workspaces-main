<template>
  <div>
    <AButton @click="addRow">添加行</AButton>
    <AButton @click="getUser">getUser</AButton>
    <STable :column-drag="tableConfig.columnDrag" :columns="stateData.columns" :custom-cell="customCell"
            :custom-header-cell="customHeaderCell"
            :data-source="stateData.dataSource" :pagination="false" :scroll="{ y: 800, x: 2000 }"
            :stripe="tableConfig.striped">
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
            <a-date-picker :ref="editorRef" :allow-clear="false" :bordered="false" :get-popup-container="getPopupContainer"
                           :value="dayjs(modelValue.value)" open style="width: 100%"
                           @blur="closeEditor"
                           @update:value="v => {modelValue.value = v?.format('YYYY-MM-DD') ?? '';save();}" @keydown.esc="closeEditor" @click.stop="closeEditor"
            ></a-date-picker>
          </template>
          <template v-else-if="column.dataIndex===col.dataIndex && col.editTemplate==='labels'">
            <!--            mode="multiple" 多选模式，只能选择已有的options，不支持新的option-->
            <a-select v-model:value="modelValue.value" :options="getOptions(col.name)" mode="tags"
                      style="width: 100%" @blur="()=>{closeEditor();save()}"/>
          </template>
        </template>
      </template>
    </STable>
    <a-pagination
        v-model:current="current"
        v-model:pageSize="pageSize"
        :page-size-options="pageSizeOptions"
        :total="total"
        show-size-changer
        style="margin-top: 30px; justify-content: flex-end; display: flex"
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
<script generic="C  extends  TableHeader,D extends TableData" lang="ts" setup>
import {useSort} from '@/components/Notion/sort';
import {STable} from '@surely-vue/table';
import {onBeforeMount, onMounted} from 'vue';
import {log, type TableData, type TableHeader} from "@/components/Notion/table";
import dayjs from "dayjs";
import {Random} from "mockjs";
import {userApi} from "@/api/controller.api";
import {User} from "@mono/common/src/prisma/interfaces.ts";


/*
*  文本、数字，选择，多选，复选框，状态、标签、日期、文件，图片，视频，音频，链接，操作，关联关系，富文本，
* */
async function getUser() {
  let user: User = await userApi.findByUserId({userId: "1"})
  console.log(user)
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