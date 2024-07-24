<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import VsHeader from './components/vs-header.vue'
import VsWeather from './components/vs-weather.vue'

export default {
  components: { VsHeader, VsWeather }
}

//loader
//day or nigth
//deploytments

//api in env
//watch on
//week remake
</script>

<template>
  <div>
    <VsHeader />
    <router-view />
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
</style>
