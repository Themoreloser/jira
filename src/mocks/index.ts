export async function initMocks() {
  if (typeof window !== 'undefined') {
    try {
      const { worker } = await import('./browser')

      // 启动 Service Worker
      await worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
          url: '/mockServiceWorker.js'
        }
      })

      console.log('[MSW] Mock 已启动，拦截地址:', 'http://localhost:3001')
    } catch (error) {
      console.error('[MSW] 初始化失败:', error)
    }
  }
}
