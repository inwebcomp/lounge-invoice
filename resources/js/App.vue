<template>
   <div id="app">
      <el-row :gutter="8">
         <el-col :span="10" class="invoice-fields-box">
            <InvoiceFields />
         </el-col>
         <el-col :span="14" class="invoice-preview-box">
            <InvoicePreview />
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
