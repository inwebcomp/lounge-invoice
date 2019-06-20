<template>
   <div class="fields-box">
      <el-row :gutter="16" class="fields-row">
         <el-col :span="12">
            <label class="input-label">Имя:</label>
            <el-input placeholder="Введите имя"  :value="getFiled('name')" @input="updateField('name', $event)" clearable>
            </el-input>
         </el-col>
         <el-col :span="12">
            <label class="input-label">Фамилия:</label>
            <el-input placeholder="Введите фамилию" :value="getFiled('surName')" @input="updateField('surName', $event)" clearable>
            </el-input>
         </el-col>
      </el-row>

      <el-row :gutter="16" class="fields-row">
         <el-col :span="8">
            <label class="input-label">Город:</label>
            <el-input placeholder="Введите имя" :value="getFiled('addres')" @input="updateField('addres', $event)" clearable>
            </el-input>
         </el-col>
         <el-col :span="8">
            <label class="input-label">Адресс:</label>
            <el-input placeholder="Введите фамилию" :value="getFiled('city')" @input="updateField('city', $event)" clearable>
            </el-input>
         </el-col>
         <el-col :span="8">
            <label class="input-label">Почтовый индекс:</label>
            <el-input placeholder="Введите фамилию" :value="getFiled('postIndx')" @input="updateField('postIndx', $event)" clearable>
            </el-input>
         </el-col>
      </el-row>
   </div>
</template>

<script>

export default {
   name: 'ClientInfo',

   data: () => ({

   }),

   methods: {
      getFiled(field) {
         return this.$store.state.client[field]
      },
      updateField (field, val) {
         this.$store.commit('updateClientFiled', {value: val, field: field})
      }
   },
}
</script>
