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

      invoiceInfo: {
         name: 'Raddison Blu Hotel',
         date: null,
         time: null
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

      currency: {
         items: [
            {label: 'USD', value: 'USD'},
            {label: 'EUR', value: 'EUR'},
            {label: 'MDL', value: 'MDL'},
         ],
         value: 'EUR'
      }
   },

   getters: {
      getServices (state) {
         return state.services
      },
      getServicesFiled: (state) => (id, field) => {
        return state.services.find(item => item.id === id)[field];
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
      }
   },

   actions: {

   }
})
