import { http, HttpResponse, delay } from 'msw'

// Mock 数据 - 使用 let 以便修改
let users = [
  { id: '1', name: '高修文', password: '123456' },
  { id: '2', name: '熊天成', password: '123456' },
  { id: '3', name: '郑华', password: '123456' },
  { id: '4', name: '王文静', password: '123456' },
]

const projects = [
  { id: '1', name: '骑手管理', personId: '1', organization: '外卖组', created: 1604989757139 },
  { id: '2', name: '团购 APP', personId: '2', organization: '团购组', created: 1604989757139 },
  { id: '3', name: '物料管理系统', personId: '2', organization: '物料组', created: 1546300800000 },
  { id: '4', name: '总部管理系统', personId: '3', organization: '总部', created: 1604980000011 },
  { id: '5', name: '送餐路线规划系统', personId: '4', organization: '外卖组', created: 1546900800000 },
]

// 定义请求处理器 - 使用通配符匹配所有域名
export const handlers = [
  // 登录接口
  http.post('*/login', async ({ request }) => {
    console.log('[MSW] 拦截到登录请求')
    const { username, password } = await request.json() as { username: string; password: string }

    await delay(100) // 模拟网络延迟

    // 在 users 数组中查找匹配的用户
    const user = users.find(u => u.name === username && u.password === password)

    if (user) {
      return HttpResponse.json({
        user: { id: user.id, name: user.name, token: '123' }
      })
    }

    return HttpResponse.json(
      { message: '用户名或密码错误' },
      { status: 400 }
    )
  }),

  // 注册接口
  http.post('*/register', async ({ request }) => {
    console.log('[MSW] 拦截到注册请求')

    let body
    try {
      body = await request.json()
      console.log('[MSW] 注册请求参数:', body)
    } catch (e) {
      console.error('[MSW] 解析请求体失败:', e)
      return HttpResponse.json(
        { message: '请求格式错误' },
        { status: 400 }
      )
    }

    const { username, password } = body as { username: string; password: string }

    await delay(100)

    // 检查用户名是否已存在
    if (users.find(u => u.name === username)) {
      console.log('[MSW] 用户名已存在:', username)
      return HttpResponse.json(
        { message: '用户名已存在' },
        { status: 400 }
      )
    }

    if (username && password) {
      // 将新用户添加到数组中
      const newUser = { id: Date.now().toString(), name: username, password }
      users.push(newUser)
      console.log('[MSW] 用户注册成功，当前用户列表:', users.map(u => u.name))

      return HttpResponse.json({
        user: { id: newUser.id, name: newUser.name, token: '456' }
      })
    }

    console.log('[MSW] 注册失败: 用户名或密码为空')
    return HttpResponse.json(
      { message: '注册失败，请填写完整信息' },
      { status: 400 }
    )
  }),

  // 获取用户列表
  http.get('*/users', () => {
    return HttpResponse.json(users.map(({ password, ...rest }) => rest))
  }),

  // 验证当前用户（/me 接口）
  http.get('*/me', ({ request }) => {
    const authHeader = request.headers.get('Authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return HttpResponse.json(
        { message: '未登录' },
        { status: 401 }
      )
    }

    // 根据 token 找到对应用户（login 返回 '123'，register 返回 '456'）
    const userEntry = token === '123'
      ? users[0]
      : token === '456'
        ? users[users.length - 1]
        : null

    if (userEntry) {
      return HttpResponse.json({
        user: { id: userEntry.id, name: userEntry.name, token }
      })
    }

    return HttpResponse.json(
      { message: 'token 无效' },
      { status: 401 }
    )
  }),

  // 获取项目列表（支持查询参数）
  http.get('*/projects', ({ request }) => {
    const url = new URL(request.url)
    const name = url.searchParams.get('name')
    const personId = url.searchParams.get('personId')

    let filteredProjects = [...projects]

    if (name) {
      filteredProjects = filteredProjects.filter(p => p.name.includes(name))
    }

    if (personId) {
      filteredProjects = filteredProjects.filter(p => p.personId === personId)
    }

    return HttpResponse.json(filteredProjects)
  }),
]
