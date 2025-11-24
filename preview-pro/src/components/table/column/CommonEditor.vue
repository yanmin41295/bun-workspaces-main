<script setup lang="ts">
import {reactive, useTemplateRef} from 'vue';
import {onClickOutside} from '@vueuse/core';
import {logger} from "@/main";

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
  column: any;
}>();
logger.info(props)
const state = reactive({
  value: props.value
});

const target = useTemplateRef<HTMLElement>('target');

function saveData() {
  console.log('ColumnEditor.vue click outside', state.value);
  emit('saveData', state.value);
}


onClickOutside(target, event => {
  saveData();
});
</script>

<template>
  <div ref="target">
    <!-- 具体的输入组件由子组件提供插槽 -->
    <slot :text="props.text" :value="props.value" :record="props.record" :index="props.index"
          :column="props.column" :saveData="saveData">
    </slot>
  </div>
</template>