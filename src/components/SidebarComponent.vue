<template>
  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
    <el-radio-button :value="false">expand</el-radio-button>
    <el-radio-button :value="true">collapse</el-radio-button>
  </el-radio-group>
  <img src="@/assets/logo.png" alt="" width="30%" />
  <h2 v-if="user?.name">Howdy, {{ user?.name }}</h2>
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
import { RouteName } from '@/router/constants'
import { useAuthenticationStore } from '@/stores/modules/authentication'
import type { User } from '@/services/users/types'
import { computed } from 'vue'
import { useUserStore } from '@/stores/modules/users'
import router from '@/router'
const menuItems: Array<object> = [
  { pageName: 'Employees', link: RouteName.EMPLOYEES_PAGE },
  { pageName: 'Departments', link: RouteName.DEPARTMENTS_PAGE },
  { pageName: 'Stats', link: RouteName.STATS_PAGE },
  { pageName: 'Video', link: RouteName.VIDEO_PAGE }
]

const onLogout = async () => {
  const authenticationStore = useAuthenticationStore()
  await API.users.logoutUser()
  authenticationStore.removeToken()
  // console.log(API)
  router.push(RouteName.LOGIN_PAGE)
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
@/stores/modules/users
