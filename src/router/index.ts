import { createRouter, createWebHistory } from 'vue-router'
import { RouteName } from '@/router/constants'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteName.LOGIN_PAGE,
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/home',
      name: RouteName.HOME_PAGE,
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/register',
      name: RouteName.REGISTER_PAGE,
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/departments',
      name: RouteName.DEPARTMENTS_PAGE,
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/stats',
      name: RouteName.STATS_PAGE,
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/video',
      name: RouteName.VIDEO_PAGE,
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/employees',
      name: RouteName.EMPLOYEES_PAGE,
      component: () => import('../views/EmployeesView.vue')
    }
  ]
})

export default router
