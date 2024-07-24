<template>
  <header :class="[isDay ? 'day' : 'night']">
    <div class="logo-container">
      <img :src="logo" alt="Logo" class="logo" />
    </div>
    <div class="bottom-bar">
      <nav class="nav-container">
        <ul>
          <li>
            <router-link to="/">{{ $t('menu.main') }} </router-link>
          </li>
          <li>
            <router-link to="/favorites">{{ $t('menu.favorite') }}</router-link>
          </li>
        </ul>
      </nav>
      <div class="header-right">
        <div class="language-switcher">
          <button @click="setLocale('en')">English</button>
          <button @click="setLocale('uk')">Українська</button>
        </div>
        <button @click="toggleDayNight">
          {{ isDay ? `${$t('switch.day_mode')}` : `${$t('switch.night_mode')}` }}
        </button>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import logo from '../assets/logo.png'
import { defineComponent, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: 'VsHeader',
  setup() {
    const { locale } = useI18n()
    onMounted(() => {
      locale.value = localStorage.getItem('lang') || 'en'
      isDay.value = localStorage.getItem('mode') === 'true' ? true : false
    })
    const isDay = ref(true)
    const setLocale = (lang: string) => {
      locale.value = lang
      localStorage.setItem('lang', lang)
      window.location.reload()
    }
    const toggleDayNight = () => {
      isDay.value = !isDay.value
      localStorage.setItem('mode', `${isDay.value}`)
      window.location.reload()
    }

    return { setLocale, logo, toggleDayNight, isDay }
  }
})
</script>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f0f0;
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: 1px solid #ccc;
  height: 121px;
  right: 0;
  box-sizing: border-box;
  padding: 10px 20px;
}
header.day {
  background-color: #f0f0f0;
  color: #333;
}
header.night {
  background-color: #2c3e50;
  color: #ecf0f1;
}

.logo-container {
  margin-bottom: 10px;
}

.logo {
  height: 60px;
  width: 220px;
}

.bottom-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
  justify-content: center;
}

nav a {
  text-decoration: none;
  color: #e36969;
  font-weight: bold;
}

nav a:hover {
  color: #007bff;
}

.language-switcher {
  display: flex;
  gap: 10px;
}
button {
  height: 25px;
}
.header-right {
  display: flex;
  gap: 0.25rem;
}
</style>
