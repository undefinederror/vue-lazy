<script>
export default {
  name: 'VueLazySample', // vue component name
  props: {
    value: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      counter: 5,
      initCounter: 5,
    };
  },
  watch: {
    value: {
      handler(newVal) {
        this.counter = newVal
      },
      immediate: true
    },
    counter() {
      if (this.counter !== this.value){
        this.$emit('input', this.counter)
      }
    }
  }
}
</script>

<template>
  <div class="vue-lazy-sample">
    <p>
      The counter is set to
      <b>{{counter}}</b>.
    </p>
    <button @click="counter += 1">Click +1</button>
    <button @click="counter -= 1">Click -1</button>
    <button @click="counter = initCounter">Reset</button>
  </div>
</template>

<style scoped>
.vue-lazy-sample {
  display: block;
  width: 400px;
  margin: 25px auto;
  border: 1px solid #ccc;
  background: #eaeaea;
  text-align: center;
  padding: 25px;
}
.vue-lazy-sample p {
  margin: 0 0 1em;
}
</style>
