<template>
  <PageContainer>
    <a-result
        :style="{
        height: '100%',
        background: '#fff',
      }"
        status="404"
        sub-title="Sorry, you are not authorized to access this page."
        title="Hello World"
    >
      <template #extra>
        <a-button type="primary" @click="handleClick">Back Home</a-button>
      </template>
    </a-result>
  </PageContainer>
</template>

<script lang="ts" setup>
import {message} from 'ant-design-vue';
import {PageContainer as PageContainer} from '@ant-design-vue/pro-layout';

const handleClick = () => {
  console.log('info');
  message.info('BackHome button clicked!');
};
</script>
