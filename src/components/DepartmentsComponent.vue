<template>
  <SidebarComponent />
  <el-table :data="departments" stripe style="width: 100%">
    <el-table-column prop="id" label="#" width="" />
    <el-table-column prop="name" label="Name" width="" />
    <el-table-column prop="created_at" label="Created" />
    <el-table-column prop="updated_at" label="Updated" />
    <el-table-column label="Actions">
      <template #default="scope">
        <el-button type="warning" size="small" @click="handleGoToEditDepartment(scope.row)"
          >Edit</el-button
        >
        <el-button type="danger" size="small" @click="deleteDepartment(scope.row)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <DialogEditDepartment
    v-if="showDialogEditDepartment"
    v-model:show-dialog="showDialogEditDepartment"
    :department="department"
    @close="handlegoCloseDialogDepartment"
  ></DialogEditDepartment>
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
import { ElMessage } from 'element-plus'
import type { Department } from '@/services/departments/types'
import DialogEditDepartment from '@/components/DialogEditDepartment.vue'
const store = useTokenStore()
const userStore = useUserStore()
const departments = ref<Department[]>([])
const department = ref<Department | null>(null)
const showDialogEditDepartment = ref<boolean>(false)
onMounted(() => {
  // alert(store.token)
  const response = API.departments.getDepartments()
  response.then((data) => {
    // console.log(data.data)
    let departmentsList = data.data
    departments.value = departmentsList
  })
})
const errors = ref({})

const deleteDepartment = (id: number) => {
  API.departments.deleteDepartment(id.id)
  departments.value = departments.value.filter((department) => {
    return department.id != id.id
  })
  ElMessage.success('Delete department id: ' + id.id)
}
const confirmEvent = (id) => {
  deleteDepartment(id)
}

const handleGoToEditDepartment = (departmentData: Department) => {
  department.value = departmentData
  showDialogEditDepartment.value = true
}
const handlegoCloseDialogDepartment = () => {
  department.value = null
  showDialogEditDepartment.value = false
}
</script>
