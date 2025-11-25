<template>
  <div class="table-configurator">
    <a-tabs v-model:activeKey="activeTab">
      <a-tab-pane key="columns" tab="列配置">
        <a-table :dataSource="columns" :pagination="false" :scroll="{ y: 300 }" rowKey="id">
          <a-table-column title="列名" data-index="title">
            <template #default="{ record }">
              <a-input v-model:value="record.title" size="small"/>
            </template>
          </a-table-column>

          <a-table-column title="数据索引" data-index="dataIndex">
            <template #default="{ record }">
              <a-input v-model:value="record.dataIndex" size="small"/>
            </template>
          </a-table-column>

          <a-table-column title="数据类型" data-index="dataType">
            <template #default="{ record }">
              <a-select
                  v-model:value="record.dataType"
                  size="small"
                  style="width: 100%"
                  :options="dataTypeOptions"
                  @change="dataType => onDataTypeChange(record, dataType)"
              />
            </template>
          </a-table-column>

          <a-table-column title="显示模板" data-index="viewTemplate">
            <template #default="{ record }">
              <a-select
                  v-model:value="record.viewTemplate"
                  size="small"
                  style="width: 100%"
                  :options="getViewTemplateOptions(record.dataType)"
              />
            </template>
          </a-table-column>

          <a-table-column title="编辑模板" data-index="editTemplate">
            <template #default="{ record }">
              <a-select
                  v-model:value="record.editTemplate"
                  size="small"
                  style="width: 100%"
                  :options="getEditTemplateOptions(record.dataType)"
              />
            </template>
          </a-table-column>

          <a-table-column title="操作" fixed="right" width="150px">
            <template #default="{ record }">
              <a-space>
                <a-button type="link" size="small" @click="moveUp(record)">上移</a-button>
                <a-button type="link" size="small" @click="moveDown(record)">下移</a-button>
                <a-popconfirm
                    title="确定要删除这一列吗？"
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="removeColumn(record)"
                >
                  <a-button type="link" danger size="small">删除</a-button>
                </a-popconfirm>
              </a-space>
            </template>
          </a-table-column>
        </a-table>

        <div style="margin-top: 16px;">
          <a-button type="primary" @click="addColumn">添加列</a-button>
        </div>
      </a-tab-pane>

      <a-tab-pane key="preview" tab="预览">
        <a-table
            :dataSource="previewData"
            :columns="configuredColumnsWithTemplates"
            :pagination="false"
            :scroll="{ y: 300 }"
        >
          <template #bodyCell="{ column, record, text }">
            <!-- 字符串类型 -->
            <template v-if="column.dataType === 'string'">
              <a-input
                  v-if="column.dataIndex && column.editTemplate === 'input'"
                  v-model:value="record[column.dataIndex]"
                  style="width: 100%"
              />
              <a-textarea
                  v-else-if="column.dataIndex && column.editTemplate === 'textarea'"
                  v-model:value="record[column.dataIndex]"
                  style="width: 100%"
              />
              <template v-else>{{ text }}</template>
            </template>

            <!-- 数字类型 -->
            <template v-else-if="column.dataType === 'number'">
              <a-input-number
                  v-if="column.dataIndex && column.editTemplate === 'number'"
                  v-model:value="record[column.dataIndex]"
                  style="width: 100%"
              />
              <template v-else>{{ text }}</template>
            </template>

            <!-- 布尔值类型 -->
            <template v-else-if="column.dataType === 'boolean'">
              <a-switch
                  v-if="column.dataIndex && column.editTemplate === 'switch'"
                  v-model:checked="record[column.dataIndex]"
              />
              <a-checkbox
                  v-else-if="column.dataIndex && column.editTemplate === 'checkbox'"
                  v-model:checked="record[column.dataIndex]"
              />
              <template v-else>{{ text }}</template>
            </template>

            <!-- 日期类型 -->
            <template v-else-if="column.dataType === 'date'">
              <a-date-picker
                  v-if="column.dataIndex && column.editTemplate === 'date'"
                  v-model:value="record[column.dataIndex]"
                  value-format="YYYY-MM-DD"
                  style="width: 100%"
              />
              <template v-else>{{ text }}</template>
            </template>

            <!-- 时间类型 -->
            <template v-else-if="column.dataType === 'time'">
              <a-time-picker
                  v-if="column.dataIndex && column.editTemplate === 'time'"
                  v-model:value="record[column.dataIndex]"
                  style="width: 100%"
              />
              <template v-else>{{ text }}</template>
            </template>

            <!-- 日期时间类型 -->
            <template v-else-if="column.dataType === 'datetime'">
              <a-date-picker
                  v-if="column.dataIndex && column.editTemplate === 'datetime'"
                  v-model:value="record[column.dataIndex]"
                  show-time
                  value-format="YYYY-MM-DD HH:mm:ss"
                  style="width: 100%"
              />
              <template v-else>{{ text }}</template>
            </template>

            <!-- 标签类型 -->
            <template v-else-if="column.dataType === 'label'">
              <a-select
                  v-if="column.dataIndex && column.editTemplate === 'select'"
                  v-model:value="record[column.dataIndex]"
                  style="width: 100%"
                  :options="column.options || []"
              />
              <template v-else>{{ text }}</template>
            </template>

            <!-- 多标签类型 -->
            <template v-else-if="column.dataType === 'labels'">
              <a-select
                  v-if="column.dataIndex && column.editTemplate === 'multi-select'"
                  v-model:value="record[column.dataIndex]"
                  mode="multiple"
                  style="width: 100%"
                  :options="column.options || []"
              />
              <template v-else>{{ text }}</template>
            </template>

            <!-- 自定义类型 -->
            <template v-else-if="column.dataType === 'custom'">
              <!-- 自定义显示 -->
              <span v-if="column.viewTemplate === 'custom-tag'">
                <a-tag>{{ text }}</a-tag>
              </span>
              <span v-else-if="column.viewTemplate === 'custom-badge'">
                <a-badge :count="text"/>
              </span>
              <span v-else>{{ text }}</span>

              <!-- 自定义编辑 -->
              <a-input
                  v-if="column.dataIndex && column.editTemplate === 'custom-input'"
                  v-model:value="record[column.dataIndex]"
                  style="width: 100%"
              />
              <a-slider
                  v-else-if="column.dataIndex && column.editTemplate === 'custom-slider'"
                  v-model:value="record[column.dataIndex]"
                  :min="0"
                  :max="100"
              />
              <a-rate
                  v-else-if="column.dataIndex && column.editTemplate === 'custom-rate'"
                  v-model:value="record[column.dataIndex]"
              />
              <template v-else>{{ text }}</template>
            </template>

            <!-- 默认情况 -->
            <template v-else>{{ text }}</template>
          </template>
        </a-table>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, reactive} from 'vue';
