<template>
  <SidebarComponent />
  <router-link :to="RouteName.EMPLOYEES_STORE" replace>
    <el-button type="primary" plain>Create new employee</el-button></router-link
  >
  <el-table :data="tableData" stripe style="width: 100%">
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
        <el-button type="warning" size="mini" @click="dialogFormVisible = true">Edit</el-button>
        <el-dialog v-model="dialogFormVisible" title="Edit the employee" width="500">
          <el-form :model="form">
            <el-form-item label="First name" label-width="50%">
              <el-input
                v-model="form.first_name"
                autocomplete="off"
                :value="scope.row.first_name"
              />
            </el-form-item>
            <el-form-item label="Last name" label-width="50%">
              <el-input :value="scope.row.last_name" v-model="form.last_name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Mid name" label-width="50%">
              <el-input :value="scope.row.mid_name" v-model="form.mid_name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Birth day" label-width="50%">
              <el-date-picker :value="scope.row.bday" v-model="form.bday" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Employeed day" label-width="50%">
              <el-date-picker
                v-model="form.employeed_day"
                autocomplete="off"
                :value="scope.row.employeed_day"
              />
            </el-form-item>
            <el-form-item label="fired day" label-width="50%">
              <el-date-picker
                v-model="form.fired_day"
                autocomplete="off"
                :value="scope.row.fired_day"
              />
            </el-form-item>
            <el-form-item label="Department" label-width="50%">
              <el-select v-model="form.department_id" placeholder="Please select a zone">
                <el-option
                  v-for="department in departments"
                  :key="department.id"
                  :label="department.name"
                  value="department.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Sex" label-width="50%">
              <el-radio-group v-model="form.sex">
                <el-radio value="male">male</el-radio>
                <el-radio value="female">female</el-radio>
                <el-radio value="hermaphrodite">hermaphrodite</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Status" label-width="50%">
              <el-radio-group v-model="form.status">
                <el-radio value="male">active</el-radio>
                <el-radio value="female">inactive</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Age" label-width="50%">
              <el-input-number :value="scope.row.age" v-model="form.age" autocomplete="off" />
            </el-form-item>
          </el-form>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="dialogFormVisible = false">Cancel</el-button>
              <el-button type="primary" @click="editEmployee(scope.row.id)"> Confirm </el-button>
            </div>
          </template>
        </el-dialog>
        <el-popconfirm
          confirm-button-text="Yes"
          cancel-button-text="No"
          :icon="InfoFilled"
          icon-color="#626AEF"
          title="Are you sure to delete this?"
          @confirm="confirmEvent(scope.row.id)"
        >
          <template #reference>
            <el-button>Delete</el-button>
          </template>
        </el-popconfirm>
        <el-button
          type="info"
          size="'mini'"
          @click="(dialogVisible = true), showEmployee(scope.row.id)"
          >Show
        </el-button>
        <el-dialog
          v-model="dialogVisible"
          :title="scope.row.first_name + ' ' + scope.row.last_name"
          width="500"
        >
          <div>
            sex: {{ scope.row.sex }} , mid_name: {{ scope.row.mid_name }} age :
            {{ scope.row.age }}bday : {{ scope.row.bday }} department:{{
              scope.row.department.name
            }}
            employeed_day: {{ scope.row.employeed_day }} fired_day:
            {{ scope.row.fired_day }} status: {{ scope.row.status }} file_id :
            {{ scope.row.file_id }} created_at: {{ scope.row.created_at }} updated_at:
            {{ scope.row.updated_at }}
          </div>
          <template #footer>
            <div class="dialog-footer">
              <el-button type="primary" @click="dialogVisible = false"> Close </el-button>
            </div>
          </template>
        </el-dialog>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { InfoFilled, ArrowLeft, ArrowRight, Delete, Edit, Share } from '@element-plus/icons-vue'
import SidebarComponent from '@/components/SidebarComponent.vue'
import { reactive, ref } from 'vue'
import { useTokenStore } from '@/stores/modules/authentication/token'
import { API } from '@/services'
import type { InputLoginUser } from '@/services/users/types'
import { useUserStore } from '@/stores/modules/users'
import users from '@/services/users'
import { RouteName } from '@/router/constants'
import { onMounted } from 'vue'
import EmployeesView from '@/views/EmployeesView.vue'
import { ElMessage } from 'element-plus'
const departments = ref([])
const dialogVisible = ref(false)
const tableData: Array<any> = ref([])
const dialogFormVisible = ref(false)
const form = reactive({
  first_name: '',
  last_name: '',
  mid_name: '',
  bday: '',
  sex: '',
  age: '',
  department_id: 0,
  status: 0,
  employeed_day: '',
  fired_day: ''
})

const editEmployee = (id: number) => {
  ElMessage.success('Edit employee id: ' + id)
  dialogFormVisible.value = false
}
const deleteEmployee = (id: number) => {
  API.employees.deleteEmployee(id)
  tableData.value.filter((employee) => {
    return employee.id != id
  })
  ElMessage.success('Delete employee id: ' + id)
}
const confirmEvent = (id) => {
  deleteEmployee(id)
}
onMounted(() => {
  // alert(store.token)
  const response = API.employees.getEmployees()
  response.then((data) => {
    // console.log(data.data)
    let employees = data.data
    for (let employee of employees) {
      tableData.value.push(employee)
    }
  })

  const responseDeps = API.departments.getDepartments()
  responseDeps.then((data) => {
    // console.log(data.data)
    departments.value = data.data
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
