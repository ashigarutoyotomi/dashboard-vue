<template>
  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
    <el-radio-button :value="false">expand</el-radio-button>
    <el-radio-button :value="true">collapse</el-radio-button>
  </el-radio-group>
  <img src="@/assets/logo.png" alt="" width="30%" />
  Howdy, {{ user.name }}
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
        <el-menu-item index=":index" v-for="(menu, index) in menuItems" :key="menu.id"
          ><router-link :to="menu.link">{{ menu.pageName }}</router-link></el-menu-item
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
import { API } from '@/services'
import { reactive, ref } from 'vue'
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'
import axios from 'axios'
import Route from '@/router/constants'
import { useUserStore } from '@/stores/modules/users'
import type { User } from '@/services/users/types'
import { computed } from 'vue'
import users from '@/services/users'
const menuItems: Array<object> = [
  { pageName: 'Employees', link: Route.EMPLOYEES_PAGE },
  { pageName: 'Departments', link: Route.DEPARTMENTS_PAGE },
  { pageName: 'Stats', link: Route.STATS_PAGE }
]

const onLogout = async () => {
  const userStore = useUserStore()
  await API.users.logoutUser()
  userStore.flushUser()
  console.log(API)
}

const userStore = useUserStore()
const user = computed(() => userStore.user)
const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
</script>

<style></style>
