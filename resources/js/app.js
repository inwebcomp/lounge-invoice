import './bootstrap'
import Vue from 'vue'
import Translator from './services/Translator'

// components

// mixins
let Lang = new Translator({});

Vue.mixin({
    methods: {
        __: function(...args) {
            return Lang.get(...args);
        }
    }
});

new Vue({
    el: '#app',
});