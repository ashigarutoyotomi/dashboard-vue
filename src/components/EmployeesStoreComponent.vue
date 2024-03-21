<template>
  <SidebarComponent />
  <el-form :model="form">
    <el-form-item label="First name" label-width="50%">
      <el-input v-model="form.first_name" autocomplete="off" required />
    </el-form-item>
    <el-form-item label="Last name" label-width="50%">
      <el-input v-model="form.last_name" autocomplete="off" required />
    </el-form-item>
    <el-form-item label="Mid name" label-width="50%">
      <el-input v-model="form.mid_name" autocomplete="off" required />
    </el-form-item>
    <el-form-item label="Birth day" label-width="50%">
      <el-date-picker v-model="form.bday" autocomplete="off" required />
    </el-form-item>
    <el-form-item label="Employeed day" label-width="50%">
      <el-date-picker v-model="form.employeed_day" autocomplete="off" required />
    </el-form-item>
    <el-form-item label="fired day" label-width="50%">
      <el-date-picker v-model="form.fired_day" autocomplete="off" />
    </el-form-item>
    <el-form-item label="Department" label-width="50%">
      <el-select v-model="form.department_id" placeholder="Please select a zone" required>
        <el-option
          v-for="department in departments"
          :key="department.id"
          :label="department.name"
          :value="department.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="Sex" label-width="50%">
      <el-radio-group v-model="form.sex" required>
        <el-radio value="male">male</el-radio>
        <el-radio value="female">female</el-radio>
        <el-radio value="hermaphrodite">hermaphrodite</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Status" label-width="50%">
      <el-radio-group v-model="form.status">
        <el-radio value="0" checked>active</el-radio>
        <el-radio value="1">inactive</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Age" label-width="50%">
      <el-input-number v-model="form.age" autocomplete="off" value="0" min="10" max="99" />
    </el-form-item>
    <el-button type="success" @click="createUser">Create</el-button>
  </el-form>
</template>
<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import SidebarComponent from '@/components/SidebarComponent.vue'
import { reactive, ref, onMounted } from 'vue'
import type { UploadProps, messageConfig } from 'element-plus'
import { API } from '@/services'
import router from '@/router'
import { RouteName } from '@/router/constants'
import type { InputCreateEmployee } from '@/services/employees/types'

const createUser = () => {
  //   console.log(form)
  const response = API.employees.createEmployee(form)
  //   console.log(response)
  response.then((data) => {
    if (data.status == 201) {
      ElMessage.success('Created user')
      router.go(-1)
    }
    response.catch((data) => {
      console.log(data)
    })
  })
}
const departments = ref([])
const form: InputCreateEmployee = reactive({
  first_name: '',
  last_name: '',
  mid_name: '',
  bday: '',
  sex: '',
  age: '',
  department_id: 0,
  status: 0,
  employeed_day: '',
  fired_day: '',
  file_id: ''
})
onMounted(() => {
  // alert(store.token)
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
