<template>
  <button @click="count++">{{ count }}</button>
</template>
<script lang="ts" setup>
import {ref} from 'vue';

const count = ref(0);
</script>
<style scoped>

</style>