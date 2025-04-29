<template>
  <vue-monaco-editor
      v-model:value="code"
      theme="vs-dark"
      language="typescript"
      style="height: 100px; width: 1000px;"
      :options="MONACO_EDITOR_OPTIONS"
      @mount="handleMount"
  />
  <json-viewer
      :value="message"
      :expand-depth=5
      copyable
      boxed
      sort></json-viewer>
  <button @click="startSaveLog">保存日志</button>
  <button @click="findUser">获取用户信息</button>
</template>

<script lang="ts" setup>
import {ref, shallowRef} from 'vue'
import VueMonacoEditor from '@guolao/vue-monaco-editor'
import {format} from 'date-fns';
import {userApi} from "@/api/controller.api";
import {v4 as uuidv4} from 'uuid';
import JsonViewer from 'vue-json-viewer'

const message = ref('');

async function findUser() {
  let user = await userApi.findByUserId({userId: "1"})
  console.log('findUser' + JSON.stringify(user))
}

function startSaveLog() {
  websocket?.send(JSON.stringify({
    action: 'log.startSaveLog',
    taskId: uuidv4(),
    taskName: '保存日志',
    msgType: 'init',
    interactId: 0,
    timeStr: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
  }))
}

const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
}

const code = ref('// some code...')
const editor = shallowRef()
const handleMount = editorInstance => (editor.value = editorInstance)

// your action
function formatCode() {
  editor.value?.getAction('editor.action.formatDocument').run()
}
</script>