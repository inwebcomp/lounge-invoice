<template>
   <div class="invoice-container">
      <div class="invoice-buttons">
         <el-button v-show="false">Открыть</el-button>
         <el-button type="primary" @click="saveInvoice" :loading="buttonSaveLoading">Сохранить</el-button>
         <el-button type="success" onClick="window.print()">Печать</el-button>
      </div>
      <div class="invoice" id="printarea">
         <div class="invoice__row">
            <img src="img/logo.png" width="150" alt="logo" class="invoice__logo">
         </div>
         <div class="invoice__row">
            <div class="invoice__info">
               <div class="invoice__info-client" >
                  <p>{{ getClient.name }}  {{ getClient.surName }}</p>
                  <p>{{ getClient.city ? `${getClient.city},` : null }} {{ getClient.addres }}</p>
                  <p>{{ getClient.postIndx }}</p>
               </div>

               <div class="invoice__info-hotel">
                  <p><b>Invoice: </b></p>
                  <p>{{ getInvoiceInfo.name }}</p>
                  <p>{{ getInvoiceInfo.date }} <TimeComponent /> </p>
               </div>
            </div>


            <div class="invoice__reservation-info" >
               <p v-if="getReservation.roomNumb">Room №:
                  <span class="invoice__reservation-info__right"> {{ getReservation.roomNumb }}</span>
               </p>
               <p v-if="getReservation.personsCount">No. of person(s):
                  <span class="invoice__reservation-info__right"> {{ getReservation.personsCount }}</span>
               </p>
               <p v-if="getReservation.arival">Arival:
                  <span class="invoice__reservation-info__right"> {{ getReservation.arival }}</span>
               </p>
               <p v-if="getReservation.departure">Departure:
                  <span class="invoice__reservation-info__right"> {{ getReservation.departure }}</span>
               </p>
               <p v-if="getReservation.reservationNumb">Reservation №:
                  <span class="invoice__reservation-info__right"> {{ getReservation.reservationNumb }}</span>
               </p>
               <p v-if="getReservation.extReservationNumb">Ext. Reservation №:
                  <span class="invoice__reservation-info__right"> {{ getReservation.extReservationNumb }}</span>
               </p>
               <p v-if="getReservation.cashierNumb">Cashier №:
                  <span class="invoice__reservation-info__right"> {{ getReservation.cashierNumb }}</span>
               </p>
               <p v-if="getReservation.pageNumb">Page №:
                  <span class="invoice__reservation-info__right"> {{ getReservation.pageNumb }}</span>
               </p>
            </div>
         </div>

         <table class="invoice-table">
            <thead class="invoice-table__header">
               <tr class="invoice-table__row">
                  <th class="invoice-table__cell">Date</th>
                  <th class="invoice-table__cell">Description</th>
                  <th class="invoice-table__cell" v-html="`Debit ${currencySymbl}`"></th>
                  <th class="invoice-table__cell" v-html="`Credit ${currencySymbl}`"></th>
               </tr>
            </thead>
            <tbody class="invoice-table__body">
               <tr class="invoice-table__row" v-for="item in getServices" :key="item.id">
                  <td class="invoice-table__cell">{{ item.date }}</td>
                  <td class="invoice-table__cell">{{ item.nameServices }}</td>
                  <td class="invoice-table__cell">{{ item.debit }}</td>
                  <td class="invoice-table__cell">{{ item.credit }}</td>
               </tr>
               <tr class="invoice-table__row invoice-table__footer">
                  <td class="invoice-table__cell" colspan="2"> Subtotal: </td>
                  <td class="invoice-table__cell">{{ sumDebit }}</td>
                  <td class="invoice-table__cell">{{ sumCredit }}</td>
               </tr>
               <tr class="invoice-table__row invoice-table__footer">
                  <td class="invoice-table__cell" colspan="2"> Balance Due: </td>
                  <td class="invoice-table__cell" colspan="2">{{ balanceDue }}</td>
               </tr>
               <tr class="invoice-table__row">
                  <td class="invoice-table__cell" colspan="2" style="text-align: center"> Total Incl. VAT: </td>
                  <td class="invoice-table__cell" colspan="2">{{ TotalIncVAT }}</td>
               </tr>
            </tbody>
         </table>

         <table class="invoice-small-table">
            <thead class="invoice-table__header">
               <tr class="invoice-table__row">
                  <th class="invoice-table__cell"> </th>
                  <th class="invoice-table__cell">Net</th>
                  <th class="invoice-table__cell">VAT</th>
                  <th class="invoice-table__cell">Total</th>
               </tr>
            </thead>
            <tbody class="invoice-table__body">
               <tr class="invoice-table__row" v-for="item in smallTableData" :key="item.id">
                  <td class="invoice-table__cell" style="width: 55%">{{ item.nameServices }}</td>
                  <td class="invoice-table__cell" style="width: 15%">{{ item.netto }}</td>
                  <td class="invoice-table__cell" style="width: 15%">{{ item.tva }}</td>
                  <td class="invoice-table__cell" style="width: 15%">{{ item.debit }}</td>
               </tr>
            </tbody>
         </table>

         <section class="invoice__requisites">
            <p class="invoice__text" v-for="(item, index) in requisitesText" :key="index">
               {{ item }}
            </p>
         </section>
      </div>
   </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TimeComponent from './TimeComponent';

