export default class OpenWeatherService {
  appid = '...';
  apiDomain = 'https://api.openweathermap.org/data/2.5/';

  async getWeatherForGeo (lon: number, lat: number) {
    const endpointUrl: URL = new URL(this.apiDomain)
    endpointUrl.pathname += 'weather'
    endpointUrl.search = new URLSearchParams({
      appid: this.appid,
      lat: lat,
      lon: lon,
      units: 'imperial'
    } as any).toString()
    const response = await fetch(endpointUrl.toString())
    const json = await response.json()
    return json
  }

  async getWeatherForCity (city: string) {
    const endpointUrl = new URL(this.apiDomain)
    endpointUrl.pathname += 'weather'
    endpointUrl.search = new URLSearchParams({
      appid: this.appid,
      q: city,
      units: 'imperial'
    }).toString()
    const response = await fetch(endpointUrl.toString())
    const json = await response.json()
    return json
  }
}
