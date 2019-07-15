<template>
    <div class="fields-box">
        <label class="inlain-label">{{ __('Валюта') }}: </label>
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

        <table class="invoice-table service-table">
            <thead class="invoice-table__header">
            <tr class="invoice-table__row">
                <th class="invoice-table__cell">{{ __('Дата') }}</th>
                <th class="invoice-table__cell">{{ __('Название услуги') }}</th>
                <th class="invoice-table__cell">{{ __('Дебит') }}</th>
                <th class="invoice-table__cell" colspan="2">{{ __('Кредит') }}</th>
            </tr>
            </thead>
            <tbody class="invoice-table__body" v-click-outside="stopEditingAll">
            <tr class="invoice-table__row" v-for="item in getServices" :key="item.id"
                @keyup.enter="item.isEditing = false">
                <td class="invoice-table__cell" style="width: 22%">
                    <el-date-picker
                            v-show="item.isEditing"
                            type="date"
                            :value="getFiled('date', item.id)"
                            @input="updateField('date', $event, item.id)"
                            placeholder=""
                            :default-value="new Date()"
                            prefix-icon="none"
                            format="dd.MM.yyyy"
                            class="date-picker date-picker--icon-none"
                            value-format="dd.MM.yyyy"
                            size="small"
                            :dataId="item.id"
                            ref="inputData">
                    </el-date-picker>
                    <span class="invoice-table__static" v-show="!item.isEditing"
                          @click="focusInput('inputData', item.id)">{{ item.date }}</span>
                </td>
                <td class="invoice-table__cell" style="width: 30%">
                    <el-autocomplete
                            v-show="item.isEditing"
                            class="inline-input"
                            :value="getFiled('nameServices', item.id)"
                            @input="updateField('nameServices', $event, item.id)"
                            @select="focusInput('inputDebit', item.id)"
                            :fetch-suggestions="querySearch"
                            size="small"
                            :autofocus="true"
                            ref="inputName"
                            :dataId="item.id"
                    ></el-autocomplete>
                    <span class="invoice-table__static" v-show="! item.isEditing"
                          @click="focusInput('inputName', item.id)">{{ item.nameServices }}</span>
                </td>
                <td class="invoice-table__cell" style="width: 17%">
                    <el-input
                            v-show="item.isEditing"
                            type="number"
                            :value="getFiled('debit', item.id)"
                            @input="updateField('debit', $event, item.id)"
                            size="small"
                            ref="inputDebit"
                            :dataId="item.id"
                    >
                    </el-input>
                    <span class="invoice-table__static" v-show="!item.isEditing"
                          @click="focusInput('inputDebit', item.id)">{{ item.debit }}</span>
                </td>
                <td class="invoice-table__cell" style="width: 16%">
                    <el-input
                            v-show="item.isEditing"
                            type="number"
                            :value="getFiled('credit', item.id)"
                            @input="updateField('credit', $event, item.id)"
                            size="small"
                            ref="inputCredit"
                            :dataId="item.id"
                    >
                    </el-input>
                    <span class="invoice-table__static" v-show="! item.isEditing"
                          @click="focusInput('inputCredit', item.id)">{{ item.credit }}</span>
                </td>
                <td class="invoice-table__cell" style="text-align: right;">
                    <div class="invoice-table__controls-btn">
                        <el-button v-if="!item.isEditing"
                                   @click="editing(item.id)"
                                   class="invoice-table__controls-btn"
                                   icon="el-icon-edit"
                                   size="small">
                        </el-button>
                        <el-button v-else
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
                <td class="invoice-table__cell aligh-center" style="padding: 0" colspan="5">
                    <el-button icon="el-icon-plus" class="add-button" type="primary" size="medium" @click="addService">
                        {{ __('Добавить') }}
                    </el-button>
                </td>
            </tr>

            </tbody>
        </table>

        <!-- <div class="add-button-wrap">
           <el-button icon="el-icon-plus" type="primary" size="medium" @click="addService">Добавить</el-button>
        </div> -->
    </div>
</template>

<script>
    import ClickOutside from 'vue-click-outside'

    export default {
        name: 'ServicesList',

        directives: {
            ClickOutside
        },

        data: () => ({}),

        computed: {
            getServices() {
                return this.$store.getters.getServices
            },
            currency() {
                return this.$store.state.currency
            },
            nameServicesList() {
                return this.$store.state.defaultServices
            }
        },

        methods: {
            focusInput(input, id) {
                this.editing(+id)

                this.$nextTick(() => {
                    this.$refs[input].forEach(item => {
                        if (item.$attrs.dataId === +id) {
                            item.handleFocus()

                            if (item.focus) item.focus()
                        }
                    })
                })
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

                this.stopEditingAll()

                const serviceObj = {
                    id: Date.now(),
                    date: date,
                    nameServices: null,
                    debit: null,
                    credit: null,
                    isEditing: true
                }

                this.$store.commit('addService', serviceObj)

                this.$nextTick(() => {
                    this.$refs.inputName[this.$refs.inputName.length - 1].focus()
                })
            },

            editing(id) {
                this.stopEditingAll()

                this.$store.commit('toggleEditing', id)
            },

            delItem(id) {
                this.$store.commit('removeService', id)
            },

            stopEditingAll() {
                this.$store.commit('stopEditingAll')
            },

            querySearch(queryString, cb) {
                let links = new Set(this.nameServicesList)

                let customValues = this.$store.getters.getServices.filter(item => ! item.isEditing).map((service) => service.nameServices)

                if (customValues.length) {
                    customValues.forEach(item => links.add(item))
                }

                links = Array.from(links).map(item => ({ value: item }))

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
            this.$store.dispatch('services')
        }
    }
</script>
