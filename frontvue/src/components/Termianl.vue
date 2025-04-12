<script setup lang="ts">
import {Terminal, TerminalApi, type Message} from 'vue-web-terminal';


function execute(commandKey: string, command: string, success: (message: any) => void, failed: (message: any) => void, name: string) {
  console.log(commandKey + ' ' + command)
  success([{content: 'hello'}, {content: 'world'}])
}

</script>

<template>
  <terminal name="my-terminal" @exec-cmd="execute"></terminal>
</template>

<style scoped>

</style>