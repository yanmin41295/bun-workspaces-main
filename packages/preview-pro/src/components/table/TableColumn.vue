<script setup lang="ts">
import type {BodyCellType} from "../../types";
import {EditComponentMap, ReadComponentMap} from "@/components/table/table.index";

const props = defineProps<BodyCellType<{
  viewTemplate?: string;  // 可选的视图模板名称
  editTemplate?: string;  // 可选的编辑模板名称
  editable?: boolean;  // 是否可编辑
}>>();
const emit = defineEmits({
  saveData(value: any) {
    return true;
  }
});
const state = reactive({
  mode: 'read',
})


function saveData(value: any) {
  console.log('saveData', value)
  emit('saveData', value);
  state.mode = 'read';
}
</script>

<template>
  <div @dblclick="()=>{props.column.editable && (state.mode = 'edit')}">
    <template v-if="state.mode === 'read'">
      <component
          :is="ReadComponentMap[column.viewTemplate]"
          :text="props.text"
          :column="props.column"
          :record="props.record"
          :index="props.index"
          :value="props.value"
          v-if="ReadComponentMap[column.viewTemplate]"
      />
      <span v-else>{{ props.value }}</span>
    </template>
    <template v-if="state.mode ==='edit'">
      <component
          :is="EditComponentMap[column.editTemplate]"
          :text="props.text"
          :column="props.column"
          :record="props.record"
          :index="props.index"
          :value="props.value"
          @saveData="saveData"
          v-if="EditComponentMap[column.editTemplate]"
      />
      <span v-else>{{ props.value }}</span>
    </template>
  </div>
</template>
<style scoped>
</style>