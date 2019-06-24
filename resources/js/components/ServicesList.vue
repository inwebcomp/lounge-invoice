<template>
   <div class="fields-box">
      <label class="input-label">Валюта: </label>
      <el-select placeholder="Select"
         :value="currency.value"
         class="currency-select"
         @input="currencySet($event)"
         size="small"
      >
         <el-option
            v-for="item in currency.items"
            :key="item.value"
            :label="item.label"
            :value="item.value">
         </el-option>
      </el-select>

      <table class="invoice-table">
         <thead class="invoice-table__header">
            <tr class="invoice-table__row">
               <th class="invoice-table__cell" style="width: 10%">Дата</th>
               <th class="invoice-table__cell" style="width: 40%">Название услуги</th>
               <th class="invoice-table__cell" style="width: 15%">Дебит</th>
               <th class="invoice-table__cell" colspan="2">Кредит</th>
            </tr>
         </thead>
         <tbody class="invoice-table__body" v-click-outside="stopEditing">
            <tr class="invoice-table__row" v-for="item in getServices" :key="item.id">
               <td class="invoice-table__cell" style="width: 23%">
                  <date-picker
                     v-if="item.isEditing"
                     :value="getFiled('date', item.id)"
                     @input="updateField('date', $event, item.id)"
                     :popupStyle="{left: 0, top: '100'}"
                     class="mx-datepicker--small"
                     input-class="mx-input mx-input--small"
                     valueType="format"
                     lang="en" >
                  </date-picker>
                  <span v-else>{{ item.date }}</span>
               </td>
               <td class="invoice-table__cell" style="width: 30%">
                  <el-autocomplete
                     v-if="item.isEditing"
                     class="inline-input"
                     :value="getFiled('nameServices', item.id)"
                     @input="updateField('nameServices', $event, item.id)"
                     :fetch-suggestions="querySearch"
                     placeholder="Please Input"
                     size="small"
                  ></el-autocomplete>
                  <span v-else>{{ item.nameServices }}</span>
               </td>
               <td class="invoice-table__cell" style="width: 20%">
                  <el-input
                     v-if="item.isEditing"
                     placeholder="Please input"
                     :value="getFiled('debit', item.id)"
                     @input="updateField('debit', $event, item.id)"
                     size="small"
                  >
                  </el-input>
                  <span v-else>{{ item.debit }}</span>
               </td>
               <td class="invoice-table__cell" style="width: 20%">
                  <el-input
                     v-if="item.isEditing"
                     placeholder="Please input"
                     :value="getFiled('credit', item.id)"
                     @input="updateField('credit', $event, item.id)"
                     size="small"
                  >
                  </el-input>
                  <span v-else>{{ item.credit }}</span>
               </td>
               <td class="invoice-table__cell">
                  <el-button
                     @click="editing(item.id)"
                     icon="el-icon-edit"
                     size="mini">
                  </el-button>
                  <el-button
                     @click="delItem(item.id)"
                     icon="el-icon-delete"
                     size="mini">
                  </el-button>
               </td>
            </tr>

            <tr class="invoice-table__row">
               <td class="invoice-table__cell aligh-center" colspan="5">
                  <el-button icon="el-icon-plus" type="primary" size="medium" @click="addService">Добавить</el-button>
               </td>
            </tr>

         </tbody>
      </table>
   </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
   name: 'SevicesList',

   directives: {
      ClickOutside
   },

   data: () => ({
      state1: '',
   }),

   computed: {
      getServices() {
         return this.$store.getters.getServices
      },
      currency() {
         return this.$store.state.currency
      }
   },

   methods: {
      currencySet(val) {
         this.$store.commit('updateCurrency', val)
      },
      getFiled(field, id) {
         return this.$store.getters.getServicesFiled(id, field)
      },
      updateField(field, val, id) {
         this.$store.commit('updateServicesFiled', {value: val, field: field, id: id})
      },

      addService() {
         const serviceObj = {
            id: Date.now(),
            date: null,
            nameServices: null,
            debit: null,
            credit: null,
            isEditing: true
         }

         this.$store.commit('addService', serviceObj)
      },

      editing(id) {
         this.$store.commit('toggleEditing', id)
      },

      delItem(id) {
         this.$store.commit('removeService', id)
      },

      stopEditing() {
         this.getServices.forEach(item => {
            item.isEditing = false
         })
      },

      querySearch(queryString, cb) {
         const links = this.nameServicesList;
         const results = queryString ? links.filter(this.createFilter(queryString)) : links;

         cb(results);
      },
      createFilter(queryString) {
         return (link) => {
            return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
         };
      },
      handleSelect(item) {
         console.log(item);
      }
   },

   mounted() {
      this.nameServicesList = [
            { "value": "vue"},
            { "value": "element"},
            { "value": "cooking"},
            { "value": "mint-ui"},
            { "value": "vuex"},
            { "value": "vue-router"},
            { "value": "babel"}
         ];
   }

}
</script>
