<script setup lang="ts">
import {reactive, useTemplateRef} from 'vue';
import {onClickOutside} from "@vueuse/core";

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

const state = reactive({
  value: props.value
})

const target = useTemplateRef<HTMLElement>('target');
onClickOutside(target, event => {
  saveData();
});

function saveData() {
  emit('saveData', state.value);
}
</script>
<template>
  <SaveEditor @saveData="saveData">
    <a-input v-model:value="state.value" @keyup.enter="saveData"/>
  </SaveEditor>
</template>

<style scoped>

</style>