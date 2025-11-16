<template>
  <PageContainer>
    <a-card title="文件上传">
      <a-upload v-model:file-list="fileList" :multiple="true" :max-count="10" :custom-request="customRequest" list-type="text">
        <a-button>
          <upload-outlined></upload-outlined>
          选择文件
        </a-button>
        <template #itemRender="{ file, actions }">
          <div class="file-item">
            <div class="file-info">
              <span class="file-name">{{ file.name }}</span>
              <div class="file-status">
                <span v-if="file.status === 'uploading'" class="progress-text">
                  {{ file.percent ? Math.round(file.percent) + '%' : '0%' }}
                </span>
                <span v-if="file.status === 'done'" class="status-success">上传成功</span>
                <span v-if="file.status === 'error'" class="status-error">上传失败</span>
              </div>
            </div>
            <div class="file-actions">
              <a-button type="text" size="small" @click="actions.remove" v-if="file.status !== 'uploading'">
                删除
              </a-button>
            </div>
          </div>
        </template>
      </a-upload>
    </a-card>

    <a-card title="文件列表" style="margin-top: 16px;">
      <a-button type="primary" @click="fetchFileList" style="margin-bottom: 16px;">刷新列表</a-button>
      <a-table 
        :data-source="fileListData" 
        :columns="columns" 
        :pagination="{ pageSize: 10 }"
        :scroll="{ x: true }"
        :loading="loading"
        @change="handleTableChange"
        :row-key="record => record.id"
        :expandable="{ 
          childrenColumnName: 'children',
          expandRowByClick: true
        }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'size'">
            {{ formatFileSize(record.size) }}
          </template>
          <template v-else-if="column.dataIndex === 'uploadTime'">
            {{ formatDate(record.uploadTime) }}
          </template>
          <template v-else-if="column.dataIndex === 'tag'">
            <div @dblclick="startEdit(record, 'tag')" style="cursor: pointer;">
              <template v-if="editingKey === record.id && editingField === 'tag'">
                <a-input v-model:value="record.tag" @blur="saveEdit(record)" @keydown.enter="saveEdit(record)" style="width: 100px; margin-right: 8px;" />
              </template>
              <template v-else>
                {{ record.tag || '双击编辑' }}
              </template>
            </div>
          </template>
          <template v-else-if="column.dataIndex === 'description'">
            <div @dblclick="startEdit(record, 'description')" style="cursor: pointer;">
              <template v-if="editingKey === record.id && editingField === 'description'">
                <a-input v-model:value="record.description" @blur="saveEdit(record)" @keydown.enter="saveEdit(record)" style="width: 150px; margin-right: 8px;" />
              </template>
              <template v-else>
                {{ record.description || '双击编辑' }}
              </template>
            </div>
          </template>
        </template>
      </a-table>
    </a-card>
  </PageContainer>
</template>

<script lang="ts" setup>
import {ref, onMounted, h} from 'vue';
import {message, Modal} from 'ant-design-vue';
import {PageContainer} from '@ant-design-vue/pro-layout';
import {UploadOutlined} from '@ant-design/icons-vue';
import type {UploadFile, UploadProps} from 'ant-design-vue';
import type {TableProps} from 'ant-design-vue';

// 使用 FileEntity 接口
interface FileEntity {
  id: number;
  originFileName: string;
  size: number;
  md5: string;
  uploadTime: Date | string;
  type: 'file' | 'dir';
  tag: string;
  description: string;
  filepath: string;
  filename: string;
  // 解压后的文件列表
  children?: FileEntity[];
  hasChildren?: boolean;
  // 文件扩展名
  extension?: string;
}

const fileList = ref<UploadFile[]>([]);
const fileListData = ref<FileEntity[]>([]);
const loading = ref<boolean>(false);
const editingKey = ref<number>(0);
const editingField = ref<string>('');
const editingRecord = ref<FileEntity | null>(null);

