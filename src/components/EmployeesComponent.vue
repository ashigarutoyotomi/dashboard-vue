<template>
  <SidebarComponent />
  <router-link :to="{ name: RouteName.EMPLOYEES_STORE }">
    <el-button type="primary" plain>Create new employee</el-button></router-link
  >
  <el-table :data="employees" stripe style="width: 100%">
    <el-table-column prop="id" label="#" />
    <el-table-column prop="sex" label="Sex" width="" />
    <el-table-column prop="first_name" label="First name" width="" />
    <el-table-column prop="last_name" label="Last name" />
    <el-table-column prop="mid_name" label="Mid name" />
    <el-table-column prop="age" label="Age" />
    <el-table-column prop="bday" label="Bday" />
    <el-table-column prop="department.name" label="Department" />
    <el-table-column prop="employeed_day" label="Employeed dat" />
    <el-table-column prop="fired_day" label="Fired day" />
    <el-table-column prop="status" label="Status" />
    <el-table-column prop="file_id" label="Image" />
    <el-table-column prop="created_at" label="Created" />
    <el-table-column prop="updated_at" label="Updated" />
    <el-table-column label="Actions">
      <template #default="scope">
        <el-button type="warning" size="small" @click="handleGoToEditEmployee(scope.row)"
          >Edit</el-button
        >
        <el-button type="danger" size="small" @click="deleteEmployee(scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
  <DialogEditEmployee
    v-if="showDialogEditEmployee"
    v-model:show-dialog="showDialogEditEmployee"
    :departments="departments"
    :employee="employee"
    @close="handlegoCloseDialogEmployee"
  ></DialogEditEmployee>
</template>

<script lang="ts" setup>
import SidebarComponent from '@/components/SidebarComponent.vue'
import { reactive, ref, onMounted } from 'vue'
import { RouteName } from '@/router/constants'
import { ElMessage, ElNotification } from 'element-plus'
import { InfoFilled } from '@element-plus/icons-vue'
import { API } from '@/services'
import type { Employee } from '@/services/employees/types'
import type { Department } from '@/services/departments/types'
import DialogEditEmployee from '@/components/DialogEditEmployee.vue'
const departments = ref<Department[]>([])
const employees = ref<Employee[]>([])
const employee = ref<Employee | null>(null)
const showDialogVisible = ref<boolean>(false)
const errors = ref({})
const showDialogEditEmployee = ref<boolean>(false)
onMounted(async () => {
  try {
    const emloyeesResponse = await API.employees.getEmployees()
    const departmentsResponse = await API.departments.getDepartments()

    employees.value = emloyeesResponse.data
    departments.value = departmentsResponse.data
  } catch (error) {
    ElNotification({
      title: 'Error',
      message: error,
      type: 'error',
      position: 'bottom-left'
    })
  }
})

const deleteEmployee = (id: number) => {
  API.employees.deleteEmployee(id.id)
  employees.value = employees.value.filter((employee) => {
    return employee.id != id.id
  })
  ElMessage.success('Delete employee id: ' + id.id)
}
const confirmEvent = (id) => {
  deleteEmployee(id)
}

const handleGoToEditEmployee = (employeeData: Employee) => {
  employee.value = employeeData
  showDialogEditEmployee.value = true
}
const handlegoCloseDialogEmployee = () => {
  employee.value = null
  showDialogEditEmployee.value = false
}
</script>
