<template>
  <TableModel v-bind:hasSearch="hasSearch" :tableConfig="tableConfig" v-bind:table_column="table_column" v-bind:searchUrl="searchUrl">
  </TableModel>
</template>

<script>
import TableModel from '../model/table_model'
import Axios from 'axios'
export default {
  data () {
    return {
      hasSearch: true,
      table_column: [
        {
          title: '单位名称',
          align: 'center',
          width: 105,
          key: 'companyName'
        },
        {
          title: '单位板块',
          width: 105,
          align: 'center',
          key: 'panelname'
        },
        {
          title: '服务费收取方式',
          width: 105,
          align: 'center',
          key: 'serverType'
        },
        {
          title: '收费数值',
          width: 105,
          align: 'center',
          key: 'serverCost'
        },
        {
          title: '出票政策',
          width: 105,
          align: 'center',
          key: 'policyType'
        },
        {
          title: '审批类型',
          width: 105,
          align: 'center',
          key: 'approveType'
        },
        {
          title: '差旅控制方式',
          width: 105,
          align: 'center',
          key: 'travelControlTypeValue'
        },
        {
          title: '是否可用',
          width: 105,
          align: 'center',
          key: 'isEnable'
        },
        {
          title: '欠款期限',
          width: 105,
          align: 'center',
          key: 'debtTime'
        },
        {
          title: '操作',
          align: 'center',
          width: 200,
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
              ),
              <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>,
              h(
                'Button', {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.confirm(params.row.id)
                    }
                  }
                },
                '禁用'
              )
            ])
          }
        }
      ],
      searchUrl: '/api/company/list',
      tableConfig: {
        searchUrl: '/api/company/list',
        searchObj: [{
          type: 'input',
          name: 'companyName',
          view_name: '单位名称',
          placeholder: '请输入单位名称'
        },
        {
          type: 'input',
          name: '单位板块',
          view_name: 'key',
          placeholder: '请输入panelname'
        },
        {
          type: 'select',
          name: 'isEnable',
          view_name: '是否有效',
          placeholder: '请选择',
          data: [{
            id: 1,
            name: '有效'
          },
          {
            id: 0,
            name: '无效'
          }
          ]
        }
        ],
        buttonList: [{
          type: 'modal',
          text: '添加公司',
          url: '/api/company/add',
          state: 'add',
          component: 'CompanyForm'
        }]
      }
    }
  },
  methods: {
    editUrl (id) {
      this.$router.push({
        name: 'companyEdit',
        query: {
          id: id
        }
      })
    },
    delMember (id) {
      Axios({
        method: 'POST',
        url: `/api/company/delete/${id}`,
        headers: {
          userId: this.$store.state.user.userId
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.$Message.info('禁用成功')
          this.$store.commit('refreshTable', {
            curtime: new Date().getTime()
          })
        }
      })
    },
    confirm (id) {
      this.$Modal.confirm({
        title: '禁用公司',
        content: '你确定要禁用该公司么',
        onOk: () => {
          this.delMember(id)
        },
        onCancel: () => {
          this.$Message.info('Clicked cancel')
        }
      })
    }
  },
  components: {
    TableModel
  }
}
</script>

<style lang='less' scoped>

</style>
