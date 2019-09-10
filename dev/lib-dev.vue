<script>
import { lazyInput } from '../src/entry'
import VueLazyInputSample from './vue-lazy-input-sample.vue';

export default {
  name: 'VueLazyLibDev', // vue library dev component
  components: {
    VueLazyInputSample,
  },
  directives: {
    lazyInput
  },
  data() {
    return {
      range: 2,
      counter: 5
    }
  }
}
</script>

<template>
  <div class="vue-lazy-input-lib-dev">
    <div>
      <p>html element</p>
      <code>&lt;input type="range" v-model="range" v-lazy-input/></code>
      <p>value in parent: {{range}}</p>
      <input type="range" v-model="range" v-lazy-input />
    </div>
    <div>
      <p>custom component</p>
      <code>&lt;vue-lazy-input-sample v-model="counter" v-lazy-input/></code>
      <p>value in parent: {{counter}}</p>
      <vue-lazy-input-sample v-model="counter" v-lazy-input />
    </div>
  </div>
</template>

<style scoped>
.vue-lazy-input-lib-dev {
  display: block;
  width: 400px;
  margin: 25px auto;
  font-family: consolas;
}
.vue-lazy-input-lib-dev input{
  width:100%;
}
.vue-lazy-input-lib-dev > div {
  padding: 2em 0;
}
</style>
