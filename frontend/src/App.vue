<template>
    <div>

    </div>
</template>

<script>
import {translateDefaultStrings} from "./helper";

export default {
    name: "App",
    watch: {
        "$i18n.locale"() {
            console.log(123)
            localStorage.setItem('lang', this.$i18n.locale)
            translateDefaultStrings(this.$primevue, this.$t)
        }
    },
}
</script>

<style lang="scss">
@import './App.scss';
@import './assets/demo/badges.scss';
</style>
