import { defineStore } from 'pinia'
import { ref } from 'vue'
import { User } from '../../services/users/types'

export const useUserStore = defineStore('userStore', () => {
  const user = ref<User[]>([])

  function initUser(data: User[]) {
    user.value = data
  }
  function flushUser() {
    user.value = 
  }
  // function removeUser(id: number) {
  //   const idx = user.value.findIndex((s) => s.id === id)
  //   if (idx === -1) return
  //   user.value.splice(idx, 1)
  // }
  return {
    user,
    initUser
  }
})
