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
    path: '/register',
    name: 'register',
    component: () => import('@/views/register/RegisterPage.vue'),
    meta: {
      showTabBar: false,
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
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
