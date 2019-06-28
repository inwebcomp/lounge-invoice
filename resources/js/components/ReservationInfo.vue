<template>
   <div class="fields-box">
      <el-row :gutter="16" class="fields-row">
         <el-col :span="12">
            <label class="input-label">Room No.:</label>
            <el-select
               :value="getFiled('roomNumb')"
               @input="updateField('roomNumb', $event)"
               placeholder="Выберите из списка"
            >
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
               placeholder="Выберите из списка"
            >
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
            <date-picker
               placeholder="Выберите дату"
               format="DD.MM.YYYY"
               :value="getFiled('arival')"
               @input="updateField('arival', $event)"
               @change="onSetArival"
               valueType="format"
               lang="en">
            </date-picker>
         </el-col>
         <el-col :span="12">
            <label class="input-label">Departure:</label>
            <date-picker
               placeholder="Выберите дату"
               format="DD.MM.YYYY"
               :value="getFiled('departure')"
               @input="updateField('departure', $event)"
               :popupStyle="{left: 0, top: '100'}"
               valueType="format"
               lang="en"
               ref="departure" >
            </date-picker>
         </el-col>
      </el-row>

      <el-row :gutter="16" class="fields-row">
         <el-col :span="12">
            <label class="input-label">Reservation No.:</label>
               <el-input
               type="number"
               placeholder="Введите номер"
               :value="getFiled('reservationNumb')"
               @input="updateField('reservationNumb', $event)"
               clearable>
            </el-input>
         </el-col>
         <el-col :span="12">
            <label class="input-label">Ext. Reservation No.:</label>
               <el-input
               type="number"
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
               type="number"
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
         this.$refs.departure.handleFocus()
      }
   }
}
</script>

<style lang="scss">
.mx-input {
   height: 40px;
   border-radius: 4px;
   border: 1px solid #DCDFE6;
   color: #606266;
   transition: all 0.2s ease;
   box-shadow: none;

   &--small {
      height: 32px;
      line-height: 32px;
      font-size: 13px;
   }

   &::placeholder {
      color: #c0c4cc;
   }

   &:hover {
      border-color: #c0c4cc;
   }

   &:focus {
      border-color: #409EFF;
   }
}

.mx-datepicker {
   width: 100%;
   font-family: "Montserrat", sans-serif;

   &--small {
      height: 32px;
      line-height: 32px;
      font-size: 13px;

      .mx-clear-icon {
         position: relative;

         &::before {
            position: absolute;
            top: -5px;
            right: 2px;
         }
      }
   }
}

.date-picker.el-date-editor.el-input {
   width: 100%;
}
.time-picker.el-date-editor.el-input {
   width: 100%;
}
</style>
