import './assets/main.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import axios from 'axios'
import { useTokenStore } from './stores/token'
import Route from './shares/const/Route'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(createPinia())
const store = useTokenStore()
axios.defaults.baseURL = import.meta.env.VITE_API_ENDPOINT
axios.interceptors.request.use((config) => {
  const token = store.token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Redirect to login page
        router.push(Route.LOGIN_PAGE)
      }
    }
    return Promise.reject(error)
  }
)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
