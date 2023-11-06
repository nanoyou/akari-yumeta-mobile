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
    path: '/sponsor',
    name: 'sponsor',
    component: () => import('@/views/sponsor/SponsorHomePage.vue'),
    meta: {
      showTabBar: true,
      showTopBar: true,
      title: '捐助者',
      tabbarItems: [
        {
          name: '首页',
          icon: 'home-o',
          to: '/sponsor'
        },
        {
          name: '退出登录 ',
          icon: 'close',
          to: '/login'
        }
      ]
    }
  },
  {
    path: '/volunteer',
    name: 'volunteer',
    component: () => import('@/views/volunteer/VolunteerHomePage.vue'),
    meta: {
      showTabBar: true,
      showTopBar: true,
      title: '志愿者',
      tabbarItems: [
        {
          name: '首页',
          icon: 'home-o',
          to: '/volunteer'
        },
        {
          name: '退出登录 ',
          icon: 'close',
          to: '/login'
        }
      ]
    }
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('@/views/chat/ChildChatPage.vue'),
    meta: {
      showTabBar: true,
      showTopBar: false,
      title: '聊天',
      tabbarItems: childTabbarItems
    }
  },
  {
    path: '/dynamic',
    name: 'dynamic',
    component: () => import('@/views/Dynamic/CheckDynamicPage.vue'),
    meta: {
      title: '动态',
      showTabBar: true,
      showTopBar: false,
      tabbarItems: childTabbarItems
    }
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('@/views/userInfo/UserInfoPage.vue'),
    meta: {
      title: '个人中心',
      showTabBar: true,
      showTopBar: false,
      tabbarItems: childTabbarItems
    }
  },
  {
    path: '/study',
    name: 'study',
    component: () => import('@/views/study/ChildStudyPage.vue'),
    meta: {
      title: '学习',
      showTabBar: true,
      showTopBar: false,
      // tabbarItems: childTabbarItems
      tabbarItems: childTabbarItems
    }
  },
  {
    path: '/postDynamic',
    name: 'post_dynamic',
    component: () => import('@/views/Dynamic/PostDynamicPage.vue'),
    meta: {
      title: '发布动态',
      showTabBar: false,
      showTopBar: true,
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
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
