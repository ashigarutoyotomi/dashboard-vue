<template>
  <img src="@/assets/logo.png" alt="" width="30%" />
  Register the account
  <h3 v-if="errors">{{ errors }}</h3>
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="EMail">
      <el-input
        v-model="form.email"
        maxlength="30"
        required
        type="email"
        aria-placeholder="admin@proton.com"
      />
    </el-form-item>
    <el-form-item label="Name">
      <el-input
        v-model="form.name"
        maxlength="40"
        required
        type="text"
        placeholder="Jennifer Kamski"
      />
    </el-form-item>
    <el-form-item label="Password">
      <el-input v-model="form.password" maxlength="50" type="password" required />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Register</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import axios from 'axios'
import router from '@/router'
// do not use same email with ref
const form = reactive({
  email: '',
  password: '',
  name: '',
  user: {}
})
const errors = ref({})
const onSubmit = async () => {
  try {
    const response = await axios
      .post(import.meta.env.VITE_API_URL + '/register', {
        email: form.email,
        password: form.password,
        name: form.name
      })
      .then((response) => {
        if (response.status == 201) {
          form.user = response.data.user
          router.push('/login')
        } else {
          return false
        }
      })
  } catch (e) {
    console.log(e)
    if (e.response.status === 422) {
      errors.value = e.response['data']['message']
      return false
    }
  }
}
</script>
