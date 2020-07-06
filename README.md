# vue-lazy-input

A Vue.js directive for lazily binding @input events (v-model)

```html
<input type="range" v-model="val" v-lazy-input:debounce="700"/>
```

---

## Table of contents

- [Installation](#installation)
- [What it does](#what-it-does)
- [Syntax](#syntax)
- [Example usage](#example-usage)

---

## Installation

#### bundler
```npm i --save vue-lazy-input```

#### browser
```html
  <script src="https://unpkg.com/lodash/lodash.min.js"></script><!-- dependency -->
  <script src="https://unpkg.com/vue-lazy-input"></script>
```

---
## What it does

It wraps existing @input event listeners bound on a custom component or DOM element with either lodash debounce or throttle.

v-lazy-input must be coupled with either a **v-model** directive or an **@input** event listener, or both. On its own it does nothing.

---
## Syntax

```js
v-lazy-input:[type]="duration"
```

**type** is either _debounce_, _throttle_ or _sync_ (fires immediately), default is _debounce_.

**duration** is a number, default is _500_.

Hence ```v-lazy-input``` with no type nor duration is equivalent to ```v-lazy-input:debounce="500"```

---
## Example usage

```html
<template>
  <input type="range" v-model="val" v-lazy-input:debounce="700"/>
</template>

<!-- with global registration -->
<script>
import VueLazyInput from 'vue-lazy-input'
import Vue from 'vue'
Vue.use(VueLazyInput)

export default {
  data(){
    return {
      val:42
    }
  }
}
</script>

<!-- with local registration -->
<script>
import {lazyInput} from 'vue-lazy-input'
import Vue from 'vue'

export default {
  data(){
    return {
      val:42
    }
  },
  directives:{
    lazyInput
  }
}
</script>

```
