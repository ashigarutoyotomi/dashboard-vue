<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
</script>

<template>
  <HomeView />

  <div class="wrapper"></div>
  <RouterView />
</template>

<style scoped></style>
