<script setup lang="ts">
import {useCounter} from '@vueuse/core'

const {count, inc, dec, get, reset} = useCounter(0)
import Terminal, {FailedFunc, SuccessFunc} from "vue-web-terminal";
import {TerminalApi} from 'vue-web-terminal';
import {taskSocket} from "@/api/api.base";
import {Task} from "@mono/common/src/api/model/task";

const terminalName = 'my-terminal'
let running = false

const onExecCmd = (key: string, command: string, success: SuccessFunc, failed: FailedFunc) => {
  console.log(`key: ${key} command: ${command}`)
  if (key === 'fail') {
    failed('Something wrong!!!')
  } else {
    let allClass = ['success', 'error', 'system', 'info', 'warning'];
    let clazz = allClass[Math.floor(Math.random() * allClass.length)];
    taskSocket.startTask(new Task({
      name: 'executeCommand',
      description: 'executeCommand',
      status: 'init',
      data: {command: command}
    }), (task: Task) => {
      console.log(`output: ${task.data.output} message: ${task.data.message}`)
      if (task.status === 'finish') {
        success({
          type: 'normal',
          class: clazz as TerminalMessageClass,
          tag: clazz,
        })
        running = false
      } else if (task.status === 'running') {
        running = true
        TerminalApi.pushMessage(terminalName, task.data.message)
      }
    })
  }
}

const dragConf = reactive<DragConfig>({
  width: "80%",
  height: "70%",
  zIndex: 100,
  init: {
    x: 200,
    y: 200
  },
  pinned: false
})

function onKeydown(e: KeyboardEvent, name: string) {
  if (e.ctrlKey && e.key === 'c') {
    console.log(`keydown: ${e.ctrlKey} ${e.key}`)
    if (!running) {
      TerminalApi.setCommand(terminalName, "")
    } else {

    }
  }
}

function sendCommand(message: string) {
  taskSocket.startTask(new Task({
    name: 'executeCommand',
    description: 'executeCommand',
    status: 'init',
    data: {command: 'dir'}
  }), (task: Task) => {
    console.log(`stdout: ${task.data.stdout} message: ${task.data.message}`)
    TerminalApi.pushMessage(terminalName, {
      type: 'normal',
      class: 'info',
      tag: 'info',
      content: task.data.stdout || task.data.stderr || ''
    })
  })

}


</script>

<template>
  <div>
    <Terminal :name="terminalName" theme="dark" @exec-cmd="onExecCmd" :drag-conf="dragConf" @onKeydown="onKeydown">
      <template #normal="{ message }">
        <pre>{{ message.content }}</pre>
      </template>
    </Terminal>
  </div>
</template>

<style scoped>
.terminal-container {
  width: 100%;
  height: 400px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
</style>