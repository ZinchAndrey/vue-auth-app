<template>
  <!-- <base-dialog :show="!!error" title="Oops, error!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog> -->

  <div v-if="isLoading">
    <the-loader />
    <!-- <base-spinner></base-spinner> -->
  </div>
  <div v-else-if="countriesWasLoaded" class="countries__wrapper">
    <h1 class="countries__header">
      Here you can read the info about countries you want visit to
    </h1>
    <ul class="countries__list">
      <li v-for="country in countries" :key="country.name">
        <country-item :country="country"></country-item>
      </li>
    </ul>
  </div>
</template>

<script>
import CountryItem from "@/components/countries/CountryItem.vue";
import TheLoader from '@/components/UI/TheLoader.vue'

export default {
  components: {
    CountryItem,
    TheLoader
  },
  data() {
    return {
      countries: [],
      isLoading: false,
      error: null,
    };
  },
  computed: {
    countriesWasLoaded() {
      return !!this.countries.length;
    },
  },
  methods: {
    async loadCountriesData() {
      const response = await fetch('https://restcountries.com/v2/region/europe');
      const responseData = await response.json();

      const loadedCountries = responseData;

      const countries = [];

      loadedCountries.forEach(country => {
        const filteredCountryData = {
          name: country.name,
          population: country.population,
          capital: country.capital,
          nativeName: country.nativeName,
          region: country.region,
          subRegion: country.subregion,
          languages: country.languages,
          currencies: country.currencies,
          borderCountries: country.borders,
          flagSrc: country.flag,
          topLevelDomain: country.topLevelDomain,
          key: country.name,
        }

        countries.push(filteredCountryData);
      });

      // this.countries = countries;
      this.countries = countries.slice(0, 10);
      window.countries = countries.slice(0, 10);
    },
    async loadCountries() {

      this.isLoading = true;

      try {
        await this.loadCountriesData();
      } catch (error) {
        this.error = error.message || "Sorry, we have an error";
      }

      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    if (!this.countriesWasLoaded) {
      this.loadCountries();
    }
  },
};
</script>

<style scoped>
.countries__wrapper {
  width: 100%;
  padding: 30px 10px;
}

.countries__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 263px);
  justify-content: center;
  gap: 50px;
  list-style: none;
  padding: 24px 20px;
  margin: 0 auto;
  width: 100%;
}

.countries__header {
  font-size: 28px;
  line-height: 120%;
  font-weight: 700;
  color: var(--white-color);

  text-align: center;
  margin: 0 auto 20px;
}

.message {
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  color: inherit;
}

@media (max-width: 768px) {
  .countries__list {
    gap: 40px;
    justify-content: center;
  }
}
</style>