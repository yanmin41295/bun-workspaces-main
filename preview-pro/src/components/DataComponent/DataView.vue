<template>
  <template v-if="viewMode">
    <slot name="viewComponent" :onSwitchMode="()=>$emit('enterEdit',false)"></slot>
  </template>
  <template v-else>
    <slot name="editComponent"></slot>
  </template>
</template>
<script setup lang="ts" generic="Data extends object">

interface Props<Data extends object> {
  data: Data
}

const {dataType: string, data: D, viewTemplate} = defineProps<Props<Data>>();


console.log(`data ${JSON.stringify(data)}`);
const viewMode = ref<boolean>(true);
defineEmits({
  enterEdit: (data: T) => true
})

function switchMode(data: T, mode: boolean) {
  console.log(`viewMode ${mode} ${JSON.stringify(data)}`);
  viewMode.value = mode
}
</script>

<style scoped>

</style>