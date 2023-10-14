<script setup lang="ts">
import Icon from '../components/icons/logo.vue'
</script>
<template>
  <div class="st-header">
    <div class="st-links">
      <RouterLink class="st-router-link" to="/">Home</RouterLink>
      <RouterLink class="st-router-link" to="/about">About</RouterLink>
    </div>
    <div class="st-icon">
      <icon />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/variables';

.st-header {
  background-color: $var-color-4;
  min-height: 100px;
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  padding: 10px 20px;
}
.st-icon {
  max-width: 140px;
}

.st-links {
  display: flex;
  flex-direction: row;
  flex: 1;
  gap: 50px;
}

.st-router-link {
  color: #1e1e1e;
  font-size: 20px;
  border-radius: 4px;
  background: #fff;
  padding: 4px 10px;
  height: fit-content;
}
</style>
