<template>
   <div class="invoice-container">
      <div class="invoice-buttons">
         <el-button>Открыть</el-button>
         <el-button type="primary" @click="saveInvoice" :loading="buttonSaveLoading">Сохранить</el-button>
         <el-button type="success" onClick="window.print()">Печать</el-button>
      </div>
      <div class="invoice" id="printarea">
         <div class="invoice__row">
            <img src="img/logo.svg" width="150" alt="logo" class="invoice__logo">
         </div>
         <div class="invoice__row">
            <div class="invoice__info">
               <div class="invoice__info-client" >
                  <p>{{ clientObj.name || 'Name' }}  {{ clientObj.surName || 'Surname' }}</p>
                  <p>{{ clientObj.city ? `${clientObj.city},` : 'City,' }} {{ clientObj.addres || 'Address'}}</p>
                  <p>{{ clientObj.postIndx || 'Post Index'}}</p>
               </div>

               <div class="invoice__info-hotel">
                  <p><b>Invoice: </b> {{ invoiceInfo.name }}</p>
                  <p><b>Data: </b> {{ invoiceInfo.date || '-'}}</p>
                  <p><b>Time: </b> {{ invoiceInfo.time || '-'}}</p>
               </div>
            </div>


            <div class="invoice__reservation-info" >
               <p>Room No.
                  <span class="invoice__reservation-info__right">: {{ reservationObj.roomNumb }}</span>
               </p>
               <p>No. of person(s)
                  <span class="invoice__reservation-info__right">: {{ reservationObj.personsCount }}</span>
               </p>
               <p>Arival
                  <span class="invoice__reservation-info__right">: {{ reservationObj.arival }}</span>
               </p>
               <p>Departure
                  <span class="invoice__reservation-info__right">: {{ reservationObj.departure }}</span>
               </p>
               <p>Reservation No.
                  <span class="invoice__reservation-info__right">: {{ reservationObj.reservationNumb }}</span>
               </p>
               <p>Ext. Reservation No.
                  <span class="invoice__reservation-info__right">: {{ reservationObj.extReservationNumb }}</span>
               </p>
               <p></p>
               <p>Cashier No.
                  <span class="invoice__reservation-info__right">: {{ reservationObj.cashierNumb }}</span>
               </p>
               <p>Page No.
                  <span class="invoice__reservation-info__right">: {{ reservationObj.pageNumb }}</span>
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
               <tr class="invoice-table__row" v-for="item in servicesObj" :key="item.id">
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
                  <td class="invoice-table__cell" style="width: 15%">{{ item.tva }}%</td>
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
export default {
   name: 'InvoicePreview',

   data: () => ({
      buttonSaveLoading: false,

      requisitesText: [
         'DeepL для перевода Ваших текстов с веб-сервис, который переводит',
         'мобильный и веб-сервис, который переводит',
         'мобильный и веб-сервис, который переводит оторый перевод',
      ],

     servicesObjsArr: [],
     tva: 7
   }),

   computed: {
      clientObj() {
         return this.$store.state.client
      },
      reservationObj() {
         return this.$store.state.reservation
      },
      invoiceInfo() {
         return this.$store.state.invoiceInfo
      },
      servicesObj() {
         return this.$store.getters.getServices
      },
      sumDebit() {
         return this.$store.getters.sumDebit
      },
      sumCredit() {
         return this.$store.getters.sumCredit
      },
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

         this.servicesObj.forEach(item => {
            if ( namesArr.indexOf(item.nameServices) < 0 && item.nameServices !== null) {
               namesArr.push(item.nameServices)
            }
         })

         namesArr.forEach(itemName => {
            const tvaServicesObj = {
               nameServices: null,
               debit: 0,
               netto: 0,
               tva: this.tva
            }

            this.servicesObj.forEach(item => {
               if (item.nameServices === itemName) {
                  tvaServicesObj.nameServices = item.nameServices;
                  tvaServicesObj.debit += +item.debit
                  tvaServicesObj.netto = +tvaServicesObj.debit * (1 - tvaServicesObj.tva / 100)
                  tvaServicesObj.netto = +tvaServicesObj.netto.toFixed(2)
               }
            })

            this.servicesObjsArr.push(tvaServicesObj)
         })

         return this.servicesObjsArr;
      }
   },

   methods: {
      saveInvoice() {
         if (this.buttonSaveLoading) {
            return false;
         }

         this.buttonSaveLoading = true;

         const element = document.getElementById('printarea');
         const opt = {
            margin:       1,
            filename:     'invoive.pdf',
            image:        { type: 'png', quality: 1 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
         }

         html2pdf(element, opt)
            .then(() => {
                  this.buttonSaveLoading = false;
               }
            )
      }
   },
};
</script>

<style lang="scss">

.invoice-table {
   width: 100%;

   &__header {
      tr {
         border-top: none;
         border-bottom: 2px solid #dee2e6;
      }

      .invoice-table__cell {
         font-weight: 500;
         font-size: 1.5rem;
         text-align: left;
      }
   }

   &__row {
      border-top: 1px solid #dee2e6;
   }

   &__cell {
      padding: 9px 5px 10px;
      font-weight: normal;
      font-size: 1.3rem;
      vertical-align: middle;

      &:nth-child(1) {
         width: 20%;
      }
      &:nth-child(2) {
         //width: 50%;
      }
      &:nth-child(3) {
         width: 15%;
      }
      &:nth-child(4) {
         width: 15%;
      }
   }

   &__footer {
      .invoice-table__cell {
         font-weight: 700;
      }
   }
}

.invoice-small-table {
   width: 60%;
   margin-left: auto;
}

.invoice-container {
   width: 100%;
   max-width: 600px;
   margin: 0 auto;
   padding: 50px 0 100px;
}

.invoice-buttons {
   display: flex;

   .el-button {
      &:first-of-type {
         margin-right: auto;
      }
      &:last-of-type {
         margin-left: 16px * 0.5;
      }
   }
}

.invoice {
   background-color: #fff;
   width: 100%;
   margin-top: 16px;
   padding: 16px;
   font-size: 1.3rem;
   font-weight: 500;
   box-shadow: 2px 2px 10px -2px rgba(0,0,0,0.75);

   &__text {
      margin: 3px 0;
   }

   &__row {
      margin-bottom: 16px * 2;

      &:after {
         content: "";
         display: table;
         clear: both;
      }
   }

   &__info {
      float: left;

      p {
         margin: 3px 0;
      }
   }

   &__info-client {
      padding-left: 25px;
      margin-bottom: 32px;
   }

   &__reservation-info {
      padding: 0;
      float: right;
      font-weight: normal;
      min-width: 180px;
      max-width: 250px;


      p {
         margin: 3px 0;
         display: flex;
      }

      &__right {
         text-align: right;
         margin-left: auto;
      }
   }

   .text-bold {
      font-weight: 700;
   }

   &__logo {
      float: right;
   }

   &__requisites {
      margin-top: 32px;

      .invoice__text {
         text-align: center;
      }
   }
}

@media print {
  body * {
      visibility: hidden;
   }

   #printarea, #printarea * {
      visibility: visible;
   }

   #printarea {
      width: 100%;
      display: block;
      position: absolute;
      left: 0;
      top: 0;
   }

   .invoice-preview-box {
      position: static;
   }
}
</style>

