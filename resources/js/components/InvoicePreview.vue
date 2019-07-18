<template>
    <div class="invoice-container">
        <div class="invoice-buttons">
            <el-button v-show="false">Открыть</el-button>
            <el-button type="primary" @click="saveInvoice" :loading="buttonSaveLoading">{{ __('Скачать') }}</el-button>
            <el-button type="success" onClick="window.print()">{{ __('Печать') }}</el-button>
        </div>

        <div class="printarea-container">
            <div class="invoice" ref="invoice" id="printarea">
                <div class="invoice__stop-line"></div>
                <div class="invoice__row">
                    <img src="img/logo.png" width="150" alt="logo" class="invoice__logo">
                </div>
                <div class="invoice__row row-flex">
                    <div class="invoice__info">
                        <div class="invoice__info-client">
                            <p>{{ getClient.name }} {{ getClient.surName }}</p>
                            <p>{{ getClient.address }}</p>
                            <p>{{ getClient.city ? `${getClient.city},` : null }} {{ getClient.postIndx }}</p>
                            <p>{{ getClient.country }}</p>
                        </div>

                        
                    </div>


                    <table cellpadding="0" cellspacing="0" border="0" class="invoice__reservation-info">
                        <tr v-if="getReservation.roomNumb">
                            <td>{{ __('Апартаменты №') }}:</td>
                            <td class="invoice__reservation-info__right">{{ getReservation.roomNumb }}</td>
                        </tr>
                        <tr v-if="getReservation.personsCount">
                            <td>{{ __('Кол-во человек') }}:</td>
                            <td class="invoice__reservation-info__right">{{ getReservation.personsCount }}</td>
                        </tr>
                        <tr v-if="getReservation.arrival">
                            <td>{{ __('Прибытие') }}:</td>
                            <td class="invoice__reservation-info__right">{{ getReservation.arrival }}</td>
                        </tr>
                        <tr v-if="getReservation.departure">
                            <td>{{ __('Отбытие') }}:</td>
                            <td class="invoice__reservation-info__right">{{ getReservation.departure }}</td>
                        </tr>
                        <tr v-if="getReservation.reservationNumb">
                            <td>{{ __('Резервация №') }}:</td>
                            <td class="invoice__reservation-info__right">{{ getReservation.reservationNumb }}</td>
                        </tr>
                        <tr v-if="getReservation.extReservationNumb">
                            <td>{{ __('Резервация № (расш.)') }}:</td>
                            <td class="invoice__reservation-info__right">{{ getReservation.extReservationNumb }}</td>
                        </tr>
                        <tr v-if="getReservation.cashierNumb">
                            <td>{{ __('Касса №') }}:</td>
                            <td class="invoice__reservation-info__right">{{ getReservation.cashierNumb }}</td>
                        </tr>
                    </table>
                </div>

                <div class="invoice__row">
                    <div class="invoice__info">
                        <div class="invoice__info-hotel">
                            <p><b>{{ __('Счёт') }}: </b></p>
                            <p>{{ getInvoiceInfo.name }}</p>
                            <p>{{ getInvoiceInfo.date }}
                                <TimeComponent/>
                            </p>
                        </div>
                    </div>
                </div>

                

                <table class="invoice-table">
                    <thead class="invoice-table__header">
                    <tr class="invoice-table__row">
                        <th class="invoice-table__cell">{{ __('Дата') }}</th>
                        <th class="invoice-table__cell">{{ __('Описание') }}</th>
                        <th class="invoice-table__cell" v-html="__('Дебит') + ' ' + currencySymbl"></th>
                        <th class="invoice-table__cell" v-html="__('Кредит') + ' ' + currencySymbl"></th>
                    </tr>
                    </thead>
                    <tbody class="invoice-table__body">
                    <tr class="invoice-table__row" v-for="item in getServices" :key="item.id">
                        <td class="invoice-table__cell">{{ item.date }}</td>
                        <td class="invoice-table__cell">{{ item.nameServices }}</td>
                        <td class="invoice-table__cell">{{ item.debit }}</td>
                        <td class="invoice-table__cell">{{ item.credit }}</td>
                    </tr>
                    <tr class="invoice-table__row invoice-table__footer">
                        <td class="invoice-table__cell" colspan="2">{{ __('Итого') }}:</td>
                        <td class="invoice-table__cell">{{ sumDebit }}</td>
                        <td class="invoice-table__cell">{{ sumCredit }}</td>
                    </tr>
                    <tr class="invoice-table__row invoice-table__footer" v-if="balanceDue">
                        <td class="invoice-table__cell" colspan="2">{{ __('Задолжность') }}:</td>
                        <td class="invoice-table__cell" colspan="2">{{ balanceDue }}</td>
                    </tr>
                    <tr class="invoice-table__row">
                        <td class="invoice-table__cell" colspan="2">{{ __('Итого, включая НДС') }}:</td>
                        <td class="invoice-table__cell" colspan="2">{{ TotalIncVAT }}</td>
                    </tr>
                    </tbody>
                </table>

                <table class="invoice-small-table">
                    <thead class="invoice-table__header">
                    <tr class="invoice-table__row">
                        <th class="invoice-table__cell"></th>
                        <th class="invoice-table__cell">{{ __('Нетто') }}</th>
                        <th class="invoice-table__cell">{{ __('НДС') }}</th>
                        <th class="invoice-table__cell">{{ __('Итого') }}</th>
                    </tr>
                    </thead>
                    <tbody class="invoice-table__body">
                    <tr class="invoice-table__row" v-for="item in smallTableData" :key="item.id">
                        <td class="invoice-table__cell" style="width: 100%">{{ item.nameServices }}</td>
                        <td class="invoice-table__cell" >{{ item.netto }}</td>
                        <td class="invoice-table__cell" >{{ item.tva }}</td>
                        <td class="invoice-table__cell" >{{ item.debit }}</td>
                    </tr>
                    </tbody>
                </table>

                <section class="invoice__requisites">
                    <div class="invoice__text" v-html="requisitesText"></div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import TimeComponent from './TimeComponent'

    export default {
        name: 'InvoicePreview',

        components: {
            TimeComponent
        },

        data: () => ({
            buttonSaveLoading: false,

            servicesObjsArr: [],
            tva: 7
        }),

        computed: {
            ...mapGetters([
                'getServices',
                'getClient',
                'getReservation',
                'getInvoiceInfo',
                'sumDebit',
                'sumCredit'
            ]),

            requisitesText() {
                return this.$store.state.textblocks.contacts ? this.$store.state.textblocks.contacts.text : ''
            },

            balanceDue() {
                return this.sumDebit - this.sumCredit
            },
            TotalIncVAT() {
                return this.sumDebit
            },
            currencySymbl() {
                switch (this.$store.state.currency.value) {
                    case 'EUR':
                        return '<span>&#8364;</span>'
                        break
                    case 'USD':
                        return '<span>&#36;</span>'
                        break
                    default:
                        return this.$store.state.currency.value
                        break
                }
            },

            smallTableData() {
                const namesArr = []
                this.servicesObjsArr = []

                this.getServices.forEach(item => {
                    if (namesArr.indexOf(item.nameServices) < 0 && item.nameServices !== null && item.debit) {
                        namesArr.push(item.nameServices)
                    }
                })

                namesArr.forEach(itemName => {
                    const tvaServicesObj = {
                        nameServices: null,
                        debit: 0,
                        netto: 0,
                        tva: 0
                    }

                    this.getServices.forEach(item => {
                        if (item.nameServices === itemName) {
                            tvaServicesObj.nameServices = item.nameServices
                            tvaServicesObj.debit += +item.debit
                            tvaServicesObj.netto = +tvaServicesObj.debit * (1 - this.tva / 100)
                            tvaServicesObj.netto = +tvaServicesObj.netto.toFixed(2)
                            tvaServicesObj.tva = +tvaServicesObj.debit - tvaServicesObj.netto
                            tvaServicesObj.tva = +tvaServicesObj.tva.toFixed(2)
                        }
                    })

                    this.servicesObjsArr.push(tvaServicesObj)
                })

                return this.servicesObjsArr
            },
        },

        methods: {
            saveInvoice() {
                if (this.buttonSaveLoading) {
                    return false
                }

                this.buttonSaveLoading = true

                const element = document.getElementById('printarea')
                element.classList.add('for-save')

                const opt = {
                    margin: [0, 4, 0, 0],
                    filename: 'Invoice.pdf',
                    image: {type: 'jpeg', quality: 1},
                    html2canvas: {scale: 4},
                    jsPDF: {unit: 'mm', format: 'a4', orientation: 'portrait', putOnlyUsedFonts: true}
                }

                html2pdf(element, opt)
                    .then(() => {
                            this.buttonSaveLoading = false
                            element.classList.remove('for-save')
                        }
                    )
            }
        },

        mounted() {
            this.$store.dispatch('textblocks')
        }
    }
</script>

