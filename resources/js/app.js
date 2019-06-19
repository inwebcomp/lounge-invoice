import './bootstrap'
import Vue from 'vue'
import store from './store/'
import Translator from './services/Translator'
import Antd from 'ant-design-vue'

// components
import App from './App.vue'

// mixins
let Lang = new Translator({});

Vue.mixin({
    methods: {
        __: function(...args) {
            return Lang.get(...args);
        }
    }
});

Vue.use(Antd)

new Vue({
   store,
   components: { Antd },
   render: h => h(App)
}).$mount('#app')
