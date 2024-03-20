<template>
  <SidebarComponent />
  <iframe
    width="300%"
    height="300%"
    src="https://www.youtube.com/embed/OibFWbwve3Q?si=aBsh2yCUsBW8-P0G"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>
</template>
<style>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
<script lang="ts" setup>
import DepartmentsComponent from './DepartmentsComponent.vue'
import SidebarComponent from '@/components/SidebarComponent.vue'
import { reactive, ref } from 'vue'
import { useTokenStore } from '@/stores/modules/authentication/token'
import { API } from '@/services'
import type { InputLoginUser } from '@/services/users/types'
import { useUserStore } from '@/stores/modules/users'
import users from '@/services/users'
import RouteName from '@/routes/constants'
import { onMounted } from 'vue'
const stats = ref({})

// onMounted(() => {
//   // alert(store.token)
//   const response = API.stats.getStats()
//   response.then((data) => {
//     // console.log(data.data)
//     stats.value = data.data
//     // console.log(stats.value)
//   })
// })
const errors = ref({})

// const onSubmit = () => {
//   const data: InputLoginUser = { email: form.email, password: form.password }
//   const response = API.users.loginUser(data)
//   // console.log(response)
//   response.then((data) => {
//     store.set(data.data.token)
//     userStore.initUser(data.data.user)
//     router.push(Route.HOME_PAGE)
//   })
//   response.catch((data) => {
//     // console.log(data)
//     if (data.response.status == 422) {
//       errors.value = data.response.data['message']
//     }
//   })
// }
</script>
