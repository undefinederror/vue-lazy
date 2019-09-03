<script>
import { lazy } from '../src/entry'
import VueLazySample from './vue-lazy-sample.vue';
export default {
  name: 'VueLazyLibDev', // vue library dev component
  components: {
    VueLazySample,
  },
  directives: {
    lazy
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
  <div class="vue-lazy-lib-dev">
    <div>
      <p>html element</p>
      <code>&lt;input type="range" v-model="range" v-lazy/></code>
      <p>value in parent: {{range}}</p>
      <input type="range" v-model="range" v-lazy />
    </div>
    <div>
      <p>custom component</p>
      <code>&lt;vue-lazy-sample v-model="counter" v-lazy/></code>
      <p>value in parent: {{counter}}</p>
      <vue-lazy-sample v-model="counter" v-lazy />
    </div>
  </div>
</template>

<style scoped>
.vue-lazy-lib-dev {
  display: block;
  width: 400px;
  margin: 25px auto;
  font-family: consolas;
}
.vue-lazy-lib-dev input{
  width:100%;
}
.vue-lazy-lib-dev > div {
  padding: 2em 0;
}
</style>
