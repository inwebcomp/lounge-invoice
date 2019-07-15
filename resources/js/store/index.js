import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
   state: {
      client: {
         name: '',
         surName: '',
         address: '',
         city: '',
         postIndx: '',
         country: ''
      },

      invoiceInfo: {
         name: 'Prestige Hotel',
         date: new Intl.DateTimeFormat('ru-RU').format(new Date()),
         time: null
      },

      reservation: {
         roomNumbsList: [],
         roomNumb: null,

         personsCountList: [
            {label: '1', value: 1},
            {label: '2', value: 2},
            {label: '3', value: 3},
            {label: '4', value: 4},
            {label: '5', value: 5},
            {label: '6', value: 6},
            {label: '7', value: 7},
            {label: '8', value: 8},
         ],
         personsCount: null,
         arrival: null,
         departure: null,
         reservationNumb: null,
         extReservationNumb: null,
         cashierNumb: null,
         pageNumb: null,
      },

      services: [],

      defaultServices: [],

      currency: {
         items: [
            {label: 'USD', value: 'USD'},
            {label: 'EUR', value: 'EUR'},
            {label: 'MDL', value: 'MDL'},
         ],
         value: 'EUR'
      },

      textblocks: {}
   },

   getters: {
      getServices (state) {
         return state.services
      },
      getServicesFiled: (state) => (id, field) => {
        return state.services.find(item => item.id === id)[field];
      },
      getClient (state) {
         return state.client
      },
      getReservation (state) {
         return state.reservation
      },
      getInvoiceInfo (state) {
         return state.invoiceInfo
      },
      sumDebit (state) {
         let result = 0;

         state.services.forEach(item => {
            if (! isNaN(+item.debit)) result += +item.debit
         })

         return result;
      },
      sumCredit (state) {
         let result = 0;

         state.services.forEach(item => {
            if (! isNaN(+item.credit)) result += +item.credit
         })

         return result;
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
      updateInvoiceInfoFiled (state, data) {
         state.invoiceInfo[data.field] = data.value
      },
      updateCurrency (state, value) {
         state.currency.value = value
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
      },
      stopEditingAll(state) {
         state.services.forEach(item => {
            item.isEditing = false
         })
      },

      setDefaultServices(state, items) {
         state.defaultServices = items
      },

      setRoomNumbsList(state, items) {
         state.reservation.roomNumbsList = items
      },

      setTextblocks(state, items) {
         state.textblocks = items
      }
   },

   actions: {
      async services ({ commit }) {
         const {data: {data}} = await Vue.axios.get('services')
         commit('setDefaultServices', data)
      },
      async apartments ({ commit }) {
         const {data: {data}} = await Vue.axios.get('apartments')
         commit('setRoomNumbsList', data)
      },
      async textblocks ({ commit }) {
         const {data} = await Vue.axios.get('textblocks')
         commit('setTextblocks', data)
      },
   }
})
