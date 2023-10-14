<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue'
import { ButtonColors, ButtonTypes } from './button.types'

const props = defineProps(['name', 'type', 'btnType', 'btnColor'])
defineEmits(['click'])
const btnClass = computed<Record<string, boolean>>(() => {
  const _class: Record<string, boolean> = {}
  switch (props.btnColor) {
    case ButtonColors.secondary:
      _class['st-secondary'] = true
      break
    default:
      _class['st-primary'] = true
  }
  switch (props.btnType) {
    case ButtonTypes.default:
      _class['st-default'] = true
      break
  }
  return _class
})
</script>

<template>
  <button :class="btnClass" v-bind:type="props.type ?? 'button'" @click="(e) => $emit('click', e)">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
button {
  width: 70px;
  height: 30px;
  border-radius: 4px;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.st-primary {
  background: #fff;
  color: #1e1e1e;
}
</style>
