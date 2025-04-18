<template>
  <RouterView v-slot="{ Component, route }">
    <keep-alive>
      <component :is="Component" :key="route.path"/>
    </keep-alive>
  </RouterView>
</template>
<script lang="ts" setup>
import {RouterView} from 'vue-router';
</script>