<template>
   <div id="app">
      <a-row :gutter="16">
         <a-col :class="`invoice-preview-box`" :span="13">
            <InvoicePreview />
         </a-col>

         <a-col :class="`invoice-params-box`" :span="11">
            <InvoiceFields />
         </a-col>
      </a-row>
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

