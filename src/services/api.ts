import axios from 'axios'
import { useTokenStore } from '@/stores/token'
import router from '@/router'
import Route from '@/shares/const/Route'
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

instance.defaults.baseURL = import.meta.env.VITE_API_URL

instance.interceptors.response.use(
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

instance.interceptors.request.use((config) => {
  const store = useTokenStore()
  const token = store.token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
export default instance
