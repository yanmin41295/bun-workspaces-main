<template>
  <Input @blur="updateData" v-model="inputValue"></Input>
</template>
<script setup lang="ts">
import {Input} from 'ant-design-vue';
import {ref} from 'vue';
import {DataColumn} from "./table.js";

const props = defineProps<DataColumn<string>>()

const emit = defineEmits<{
  updateData: [value: string]
}>();
const inputValue = ref(props.data);

const updateData = () => {
};
</script>

<style scoped>
</style>