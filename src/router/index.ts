import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'layout',
    redirect: '/login',
    component: () => import('@/views/layout/LayoutContainer.vue')
  },
  {
    path: '/child',
    name: 'child',
    component: () => import('@/views/child/ChildHomePage.vue'),
    meta: {
      showTabBar: true,
      showTopBar: true,
      title: '儿童',
      tabbarItems: [
        {
          name: '首页',
          icon: 'home-o',
          to: '/child'
        },
        {
          name: '页面2',
          icon: 'home-o',
          to: '/sponsor'
        },
        {
          name: '页面3 ',
          icon: 'home-o',
          to: '/volunteer'
        }
      ]
    }
  },
  {
    path: '/donate/find',
    name: 'donate_find',
    component: () => import('@/views/donate/donate-find/find.vue'),
    meta: {
      showTabBar: true,
      showTopBar: true,
      title: '发现',
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
    path: '/register',
    name: 'register',
    component: () => import('@/views/register/RegisterPage.vue'),
    meta: {
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
