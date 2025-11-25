<template>
  <div class="table-configurator">
    <a-table :dataSource="state.dataSource" :columns="state.columns" :pagination="state.table.pagination"
             :bordered="state.table.bordered"
             :scroll="{ y: 1300 }"
             rowKey="id">
      <template #bodyCell="{ column, record, text,value, index }">
        <TableColumn :text="text" :value="value" :record="record" :index="index" :column="column"
                     @saveData="(newValue: any)=>handleSaveData(newValue, column, record)"
        />
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import {reactive} from 'vue';
import TableColumn from './TableColumn.vue';

function handleSaveData(value, column, record) {
  console.log('handleSaveData', value,)
  record[column.dataIndex] = value
}


const state = reactive({
  mode: 'read',
  table: {
    pagination: false,
    bordered: true
  },
  columns: [
    {
      title: '姓名',
      name: 'username',
      dataIndex: 'username',
      viewTemplate: 'string',
      editTemplate: 'StringEditor',
      editable: true,
      ellipsis: true,// 列宽自适应
      initValue: '',
      // resizable: true,
      childrenColumnName: 'children',
      fixed: 'left'
    },
    {
      title: '年龄',
      name: 'age',
      dataIndex: 'age',
      viewTemplate: 'CommonRead',
      editTemplate: 'StringEditor',
      editable: true,
      initValue: '',
    },
    {
      title: '生日',
      name: 'birthday',
      dataIndex: 'birthday',
      viewTemplate: 'CommonRead',
      editTemplate: 'DateEditor',
      options: {
        format: 'YYYY-MM-DD',
      },
      editable: true,
      initValue: '',

    },
    {
      title: '性别',
      name: 'gender',
      dataIndex: 'gender',
      viewTemplate: 'string',
      editTemplate: 'StringEditor',
      editable: true,
      initValue: '',
      options: [
        {
          label: '男',
          value: 'male',
        },
        {
          label: '女',
          value: 'female',
        },
      ],
    },
    {
      title: '工作',
      name: 'jobs',
      dataIndex: 'jobs',
      viewTemplate: 'string',
      editTemplate: 'SelectEditor',
      editable: true,
      initValue: '',
      options: [
        {label: '前端开发', value: '前端开发'},
        {label: '后端开发', value: '后端开发'}
      ],
    }, {
      title: '书籍',
      name: 'books',
      dataIndex: 'books',
      viewTemplate: 'string',
      editTemplate: 'SelectEditor',
      editable: true,
      initValue: '',
      options: [
        {label: 'html', value: 'html'},
        {label: 'css', value: 'css'},
        {label: 'js', value: 'js'},
      ],
      mode: 'multiple',
    }, {
      title: '是否启用',
      name: 'isEnabled',
      dataIndex: 'isEnabled',
      viewTemplate: 'CommonRead',
      editTemplate: 'SwitchEditor',
      editable: true,
      initValue: false,
    }
  ] as TableHeader[],
  dataSource:
      [
        {
          id: 1,
          username: '张三',
          age: 25,
          birthday: '2000-01-01',
          gender: 'male',
          jobs: '前端开发',
          isEnabled: true,
          books: ['html', 'css']
        }
      ] as any[],
})

</script>

<style scoped>
.table-configurator {
  padding: 16px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
}
</style>