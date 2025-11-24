<script setup lang="ts">
import {reactive} from 'vue';
import {logger} from "@/main";
import CommonEditor from './CommonEditor.vue';

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
  column: ColumnType & {
    viewTemplate?: string;  // 可选的视图模板名称
    editTemplate?: string;  // 可选的编辑模板名称
    editable?: boolean;  // 是否可编辑
  };
}>();
logger.info(props)

const state = reactive({
  value: props.value
})
</script>

<template>
  <CommonEditor :value="props.value" @saveData="()=>emit('saveData', state.value)" :text="props.text"
                :column="props.column" :index="props.index" :record="props.record">
    <template #default="{   saveData }">
      <a-input v-model:value="state.value" @keyup.enter="saveData"/>
    </template>
  </CommonEditor>
</template>

<style scoped>

</style>