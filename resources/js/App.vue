<template>
   <div id="app">
      <div class="invoice-fields-box">
         <languages />

         <InvoiceFields />
      </div>
      <div class="invoice-preview-box">
         <InvoicePreview />
      </div>
   </div>
</template>

<script>
import InvoicePreview from './components/InvoicePreview'
import InvoiceFields from './components/InvoiceFields'
import Languages from "./components/Languages"

export default {
   components: {
      Languages,
      InvoicePreview,
      InvoiceFields
   },
}
</script>
