<template>
  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
    <el-radio-button :value="false">expand</el-radio-button>
    <el-radio-button :value="true">collapse</el-radio-button>
  </el-radio-group>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><User /></el-icon>
        <span>Employees</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1" v-for="(name, link) in pagesLinks" :key="name.name"
          ><router-link to="{{ name.link }}">{{ name.link }}</router-link></el-menu-item
        >
      </el-menu-item-group>
    </el-sub-menu>
    <el-menu-item index="1">
      <el-menu-item index="1" @click="onLogout"
        ><el-icon><SwitchButton /></el-icon><span>Logout</span></el-menu-item
      >
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'
import axios from 'axios'
const pagesLinks: array = [
  { pageName: 'Employees', link: '/employees' },
  { pageName: 'Departments', link: '/departments' },
  { PageName: 'Stats', link: '/stats' }
]
const onLogout = async () => {
  try {
    const response = await axios
      .post(import.meta.env.VITE_API_URL + '/logout', {})
      .then((response) => {
        if (response.status == 200) {
          // alert(response.data.token)
          axios.defaults.headers.common['Authorization'] = ''
          router.push('/login')
        }
      })
  } catch (e) {
    console.log(e)
  }
}
const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style></style>
