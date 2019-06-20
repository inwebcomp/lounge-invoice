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
            <div class="invoice__info" >
               <p>{{ clientObj.name }}  {{ clientObj.surName }}</p>
               <p>{{ clientObj.city ? `${clientObj.city},` : null }} {{ clientObj.addres }}</p>
               <p>{{ clientObj.postIndx }}</p>
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

         <p class="invoice__text text-bold">Invoice</p>

         <div class="">
            <table class="invoice-table">
               <thead class="invoice-table__header">
                  <tr class="invoice-table__row">
                     <th class="invoice-table__cell">Header1</th>
                     <th class="invoice-table__cell">Header2</th>
                     <th class="invoice-table__cell">Header3</th>
                     <th class="invoice-table__cell">Header4</th>
                  </tr>
               </thead>
               <tbody class="invoice-table__body">
                  <tr class="invoice-table__row" v-for="(item, index) in data" :key="index">
                     <td class="invoice-table__cell">{{ item.money }}</td>
                     <td class="invoice-table__cell">{{ item.name }}</td>
                     <td class="invoice-table__cell">{{ item.money }}</td>
                     <td class="invoice-table__cell">{{ item.money }}</td>
                  </tr>
                  <tr class="invoice-table__row invoice-table__footer">
                     <td class="invoice-table__cell" colspan="2"> Subtotal </td>
                     <td class="invoice-table__cell"> 12496</td>
                     <td class="invoice-table__cell"> 12496</td>
                  </tr>
                  <tr class="invoice-table__row invoice-table__footer">
                     <td class="invoice-table__cell" colspan="2"> Balance Due: </td>
                     <td class="invoice-table__cell" colspan="2"> 12496</td>
                  </tr>
                  <tr class="invoice-table__row">
                     <td class="invoice-table__cell" colspan="2" style="text-align: center"> Total Incl. VAT </td>
                     <td class="invoice-table__cell" colspan="2"> 12496</td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
   </div>
</template>

<script>

const data = [{
  key: '1',
  name: 'John Brown',
  money: '￥300,000',
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  money: '￥1,256,000',
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  money: '￥120,000',
  address: 'Sidney No. 1 Lake Park',
},{
   key: '4',
   name: 'Joe Black',
   money: '￥120,000',
   className: 'my-class',
   address: 'Sidney No. 1 Lake Park',
}];

export default {
   name: 'InvoicePreview',

   data: () => ({
      data,
      buttonSaveLoading: false
   }),

   computed: {
      clientObj() {
         return this.$store.state.client
      },
      reservationObj() {
         return this.$store.state.reservation
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
         width: 50%;
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

   &__row {
      margin-bottom: 16px * 2;

      &:after {
         content: "";
         display: table;
         clear: both;
      }
   }

   &__info {
      padding-left: 25px;
      float: left;

   }

   &__reservation-info {
      padding: 0;
      float: right;
      font-weight: normal;
      min-width: 180px;
      max-width: 250px;


      p {
         margin: 0;
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