// 表格列定义
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '文件名称',
    dataIndex: 'originFileName',
    key: 'originFileName',
    customRender: ({ record }: { record: FileEntity }) => {
      return h('span', record.originFileName + (record.type === 'dir' ? '/' : ''));
    }
  },
  {
    title: '路径',
    dataIndex: 'filepath',
    key: 'filepath',
  },
  {
    title: '标签',
    dataIndex: 'tag',
    key: 'tag',
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: '大小',
    dataIndex: 'size',
    key: 'size',
  },
  {
    title: '上传时间',
    dataIndex: 'uploadTime',
    key: 'uploadTime',
  },
  {
    title: '扩展名',
    dataIndex: 'originFileName',
    key: 'extension',
    customRender: ({ record }: { record: FileEntity }) => {
      if (record.type === 'dir') {
        return h('span', '-');
      }
      const parts = record.originFileName.split('.');
      const extension = parts.length > 1 ? parts[parts.length - 1] : '-';
      return h('span', extension ? `.${extension}` : '-');
    }
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
  },
];

const customRequest: UploadProps['customRequest'] = (options) => {
  const { file, onProgress, onSuccess, onError } = options;
  const formData = new FormData();
  formData.append('file', file as any);

  const xhr = new XMLHttpRequest();

  // 上传进度回调 - 适配 XMLHttpRequest 的 onprogress 事件
  xhr.upload.onprogress = (event) => {
    // 检查事件是否包含长度信息
    if (event.lengthComputable) {
      // 计算上传进度百分比
      const percent = Math.round((event.loaded / event.total) * 100);
      // 调用 Ant Design Vue 的 onProgress 回调更新进度显示
      onProgress!({ percent });
      
      // 在控制台输出进度，方便调试
      console.log(`${file.name} 上传进度: ${percent}%`);
    }
  };

  // 上传完成回调
  xhr.onload = () => {
    console.log('Upload response status:', xhr.status);
    console.log('Upload response text:', xhr.responseText);
    
    if (xhr.status === 200) {
      try {
        const result = JSON.parse(xhr.responseText);
        console.log('Parsed response:', result);
        
        if (result.code === 0) {
          onSuccess!(result);
          
          // 添加到已上传文件列表
          if (result.data) {
            const data = Array.isArray(result.data) ? result.data : [result.data];
            fileListData.value.push(...data);
          }
          
          message.success(`${file.name} 上传成功`);
        } else {
          onError!(new Error(result.message));
          message.error(`${file.name} 上传失败: ${result.message}`);
        }
      } catch (e) {
        console.error('Parse error:', e);
        onError!(new Error('解析响应失败'));
        message.error(`${file.name} 上传失败: 解析响应失败`);
      }
    } else {
      onError!(new Error(`上传失败: ${xhr.status}`));
      message.error(`${file.name} 上传失败: ${xhr.status}`);
    }
  };

  // 上传错误回调
  xhr.onerror = () => {
    console.error('Network error during upload');
    onError!(new Error('网络错误'));
    message.error(`${file.name} 上传失败: 网络错误`);
  };

  xhr.open('POST', '/api/file/upload');
  xhr.send(formData);
  
  // 返回一个 abort 函数，允许取消上传
  return {
    abort() {
      xhr.abort();
    }
  };
};

// 格式化文件大小
const formatFileSize = (size: number): string => {
  if (size < 1024) {
    return size + ' B';
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + ' KB';
  } else if (size < 1024 * 1024 * 1024) {
    return (size / (1024 * 1024)).toFixed(2) + ' MB';
  } else {
    return (size / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  }
};

// 格式化日期
const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleString('zh-CN');
};

// 处理表格变化（如分页、排序等）
const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
  console.log('表格变化:', pagination, filters, sorter);
};

// 开始编辑
const startEdit = (record: FileEntity, field: string) => {
  editingKey.value = record.id;
  editingField.value = field;
  // 保存原始记录用于取消编辑时恢复
  editingRecord.value = {...record};
};

