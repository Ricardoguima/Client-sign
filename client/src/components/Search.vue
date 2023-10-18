<template>
    <h1>Search</h1>
    <label for="search">
  Type your name to search
</label>

<input
  type="text"
  id="search"
  placeholder="Type here..."
  v-model="searchTerm"
>
<h2>{{ searchTerm }}</h2>


</template>

<script>
import countries from 'countries.json'
import {ref, computed} from 'vue'

export default {
  setup() {
    let searchTerm = ref('')

    const searchCountries = computed(() => {
      if (searchTerm.value === '') {
        return []
      }

      let matches = 0

      return countries.filter(country => {
        if (country.name.toLowerCase().includes(searchTerm.value.toLowerCase()) && matches < 10) {
          matches++
          return country
        }
      })
    });

    const selectCountry = (country) => {
      selectedCountry.value = country
      searchTerm.value = ''
    }

    let selectedCountry = ref('')

    return {
      countries,
      searchTerm,
      searchCountries,
      selectCountry,
      selectedCountry
    }
  }
}
</script>