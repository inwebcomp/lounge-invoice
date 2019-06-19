<template>
   <main class="invoice-fields">
      <header class="header">
         <!-- <a-tabs defaultActiveKey="2">
            <a-tab-pane key="1">
               <span slot="tab">
                  <a-icon type="apple" />
                  Tab 1
               </span>
               Content
            </a-tab-pane>

            <a-tab-pane key="2">
               <span slot="tab">
               <a-icon type="android" />
               Tab 2
               </span>
               Tab 2
            </a-tab-pane>
         </a-tabs> -->
      </header>

      <div class="box-client">
         <div class="invoice-fields__title-line">Личные Данные</div>
         <a-form vertical @submit="handleSubmit">
            <a-col :span="12">
               <a-form-item label="Имя">
                  <a-input
                     v-model="clientName"
                     v-decorator="[
                        'userName',
                        {rules: [{ required: true, message: 'Please input your username!' }]}
                     ]"
                  >
                  <a-icon
                     slot="prefix"
                     type="user"
                     style="color:rgba(0,0,0,.25)"
                  />
                  </a-input>
               </a-form-item>
            </a-col>
            <a-col :span="12">
               <a-form-item label="Фамилия">
                  <a-input
                     v-model="clientSurname"
                     v-decorator="[
                        'userName',
                        {rules: [{ required: true, message: 'Please input your username!' }]}
                     ]"
                  >
                  <a-icon
                     slot="prefix"
                     type="user"
                     style="color:rgba(0,0,0,.25)"
                  />
                  </a-input>
               </a-form-item>
            </a-col>

            <a-col :span="8">
               <a-form-item label="Улица, дом">
                  <a-input
                  v-model="clientAddres"
                  v-decorator="[
                     'userName',
                     {rules: [{ required: true, message: 'Please input your username!' }]}
                  ]"
                  >
                  <a-icon
                     slot="prefix"
                     type="user"
                     style="color:rgba(0,0,0,.25)"
                  />
                  </a-input>
               </a-form-item>
            </a-col>
            <a-col :span="8">
               <a-form-item label="Страна">
                  <a-input
                  v-model="clientCity"
                  v-decorator="[
                     'userName',
                     {rules: [{ required: true, message: 'Please input your username!' }]}
                  ]"
                  >
                  <a-icon
                     slot="prefix"
                     type="user"
                     style="color:rgba(0,0,0,.25)"
                  />
                  </a-input>
               </a-form-item>
            </a-col>
            <a-col :span="8">
               <a-form-item label="Почтовый индекс">
                  <a-input
                  v-model="clientPostIndx"
                  v-decorator="[
                     'userName',
                     {rules: [{ required: true, message: 'Please input your username!'}]}
                  ]"
                  >
                  <a-icon
                     slot="prefix"
                     type="user"
                     style="color:rgba(0,0,0,.25)"
                  />
                  </a-input>
               </a-form-item>
            </a-col>



         </a-form>
      </div>
   </main>
</template>

<script>

export default {
   name: 'InvoiceFields',

   data: () => ({

   }),

   computed: {
      clientName: {
         get () {
            return this.$store.state.client.name
         },
         set (value) {
            this.$store.commit('updateClientFiled', {field: 'name', value: value})
         }
      },
      clientSurname: {
         get () {
            return this.$store.state.client.surName
         },
         set (value) {
            this.$store.commit('updateClientFiled', {field: 'surName', value: value})
         }
      },
      clientAddres: {
         get () {
            return this.$store.state.client.addres
         },
         set (value) {
            this.$store.commit('updateClientFiled', {field: 'addres', value: value})
         }
      },
      clientCity: {
         get () {
            return this.$store.state.client.city
         },
         set (value) {
            this.$store.commit('updateClientFiled', {field: 'city', value: value})
         }
      },
      clientPostIndx: {
         get () {
            return this.$store.state.client.postIndx
         },
         set (value) {
            this.$store.commit('updateClientFiled', {field: 'postIndx', value: value})
         }
      }
   },

   methods: {
      handleSubmit() {

      }
   },
}
</script>
