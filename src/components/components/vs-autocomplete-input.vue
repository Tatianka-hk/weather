<template>
  <div class="vs-autocomplete-input nyan">
    <input
      type="text"
      v-model="query"
      @input="onInput"
      @focus="showSuggestions = true"
      @blur="hideSuggestions"
      :placeholder="$t('autocomplete')"
    />
    <ul v-if="showSuggestions && suggestions.length">
      <li
        v-for="(suggestion, index) in suggestions"
        :key="index"
        @mousedown="selectSuggestion(suggestion)"
      >
        {{ suggestion.name }}, {{ suggestion.sys.country }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'
// import 'dotenv/config'

export default defineComponent({
  name: 'VsAutocompleteInput',
  data() {
    return {
      query: '',
      suggestions: [],
      showSuggestions: false
    }
  },
  methods: {
    async citySuggestions(query: string) {
      const API_KEY = 'd66b587ec053ca4ba840017f7db007f3'
      try {
        const lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en'
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${query}&units=metric&lang=${lang}&appid=${API_KEY}`
        )
        return response.data.list
      } catch (err) {
        console.log(err)
      }
    },
    async onInput() {
      if (this.query.length > 2) {
        this.suggestions = await this.citySuggestions(this.query)
      } else {
        this.suggestions = []
      }
    },
    selectSuggestion(suggestion: string) {
      this.query = `${suggestion.name}, ${suggestion.sys.country}`
      this.$emit('selected', suggestion)
      this.showSuggestions = false
    },
    hideSuggestions() {
      setTimeout(() => {
        this.showSuggestions = false
      }, 100)
    }
  }
})
</script>
<style scoped lang="scss">
.vs-autocomplete-input.nyan {
  width: 249px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  font-family: 'Roboto', sans-serif;
}

.vs-autocomplete-input.nyan input {
  width: 100%;
  border: none;
  outline: none;
}

.vs-autocomplete-input.nyan ul {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
}

.vs-autocomplete-input.nyan li {
  padding: 10px;
  cursor: pointer;
}

.vs-autocomplete-input.nyan li:hover {
  background-color: #f2f2f2;
}
</style>
