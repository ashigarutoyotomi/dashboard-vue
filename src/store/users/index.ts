import { defineStore } from 'pinia'
import { ref } from 'vue'
import { User } from '../../services/users/types'

export const useUserStore = defineStore('userStore', () => {
  const users = ref<User[]>([])

  function initUsers(data: User[]) {
    users.value = data
  }

  function removeUser(id: number) {
    const idx = users.value.findIndex((s) => s.id === id)
    if (idx === -1) return
    users.value.splice(idx, 1)
  }

  return {
    users,
    initUsers,
    removeUser
  }
})
