import OpenWeatherService from './OpenWeatherService'
import { WeatherInterface } from '../types/Weather.Interface'

export default class OpenWeatherAdaptor {
  translateOutput (response: any): WeatherInterface {
    if (response.message) {
      throw new Error('We are temporarily unable to get weather data, please check back soon!')
    } else {
      return {
        locale: response.name,
        currentTemp: response.main.temp,
        high: response.main.temp_max,
        low: response.main.temp_min,
        condition: response.weather[0].description
      }
    }
  }

  async getWeather (byWhat: string, args: Array<any>): Promise<WeatherInterface> {
    const ws = new OpenWeatherService()
    let response
    if (byWhat === 'city') {
      response = await ws.getWeatherForCity(args[0])
    } else {
      response = await ws.getWeatherForGeo(args[0], args[1])
    }
    return this.translateOutput(response)
  }
}
