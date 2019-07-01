<template>
   <div class="fields-box">
      <el-row :gutter="16" class="fields-row">
         <el-col :span="12">
            <label class="input-label">Room No.:</label>
            <el-select
               :value="getFiled('roomNumb')"
               @input="updateField('roomNumb', $event)"
               placeholder="Выберите из списка">
               <el-option
                  v-for="item in getFiled('roomNumbsList')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
               </el-option>
            </el-select>
         </el-col>
         <el-col :span="12">
            <label class="input-label">No. of person(s):</label>
            <el-select
               :value="getFiled('personsCount')"
               @input="updateField('personsCount', $event)"
               placeholder="Выберите из списка">
               <el-option
                  v-for="item in getFiled('personsCountList')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
               </el-option>
            </el-select>
         </el-col>
      </el-row>

      <el-row :gutter="16" class="fields-row">
         <el-col :span="12">
            <label class="input-label">Arival:</label>
            <el-date-picker
               type="date"
               :value="getFiled('arival')"
               @input="updateField('arival', $event)"
               @change="onSetArival"
               placeholder="Выберите дату"
               format="dd.MM.yyyy"
               class="date-picker"
               value-format="dd.MM.yyyy">
            </el-date-picker>
         </el-col>
         <el-col :span="12">
            <label class="input-label">Departure:</label>
            <el-date-picker
               type="date"
               :value="getFiled('departure')"
               @input="updateField('departure', $event)"
               placeholder="Выберите дату"
               format="dd.MM.yyyy"
               class="date-picker"
               value-format="dd.MM.yyyy"
               ref="departure">
            </el-date-picker>
         </el-col>
      </el-row>

      <el-row :gutter="16" class="fields-row">
         <el-col :span="12">
            <label class="input-label">Reservation No.:</label>
               <el-input
               type="text"
               placeholder="Введите номер"
               :value="getFiled('reservationNumb')"
               @input="updateField('reservationNumb', $event)"
               clearable>
            </el-input>
         </el-col>
         <el-col :span="12">
            <label class="input-label">Ext. Reservation No.:</label>
               <el-input
               type="text"
               placeholder="Введите номер"
               :value="getFiled('extReservationNumb')"
               @input="updateField('extReservationNumb', $event)"
               clearable>
            </el-input>
         </el-col>
      </el-row>

      <el-row :gutter="16" class="fields-row">
         <el-col :span="12">
            <label class="input-label">Cashier No.:</label>
               <el-input
               type="text"
               placeholder="Введите номер"
               :value="getFiled('cashierNumb')"
               @input="updateField('cashierNumb', $event)"
               clearable>
            </el-input>
         </el-col>
         <el-col :span="12">
            <!-- <label class="input-label">Page No.:</label>
               <el-input
               type="number"
               placeholder="Введите номер"
               :value="getFiled('pageNumb')"
               @input="updateField('pageNumb', $event)"
               clearable>
            </el-input> -->
         </el-col>
      </el-row>
   </div>
</template>

<script>

export default {
   name: 'ReservationInfo',

   methods: {
      getFiled(field) {
         return this.$store.state.reservation[field]
      },
      updateField (field, val) {
         this.$store.commit('updateReservationFiled', {value: val, field: field})
      },
      onSetArival(event) {
         this.$refs.departure.focus()
      }
   }
}
</script>

<style lang="scss">
.date-picker.date-picker--icon-none .el-input__inner {
   padding-left: 12px;
}
.date-picker.el-date-editor.el-input {
   width: 100%;
}
.time-picker.el-date-editor.el-input {
   width: 100%;
}
</style>