import type {TableHeader} from './Notion/table';

const activeTab = ref('columns');

// 数据类型选项
const dataTypeOptions = [
  {label: '字符串', value: 'string'},
  {label: '数字', value: 'number'},
  {label: '布尔值', value: 'boolean'},
  {label: '日期', value: 'date'},
  {label: '时间', value: 'time'},
  {label: '日期时间', value: 'datetime'},
  {label: '标签', value: 'label'},
  {label: '多标签', value: 'labels'},
  {label: '自定义', value: 'custom'}
];

// 获取显示模板选项
const getViewTemplateOptions = (dataType: string) => {
  switch (dataType) {
    case 'string':
      return [
        {label: '文本', value: 'string'}
      ];
    case 'number':
      return [
        {label: '数字', value: 'number'}
      ];
    case 'boolean':
      return [
        {label: '布尔值', value: 'boolean'}
      ];
    case 'date':
      return [
        {label: '日期', value: 'date'}
      ];
    case 'time':
      return [
        {label: '时间', value: 'time'}
      ];
    case 'datetime':
      return [
        {label: '日期时间', value: 'datetime'}
      ];
    case 'label':
      return [
        {label: '标签', value: 'label'}
      ];
    case 'labels':
      return [
        {label: '多标签', value: 'labels'}
      ];
    case 'custom':
      return [
        {label: '默认', value: 'custom-default'},
        {label: '标签', value: 'custom-tag'},
        {label: '徽标', value: 'custom-badge'}
      ];
    default:
      return [
        {label: '默认', value: 'default'}
      ];
  }
};

