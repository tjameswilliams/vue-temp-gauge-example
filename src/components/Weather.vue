<template>
  <div class="wrap">
    <div class="thermometer">
      <svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://web.resource.org/cc/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:svg="http://www.w3.org/2000/svg" id="svg2" viewBox="0 0 256 512" version="1.0"
        style="max-width: 120px">
        <g id="layer1">
          <g id="g3030">
            <g id="g2984" stroke="#000" stroke-width="4" fill="none">
              <path id="path2931" d="m80 64h48"/>
              <path id="path2935" d="m80 384h48"/>
              <path id="path2937" d="m80 224h48"/>
              <path id="path2939" d="m80 192h16"/>
              <path id="path2941" d="m80 160h16"/>
              <path id="path2943" d="m80 128h16"/>
              <path id="path2945" d="m80 96h16"/>
              <path id="path2947" d="m80 256h16"/>
              <path id="path2949" d="m80 288h16"/>
              <path id="path2951" d="m80 320h16"/>
              <path id="path2953" d="m80 352h16"/>
            </g>
            <g id="g3023">
              <rect id="rect2922" rx="16" ry="16" height="416" width="32" y="32" x="48" fill="#eeeeec"/>
              <rect id="rect3021" rx="0" ry="0" height="64" width="32" y="384" x="48" :fill="tempAsColor"/>
              <path id="path2924" :fill="tempAsColor" d="m96 448a32 32 0 1 1 -64 0 32 32 0 1 1 64 0z"/>
              <rect id="mercury" transform="scale(-1 -32)" rx="0" ry="0" :height="tempAsHeight" width="32" y="-12" x="-80" :fill="tempAsColor"/>
              <path id="rect2968" stroke-linejoin="round" d="m64 32c-8.864 0-16 7.136-16 16v372.28c-9.564 5.54-16 15.88-16 27.72 0 17.66 14.336 32 32 32s32-14.34 32-32c0-11.84-6.436-22.18-16-27.72v-372.28c0-8.864-7.136-16-16-16z" stroke="#000" stroke-linecap="round" stroke-width="4" fill="none"/>
            </g>
            <text id="low" font-size="20px" xml:space="preserve" transform="scale(.99840 1.0016)" y="383.38419" x="136.21846" font-family="Bitstream Vera Sans" line-height="125%" fill="black">
              <tspan id="tspan3003" y="383.38419" x="136.21846">0°F</tspan>
            </text>
            <text id="middle" font-size="20px" xml:space="preserve" line-height="125%" y="224" x="136" font-family="Bitstream Vera Sans" fill="black">
              <tspan id="tspan3011" y="224" x="136">50°F</tspan>
            </text>
            <text id="high" font-size="20px" xml:space="preserve" line-height="125%" y="63.830078" x="135.32617" font-family="Bitstream Vera Sans" fill="black">
              <tspan id="tspan3007" y="63.830078" x="135.32617">100°F</tspan>
            </text>
          </g>
        </g>
      </svg>
    </div>
    <div className="readout">
      <h2>{{weatherData.locale}}</h2>
      <h1>{{Math.round(weatherData.currentTemp)}}<small><sup>°F</sup></small></h1>
      <h3>{{weatherData.condition}}</h3>
      <p>
        <span>high: {{Math.round(weatherData.high)}}<small><sup>°F</sup></small></span><br />
        <span>low: {{Math.round(weatherData.low)}}<small><sup>°F</sup></small></span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { WeatherInterface } from '../types/Weather.Interface'

@Component
export default class Weather extends Vue {
  @Prop()
  weatherData!: WeatherInterface;

  get tempAsHeight () {
    return this.weatherData.currentTemp * 0.1
  }

  get tempAsColor () {
    const hue = 200 + (160 * (this.weatherData.currentTemp / 100))
    return `hsl(${hue}, 100%, 50%)`
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap {
  display: flex;
  align-items: center;
}

.readout {
  text-align: left;
}

.readout h1, .readout h2 {
  margin: 0;
}

.readout h1 {
  font-size: 2.75em;
  font-weight: 900;
}

.readout h1 sup {
  font-weight: 300;
}

.thermometer {
  width: 110px;
}
</style>
