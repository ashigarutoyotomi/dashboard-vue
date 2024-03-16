<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="Activity email">
      <el-input v-model="form.email" />
    </el-form-item>
    <el-form-item label="Activity form">
      <el-input v-model="form.password" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

// do not use same email with ref
const form = reactive({
  email: '',
  password: ''
})

const onSubmit = () => {}
</script>
