<template>
   <div class="fields-box">
      <el-row :gutter="16" class="fields-row">
         <el-col :span="12">
            <label class="input-label">{{ __('Апартаменты №') }}:</label>
            <el-autocomplete
               :value="getFiled('roomNumb')"
               @input="updateField('roomNumb', $event)"
               :placeholder="__('Выберите из списка')"
               :fetch-suggestions="appartmentQuerySearch"
               style="width: 100%"/>
         </el-col>
         <el-col :span="12">
            <label class="input-label">{{ __('Кол-во человек') }}:</label>
            <el-input
               :value="getFiled('personsCount')"
               @input="updateField('personsCount', $event)" />
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
      },

      appartmentQuerySearch(queryString, cb) {
         let links = this.getFiled('roomNumbsList')

         let results = queryString ? links.filter(this.createFilter(queryString)) : links

         cb(results)
      },

      createFilter(queryString) {
         return (link) => {
            return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
         }
      }
   },

   mounted() {
      this.$store.dispatch('apartments')
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
