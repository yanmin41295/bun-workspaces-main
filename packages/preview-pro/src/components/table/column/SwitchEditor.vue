<script setup lang="ts">
import {reactive} from 'vue';
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
  };
}>();

const state = reactive({
  value: props.value
})

</script>

<template>
  <SaveEditor @saveData=" ()=>emit('saveData', state.value)">
    <a-switch v-model:checked="state.value" @change="(value: boolean)=>state.value = value"/>
  </SaveEditor>
</template>

<style scoped>

</style>