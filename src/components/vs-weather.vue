<template>
  <div class="weather">
    <vsAutocompleteInput @selected="addBlock" />
    <vsWeatherBlock
      v-for="(block, index) in weatherData"
      :weather="block"
      :key="index"
      @remove="removeBlock(index)"
    />
    <vsConfirmationModal v-if="showModal" @confirm="confirmRemove" @cancel="cancelRemove" />
    <vsLimitExceededModal v-if="showLimitModal" @confirm="closeLimitModal" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import vsWeatherBlock from './components/vs-weather-block.vue/vs-weather-block.vue'
import vsConfirmationModal from './modals/vs-confirmation-modal.vue'
import vsAutocompleteInput from './components/vs-autocomplete-input.vue'
import VsLimitExceededModal from './modals/vs-limit-exceeded-modal.vue'
import axios from 'axios'
export default defineComponent({
  components: { vsWeatherBlock, vsConfirmationModal, vsAutocompleteInput, VsLimitExceededModal },
  data() {
    return {
      blocks: [],
      weatherData: [],
      maxBlocks: 5,
      showModal: false,
      showLimitModal: false,
      blockToRemove: -1
    }
  },
  methods: {
    setToLocalStorage() {
      localStorage.setItem('weatherBlocks', JSON.stringify(this.blocks))
    },
    addBlock(weatherData: Object) {
      if (this.blocks?.length < this.maxBlocks) {
        this.blocks.push(weatherData)
        this.weatherData.push(weatherData)
        this.setToLocalStorage()
      } else {
        this.showLimitModal = true
      }
    },
    removeBlock(index: number) {
      this.blockToRemove = index
      this.showModal = true
      console.log(this.showModal)
    },
    confirmRemove() {
      this.blocks.splice(this.blockToRemove, 1)
      this.weatherData.splice(this.blockToRemove, 1)
      this.setToLocalStorage()
      this.blockToRemove = -1
      this.showModal = false
    },
    cancelRemove() {
      this.blockToRemove = 0
      this.showModal = false
    },
    closeLimitModal() {
      this.showLimitModal = false
    },
    async getUserLocation() {
      const API_KEY = 'd66b587ec053ca4ba840017f7db007f3'
      try {
        const res = await axios.get('https://ipapi.co/json/')
        const lat = res.data.latitude
        const lon = res.data.longitude
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
          params: {
            lat,
            lon,
            appid: API_KEY,
            units: 'metric',
            lang: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en'
          }
        })
        return response.data
      } catch (err) {
        console.log(err)
      }
    },
    async getCityData(cityID) {
      const API_KEY = 'd66b587ec053ca4ba840017f7db007f3'
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
          params: {
            id: cityID,
            appid: API_KEY,
            units: 'metric',
            lang: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en'
          }
        })
        this.weatherData.push(response.data)
      } catch (err) {
        console.log(err)
      }
    }
  },

  async mounted() {
    if (localStorage.getItem('weatherBlocks')) {
      this.blocks = JSON.parse(localStorage.getItem('weatherBlocks'))
      this.blocks.forEach((block: Object) => {
        this.getCityData(block.id)
      })
    } else {
      const weatherData = await this.getUserLocation()
      this.addBlock(weatherData)
    }
  }
})
</script>
<style lang="scss">
.weather {
  margin-top: 121px;
  padding: 1rem;
}
</style>
