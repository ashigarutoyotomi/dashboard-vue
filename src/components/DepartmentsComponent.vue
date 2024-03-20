<template>
  <SidebarComponent />
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="id" label="#" width="" />
    <el-table-column prop="name" label="Name" width="" />
    <el-table-column prop="created_at" label="Created" />
    <el-table-column prop="updated_at" label="Updated" />
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
  const response = API.departments.getDepartments()
  response.then((data) => {
    // console.log(data.data)
    let departments = data.data
    for (let department of departments) {
      tableData.push(department)
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
