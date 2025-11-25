<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import 'xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'

const terminalContainer = ref<HTMLElement | null>(null)
let terminal: Terminal | null = null
let fitAddon: FitAddon | null = null
let commandHistory: string[] = []
let historyIndex = -1
let websocket: WebSocket | null = null
let isConnected = false
let reconnectAttempts = 0
let reconnectTimer: number | null = null
const maxReconnectAttempts = 5
const reconnectInterval = 3000

// 初始化终端
function initTerminal() {
  if (!terminalContainer.value) return

  // 创建终端实例
  terminal = new Terminal({
    cursorBlink: true,
    theme: {
      background: '#2d2d2d',
      foreground: '#ffffff',
      cursor: '#ffffff'
    },
    fontSize: 14,
    lineHeight: 1.2,
    fontFamily: 'Consolas, Monaco, monospace'
  })

  // 加载自适应插件
  fitAddon = new FitAddon()
  terminal.loadAddon(fitAddon)

  // 打开终端并附加到DOM元素
  terminal.open(terminalContainer.value)

  // 自适应容器大小
  fitAddon.fit()

  // 添加欢迎信息
  terminal.writeln('Welcome to Web Terminal!')
  terminal.writeln('Type "help" to see available commands.')
  terminal.writeln('Type "connect" to connect to backend.')
  terminal.write('$ ')

  // 监听键盘输入
  terminal.onData((data) => {
    handleInput(data)
  })
}

// 初始化WebSocket连接
function initWebSocket() {
  // 清除之前的重连定时器
  if (reconnectTimer) {
    clearTimeout(reconnectTimer)
    reconnectTimer = null
  }

  if (isConnected) {
    terminal?.writeln('Already connected to backend.')
    return
  }

  try {
    // 连接到后端WebSocket服务
    websocket = new WebSocket('ws://localhost:3000/ws')
    
    websocket.onopen = () => {
      isConnected = true
      reconnectAttempts = 0
      terminal?.writeln('Connected to backend successfully!')
      terminal?.write('$ ')
    }
    
    websocket.onmessage = (event) => {
      // 处理从后端收到的消息
      const data = event.data
      // 直接写入数据，保持原始格式
      terminal?.write(data)
    }
    
    websocket.onclose = () => {
      isConnected = false
      terminal?.writeln('\nDisconnected from backend.')
      
      // 如果不是主动断开连接，尝试重连
      if (reconnectAttempts < maxReconnectAttempts) {
        reconnectAttempts++
        terminal?.writeln(`Reconnecting... (attempt ${reconnectAttempts}/${maxReconnectAttempts})`)
        reconnectTimer = window.setTimeout(() => {
          initWebSocket()
        }, reconnectInterval)
      } else {
        terminal?.writeln('Max reconnection attempts reached. Please check your connection and try again.')
      }
    }
    
    websocket.onerror = (error) => {
      terminal?.writeln(`\nWebSocket error: ${error}`)
      // 发生错误时关闭连接，触发重连机制
      if (websocket) {
        websocket.close()
      }
    }
  } catch (error) {
    isConnected = false
    terminal?.writeln(`Failed to connect to backend: ${error}`)
    
    // 连接失败时尝试重连
    if (reconnectAttempts < maxReconnectAttempts) {
      reconnectAttempts++
      terminal?.writeln(`Reconnecting... (attempt ${reconnectAttempts}/${maxReconnectAttempts})`)
      reconnectTimer = window.setTimeout(() => {
        initWebSocket()
      }, reconnectInterval)
    } else {
      terminal?.writeln('Max reconnection attempts reached. Please check your connection and try again.')
    }
  }
}

// 发送命令到后端
function sendCommandToBackend(command: string) {
  if (!isConnected || !websocket) {
    terminal?.writeln('Error: Not connected to backend. Type "connect" to establish connection.')
    terminal?.write('$ ')
    return
  }
  
  try {
    websocket.send(command)
  } catch (error) {
    terminal?.writeln(`Failed to send command: ${error}`)
    terminal?.write('$ ')
  }
}

