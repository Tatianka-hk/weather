<template>
  <div v-if="weather" class="weather-card nyan">
    <div class="card-title">
      <h2>{{ $t('card.title') }} {{ weather.name }}, {{ weather.sys.country }}</h2>
      <button @click="toggleFavorite">
        <span v-if="isFavorite">★</span>
        <span v-else>☆</span>
      </button>
    </div>
    <p>{{ $t('card.temperature') }}: {{ weather.main.temp }}°C</p>
    <p>{{ $t('card.weather') }}: {{ weather.weather[0].description }}</p>
    <p>{{ $t('card.humidity') }}: {{ weather.main.humidity }}%</p>
    <p>{{ $t('card.wind') }}: {{ weather.wind.speed }} m/s</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'VsWeatherCard',
  props: {
    weather: {
      type: Object as PropType<any>,
      required: false,
      default: null
    }
  },
  data() {
    return {
      isFavorite: false
    }
  },
  mounted() {
    if (localStorage.getItem('weatherBlocks')) {
      const blocks = JSON.parse(localStorage.getItem('weatherBlocks')) || []
      const newData = blocks.find((el) => el.id === this.weather.id)
      this.isFavorite = newData.favorite
      console.log(newData)
    }
  },
  methods: {
    toggleFavorite() {
      this.isFavorite = !this.isFavorite
      if (localStorage.getItem('weatherBlocks')) {
        const blocks = JSON.parse(localStorage.getItem('weatherBlocks')) || []
        const newData = blocks.map((el) =>
          el.id === this.weather.id ? { ...el, favorite: this.isFavorite } : el
        )
        localStorage.setItem('weatherBlocks', JSON.stringify(newData))
      } else {
        this.weather.favorite = this.isFavorite
        const blocks = JSON.stringify([this.weather])
        localStorage.setItem('weatherBlocks', blocks)
      }
    }
  }
})
</script>

<style scoped>
.weather-card.nyan {
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  font-family: 'Open Sans', sans-serif;
}

.weather-card.nyan h2 {
  margin-bottom: 10px;
}
.weather-card.nyan p {
  margin-bottom: 5px;
}

.weather-card.nyan p:last-child {
  margin-bottom: 0;
}

.card-title {
  display: flex;
}
.card-title button {
  background-color: inherit;
  border: none;
  font-size: 30px;
}
</style>
