<template>
  <TableModel :tableConfig="tableConfig" v-bind:hasSearch="hasSearch" v-bind:table_column="table_column" v-bind:searchUrl="searchUrl">
  </TableModel>
</template>

<script>
import TableModel from '../model/table_model'
export default {
  data () {
    return {
      hasSearch: false,
      table_column: [
        {
          title: '真实姓名',
          align: 'center',
          key: 'realName'
        },
        {
          title: '卡号',
          align: 'center',
          key: 'cardNum'
        },
        {
          title: '审批顺序',
          align: 'center',
          key: 'approvalSort'
        },
        {
          title: '修改',
          align: 'center',
          key: 'edit',
          render: (h, params) => {
            return h('div', [
              h(
                'Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.editUrl(params.row.id)
                    }
                  }
                },
                '修改'
              )
            ])
          }
        }
      ],
      searchUrl: `/api/companyApprover/list?companyId=${this.$route.query.id}`,
      tableConfig: {
        searchUrl: `/api/companyApprover/list?companyId=${this.$route.query.id}`,
        buttonList: [{
          type: 'modal',
          text: '添加审批人',
          url: '/api/company/add',
          state: 'add',
          component: 'ApproverForm'
        }]
      }
    }
  },
  methods: {
    editUrl (curId) {
      let editModal = {
        type: 'modal',
        text: '审批人修改',
        url: '/api/company/add',
        state: 'update',
        component: 'ApproverForm'
      }
      editModal.curtime = new Date().getTime()
      editModal.status = true
      editModal.curId = curId
      if (editModal.type === 'modal') {
        this.$store.commit('modalStatus', editModal)
      }
    }
  },
  components: {
    TableModel
  }
}
</script>

<style lang='less' scoped>

</style>
