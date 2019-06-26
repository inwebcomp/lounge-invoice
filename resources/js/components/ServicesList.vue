<template>
   <div class="fields-box">
      <label class="input-label">Валюта: </label>
      <el-select
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
               <th class="invoice-table__cell" >Дата</th>
               <th class="invoice-table__cell" >Название услуги</th>
               <th class="invoice-table__cell" >Дебит</th>
               <th class="invoice-table__cell" colspan="2">Кредит</th>
            </tr>
         </thead>
         <tbody class="invoice-table__body" v-click-outside="stopEditing">
            <tr class="invoice-table__row" v-for="item in getServices" :key="item.id" @keyup.enter="item.isEditing = false">
               <td class="invoice-table__cell" style="width: 20%">
                  <date-picker
                     v-show="item.isEditing"
                     :value="getFiled('date', item.id)"
                     @input="updateField('date', $event, item.id)"
                     format="DD.MM.YYYY"
                     :popupStyle="{left: 0, top: '100'}"
                     :default-value="new Date()"
                     class="mx-datepicker--small"
                     placeholder=""
                     input-class="mx-input mx-input--small"
                     valueType="format"
                     lang="en" >
                  </date-picker>
                  <span v-show="!item.isEditing">{{ item.date }}</span>
               </td>
               <td class="invoice-table__cell" style="width: 30%">
                  <el-autocomplete
                     v-show="item.isEditing"
                     class="inline-input"
                     :value="getFiled('nameServices', item.id)"
                     @input="updateField('nameServices', $event, item.id)"
                     :fetch-suggestions="querySearch"
                     size="small"
                     :autofocus="true"
                     ref="inputName"
                  ></el-autocomplete>
                  <span v-show="! item.isEditing" @click="focusInput('inputName', item.id)">{{ item.nameServices }}</span>
               </td>
               <td class="invoice-table__cell" style="width: 17%">
                  <el-input
                     v-show="item.isEditing"
                     type="number"
                     :value="getFiled('debit', item.id)"
                     @input="updateField('debit', $event, item.id)"
                     size="small"
                  >
                  </el-input>
                  <span v-show="!item.isEditing">{{ item.debit }}</span>
               </td>
               <td class="invoice-table__cell" style="width: 16%">
                  <el-input
                     v-show="item.isEditing"
                     type="number"
                     :value="getFiled('credit', item.id)"
                     @input="updateField('credit', $event, item.id)"
                     size="small"
                  >
                  </el-input>
                  <span v-show="! item.isEditing">{{ item.credit }}</span>
               </td>
               <td class="invoice-table__cell">
                  <div class="invoice-table__controls-btn">
                     <el-button v-if="!item.isEditing"
                        @click="editing(item.id)"
                        class="invoice-table__controls-btn"
                        icon="el-icon-edit"
                        size="small">
                     </el-button>
                     <el-button  v-else
                        @click="editing(item.id)"
                        class="invoice-table__controls-btn"
                        icon="el-icon-document-checked"
                        size="small">
                     </el-button>
                     <el-button
                        @click="delItem(item.id)"
                        icon="el-icon-delete"
                        class="invoice-table__controls-btn"
                        type="danger"
                        size="small">
                     </el-button>
                  </div>
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
      focusInput(input, id) {

         this.$refs[input].forEach(item => {
            console.log(item)
         })

         console.dir( )
         console.log(id)

         this.editing(+id)

      },

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
         let date = new Intl.DateTimeFormat('ru-RU').format(new Date())

         const serviceObj = {
            id: Date.now(),
            date: date,
            nameServices: null,
            debit: null,
            credit: null,
            isEditing: true
         }

         this.stopEditing()

         this.$store.commit('addService', serviceObj)

         this.$nextTick(() => {
            console.log(this.$refs.inputName[this.$refs.inputName.length - 1])
            this.$refs.inputName[this.$refs.inputName.length - 1].focus()
         })
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
