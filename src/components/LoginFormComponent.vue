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
import type { InputLoginUser } from '@/services/users/types'
import { useUserStore } from '@/stores/users'
import users from '@/services/users'
import Route from '@/shares/const/Route'
const store = useTokenStore()
const userStore = useUserStore()
const form = reactive<AuthForm>({
  email: '',
  password: '',
  user: {
    name: '',
    email: '',
    password: ''
  }
})
const errors = ref({})

const onSubmit = () => {
  const data: InputLoginUser = { email: form.email, password: form.password }
  const response = API.users.loginUser(data)
  // console.log(response)
  response.then((data) => {
    store.set(data.data.token)
    userStore.initUser(data.data.user)
    router.push(Route.HOME_PAGE)
  })
  response.catch((data) => {
    // console.log(data)
    if (data.response.status == 422) {
      errors.value = data.response.data['message']
    }
  })
}
</script>
