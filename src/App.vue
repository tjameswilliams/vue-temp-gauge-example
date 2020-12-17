<template>
  <div id="app">
    <template v-if="viewState == 'ready'">
      <Weather :weather-data="lastWeatherResponse" />
      <city-input @update="updateSearch" />
    </template>
    <template v-if="viewState == 'error'">
      <p className="error">{{lastWeatherResponse.error}}</p>
      <button @click="goBack()">go back</button>
    </template>
    <loading-spinner v-if="viewState == 'loading'"></loading-spinner>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Weather from './components/Weather.vue'
import CityInput from './components/CityInput.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'
import { WeatherInterface } from './types/Weather.Interface'
import { WeatherErrorInterface } from './types/WeatherError.Interface'
import { GeoQueryInterface } from './types/GeoQuery.Interface'
import { SearchInterface } from './types/Search.Interface'
import OpenWeatherAdaptor from './services/OpenWeatherAdaptor'

@Component({
  components: {
    Weather,
    CityInput,
    LoadingSpinner
  }
})
export default class App extends Vue {
  viewState = 'ready';
  requestHistory: Array<GeoQueryInterface | SearchInterface> = [];
  weatherHistory: Array<WeatherInterface | WeatherErrorInterface> = [{
    locale: 'Mountain View',
    currentTemp: 46.36,
    high: 48.99,
    low: 44.01,
    condition: 'broken clouds'
  }];

  created () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        if (pos.coords && pos.coords.longitude) {
          this.updateGeoPosition({
            params: [pos.coords.longitude, pos.coords.latitude]
          })
        }
      })
    }
  }

  async updateGeoPosition (search: GeoQueryInterface) {
    this.viewState = 'loading'
    const wa = new OpenWeatherAdaptor()
    try {
      const response = await wa.getWeather('geo', search.params)
      this.weatherHistory.push(response)
      this.viewState = 'ready'
    } catch (e) {
      this.weatherHistory.push({
        error: e
      } as WeatherErrorInterface)
      this.viewState = 'error'
    }
  }

  get lastRequest (): GeoQueryInterface|SearchInterface|null {
    return this.requestHistory[this.requestHistory.length - 1]
  }

  get lastWeatherResponse (): WeatherInterface|WeatherErrorInterface|null {
    return this.weatherHistory[this.weatherHistory.length - 1]
  }

  async updateSearch (search: SearchInterface): Promise<void> {
    this.viewState = 'loading'
    const wa = new OpenWeatherAdaptor()
    try {
      const response = await wa.getWeather('city', search.params)
      this.weatherHistory.push(response)
      this.viewState = 'ready'
    } catch (e) {
      this.weatherHistory.push({
        error: e
      } as WeatherErrorInterface)
      this.viewState = 'error'
    }
  }

  goBack () {
    if (this.weatherHistory.length > 1) {
      this.weatherHistory.pop()
      this.viewState = 'ready'
    }
  }
}
</script>

<style>
body, #app {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
}
</style>
