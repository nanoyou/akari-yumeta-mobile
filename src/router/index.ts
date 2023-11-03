import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: () => import('@/views/layout/LayoutContainer.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/HomePage.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/LoginPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
