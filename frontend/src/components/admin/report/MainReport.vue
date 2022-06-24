<template>
    <div class="main-report">
        <Panel
            class="mb-3"
            :toggleable="true"
        >
            <template #header>
                <div class="flex w-100 justify-content-between align-items-center">
                    <h2 class="p-card-title m-0">
                        {{ $t('report.main') }}

                        <span class="p-buttonset ml-2">
                            <Button
                                v-if="reportData.to && reportData.from"
                                icon="pi pi-search"
                                :loading="loading"
                                :label="$t('crud_table.search')"
                                @click="getReport"
                            />
                            <Button
                                class="p-button-danger"
                                icon="pi pi-times"
                                @click="getDefaultFilter"
                                :loading="loading"
                            />
                        </span>
                    </h2>
                    <h2 class="p-card-title m-0 mr-3">
                        {{$t('finance.total')}}
                        <span :class="total > 0 ? 'text-green-600': 'text-pink-600'">{{total}}</span>
                    </h2>
                </div>
            </template>
            <Calendar
                class="w-100"
                v-model="period"
                selectionMode="range"
                :inline="true"
                :number-of-months="3"
                :manualInput="false"/>
        </Panel>

        <div class="grid">
            <div class="col-12 md:col-6">
                <div class="card">
                    <h4 class="p-card-title">{{ $t('finance.payments') }}</h4>
                    <template v-if="payments">
                        <main-report-table
                            :items="payments"
                            type="payments"
                        />
                    </template>
                </div>
            </div>
            <div class="col-12 md:col-6">
                <div class="card">
                    <h4 class="p-card-title">{{ $t('finance.payouts') }}</h4>
                    <template v-if="payouts">
                        <main-report-table
                            :items="payouts"
                            type="payouts"
                        />
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {errorHandling, getRoleName, getRoleUrl, studentRoleId, teacherRoleId, API_URL} from "../../../helper";
import moment from "moment-timezone";
import MainReportTable from "./MainReportTable";

export default {
    name: "MainReport",
    components: {MainReportTable},
    data() {
        return {
            period: null,
            reportData: {},
            errors: [],
            loading: false,
            payments: null,
            payouts: null
        }
    },
    computed: {
        userTypes() {
            return [
                {
                    id: studentRoleId,
                    label: 'group.student'
                },
                {
                    id: teacherRoleId,
                    label: 'group.teacher'
                }
            ]
        },
        getRoleUrl() {
            return getRoleUrl(this.reportData.roleId)
        },
        total() {
            let balance = 0
            if (this.payments) {
                this.payments.forEach(payment => {
                    balance += payment.amount
                })
            }
            if (this.payouts) {
                this.payouts.forEach(payouts => {
                    balance -= payouts.amount
                })
            }
            return balance
        }
    },
    watch: {
        period() {
            if (this.period) {
                this.reportData.from = this.period[0]
                this.reportData.to = this.period[1]
            }
        }
    },
    created() {
        this.getDefaultFilter()
    },
    methods: {
        getDefaultFilter() {
            let today = new Date()
            today.setHours(0)
            const daysInMonth = moment.utc(today).daysInMonth()
            this.reportData.from = today.setDate(1)
            this.reportData.to = today.setDate(daysInMonth)
            this.period = null
        },
        getRoleTitle() {
            return getRoleName(this.reportData.roleId)
        },
        getReport() {
            this.loading = true
            this.axios.post(API_URL + 'report/main', this.reportData).then(res => {
                this.payments = res.data.payments
                this.payouts = res.data.payouts
            }).catch(e => {
                this.errors = errorHandling(e, this.$t, this.$toast)
            }).finally(() => this.loading = false)
        }
    }
}
</script>

<style scoped>

</style>