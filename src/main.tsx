import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { initMocks } from './mocks'
import { AppProviders } from './context/index.tsx'
// 初始化 Mock 后渲染应用
async function bootstrap() {
  // 开发环境下启用 Mock
  if (import.meta.env.DEV) {
    try {
      await initMocks()
      console.log('[App] Mock 初始化完成')
    } catch (error) {
      console.error('[App] Mock 初始化失败:', error)
    }
  }

  createRoot(document.getElementById('root')!).render(
   <AppProviders>
<StrictMode>
      <App />
    </StrictMode>
   </AppProviders>
   
  )
}

bootstrap()

