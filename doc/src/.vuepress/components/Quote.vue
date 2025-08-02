<template>
  <div>
    <h2>每日一言</h2>
    <p v-if="loading">加载中...</p>
    <p v-else-if="error">{{ error }}</p>
    <div v-else>
      <p>{{ quote.content }}</p>
      <p>—— {{ quote.source }}</p>
    </div>
    <Button @click="fetchQuote" type="primary">Dashed Button</Button>
  </div>
</template>

<script setup>
import "ant-design-vue/es/button/style"
import {ref, onMounted} from 'vue';
import {Button} from 'ant-design-vue';

const loading = ref(true);
const error = ref(null);
const quote = ref({content: '', source: ''});
const fetchQuote = async () => {
  try {
    const response = await fetch(
        'https://api.apiopen.top/api/sentences'
    );

    if (!response.ok) {
      throw new Error('无法获取每日一言数据');
    }

    const data = await response.json();
    quote.value = {
      content: data.result.name,
      source: data.result.from,
    };
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchQuote();
});
</script>

<style scoped>


/* 可添加样式 */
</style>