<script setup lang="ts">
import {reactive, useTemplateRef} from 'vue';
import {onClickOutside} from '@vueuse/core';
import {logger} from "@/main";

const emit = defineEmits({
  saveData() {
    return true;
  }
});

const target = useTemplateRef<HTMLElement>('target');

function saveData() {
  emit('saveData');
}

onClickOutside(target, event => {
  saveData();
});
</script>

<template>
  <div ref="target">
    <!-- 具体的输入组件由子组件提供插槽 -->
    <slot :saveData="saveData">
    </slot>
  </div>
</template>