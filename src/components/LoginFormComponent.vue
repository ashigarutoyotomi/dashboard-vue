<template>
  <img src="@/assets/logo.png" alt="" width="30%" />
  Login the account
  <h3 v-if="errors">{{ errors }}</h3>
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="EMail">
      <el-input
        v-model="form.email"
        maxlength="30"
        required
        type="email"
        value="admin@proton.com"
      />
    </el-form-item>
    <el-form-item label="Activity">
      <el-input v-model="form.password" maxlength="50" type="password" required value="123" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Login</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import axios from 'axios'
import router from '@/router'
// do not use same email with ref
const form = reactive({
  email: 'admin@proton.com',
  password: '123',
  user: {}
})
const errors = ref({})
const onSubmit = async () => {
  try {
    const response = await axios
      .post(import.meta.env.VITE_API_URL + '/login', {
        email: form.email,
        password: form.password
      })
      .then((response) => {
        if (response.status == 200) {
          // alert(response.data.token)
          axios.defaults.headers.common['Authorization'] = `"Bearer ${response.data.token}"`
          form.user = response.data.user
          router.push('/')
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

    form.email = ''
    form.password = ''
  }
}
</script>
