<template>
    <nav class="languages">
        <a href="/" class="languages__item" :class="{'active': language == 'ru'}">Русский</a>
        <a href="/ro" class="languages__item" :class="{'active': language == 'ro'}">Română</a>
        <a href="/en" class="languages__item" :class="{'active': language == 'en'}">English</a>
    </nav>
</template>

<script>
    export default {
        name: "Languages",

        data() {
            return {
                language: App.locale
            }
        },
    }
</script>
