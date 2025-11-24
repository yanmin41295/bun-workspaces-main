<script setup lang="ts">
import { reactive } from 'vue';
import { logger } from "@/main";
import CommonEditorTsx from './CommonEditor.vue';
import type { ColumnType } from 'ant-design-vue/es/table/interface';

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
logger.info(props)

const state = reactive({
  data: props.value
})
</script>

<template>
  <CommonEditor :value="props.value" @saveData="()=>emit('saveData', state.data)" :text="props.text"
                :column="props.column" :index="props.index" :record="props.record">
    <template #default="{ state, text, column, index, record, saveData }">
      <a-switch v-model:checked="state.value" @change="saveData"/>
    </template>
  </CommonEditor>
</template>

<style scoped>

</style>