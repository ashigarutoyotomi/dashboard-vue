import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import EmployeesView from '../views/EmployeesView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },

    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/departments',
      name: 'departments',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/stats',
      name: 'stats',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/video',
      name: 'video',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/employees',
      name: 'employees',
      component: EmployeesView
    }
  ]
})

export default router
