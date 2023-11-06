<<<<<<< HEAD
import { createRouter, createWebHistory } from 'vue-router'
const childTabbarItems = [
  {
    name: '动态',
    icon: 'star-o',
    to: '/child/find'
  },
  {
    name: '学习',
    icon: 'records-o',
    to: '/child/study'
  },
  {
    name: '聊天',
    icon: 'chat-o',
    to: '/child/chat'
  },
  {
    name: '我的',
    icon: 'home-o',
    to: '/child/my'
  }
]
=======
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
declare module 'vue-router' {
  interface RouteMeta {
    showTabBar: boolean
    showTopBar: boolean
    title?: string
  }
}
>>>>>>> origin/main

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
    path: '/dynamic',
    name: 'dynamic',
    component: () => import('@/views/dynamic/DynamicPage.vue'),
    meta: {
      title: '动态',
      showTabBar: true,
      showTopBar: false
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
<<<<<<< HEAD
    path: '/testCard0', //有用，别删
    name: 'donate@1231313',
    component: () => import('@/views/donate/donate_my/donateHistoryCard0.vue'),
    meta: {
      showTabBar: false,
      showTopBar: false
    }
  },
  {
    path: '/testMy', //有用，别删
    name: 'donate@5243241',
    component: () => import('@/views/donate/donate_my/my.vue'),
    meta: {
      showTabBar: false,
      showTopBar: false
    }
  },
  {
    path: '/testDonateHistory',
    name: 'donate@45353',
    component: () => import('@/views/donate/donate_my/DonateHistory.vue'),
    meta: {
      showTabBar: false,
      showTopBar: false
=======
    path: '/test',
    name: 'test',
    component: () => import('@/views/TestPage.vue'),
    meta: {
      showTabBar: false,
      showTopBar: true
>>>>>>> origin/main
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
