# vue-lazy 

A Vue.js directive for lazily binding @input events


---

## Table of contents

- [Installation](#installation)
- [Defaults](#defaults)
- [Example usage](#example-usage)

---

## Installation

### bundler
```npm install vue-lazy```

### browser
```
  <script src="https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js"></script>
  <script src="https://unpkg.com/lodash@4.17.15/lodash.min.js"></script>
  <script src="file:///D:/Git/vue-lazy/dist/vue-lazy.min.js"></script>
```
---

## Defaults

```js
{
    user: null,
    pass: null,
    output: 'json', // xml not supported
    type:'item', // (doPurge): item || wildcard || all
    mailTo: [''], // (status): array of emails to receive flush notifications
    servicearea: 'US',
    openStatusPage:false // (status): open flush status page in browser
}
```

---

## Example usage

```js
var cdn=require('cdnetworks')({
    user:'my@email.com',
    pass:'secret',
    emailTo:['my@email.com']
});

var pidArr = [];

cdn.doPurge({
    type: 'wildcard',
    pad: 'that.domain.com',
    path: ['/some/path/*']
})
.then(function (res) {
    pidArr.push(res.pid);
    console.log(res);
    return cdn.doPurge({
        pad: 'that.otherdomain.com',
        path: ['/stuff/to/purge.js']
    })
})
.then(function (res) {
    pidArr.push(res.pid);
    console.log(res);
    cdn.setValues({ openStatusPage: true });
    pidArr.forEach(function (idx, pid) {
        cdn.status(pid);
    });
})
.catch(function (err) {
    console.log(err)
})
```