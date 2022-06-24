<template>
    <div class="main-report-table">
        <DataTable :value="items"
                   :paginator="true"
                   class="p-datatable-customers"
                   showGridlines
                   :rows="10"
                   dataKey="id"
                   v-model:filters="filters"
                   filterDisplay="row"
                   responsiveLayout="scroll"
                   :globalFilterFields="['id','country.name','representative.name','balance','status']">
            <template #header>
                <div class="flex justify-content-between">
                    <span class="p-input-icon-left">
                            <i class="pi pi-search"/>
                            <InputText v-model="filters['global'].value" placeholder="Keyword Search"/>
                        </span>
                </div>
            </template>
            <template #empty>
                {{$t('locale.emptyFilterMessage')}}
            </template>
            <Column field="id" header="Id"
                    :show-filter-menu="false" style="min-width:3rem">
                <template #body="{data}">
                    {{ data.id }}
                </template>
                <template #filter="{filterModel}">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"/>
                </template>
            </Column>
            <Column field="amount" :header="$t('finance.amount')"
                    :show-filter-menu="false" style="min-width:5rem">
                <template #body="{data}">
                    {{ data.amount }}
                </template>
                <template #filter="{filterModel, filterCallback}">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                               @change="filterCallback()" :placeholder="$t('finance.amount')"/>
                </template>
            </Column>
            <Column field="comment" :header="$t('user.comment')"
                    :show-filter-menu="false" style="min-width:5rem">
                <template #body="{data}">
                    {{$t('user.staff')}}:
                    <router-link v-if="data.staff.Teacher" :to="{name: 'TeacherCard', params: {id: data.staff.Teacher.user_id}}">
                        {{data.staff.Teacher.last_name}} {{data.staff.Teacher.first_name}}
                    </router-link>
                    <router-link v-else :to="{name: 'UserCard', params: data.staff}">
                        {{data.staff.username}}
                    </router-link>
                    <hr class="my-1">
                    <template v-if="type==='payments'">
                        {{$t('group.student')}}:
                        <router-link :to="{name: 'StudentCard', params: {id: data.student.user_id}}">
                            {{data.student.last_name}} {{data.student.first_name}}
                        </router-link>
                        <hr class="my-1">
                    </template>

                    <template v-else-if="type==='payouts'">
                        <template v-if="data.user">
                            {{data.user === 2 ? $t('group.teacher') : $t('group.student')}}:
                            <router-link :to="{name: 'TeacherCard', params: {id: data.user.user_id}}">
                                {{data.user.last_name}} {{data.user.first_name}}
                            </router-link>
                            <hr class="my-1">
                        </template>
                    </template>
                    {{ data.comment }}
                </template>
                <template #filter="{filterModel, filterCallback}">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                               @change="filterCallback()" :placeholder="$t('user.comment')"/>
                </template>
            </Column>
            <Column field="createdAt" :header="$t('locale.dateIs')"
                    :show-filter-menu="false"
                    style="min-width:12rem">
                <template #body="{data}">
                    {{ formatDate(data.createdAt) }}
                </template>
                <template #filter="{filterModel, filterCallback}">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                               @change="filterCallback()" :placeholder="$t('locale.dateIs')"/>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script>
import {FilterMatchMode} from "primevue/api";
import moment from "moment-timezone";

export default {
    name: "MainReportTable",
    props: {
        items: {
            type: Object
        },
        type: {
            type: String
        }
    },
    data() {
        return {
            filters: null
        }
    },
    created() {
        this.initFilters();
    },
    methods: {
        initFilters() {
            this.filters = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
                'id': {value: null, matchMode: FilterMatchMode.CONTAINS},
                'amount': {value: null, matchMode: FilterMatchMode.CONTAINS},
                'comment': {value: null, matchMode: FilterMatchMode.CONTAINS},
                'createdAt': {value: null, matchMode: FilterMatchMode.CONTAINS},
            }
        },
        formatDate(date) {
            return moment.utc(new Date(date)).format('DD.MM.YYYY')
        }
    }
}
</script>

<style scoped>

</style>