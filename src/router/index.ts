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
      showTopBar: false,
      title: '聊天'
    }
  },
  {
    path: '/dynamic',
    name: 'dynamic',
    component: () => import('@/views/dynamic/CheckDynamicPage.vue'),
    meta: {
      title: '动态',
      showTabBar: true,
      showTopBar: false
    }
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('@/views/userInfo/UserInfoPage.vue'),
    meta: {
      title: '个人中心',
      showTabBar: true,
      showTopBar: false
    }
  },
  {
    path: '/study',
    name: 'study',
    component: () => import('@/views/study/ChildStudyPage.vue'),
    meta: {
      title: '学习',
      showTabBar: true,
      showTopBar: false
    }
  },
  {
    path: '/postDynamic',
    name: 'post_dynamic',
    component: () => import('@/views/dynamic/PostDynamicPage.vue'),
    meta: {
      title: '发布动态',
      showTabBar: false,
      showTopBar: true
    }
  },
  {
    path: '/study/taskDetail/:taskId',
    name: 'study_taskDetail',
    component: () => import('@/views/study/ChildTaskPage.vue'),
    props: true,
    meta: {
      title: '课程详情',
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
    path: '/find',
    name: 'find',
    component: () => import('@/views/find/FindPage.vue'),
    meta: {
      title: '发现',
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
