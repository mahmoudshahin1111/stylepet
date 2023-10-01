<script setup lang="ts">
import { ref } from 'vue'
import type { IColor } from './utils'
import {hexToRgb} from '../../utils/common';

const mainColors = ref<IColor[]>([])
const targetColor = ref<string>()
const inputColor = ref<string>()

const addColor = () => {
  if (!inputColor.value) return
  mainColors.value.push({
    name: inputColor.value!,
    value: inputColor.value!
  })
  inputColor.value = null!
}



const removeColor = (value: string) => {
  mainColors.value = mainColors.value.filter((e) => e.value !== value)
}

const calculateAdjacentColor = () => {
  const colorsInRGB: {
    value: string
    red: number
    green: number
    blue: number
    totalRgbDiff: number
    adjacentByInPercent?: number
  }[] = []
  const targetColorRgb = hexToRgb(targetColor.value!)
  if (!targetColorRgb) return
  let totalRgba = 0
  mainColors.value.forEach((color) => {
    const rgb = hexToRgb(color.value)
    if (!rgb) return
    const gDiff = Math.abs(targetColorRgb.g - rgb.g)
    const rDiff = Math.abs(targetColorRgb.r - rgb.r)
    const bDiff = Math.abs(targetColorRgb.b - rgb.b)
    colorsInRGB.push({
      value: color.value,
      blue: rgb.b,
      green: rgb.g,
      red: rgb.r,
      totalRgbDiff: gDiff + rDiff + bDiff
    })
    totalRgba += gDiff + rDiff + bDiff
  })

  colorsInRGB.forEach((color) => {
    color.adjacentByInPercent = (1 - color.totalRgbDiff / totalRgba) * 100
  })

  console.log(colorsInRGB)
}
</script>

<template>
  <div>
    <label for="">Main Colors</label>
    <div v-for="color in mainColors" :key="color.value">
      <div v-bind:key="color.value">
        {{ color.value }}
      </div>
      <button @click="removeColor(color.value)">Delete</button>
    </div>
  </div>
  <div>
    <label for="">Target Color </label>
    <input type="text" v-model="targetColor" />
  </div>
  <form @submit.prevent="addColor">
    <input type="color" v-model="inputColor" />
    <button>Add Color</button>
  </form>
  <div>
    <button type="button" @click="calculateAdjacentColor">Calculate</button>
  </div>
</template>
