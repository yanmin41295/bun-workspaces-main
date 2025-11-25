<script setup lang="ts">
import {reactive, computed} from 'vue';
import type {ColumnType} from 'ant-design-vue/es/table/interface';

const emit = defineEmits({
  saveData(value: any) {
    return true;
  }
});
const props = defineProps<{
  text: any;
  value: any;
  record: Record<string, any>;
  index: number;
  column: ColumnType<any> & {
    viewTemplate?: string;  // 可选的视图模板名称
    editTemplate?: string;  // 可选的编辑模板名称
    editable?: boolean;  // 是否可编辑
    options?: Array<{label: string; value: any}>; // 选择项
    mode?: 'single' | 'multiple'; // 选择模式，默认为single
  };
}>();

const state = reactive({
  value: props.value
})

const isMultiple = computed(() => props.column.mode === 'multiple');

function saveData() {
  setTimeout(() => {
    emit('saveData', state.value);
  }, 100);
}

function handleChange(value: any) {
  state.value = value;
}
</script>

<template>
  <SaveEditor @saveData="saveData">
    <a-select 
      v-model:value="state.value" 
      @change="handleChange"
      :options="column.options"
      :mode="isMultiple ? 'multiple' : undefined"
      style="width: 100%"
    />
  </SaveEditor>
</template>

<style scoped>

</style>