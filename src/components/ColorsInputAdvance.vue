<script setup lang="ts">
import { ref } from 'vue'

const emits = defineEmits([''])

const allColorsAsText = ref<string>()
</script>

<template>
  <div class="container">
    <v-textarea clearable autofocus label="All colors as hex"></v-textarea>
    <span class="hint-text">add all the color that do you want to match. Each color should be in a new line </span>
  </div>
</template>

<style scoped lang="scss">
.container {
}
.hint-text{
  font-size: 12px;
}
</style>
