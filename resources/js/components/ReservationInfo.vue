<template>
   <div class="fields-box">
      <el-row :gutter="16" class="fields-row">
         <el-col :span="12">
            <label class="input-label">{{ __('Аппартаменты №') }}:</label>
            <el-select
               :value="getFiled('roomNumb')"
               @input="updateField('roomNumb', $event)"
               :placeholder="__('Выберите из списка')">
               <el-option
                  v-for="item in getFiled('roomNumbsList')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
               </el-option>
            </el-select>
         </el-col>
         <el-col :span="12">
            <label class="input-label">{{ __('Кол-во человек') }}:</label>
            <el-select
               :value="getFiled('personsCount')"
               @input="updateField('personsCount', $event)"
               :placeholder="__('Выберите из списка')">
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
            <label class="input-label">{{ __('Прибытие') }}:</label>
            <el-date-picker
               type="date"
               :value="getFiled('arrival')"
               @input="updateField('arrival', $event)"
               @change="onSetArrival"
               :placeholder="__('Выберите дату')"
               format="dd.MM.yyyy"
               class="date-picker"
               value-format="dd.MM.yyyy">
            </el-date-picker>
         </el-col>
         <el-col :span="12">
            <label class="input-label">{{ __('Отбытие') }}:</label>
            <el-date-picker
               type="date"
               :value="getFiled('departure')"
               @input="updateField('departure', $event)"
               :placeholder="__('Выберите дату')"
               format="dd.MM.yyyy"
               class="date-picker"
               value-format="dd.MM.yyyy"
               ref="departure">
            </el-date-picker>
         </el-col>
      </el-row>

      <el-row :gutter="16" class="fields-row">
         <el-col :span="12">
            <label class="input-label">{{ __('Резервация №') }}:</label>
               <el-input
               type="text"
               :placeholder="__('Введите номер')"
               :value="getFiled('reservationNumb')"
               @input="updateField('reservationNumb', $event)"
               clearable>
            </el-input>
         </el-col>
         <el-col :span="12">
            <label class="input-label">{{ __('Резервация № (расш.)') }}:</label>
               <el-input
               type="text"
               :placeholder="__('Введите номер')"
               :value="getFiled('extReservationNumb')"
               @input="updateField('extReservationNumb', $event)"
               clearable>
            </el-input>
         </el-col>
      </el-row>

      <el-row :gutter="16" class="fields-row">
         <el-col :span="12">
            <label class="input-label">{{ __('Касса №') }}:</label>
               <el-input
               type="text"
               :placeholder="__('Введите номер')"
               :value="getFiled('cashierNumb')"
               @input="updateField('cashierNumb', $event)"
               clearable>
            </el-input>
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
      onSetArrival(event) {
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
