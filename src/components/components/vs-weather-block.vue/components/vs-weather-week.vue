<template>
  <div class="weather-week">
    <div
      v-for="(day, index) in dailyWeather"
      :key="index"
      :class="['weather-day', isDay ? 'day' : 'night']"
    >
      <h3>{{ getDayName(day.date) }}</h3>
      <p>{{ day.temp }}°C</p>
      <p>{{ day.weather[0].description }}</p>
      <img
        :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`"
        alt="weather icon"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VsWeatherWeek',
  props: {
    weather: {
      type: Object as () => Record<string, any> | null,
      default: null
    }
  },
  data() {
    return {
      isDay: true
    }
  },
  mounted() {
    this.isDay = localStorage.getItem('mode') === 'true' ? true : false
  },
  computed: {
    dailyWeather() {
      const weatherList = this.weather?.list
      const dailyData: any = {}

      weatherList.forEach((entry: any) => {
        const date = new Date(entry.dt * 1000)
        const dayString = date.toISOString().split('T')[0]

        if (!dailyData[dayString]) {
          dailyData[dayString] = {
            date: dayString,
            temps: [],
            weather: entry.weather
          }
        }
        dailyData[dayString].temps.push(entry.main.temp)
      })

      return Object.values(dailyData).map((day: any) => {
        const avgTemp = day.temps.reduce((a: number, b: number) => a + b, 0) / day.temps.length
        return {
          ...day,
          avgTemp
        }
      })
    }
  },
  methods: {
    getDayName(dateString: string) {
      const date = new Date(dateString)
      return date.toLocaleDateString('uk-UA', { weekday: 'long' })
    }
  }
})
</script>

<style scoped>
.weather-week {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
  justify-content: center;
}
.weather-day {
  width: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.weather-day.day {
  background-color: white;
  color: black;
}
.weather-day.nigth {
  background-color: #2c3e50;
  color: #e36969;
}
.weather-day img {
  width: 50px;
  height: 50px;
}
</style>
