<template>
  <RouterView v-slot="{ Component, route }">
    <keep-alive>
      <component :is="Component" :key="route.path" />
    </keep-alive>
  </RouterView>
  <RouterView />
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>