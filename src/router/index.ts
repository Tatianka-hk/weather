import { createRouter, createWebHistory } from 'vue-router'
import VsWeather from '../components/vs-weather.vue'
import VsFavorites from '@/components/vs-favorites.vue'

const routes = [
  { path: '/', component: VsWeather },
  { path: '/favorites', component: VsFavorites }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
