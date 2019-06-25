<template>
   <main class="invoice-fields">
      <el-tabs type="border-card">
         <el-tab-pane label="Данные клиента">
            <ClientInfo />
         </el-tab-pane>
         <el-tab-pane label="Данные бронирования">
            <ReservationInfo />
         </el-tab-pane>
         <el-tab-pane label="Услуги">
            <ServicesList />
         </el-tab-pane>
      </el-tabs>
   </main>
</template>

<script>
import ClientInfo from './ClientInfo'
import ReservationInfo from './ReservationInfo'
import ServicesList from './ServicesList'

export default {
   name: 'InvoiceFields',

   components: {
      ClientInfo,
      ReservationInfo,
      ServicesList
   }
}
</script>
