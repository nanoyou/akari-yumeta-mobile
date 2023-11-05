import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
declare module 'vue-router' {
  interface RouteMeta {
    showTabBar: boolean
    showTopBar: boolean
    title?: string
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'layout',
    redirect: '/login',
    component: () => import('@/views/layout/LayoutContainer.vue'),
    children: []
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('@/views/chat/ChatPage.vue'),
    meta: {
      showTabBar: true,
      showTopBar: true,
      title: '聊天'
    }
  },
  {
    path: '/donate/find',
    name: 'donate_find',
    component: () => import('@/views/donate/donate-find/find.vue'),
    meta: {
      title: '动态',
      showTabBar: true,
      showTopBar: true,
      tabbarItems: [
        {
          name: '首页',
          icon: 'chat-o',
          to: '/donate/home'
        },
        {
          name: '发现',
          icon: 'search',
          to: '/donate/find'
        },
        {
          name: '我的',
          icon: 'user-o',
          to: '/donate/mine'
        }
      ]
    }
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('@/views/my/MyPage.vue'),
    meta: {
      title: '我的',
      showTabBar: true,
      showTopBar: false
    }
  },
  {
    path: '/study',
    name: 'study',
    component: () => import('@/views/study/StudyPage.vue'),
    meta: {
      title: '学习',
      showTabBar: true,
      showTopBar: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/LoginPage.vue'),
    meta: {
      showTabBar: false,
      showTopBar: false
    }
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/TestPage.vue'),
    meta: {
      showTabBar: false,
      showTopBar: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
