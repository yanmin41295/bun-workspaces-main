<script setup lang="ts">
const props = defineProps<{
  text: any;
  value: any;
  record: Record<string, any>;
  index: number;
  column: any;
}>();


</script>

<template>
  <!-- 具体的输入组件由子组件提供插槽 -->
  <slot :props="props">
    {{ props.value }}
  </slot>
</template>
