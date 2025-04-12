<template>
  <div>
    <div style="display: flex">
      <span v-for="item in sortList">
        <template v-if="item.direction ==='asc'">
          <SortAscendingOutlined @click="$emit('onSortClick',item)" />
        </template>
        <template v-else-if="item.direction==='desc'">
          <SortDescendingOutlined @click="$emit('onSortClick',item)" />
        </template>
        <ATag>{{ item.tag ?? item.name }}</ATag>
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons-vue';
import type { SortColumn } from '@/components/Notion/sort';

defineEmits({
  onSortClick: (item: SortColumn) => {
    return true;
  },
});

const { sortList } = defineProps<{
  sortList: SortColumn[];
}>();

</script>
<style scoped>

</style>