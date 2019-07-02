<template>
    <div class="fields-box">
        <el-row :gutter="16" class="fields-row">
            <el-col :span="12">
                <label class="input-label">{{ __('Имя') }}:</label>
                <el-input :value="getFiled('name')" @input="updateField('name', $event)" clearable>
                </el-input>
            </el-col>
            <el-col :span="12">
                <label class="input-label">{{ __('Фамилия') }}:</label>
                <el-input :value="getFiled('surName')" @input="updateField('surName', $event)" clearable>
                </el-input>
            </el-col>
        </el-row>

        <el-row :gutter="16" class="fields-row">
            <el-col :span="6">
                <label class="input-label">{{ __('Город') }}:</label>
                <el-input :value="getFiled('city')" @input="updateField('city', $event)" clearable>
                </el-input>
            </el-col>
            <el-col :span="8">
                <label class="input-label">{{ __('Адресс') }}:</label>
                <el-input :value="getFiled('address')" @input="updateField('address', $event)" clearable>
                </el-input>
            </el-col>
            <el-col :span="4">
                <label class="input-label">{{ __('Почт. индекс') }}:</label>
                <el-input :value="getFiled('postIndx')" @input="updateField('postIndx', $event)" clearable>
                </el-input>
            </el-col>
            <el-col :span="6">
                <label class="input-label">{{ __('Страна') }}:</label>
                <el-input :value="getFiled('country')" @input="updateField('country', $event)" clearable>
                </el-input>
            </el-col>
        </el-row>

        <div class="invoice-fields__title-line">{{ __('Информация об инвойсе') }}</div>

        <el-row :gutter="16" class="fields-row">
            <el-col :span="10">
                <label class="input-label">{{ __('Название отеля') }}:</label>
                <el-input :value="getInvoiceFiled('name')" readonly>
                </el-input>
            </el-col>
            <el-col :span="7">
                <label class="input-label">{{ __('Дата') }}:</label>
                <el-date-picker
                        type="date"
                        :value="getInvoiceFiled('date')"
                        :placeholder="__('Выберите дату')"
                        @input="updateInvoiceFiled('date', $event)"
                        format="dd.MM.yyyy"
                        class="date-picker"
                        value-format="dd.MM.yyyy">
                </el-date-picker>
            </el-col>
            <el-col :span="7">
                <label class="input-label">{{ __('Время') }}:</label>
                <el-time-picker
                        :value="getInvoiceFiled('time')"
                        @input="updateInvoiceFiled('time', $event)"
                        format="HH:mm:ss"
                        value-format="HH:mm:ss"
                        class="time-picker"
                        placeholder="">
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

            updateField(field, val) {
                this.$store.commit('updateClientFiled', {value: val, field: field})
            },
            updateInvoiceFiled(field, val) {
                this.$store.commit('updateInvoiceInfoFiled', {value: val, field: field})
            }
        },
    }
</script>
