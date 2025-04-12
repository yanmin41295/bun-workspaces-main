<template>
  <VueCodemirror
    v-model:value="code"
    :options="cmOptions"
    :width="width"
    :height="height"
    :readonly="readonly"
    @ready="onReady"
    @blur="onInput"
  />
</template>

<script setup>
import { ref, computed, nextTick } from 'vue';
import VueCodemirror from 'codemirror-editor-vue3';

// 引入必要的 CSS 文件
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/idea.css';
import 'codemirror/mode/sql/sql.js';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/sql-hint';
import 'codemirror/addon/display/placeholder.js';

// 定义 props
const props = defineProps({
  readonly: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '300px',
  },
  placeholder: {
    type: String,
    default: 'SELECT * FROM log_table WHERE id > ${id}',
  },
});

// 定义响应式变量
const code = ref('');

// 配置 CodeMirror 选项
const cmOptions = computed(() => ({
  mode: 'text/x-sql',
  theme: 'idea',
  lineNumbers: true,
  lineWrapping: true,
  tabSize: 4,
  readOnly: props.readonly ? 'nocursor' : false,
  placeholder: props.placeholder,
  hintOptions: {
    completeSingle: false,
    tables: {
      BPSuv: ['DocEntry', 'Subject', 'DocStatus', 'Remarks'],
      BPSuvA: ['DocEntry', 'LineNum', 'Question', 'QstType'],
      BPSuvB: ['DocEntry', 'LineNum', 'UserID', 'UserName'],
    },
  },
}));

const emit = defineEmits();

// 处理输入事件
const onInput = () => {
  emit('changeTextarea', code.value);
};

// 初始化编辑器
const onReady = (editor) => {
  editor.on('inputRead', (cm, event) => {
    if (/[a-zA-Z]/.test(event.text[0])) {
    }
  });
  nextTick(() => {
    editor.refresh();
  });
};
</script>

<style>
.CodeMirror-hints {
  z-index: 9999 !important;
  position: absolute !important;
}
</style>
