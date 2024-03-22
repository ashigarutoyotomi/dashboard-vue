<template>
  <el-dialog title="Edit Department" v-model="showDialog" width="500" @close="emit('close')">
    <el-form :model="form">
      <el-form-item label="Name" label-width="50%">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="'dialog-footer'">
        <el-button @click="emit('close')">Cancel</el-button>
        <el-button type="primary" @click="editDepartment(department.id)">Confirm</el-button>
      </div>
    </template></el-dialog
  >
</template>

<script setup lang="ts">
import { API } from '@/services'
import { shallowReactive, shallowReadonly } from 'vue'
import { ElMessage } from 'element-plus'
import type { Department } from '@/services/departments/types'
import type { InputUpdateDepartment } from '@/services/departments/types'

interface Props {
  department: InputUpdateDepartment
  departments: Department
}
const props = defineProps<Props>()
const emit = defineEmits(['close'])
const showDialog = defineModel<boolean>('showDialog', { required: true })
const form = shallowReactive<InputUpdateDepartment>(Object.assign({}, props.department))

const editDepartment = () => {
  const editResponse = API.departments.updateDepartment(form, props.department.id)
  editResponse.then((data) => {
    ElMessage.success('Edit department id: ' + props.department.id)
  })
  editResponse.catch((data) => {
    if (data.status == 422) {
      ElMessage.error(data.data['message'])
    }
  })
}
</script>
<style scoped></style>
