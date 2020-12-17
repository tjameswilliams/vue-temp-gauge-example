<template>
  <form v-on:submit.prevent="handleSubmit()">
    <input type="text" v-model="stateValue" placeholder="type in a city name" />
    <input type="submit" value="update" />
  </form>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Weather extends Vue {
  stateValue = '';

  handleSubmit () {
    if (this.stateValue.trim().length) {
      this.$emit('update', {
        params: [this.stateValue]
      })
      this.stateValue = ''
    }
  }
}
</script>

<style>
form {
  display: flex;
}

input, button {
  font-size: 1em;
  padding: .25rem .5rem;
  border-radius: 0;
}

input[type="text"] {
  border: 1px solid #ccc;
  border-right: 0;
  flex-grow: 1;
}

input[type="submit"], button {
  border: 1px solid #005c9e;
  background-color: #0077cc;
  color:white;
}
</style>