// 获取编辑模板选项
const getEditTemplateOptions = (dataType: string) => {
  switch (dataType) {
    case 'string':
      return [
        {label: '输入框', value: 'input'},
        {label: '文本域', value: 'textarea'}
      ];
    case 'number':
      return [
        {label: '数字输入框', value: 'number'}
      ];
    case 'boolean':
      return [
        {label: '开关', value: 'switch'},
        {label: '复选框', value: 'checkbox'}
      ];
    case 'date':
      return [
        {label: '日期选择器', value: 'date'}
      ];
    case 'time':
      return [
        {label: '时间选择器', value: 'time'}
      ];
    case 'datetime':
      return [
        {label: '日期时间选择器', value: 'datetime'}
      ];
    case 'label':
    case 'select':
    case 'dict':
      return [
        {label: '下拉选择', value: 'select'}
      ];
    case 'labels':
      return [
        {label: '多选下拉', value: 'multi-select'}
      ];
    case 'custom':
      return [
        {label: '输入框', value: 'custom-input'},
        {label: '滑块', value: 'custom-slider'},
        {label: '评分', value: 'custom-rate'}
      ];
    default:
      return [
        {label: '默认', value: 'default'}
      ];
  }
};

// 数据类型改变时的处理函数
const onDataTypeChange = (record: TableHeader, dataType: string) => {
  // 根据新的数据类型设置默认的显示和编辑模板
  const viewOptions = getViewTemplateOptions(dataType);
  const editOptions = getEditTemplateOptions(dataType);

  if (viewOptions.length > 0) {
    record.viewTemplate = viewOptions[0].value as string;
  }

  if (editOptions.length > 0) {
    record.editTemplate = editOptions[0].value as string;
  }
};

// 列配置数据
const columns = ref<TableHeader[]>([
  {
    id: 'name',
    name: 'name',
    dataIndex: 'name',
    dataType: 'string',
    viewTemplate: 'string',
    editTemplate: 'input',
    editable: true,
    initValue: '',
    title: '姓名',
  },
  {
    id: 'age',
    dataIndex: 'age',
    dataType: 'number',
    viewTemplate: 'number',
    editTemplate: 'number',
    name: 'age',
    initValue: 0,
    editable: true,
    title: '年龄',
  },
  {
    id: 'birthday',
    dataIndex: 'birthday',
    dataType: 'date',
    viewTemplate: 'date',
    editTemplate: 'date',
    initValue: '',
    name: 'birthday',
    editable: true,
    title: '生日',
  },
  {
    id: 'isActive',
    dataIndex: 'isActive',
    dataType: 'boolean',
    viewTemplate: 'boolean',
    editTemplate: 'switch',
    name: 'isActive',
    initValue: false,
    editable: true,
    title: '是否激活',
  },
  {
    id: 'score',
    dataIndex: 'score',
    dataType: 'custom',
    viewTemplate: 'custom-tag',
    editTemplate: 'custom-slider',
    name: 'score',
    initValue: 0,
    editable: true,
    title: '评分',
  }
]);

// 预览数据
const previewData = reactive([
  {key: '1', name: '张三', age: 25, birthday: '1990-01-01', isActive: true, score: 80},
  {key: '2', name: '李四', age: 30, birthday: '1985-05-12', isActive: false, score: 90}
]);

// 计算属性：用于预览的列配置（带模板信息）
const configuredColumnsWithTemplates = computed(() => {
  return columns.value.map(col => ({
    title: col.title,
    dataIndex: col.dataIndex,
    key: col.id,
    dataType: col.dataType,
    viewTemplate: col.viewTemplate,
    editTemplate: col.editTemplate,
    options: col.options
  }));
});

// 添加列
const addColumn = () => {
  const newColumn: TableHeader = {
    id: `column_${Date.now()}`,
    name: `column_${Date.now()}`,
    dataIndex: '',
    dataType: 'string',
    viewTemplate: 'string',
    editTemplate: 'input',
    editable: true,
    initValue: '',
    title: '新列'
  };
  columns.value.push(newColumn);
};

// 删除列
const removeColumn = (record: TableHeader) => {
  const index = columns.value.findIndex(col => col.id === record.id);
  if (index > -1) {
    columns.value.splice(index, 1);
  }
};

// 上移
const moveUp = (record: TableHeader) => {
  const index = columns.value.findIndex(col => col.id === record.id);
  if (index > 0) {
    const temp = columns.value[index];
    columns.value[index] = columns.value[index - 1];
    columns.value[index - 1] = temp;
  }
};

// 下移
const moveDown = (record: TableHeader) => {
  const index = columns.value.findIndex(col => col.id === record.id);
  if (index < columns.value.length - 1) {
    const temp = columns.value[index];
    columns.value[index] = columns.value[index + 1];
    columns.value[index + 1] = temp;
  }
};

// 暴露给父组件的方法
defineExpose({
  getColumns: () => columns.value,
  setColumns: (newColumns: TableHeader[]) => {
    columns.value = newColumns;
  }
});
</script>

<style scoped>
.table-configurator {
  padding: 16px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
}
</style>