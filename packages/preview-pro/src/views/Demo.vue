<template>
  <PageContainer>
    <a-card title="文件上传">
      <a-form :model="formState" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
        <a-form-item label="选择文件">
          <a-upload
            v-model:file-list="fileList"
            :multiple="true"
            :before-upload="beforeUpload"
            :max-count="10"
          >
            <a-button>
              <upload-outlined></upload-outlined>
              选择文件
            </a-button>
          </a-upload>
        </a-form-item>
        
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="handleUpload" :loading="uploading" :disabled="fileList.length === 0">
            {{ uploading ? '上传中...' : '上传文件' }}
          </a-button>
        </a-form-item>
      </a-form>
      
      <a-card title="已上传文件" v-if="uploadedFiles.length > 0">
        <a-list :data-source="uploadedFiles">
          <template #renderItem="{ item }">
            <a-list-item>
              <a-list-item-meta :title="item.filename">
                <template #description>
                  <p>路径: {{ item.filepath }}</p>
                </template>
              </a-list-item-meta>
              <template #actions>
                <a :href="`/api/file/download/${encodeURIComponent(item.filename)}`" target="_blank">下载</a>
              </template>
            </a-list-item>
          </template>
        </a-list>
      </a-card>
    </a-card>
  </PageContainer>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { message } from 'ant-design-vue';
import { PageContainer } from '@ant-design-vue/pro-layout';
import { UploadOutlined } from '@ant-design/icons-vue';
import type { UploadFile, UploadProps } from 'ant-design-vue';

interface FormState {
  fileList: UploadFile[];
}

interface UploadedFile {
  filename: string;
  filepath: string;
}

const formState = reactive<FormState>({
  fileList: [],
});

const fileList = ref<UploadFile[]>([]);
const uploading = ref<boolean>(false);
const uploadedFiles = ref<UploadedFile[]>([]);

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  // 不自动上传，由我们手动控制
  return false;
};

const handleUpload = async () => {
  if (fileList.value.length === 0) {
    message.warning('请选择要上传的文件');
    return;
  }

  const formData = new FormData();
  fileList.value.forEach((file) => {
    formData.append('files', file as any);
  });

  uploading.value = true;
  
  try {
    const response = await fetch('/api/file/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      message.success('文件上传成功');
      
      // 如果后端返回的是单个文件信息
      if (result.data && result.data.filename) {
        uploadedFiles.value.push(result.data);
      }
      
      // 清空文件列表
      fileList.value = [];
    } else {
      const errorResult = await response.json();
      message.error(`上传失败: ${errorResult.error || '未知错误'}`);
    }
  } catch (error) {
    message.error(`上传过程中发生错误: ${error}`);
  } finally {
    uploading.value = false;
  }
};
</script>