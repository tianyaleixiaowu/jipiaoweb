<template>
<TableModel :tableConfig="tableConfig" v-bind:hasSearch="hasSearch" v-bind:table_column="table_column" v-bind:searchUrl="searchUrl">
</TableModel>
</template>

<script>
import TableModel from '../model/table_model'
export default {
    data() {
        return {
            hasSearch: false,
            table_column: [{
                    title: '开始日期',
                    align: 'center',
                    key: 'startDate'
                },
                {
                    title: '截止日期',
                    align: 'center',
                    key: 'endDate'
                },
                {
                    title: '总预算',
                    align: 'center',
                    key: 'totalCost'
                },
                {
                    title: '剩余预算',
                    align: 'center',
                    key: 'surplusCost'
                }
            ],
            searchUrl: `/api/companyBudget/list?companyId=${this.$route.query.id}`,
            tableConfig: {
                searchUrl: `/api/companyBudget/list?companyId=${this.$route.query.id}`,
                buttonList: [{
                    type: 'modal',
                    text: '添加预算',
                    url: '/api/company/add',
                    state: 'add',
                    component: 'BudgetForm'
                }]
            }
        }
    },
    methods: {
        editUrl(id) {
            // this.$router.push({
            //   name: "companyEdit",
            //   query: { id: id }
            // });
        }

    },
    components: {
        TableModel
    }
}
</script>

<style lang='less' scoped>

</style>
