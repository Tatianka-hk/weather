<template>
  <div class="weather">
    <VsWeatherBlock v-for="weather in favoriteWeather" :isFavoriteBlock="true" :weather="weather" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VsWeatherBlock from './components/vs-weather-block.vue/vs-weather-block.vue'

export default defineComponent({
  name: 'VsFavorites',
  components: { VsWeatherBlock },
  data() {
    return {
      favoriteWeather: [] as any[]
    }
  },
  mounted() {
    if (localStorage.getItem('weatherBlocks')) {
      const blocks = JSON.parse(localStorage.getItem('weatherBlocks') ?? '[]')
      blocks.forEach((el: any) => {
        if (el.favorite) this.favoriteWeather.push(el)
      })
    }
  }
})
</script>

<style scoped></style>
