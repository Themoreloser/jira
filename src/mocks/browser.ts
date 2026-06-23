import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// 创建 Service Worker 实例
export const worker = setupWorker(...handlers)
