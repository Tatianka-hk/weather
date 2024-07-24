<template>
  <div class="chart-container">
    <canvas :id="chartId"></canvas>
  </div>
</template>
<script lang="ts">
import Chart from 'chart.js/auto'
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    weatherWeek: Object,
    chartId: {
      type: String,
      default: '0'
    }
  },
  mounted() {
    try {
      this.renderChart()
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    renderChart() {
      const weatherData = this.weatherWeek?.list

      const labels = weatherData.map((entry: any) => {
        const date = new Date(entry.dt * 1000)
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      })

      const temperatures = weatherData.map((entry: any) => entry.main.temp)
      const element = document.getElementById(this.chartId) as HTMLCanvasElement
      const ctx = element.getContext('2d')
      if (!ctx) {
        return null
      }
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: `${this.$t('card.temperature')} (°C)`,
              data: temperatures,
              borderColor: '#FF5733',
              backgroundColor: 'rgba(255, 87, 51, 0.2)',
              borderWidth: 2,
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `${context.dataset.label}: ${context.raw}°C`
                }
              }
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: `${this.$t('card.time')}`
              }
            },
            y: {
              title: {
                display: true,
                text: `${this.$t('card.temperature')} (°C)`
              }
            }
          }
        }
      })
    }
  }
})
</script>
<style>
.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  padding: 10px;
}

canvas {
  width: 100% !important;
  height: 50% !important;
}
</style>
