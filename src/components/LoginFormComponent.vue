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
import { useRouter } from 'vue-router'
import { useAuthenticationStore } from '@/stores/modules/authentication'
import { reactive, ref } from 'vue'
import { API } from '@/services'
import type { InputLoginUser } from '@/services/users/types'
import { useUserStore } from '@/stores/modules/users'
import { RouteName } from '@/router/constants'
const router = useRouter()
const authenticationStore = useAuthenticationStore()
const userStore = useUserStore()
const form = reactive<AuthForm>({
  email: 'admin@proton.com',
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
  try {
    const response = API.users.loginUser(data)
    response.then((data) => {
      const responseData = data.data
      authenticationStore.setToken(responseData.token)
      userStore.initUser(responseData.user)
    })
    router.push({ name: RouteName.HOME_PAGE })
  } catch (error) {
    console.log(error)
    if (error.response.status == 422) {
      errors.value = data.response.data['message']
    }
  }
}
</script>
