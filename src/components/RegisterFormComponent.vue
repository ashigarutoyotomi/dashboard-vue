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
        placeholder="admin@proton.com"
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
    <router-link :to="RouteName.LOGIN_PAGE">Login now</router-link>
  </el-form>
</template>

<script lang="ts" setup>
import { API } from '@/services'
import { RouteName } from '@/router/constants'
import { reactive, ref } from 'vue'
import router from '@/router'
import { useUserStore } from '@/stores/modules/users'
import type { InputCreateUser } from '@/services/users/types'
// do not use same email with ref
const form = reactive<AuthForm>({
  email: 'admin@proton.com',
  password: '',
  user: {
    name: '',
    email: '',
    password: ''
  }
})

const userStore = useUserStore()
const errors = ref({})
interface responseModel {
  user: Array<string>
}
const onSubmit = () => {
  const data: InputCreateUser = { email: form.email, password: form.password, name: form.name }
  const response = API.users.createUser(data)
  // console.log(response)
  response.then((data) => {
    // console.log(data)
    if (data.status == 201) {
      userStore.initUser(data.data.user)
      // console.log(data.data)
      router.push(RouteName.LOGIN_PAGE)
    }
  })
  response.catch((data) => {
    // console.log(data)
    if (data.response.status == 422) {
      errors.value = data.response.data['message']
    }
  })
}
</script>
