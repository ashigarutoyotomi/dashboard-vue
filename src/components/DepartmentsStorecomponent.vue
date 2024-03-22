<template>
  <SidebarComponent />
  <el-form :model="form">
    <el-form-item label="Name" label-width="50%">
      <el-input v-model="form.name" autocomplete="off" required />
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
import type { InputCreateDepartment } from '@/services/departments/types'

const createUser = () => {
  //   console.log(form)
  const response = API.departments.createDepartment(form)
  //   console.log(response)
  response.then((data) => {
    if (data.status == 201) {
      ElMessage.success('Created department')
      router.go(-1)
    }
    response.catch((data) => {
      if (data.response.status == 422) {
        errors.value = data.response['message']
      }
      //   console.log(data)
    })
  })
}
const departments = ref([])
const form: InputCreateDepartment = reactive({
  name: ''
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
</script>
