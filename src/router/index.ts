import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
declare module 'vue-router' {
  interface RouteMeta {
    showTabBar: boolean
    showTopBar: boolean
    title?: string
  }
}
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
  }]

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
      // tabbarItems: childTabbarItems
    }
  },
  {
    path: '/postDynamic',
    name: 'post_dynamic',
    component: () => import('@/views/child/find/PostDynamicPage.vue'),
    meta: {
      title: '发布动态',
      showTabBar: false,
      showTopBar: true,
    }
  },
  {
    path: '/child/study/taskDetail/:taskId',
    name: 'child_study_taskDetail',
    component: () => import('@/views/child/study/ChildTaskPage.vue'),
    props: true,
    meta: {
      title: '课程详情',
      showTabBar: false,
      showTopBar: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register/RegisterPage.vue'),
    meta: {
      title: '注册',
      showTabBar: false,
      showTopBar: true
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
