<template>
  <el-dialog title="Edit Employee" v-model="showDialog" width="500" @close="emit('close')">
    <el-form :model="form">
      <el-form-item label="First name" label-width="50%">
        <el-input v-model="form.first_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Last name" label-width="50%">
        <el-input v-model="form.last_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Mid name" label-width="50%">
        <el-input v-model="form.mid_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Birth day" label-width="50%">
        <el-date-picker v-model="form.bday" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Employeed day" label-width="50%">
        <el-date-picker v-model="form.employeed_day" autocomplete="off" />
      </el-form-item>
      <el-form-item label="fired day" label-width="50%">
        <el-date-picker v-model="form.fired_day" autocomplete="off" />
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
          <el-radio value="1" aria-checked>active</el-radio>
          <el-radio value="0">inactive</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Age" label-width="50%">
        <el-input-number v-model="form.age" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="'dialog-footer'">
        <el-button @click="emit('close')">Cancel</el-button>
        <el-button type="primary" @click="editEmployee">Confirm</el-button>
      </div>
    </template></el-dialog
  >
</template>

<script setup lang="ts">
import { API } from '@/services'
import { shallowReactive, shallowReadonly } from 'vue'
import { ElMessage } from 'element-plus'
import type { Department } from '@/services/departments/types'
import type { InputUpdateEmployee } from '@/services/employees/types'

interface Props {
  employee: InputUpdateEmployee
  departments: Department
}
const props = defineProps<Props>()
const emit = defineEmits(['close'])
const showDialog = defineModel<boolean>('showDialog', { required: true })
const form = shallowReactive<InputUpdateEmployee>(Object.assign({}, props.employee))

const editEmployee = () => {
  API.employees.updateEmployee(form, props.employee.id)
  ElMessage.success('Edit employee id: ' + props.employee.id)
}
</script>
<style scoped></style>
