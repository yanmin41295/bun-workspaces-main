<template>
  <page-container :tabList="tabList" sub-title="show current project dependencies" title="Version">
    <template #content>
      <ATag>{{ counter }}</ATag>
    </template>
    <template #extra>
      <strong>Extra Area</strong>
    </template>
    <template #extraContent>
      <strong>ExtraContent Area</strong>
    </template>
    <template #tags>
      <a-tag>Tag1</a-tag>
      <a-tag color="pink">Tag2</a-tag>
    </template>
    <a-card title="Project Version">
      <p v-for="(dep, key) in dependencies" :key="key">
        <strong style="margin-right: 12px">{{ key }}:</strong>
        <a-tag>{{ dep }}</a-tag>
      </p>
    </a-card>
  </page-container>
</template>

<script lang="ts" setup>
import {useInterval} from '@vueuse/core';

const counter = useInterval(2000);


const tabList = ref([
  {
    key: '1',
    tab: 'Tab 1',
  },
  {
    key: '2',
    tab: 'Tab 2',
  },
]);
</script>
