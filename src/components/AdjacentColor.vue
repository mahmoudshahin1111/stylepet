<script setup lang="ts">
import { ref } from 'vue'
import type { IColor } from '../utils/utils'
import { hexToRgb } from '../utils/common'
import { watch } from 'vue'

interface IResult {
  value: string
  red: number
  green: number
  blue: number
  totalRgbDiff: number
  adjacentByInPercent?: number
}

const mainColors = ref<IColor[]>([])
const targetColor = ref<string>()
const inputColor = ref<string>()
const results = ref<IResult[]>()

watch(targetColor, () => {
  calculateAdjacentColor()
})

const addColor = () => {
  if (!inputColor.value) return
  mainColors.value.push({
    name: inputColor.value!,
    value: inputColor.value!
  })
  inputColor.value = null!
}

const reset = () => {
  inputColor.value = null!
  mainColors.value = []
  targetColor.value = null!
  results.value = []
}

const removeColor = (value: string) => {
  mainColors.value = mainColors.value.filter((e) => e.value !== value)
}

const calculateAdjacentColor = () => {
  const colorsInRGB: IResult[] = []
  const targetColorRgb = hexToRgb(targetColor.value!)
  console.log(targetColor.value, targetColorRgb)

  if (!targetColorRgb) return
  mainColors.value.forEach((color) => {
    const rgb = hexToRgb(color.value)
    if (!rgb) return
    const gDiff = Math.abs(targetColorRgb.g - rgb.g)
    const rDiff = Math.abs(targetColorRgb.r - rgb.r)
    const bDiff = Math.abs(targetColorRgb.b - rgb.b)

    const totalRgbDiff = gDiff + rDiff + bDiff
    const colorInRGB: IResult = {
      value: color.value,
      blue: rgb.b,
      green: rgb.g,
      red: rgb.r,
      totalRgbDiff,
      adjacentByInPercent: parseInt(((1 - totalRgbDiff / (255 * 3)) * 100).toFixed(3))
    }
    colorsInRGB.push(colorInRGB)
  })

  results.value = colorsInRGB
}
</script>

<template>
  <div class="container">
    <div class="main-colors">
      <span class="main-colors-text">Main Colors</span>
      <form class="main-colors-form" @submit.prevent="addColor">
        <div class="color-picker-container">
          <v-color-picker v-model="inputColor" mode="rgb"></v-color-picker>
        </div>
        <small>Add all the color that do you want to match</small>
        <v-btn type="submit" :disabled="!inputColor" :ripple="false">Add</v-btn>
      </form>
      <v-virtual-scroll class="main-colors-scroller" :max-height="150" :items="mainColors">
        <template v-slot:default="{ item }">
          <div class="color-item-container">
            <div>
              {{ item.value }}
              <div class="color-preview" :style="{ backgroundColor: item.value }"></div>
            </div>
            <v-btn @click="removeColor(item.value)" :ripple="false">Delete</v-btn>
          </div>
        </template>
      </v-virtual-scroll>
    </div>

    <v-divider :thickness="5" class="divider"></v-divider>

    <div>
      <div class="target-color-text">Target Color</div>
      <div class="color-picker-container">
        <v-color-picker v-model="targetColor" mode="rgb"></v-color-picker>
      </div>
    </div>

    <div>
      <div class="actions-buttons">
        <v-btn type="button" @click="reset" :ripple="false">Reset</v-btn>
        <!-- <v-btn type="button" @click="calculateAdjacentColor" :ripple="false">Calculate</v-btn> -->
      </div>

      <span v-if="results?.length">
        <v-divider :thickness="5" class="divider"></v-divider>
        <div class="results-text">Results</div>
        <v-table>
          <thead>
            <tr>
              <th>Color</th>
              <th>Adjacent Percentage %</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in results" :key="r.value">
              <td>
                {{ r.value }}
                <div class="color-preview" :style="{ backgroundColor: r.value }"></div>
              </td>
              <td>{{ r.adjacentByInPercent }} %</td>
            </tr>
          </tbody>
        </v-table>
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  .main-colors-text {
    display: block;
    margin-bottom: 28px;
  }

  .main-colors-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }

  .main-colors-scroller {
    margin-top: 15px;
    background-color: #fff;

    .color-item-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 20px;
    }
  }

  .divider {
    margin: 50px 0px;
  }

  .target-color-text {
    margin-bottom: 28px;
  }

  .results-text {
    margin-bottom: 28px;
  }

  .actions-buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 28px;
    gap: 20px;
  }

  .color-picker-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;

    .v-color-picker {
      margin: auto;
    }
  }

  .color-preview {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
  }
}

@media screen and (min-width: 900px) {
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .divider {
    display: none;
  }
}
</style>
