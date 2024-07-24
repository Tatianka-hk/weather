<template>
  <div :class="['vs-weather-block', isDay ? 'day' : 'night']">
    <button @click="toggleView">
      {{ isWeeklyView ? $t('switch.day') : $t('switch.days') }}
    </button>
    <VsWeatherCard :weather="weather" v-if="weather && !isWeeklyView" />
    <VsWeatherWeek :weather="weekData" v-if="weather && isWeeklyView" />
    <VsWeatherChart :weatherWeek="weekData" :chartId="`${weather?.id}`" v-if="weekData" />
    <vsLoader v-if="isPending" />
    <button @click="removeBlock" v-if="!isFavoriteBlock">{{ $t('modals.remove') }}</button>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import VsWeatherChart from './components/vs-weather-chart.vue'
import { defineComponent } from 'vue'
import VsWeatherWeek from './components/vs-weather-week.vue'
import VsWeatherCard from './components/vs-weather-card.vue'
import vsLoader from '@/components/vs-loader.vue'
export default defineComponent({
  components: { VsWeatherCard, VsWeatherWeek, VsWeatherChart, vsLoader },
  props: {
    weather: {
      default: {} as any
    },
    isFavoriteBlock: {
      default: false
    }
  },
  data() {
    return {
      weekData: null,
      isWeeklyView: false,
      isDay: true,
      isPending: false
    }
  },
  async mounted() {
    this.isDay = localStorage.getItem('mode') === 'true' ? true : false
    this.isPending = true
    await this.getWeatherList().catch((err) => {
      console.error(err)
    })
    this.isPending = false
  },
  methods: {
    async getWeatherList() {
      const API_KEY = 'd66b587ec053ca4ba840017f7db007f3'
      try {
        const lang = localStorage.getItem('lang') || 'en'
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${this.weather?.coord?.lat}&lon=${this.weather?.coord?.lon}&appid=${API_KEY}&units=metric&lang=${lang}`
        )
        this.weekData = res.data
      } catch (err) {
        console.log(err)
      }
    },

    removeBlock() {
      this.$emit('remove')
    },
    toggleView() {
      this.isWeeklyView = !this.isWeeklyView
    }
  }
})
</script>

<style scoped>
.vs-weather-block {
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Lato', sans-serif;
  margin-bottom: 10px;
}

.vs-weather-block button {
  align-self: flex-start;
  background-color: #f08080;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.vs-weather-block button:hover {
  background-color: #e36969;
}
.vs-weather-block.day {
  background-color: #f0f8ff;
  color: #000;
}
.vs-weather-block.night {
  background-color: #2c3e50;
  color: #ecf0f1;
}
</style>
