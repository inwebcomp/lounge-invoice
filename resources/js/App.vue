<template>
   <div id="app">
      <el-row>
         <el-col :span="12" class="invoice-preview-box">
            <InvoicePreview />
         </el-col>
         <el-col :span="12" class="invoice-fields-box">
            <InvoiceFields />
         </el-col>
      </el-row>
   </div>
</template>

<script>
import InvoicePreview from './components/InvoicePreview'
import InvoiceFields from './components/InvoiceFields'

export default {
   components: {
      InvoicePreview,
      InvoiceFields
   },
}
</script>

<style lang="scss">



</style>

