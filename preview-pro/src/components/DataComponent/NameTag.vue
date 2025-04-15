<template>
  <ATag @click="$emit('enterEdit',props)">{{ props.name }}</ATag>
</template>
<script setup lang="ts" generic="P">
const props = defineProps<{ name: string }>();
const emit = defineEmits({
  enterEdit: (data: T) => true
})
</script>
<style scoped>

</style>