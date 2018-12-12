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
          title: '部门名称',
          align: 'center',
          key: 'departmentName'
        },
        {
          title: '部门审批',
          align: 'center',
          key: 'isDeptApprove',
          render: (h, params) => {
            if(params.row.isDeptApprove){
                return (<span>审批</span>)
            }else{
              return (<span>不审批</span>)
            }
          }
        },
        {
          title: '审批类型',
          align: 'center',
          key: 'approveTypeValue'

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
      searchUrl: `/api/companyDepartment/list?companyId=${this.$route.query.id}`,
      tableConfig: {
        searchUrl: `/api/companyDepartment/list?companyId=${this.$route.query.id}`,
        buttonList: [{
          type: 'modal',
          text: '添加部门',
          url: '/api/company/add',
          state: 'add',
          width: 600,
          component: 'DepatermentForm'
        }]
      }
    }
  },
  methods: {
    editUrl (curId) {
      let editModal = {
        type: 'modal',
        text: '部门修改',
        url: '/api/company/add',
        state: 'update',
        component: 'DepatermentForm'
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
