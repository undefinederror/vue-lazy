<script>
import { VueLazySample } from './entry';
export default {
    name:  'VueLazyLibDev', // vue library dev component
    components: {
        VueLazySample,
    },
}
</script>

<template>
    <div class="vue-lazy-lib-dev">
        <vue-lazy-sample></vue-lazy-sample>
    </div>
</template>

<style scoped>
    .vue-lazy-lib-dev {
        display: block;
        width: 400px;
        margin: 25px auto;
    }
</style>
