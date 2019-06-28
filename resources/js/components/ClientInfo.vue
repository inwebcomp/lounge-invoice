<template>
   <div class="fields-box">
      <el-row :gutter="16" class="fields-row">
         <el-col :span="12">
            <label class="input-label">Имя:</label>
            <el-input :value="getFiled('name')" @input="updateField('name', $event)" clearable>
            </el-input>
         </el-col>
         <el-col :span="12">
            <label class="input-label">Фамилия:</label>
            <el-input :value="getFiled('surName')" @input="updateField('surName', $event)" clearable>
            </el-input>
         </el-col>
      </el-row>

      <el-row :gutter="16" class="fields-row">
         <el-col :span="6">
            <label class="input-label">Город:</label>
            <el-input :value="getFiled('addres')" @input="updateField('addres', $event)" clearable>
            </el-input>
         </el-col>
         <el-col :span="12">
            <label class="input-label">Адресс:</label>
            <el-input  :value="getFiled('city')" @input="updateField('city', $event)" clearable>
            </el-input>
         </el-col>
         <el-col :span="6">
            <label class="input-label">Почтовый индекс:</label>
            <el-input  :value="getFiled('postIndx')" @input="updateField('postIndx', $event)" clearable>
            </el-input>
         </el-col>
      </el-row>

      <div class="invoice-fields__title-line">Информация об инвойсе</div>

      <el-row :gutter="16" class="fields-row">
         <el-col :span="10">
            <label class="input-label">Название отеля:</label>
            <el-input :value="getInvoiceFiled('name')" readonly>
            </el-input>
         </el-col>
         <el-col :span="7">
            <label class="input-label">Дата:</label>
            <!-- <date-picker
               :value="getInvoiceFiled('date')"
               placeholder="Выберите дату"
               @input="updateInvoiceFiled('date', $event)"
               format="DD.MM.YYYY"
               valueType="format"
               lang="en" >
            </date-picker> -->
            <el-date-picker
               type="date"
               :value="getInvoiceFiled('date')"
               placeholder="Выберите дату"
               @input="updateInvoiceFiled('date', $event)"
               format="dd.MM.yyyy"
               class="date-picker"
               value-format="dd.MM.yyyy">
            </el-date-picker>
         </el-col>
         <el-col :span="7">
            <label class="input-label">Время:</label>
            <!-- <date-picker
               :value="getInvoiceFiled('time')"
               @input="updateInvoiceFiled('time', $event)"
               type="time"
               format="HH:mm:ss"
               :popupStyle="{right: 0, left: 100}"
               placeholder="Выберите время"
               valueType="format"
               lang="en" >
            </date-picker> -->
            <el-time-picker
               :value="getInvoiceFiled('time')"
               @input="updateInvoiceFiled('time', $event)"
               format="HH:mm:ss"
               value-format="HH:mm:ss"
               class="time-picker"
               placeholder="Выберите время">
            </el-time-picker>
         </el-col>
      </el-row>

   </div>
</template>

<script>

export default {
   name: 'ClientInfo',

   methods: {
      getFiled(field) {
         return this.$store.state.client[field]
      },
      getInvoiceFiled(field) {
         return this.$store.state.invoiceInfo[field]
      },

      updateField (field, val) {
         this.$store.commit('updateClientFiled', {value: val, field: field})
      },
      updateInvoiceFiled (field, val) {
         this.$store.commit('updateInvoiceInfoFiled', {value: val, field: field})
      }
   },
}
</script>
