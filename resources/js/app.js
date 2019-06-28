import './bootstrap'
import Vue from 'vue'
import store from './store/'
import Translator from './services/Translator'
import { Button, Select, Option, Row, Col, Icon, Form, FormItem, Tabs, TabPane, Input, InputNumber, Table, Autocomplete, DatePicker, TimePicker} from 'element-ui';
//import DatePicker from 'vue2-datepicker'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

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

locale.use(lang)

Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Select)
Vue.use(Icon)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Table)
Vue.use(Option)
Vue.use(DatePicker, { locale })
Vue.use(TimePicker, { locale })
Vue.use(Autocomplete)

new Vue({
   store,
   render: h => h(App)
}).$mount('#app')
