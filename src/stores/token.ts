import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore('token', () => {
  const token = ref('')
  function set(token: string) {
    token.value = token
  }
  function flush() {
    token.value = ''
  }

  return { token, flush, set }
})
