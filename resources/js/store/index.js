import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
   state: {
      client: {
         name: '',
         surName: '',
         addres: '',
         city: '',
         postIndx: null
      }
   },
   getters: {
      getClientFiled (state, field) {
         return state.client[field]
      }
   },
   mutations: {
      updateClientFiled (state, data) {
         state.client[data.field] = data.value
      }
   },
   actions: {

   }
})
