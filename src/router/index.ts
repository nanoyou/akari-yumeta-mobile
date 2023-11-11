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
    path: '/chat/:userID',
    name: 'chat_dialog',
    component: () => import('@/views/chat/ChatDialog.vue'),
    meta: {
      showTabBar: false,
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
    path: '/my_old',
    name: 'my_old',
    component: () => import('@/views/userInfo/UserInfoPage.vue'),
    meta: {
      title: '个人中心',
      showTabBar: true,
      showTopBar: false
    }
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('@/views/userInfo/MyPage.vue'),
    meta: {
      showTabBar: true,
      showTopBar: false
    }
  },
  {
    path: '/user/:userID',
    name: 'userinfo',
    component: () => import('@/views/userInfo/UserInfo.vue'),
    meta: {
      title: '个人主页',
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
    path: '/myStudyTask/:userId',
    name: 'myStudyTask',
    component: () => import('@/views/study/myTaskListPage.vue'),
    props: true,
    meta: {
      title: '学习任务列表',
      showTabBar: false,
      showTopBar: true
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
    path: '/study/dynamicDetail/:dynamicId',
    name: 'study_dynamicDetail',
    component: () => import('@/views/study/DynamicDetailPage.vue'),
    props: true,
    meta: {
      title: '动态详情',
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
    path: '/testmy',
    name: 'testmy',
    component: () => import('@/views/donate/donate_my/My.vue'),
    meta: {
      showTabBar: false,
      showTopBar: false
    }
  },
  {
    path: '/testDonateHistory',
    name: 'testDonateHistory',
    component: () => import('@/views/donate/donate_my/DonateHistory.vue'),
    meta: {
      showTabBar: false,
      showTopBar: true
    }
  },
  {
    path: '/find',
    name: 'find',
    component: () => import('@/views/find/FindPage.vue'),
    meta: {
      title: '发现',
      showTabBar: true,
      showTopBar: false
    }
  },
  {
    path: '/money/:userID',
    name: 'money',
    component: () => import('@/views/find/DonateMoney.vue'),
    meta: {
      title: '资助儿童',
      showTabBar: false,
      showTopBar: true
    }
  },
  {
    path: '/good/:goodID',
    name: 'good',
    component: () => import('@/views/find/DonateGoods.vue'),
    meta: {
      title: '捐赠物资',
      showTabBar: false,
      showTopBar: true
    }
  },
  {
    path: '/testChart',
    name: 'testChart',
    component: () => import('@/views/donate/donate_my/DonateChart.vue'),
    meta: {
      title: '发现',
      showTabBar: false,
      showTopBar: false
    }
  },
  {
    path: '/user',
    name: 'user_list',
    component: () => import('@/views/userList/UserList.vue'),
    meta: {
      title: '新朋友',
      showTabBar: false,
      showTopBar: true
    }
  },
  {
    path: '/GoodsProgress',
    name: 'GoodsProgress',
    component: () => import('@/views/donate/donate_my/GoodsProgress.vue'),
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