// 保存编辑
const saveEdit = async (record: FileEntity) => {
  try {
    const response = await fetch(`/api/file/update/${record.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tag: record.tag,
        description: record.description
      })
    });
    
    const result = await response.json();
    if (result.code === 0) {
      message.success('保存成功');
      editingKey.value = 0;
      editingField.value = '';
      editingRecord.value = null;
    } else {
      message.error('保存失败: ' + result.message);
    }
  } catch (error) {
    message.error('保存失败: ' + (error as Error).message);
  }
};

// 显示删除确认对话框
const showDeleteConfirm = (record: FileEntity) => {
  Modal.confirm({
    title: '确认删除',
    content: `确定要删除文件 "${record.originFileName}" 吗？此操作不可恢复。`,
    okText: '确认',
    okType: 'danger',
    cancelText: '取消',
    onOk: () => deleteFile(record)
  });
};

// 删除文件
const deleteFile = async (record: FileEntity) => {
  try {
    const response = await fetch(`/api/file/delete/${record.id}`, {
      method: 'DELETE'
    });
    
    const result = await response.json();
    if (result.code === 0) {
      message.success('删除成功');
      // 从列表中移除该文件
      if (record.children) {
        // 如果是子节点，从父节点中移除
        const parent = findParent(fileListData.value, record.id);
        if (parent && parent.children) {
          parent.children = parent.children.filter(item => item.id !== record.id);
        }
      } else {
        // 如果是根节点，直接从列表中移除
        fileListData.value = fileListData.value.filter(item => item.id !== record.id);
      }
    } else {
      message.error('删除失败: ' + result.message);
    }
  } catch (error) {
    message.error('删除失败: ' + (error as Error).message);
  }
};

// 查找父节点
const findParent = (nodes: FileEntity[], id: number): FileEntity | null => {
  for (const node of nodes) {
    if (node.children) {
      if (node.children.some(child => child.id === id)) {
        return node;
      }
      const found = findParent(node.children, id);
      if (found) {
        return found;
      }
    }
  }
  return null;
};

// 解压文件
const extractFile = async (record: FileEntity) => {
  try {
    const response = await fetch(`/api/file/extract/${record.id}`);
    const result = await response.json();
    
    if (result.code === 0) {
      message.success('解压成功');
      // 将解压后的文件作为子节点添加到当前记录
      record.children = result.data;
      record.hasChildren = result.data && result.data.length > 0;
      
      // 标记为已解压
      record.tag = 'extracted';
      
      // 更新文件列表数据以触发界面更新
      const index = fileListData.value.findIndex(item => item.id === record.id);
      if (index !== -1) {
        fileListData.value[index] = {...fileListData.value[index]};
      }
    } else {
      message.error('解压失败: ' + result.message);
    }
  } catch (error) {
    message.error('解压失败: ' + (error as Error).message);
  }
};

// 加载已解压的文件
const loadExtractedFiles = async (record: FileEntity) => {
  try {
    const response = await fetch(`/api/file/extracted/${record.id}`);
    const result = await response.json();
    
    if (result.code === 0) {
      // 将解压后的文件作为子节点添加到当前记录
      record.children = result.data;
      record.hasChildren = result.data && result.data.length > 0;
      
      // 更新文件列表数据以触发界面更新
      const index = fileListData.value.findIndex(item => item.id === record.id);
      if (index !== -1) {
        fileListData.value[index] = {...fileListData.value[index]};
      }
    } else {
      message.error('加载解压文件失败: ' + result.message);
    }
  } catch (error) {
    message.error('加载解压文件失败: ' + (error as Error).message);
  }
};

// 获取文件列表
const fetchFileList = async () => {
  loading.value = true;
  try {
    const response = await fetch('/api/file/list');
    const result = await response.json();
    
    if (result.code === 0) {
      fileListData.value = result.data;
    } else {
      message.error('获取文件列表失败: ' + result.message);
    }
  } catch (error) {
    message.error('获取文件列表失败: ' + (error as Error).message);
  } finally {
    loading.value = false;
  }
};

// 组件挂载时获取文件列表
onMounted(() => {
  fetchFileList();
});

// 判断是否为 ZIP 文件
const isZipFile = (record: FileEntity): boolean => {
  if (record.type === 'dir') return false;
  const extension = record.originFileName.split('.').pop()?.toLowerCase();
  return extension === 'zip';
};

</script>

<style scoped>
.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.file-info {
  display: flex;
  align-items: center;
  flex: 1;
}

.file-name {
  margin-right: 12px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-status {
  min-width: 60px;
  text-align: right;
}

.progress-text {
  color: #1890ff;
  font-weight: 500;
}

.status-success {
  color: #52c41a;
}

.status-error {
  color: #ff4d4f;
}

.file-actions {
  margin-left: 12px;
}
</style>