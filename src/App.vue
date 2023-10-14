<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
  <Header />
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
}
</style>
