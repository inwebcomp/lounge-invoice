<template>
   <div class="invoice-container">
      <div class="invoice-buttons">
         <a-button size="large" class="">Открыть</a-button>
         <a-button class="ant-btn-green" @click="saveInvoice" :loading="buttonSaveLoading" size="large">Сохранить</a-button>
         <a-button class="ant-btn-blue" size="large" onClick="window.print()">Печать</a-button>
      </div>
      <div class="invoice" id="printarea">
         <div class="invoice__row">
            <img src="img/logo.svg" width="200" alt="logo" class="invoice__logo">
         </div>
         <div class="invoice__row">
            <div class="invoice__info" >
               <p>{{ clientObj.name }}  {{ clientObj.surName }}</p>
               <p>{{ clientObj.city ? `${clientObj.city},` : null }} {{ clientObj.addres }}</p>
               <p>{{ clientObj.postIndx }}</p>

            </div>
         </div>

         <p class="invoice__text text-bold">Invoice</p>

         <div class="ant-table ant-table-default ant-table-bordered table-">
            <table>
               <thead class="ant-table-thead">
                  <tr>
                     <th>Header1</th>
                     <th>Header2</th>
                     <th>Header3</th>
                     <th>Header4</th>
                  </tr>
               </thead>
               <tbody class="ant-table-tbody">
                  <tr v-for="(item, index) in data" :key="index">
                     <td style="width: 15%">{{ item.money }}</td>
                     <td style="width: 45%">{{ item.name }}</td>
                     <td style="width: 20%">{{ item.money }}</td>
                     <td style="width: 20%">{{ item.money }}</td>
                  </tr>
                  <tr class="table__footer">
                     <td colspan="2"> total </td>
                     <td> 12496</td>
                     <td> 12496</td>
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
.ant-table {
   border: 1px solid #e8e8e8;
   border-right: none;
   border-bottom: none;
   font-weight: 500;
}

.ant-table-thead > tr > th, .ant-table-tbody > tr > td {
   padding: 10px 12px;
}

.invoice-preview-box {
   background-color: aliceblue;
}

.invoice-container {
   width: 100%;
   max-width: 750px;
   margin: 50px auto 100px;
}

.invoice-buttons {
   display: flex;

   .ant-btn {
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
   font-size: 1.6rem;
   font-weight: 500;

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