// 处理输入
function handleInput(input: string) {
  if (!terminal) return

  const code = input.charCodeAt(0)
  
  // 处理特殊按键
  if (code === 13) { // Enter
    const command = (terminal as any).buffer.active.cursorX > 2 ? 
      getCurrentLine().substring(2) : ''
    
    if (command.trim()) {
      commandHistory.push(command)
      historyIndex = commandHistory.length
    }
    
    terminal.write('\r\n')
    executeCommand(command)
    // 只有在本地执行命令时才显示提示符，远程命令由后端处理
    if (!isConnected || !command.trim()) {
      terminal.write('$ ')
    }
  } else if (code === 127) { // Backspace
    const buffer = (terminal as any).buffer.active
    if (buffer.cursorX > 2) { // 不删除提示符
      terminal.write('\b \b')
    }
  } else if (code === 27) { // ESC序列 (方向键等)
    // 简单处理上下方向键 (历史命令)
    if (input === '\x1b[A') { // 上箭头
      if (commandHistory.length > 0) {
        if (historyIndex > 0) historyIndex--
        fillCommand(commandHistory[historyIndex] || '')
      }
    } else if (input === '\x1b[B') { // 下箭头
      if (commandHistory.length > 0) {
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++
          fillCommand(commandHistory[historyIndex] || '')
        } else {
          historyIndex = commandHistory.length
          fillCommand('')
        }
      }
    }
  } else if (code >= 32 && code <= 126) { // 可打印字符
    terminal.write(input)
  }
}

// 获取当前行内容
function getCurrentLine(): string {
  if (!terminal) return ''
  
  const buffer = (terminal as any).buffer.active
  const line = buffer.getLine(buffer.cursorY)
  if (!line) return ''
  
  let lineText = ''
  for (let i = 0; i < line.length; i++) {
    const cell = line.getCell(i)
    if (cell) {
      lineText += cell.getChars()
    }
  }
  return lineText
}

// 填充命令到终端
function fillCommand(command: string) {
  if (!terminal) return
  
  // 清除当前行 (除了提示符)
  const buffer = (terminal as any).buffer.active
  const currentLength = buffer.cursorX - 2
  for (let i = 0; i < currentLength; i++) {
    terminal.write('\b \b')
  }
  
  // 写入新命令
  terminal.write(command)
}

// 执行命令
function executeCommand(command: string) {
  if (!terminal) return
  
  const trimmedCmd = command.trim()
  if (!trimmedCmd) {
    terminal.write('$ ')
    return
  }

  switch (trimmedCmd) {
    case 'help':
      terminal.writeln('Available commands:')
      terminal.writeln('  help        - Show this help message')
      terminal.writeln('  clear       - Clear the terminal screen')
      terminal.writeln('  date        - Display current date and time')
      terminal.writeln('  echo        - Display a message')
      terminal.writeln('  welcome     - Show welcome message')
      terminal.writeln('  connect     - Connect to backend via WebSocket')
      terminal.writeln('  disconnect  - Disconnect from backend')
      terminal.writeln('  status      - Show WebSocket connection status')
      terminal.write('$ ')
      break
    case 'clear':
      terminal.clear()
      terminal.write('$ ')
      break
    case 'date':
      terminal.writeln(new Date().toString())
      terminal.write('$ ')
      break
    case 'welcome':
      terminal.writeln('Welcome to Web Terminal!')
      terminal.writeln('This is a terminal emulator built with xterm.js for Vue.')
      terminal.write('$ ')
      break
    case 'connect':
      // 重置重连尝试次数
      reconnectAttempts = 0
      initWebSocket()
      break
    case 'disconnect':
      // 清除重连定时器
      if (reconnectTimer) {
        clearTimeout(reconnectTimer)
        reconnectTimer = null
      }
      reconnectAttempts = 0
      
      if (websocket) {
        websocket.close()
        websocket = null
        isConnected = false
        terminal.writeln('\nDisconnected from backend.')
      } else {
        terminal.writeln('Not connected to backend.')
      }
      terminal.write('$ ')
      break
    case 'status':
      if (isConnected) {
        terminal.writeln('WebSocket connection: Connected')
      } else {
        terminal.writeln('WebSocket connection: Disconnected')
        terminal.writeln(`Reconnection attempts: ${reconnectAttempts}/${maxReconnectAttempts}`)
      }
      terminal.write('$ ')
      break
    default:
      if (trimmedCmd.startsWith('echo ')) {
        terminal.writeln(trimmedCmd.substring(5))
        terminal.write('$ ')
      } else if (isConnected) {
        // 如果已连接到后端，则发送命令到后端执行
        sendCommandToBackend(trimmedCmd)
        // 不在这里添加提示符，由后端在命令执行结束后添加
      } else {
        terminal.writeln(`Command not found: ${trimmedCmd}. Type "help" for available commands.`)
        terminal.writeln('Hint: Use "connect" to connect to backend for remote command execution.')
        terminal.write('$ ')
      }
      break
  }
}

// 自适应终端大小
function handleResize() {
  if (fitAddon) {
    fitAddon.fit()
  }
}

onMounted(() => {
  initTerminal()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (terminal) {
    terminal.dispose()
  }
  if (websocket) {
    websocket.close()
  }
  // 清除重连定时器
  if (reconnectTimer) {
    clearTimeout(reconnectTimer)
  }
})
</script>

<template>
  <div class="terminal-container" ref="terminalContainer"></div>
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