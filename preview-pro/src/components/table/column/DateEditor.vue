<script setup lang="ts">
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

function saveData() {
  setTimeout(() => {
    emit('saveData', state.value)
  }, 100)
}
</script>
<template>
  <CommonEditor :value="props.value" :text="props.text" :column="props.column" :index="props.index"
                :record="props.record" @saveData="saveData">
    <template #default="{ saveData,column }">
      <a-date-picker v-model:value="state.value" :value-format="column.options.format"/>
    </template>
  </CommonEditor>
</template>

<style scoped>

</style>