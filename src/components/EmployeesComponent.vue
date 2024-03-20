<template>
  <SidebarComponent />
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
</template>

<script lang="ts" setup>
import SidebarComponent from '@/components/SidebarComponent.vue'
import { reactive, ref } from 'vue'
import axios from 'axios'
import router from '@/router'
import { useTokenStore } from '@/stores/modules/authentication'
import { API } from '@/services'
import type { InputLoginUser } from '@/services/users/types'
import { useUserStore } from '@/stores/modules/users'
import users from '@/services/users'
import Route from '@/router/constants'
import { onMounted } from 'vue'
const store = useTokenStore()
const userStore = useUserStore()
const form = reactive<AuthForm>({
  email: '',
  password: '',
  user: {
    name: '',
    email: '',
    password: ''
  }
})

const tableData = reactive<Array<string>>([])
onMounted(() => {
  const response = API.employees.getEmployees()
  response.then((data) => {
    tableData = data.data
    // console.log(data.data)
  })
})
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
