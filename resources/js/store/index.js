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
      },

      reservation: {
         roomNumbsList: [
            {label: 'option11', value: 'roomNumb111'},
            {label: 'option22', value: 'roomNumb2221'},
            {label: 'option33', value: 'roomNumb333'},
         ],
         roomNumb: null,

         personsCountList: [
            {label: '1', value: 1},
            {label: '2', value: 2},
            {label: '3', value: 3},
            {label: '4', value: 4},
         ],
         personsCount: null,
         arival: null,
         departure: null,
         reservationNumb: null,
         extReservationNumb: null,
         cashierNumb: null,
         pageNumb: null,
      },

      services: [],
   },
   getters: {
      getClientFiled (state, field) {
         return state.client[field]
      },
      getReservationFiled (state, field) {
         return state.reservation[field]
      },
      getServices (state) {
         return state.services
      },
      getServicesFiled: (state) => (id, field) => {
        return state.services.find(item => item.id === id)[field];
      }
   },
   mutations: {
      updateClientFiled (state, data) {
         state.client[data.field] = data.value
      },
      updateReservationFiled (state, data) {
         state.reservation[data.field] = data.value
      },
      updateServicesFiled (state, data) {
         state.services.forEach(item => {
            if (item.id === data.id) {
               item[data.field] = data.value
            }
         })
      },


      addService(state, data) {
         state.services.push(data)
      },
      removeService(state, id) {
         state.services.forEach((item, index) => {
            if (item.id === id) {
               state.services.splice(index, 1)
            }
         })
      },
      toggleEditing(state, id) {
         state.services.forEach(item => {
            if (item.id === +id) {
               item.isEditing = ! item.isEditing
            }
         })
      }
   },
   actions: {

   }
})
