import pino from 'pino'

// 创建自定义的格式化函数
const prettyPrint = {
  customPrettifiers: {
    time: (timestamp) => `[${timestamp}]`,
    level: (level) => `[${level.toUpperCase()}]`
  },
  translateTime: 'yyyy-mm-dd HH:MM:ss',
  ignore: 'pid,hostname',
  messageFormat: '{msg}',
  colorize: true
}
export const logger = pino({
  level: 'info'
})