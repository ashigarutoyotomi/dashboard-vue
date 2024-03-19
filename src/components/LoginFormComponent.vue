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
        placeholder="admin@proton.com"
      />
    </el-form-item>
    <el-form-item label="Activity">
      <el-input v-model="form.password" maxlength="50" type="password" required />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Login</el-button>
    </el-form-item>
    <router-link to="/register">Register now</router-link>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import axios from 'axios'
import router from '@/router'
import { useTokenStore } from '@/stores/token'
import { API } from '@/services'
import { InputCreateUser } from '@/services/users/types'
const store = useTokenStore()
const form = reactive<AuthForm>({
  email: 'admin@proton.com',
  password: '123',
  user: {
    name: '',
    email: '',
    password: ''
  }
})
const errors = ref({})
const data = InputCreateUser()
const onSubmit = async () => {
  await API.users.loginUser({ email: form.email, password: form.password })
  try {
    const response = await axios
      .post<responseModel>(import.meta.env.VITE_API_URL + '/login', {
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
    if (e.response && e.response.status === 422) {
      errors.value = e.response['data']['message']
    }

    form.email = ''
    form.password = ''
  }
}
</script>
