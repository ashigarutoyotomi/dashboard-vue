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
      path: '/about',
      name: RouteName.ABOUT_PAGE,
      component: () => import('../views/AboutView.vue')
    },

    {
      path: '/register',
      name: RouteName.REGISTER_PAGE,
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/departments',
      name: RouteName.DEPARTMENTS_PAGE,
      component: () => import('../views/DepartmentsView.vue')
    },
    {
      path: '/stats',
      name: RouteName.STATS_PAGE,
      component: () => import('../views/StatsView.vue')
    },
    {
      path: '/video',
      name: RouteName.VIDEO_PAGE,
      component: () => import('../views/VideoView.vue')
    },
    {
      path: '/employees',
      name: RouteName.EMPLOYEES_PAGE,
      component: () => import('../views/EmployeesView.vue')
    },
    {
      path: '/employees/store',
      name: RouteName.EMPLOYEES_STORE,
      component: () => import('../views/EmployeesStoreView.vue')
    }
  ]
})

export default router
