<template>
  <SidebarComponent />
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="sex" label="Sex" width="" />
    <el-table-column prop="first_name" label="First name" width="" />
    <el-table-column prop="last_name" label="Last name" />
    <el-table-column prop="mid_name" label="Mid name" />
    <el-table-column prop="age" label="Age" />
    <el-table-column prop="bday" label="Bday" />
    <el-table-column prop="department" label="Department" />
    <el-table-column prop="employeed_day" label="Employeed dat" />
    <el-table-column prop="fired_day" label="Fired day" />
    <el-table-column prop="status" label="Status" />
    <el-table-column prop="file_id" label="Image" />
  </el-table>
</template>

<script lang="ts" setup>
import SidebarComponent from '@/components/SidebarComponent.vue'
import { reactive, ref } from 'vue'
import { useTokenStore } from '@/stores/modules/authentication/token'
import { API } from '@/services'
import type { InputLoginUser } from '@/services/users/types'
import { useUserStore } from '@/stores/modules/users'
import users from '@/services/users'
import RouteName from '@/routes/constants'
import { onMounted } from 'vue'
const store = useTokenStore()
const userStore = useUserStore()
let tableData: Array<string> = reactive([])

onMounted(() => {
  // alert(store.token)
  const response = API.employees.getEmployees()
  response.then((data) => {
    // console.log(data.data)
    let employees = data.data
    for (let employee of employees) {
      tableData.push(employee)
    }
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