export default {
   name: 'InvoicePreview',

   components: {
      TimeComponent
   },

   data: () => ({
      buttonSaveLoading: false,

      requisitesText: [
         'Контакты и реквизиты',
      ],

     servicesObjsArr: [],
     tva: 7
   }),

   computed: {
      ...mapGetters([
         'getServices',
         'getClient',
         'getReservation',
         'getInvoiceInfo',
         'sumDebit',
         'sumCredit'
      ]),

      balanceDue() {
         return this.sumDebit - this.sumCredit
      },
      TotalIncVAT() {
         return this.sumDebit
      },
      currencySymbl() {
         switch(this.$store.state.currency.value) {
            case 'EUR':
               return '<span>&#8364;</span>'
               break
            case 'USD':
               return '<span>&#36;</span>'
               break
            default:
               return this.$store.state.currency.value
               break
         }
      },

      smallTableData() {
         const namesArr = []
         this.servicesObjsArr = []

         this.getServices.forEach(item => {
            if ( namesArr.indexOf(item.nameServices) < 0 && item.nameServices !== null) {
               namesArr.push(item.nameServices)
            }
         })

         namesArr.forEach(itemName => {
            const tvaServicesObj = {
               nameServices: null,
               debit: 0,
               netto: 0,
               tva: 0
            }

            this.getServices.forEach(item => {
               if (item.nameServices === itemName) {
                  tvaServicesObj.nameServices = item.nameServices;
                  tvaServicesObj.debit += +item.debit
                  tvaServicesObj.netto = +tvaServicesObj.debit * (1 - this.tva / 100)
                  tvaServicesObj.netto = +tvaServicesObj.netto.toFixed(2)
                  tvaServicesObj.tva = +tvaServicesObj.debit - tvaServicesObj.netto
                  tvaServicesObj.tva = +tvaServicesObj.tva.toFixed(2)
               }
            })

            this.servicesObjsArr.push(tvaServicesObj)
         })

         return this.servicesObjsArr;
      },
   },

   methods: {
      saveInvoice() {
         if (this.buttonSaveLoading) {
            return false;
         }

         this.buttonSaveLoading = true;

         const element = document.getElementById('printarea');
         const opt = {
            margin: [5, 10, 0, 10],
            filename:     'invoice.pdf',
            image:        { type: 'jpeg', quality: 1 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait', putOnlyUsedFonts:false }
         }

         html2pdf(element, opt)
            .then(() => {
                  this.buttonSaveLoading = false;
               }
            )
      }
   }
};
</script>

