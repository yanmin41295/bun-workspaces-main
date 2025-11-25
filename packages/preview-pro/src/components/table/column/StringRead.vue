<script setup lang="ts">
import type { ColumnType } from 'ant-design-vue/es/table/interface';

defineProps<{
  text: any;
  value: any;
  record: Record<string, any>;
  index: number;
  column: ColumnType<any>;
}>();
</script>

<template>
  <span>{{ value }}</span>
</template>

<style scoped>

</style>