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
          key: 'companyName'
        },
        {
          title: '单位板块',
          align: 'center',
          key: 'panelnameValue'
        },
        {
          title: '服务费收取方式',
          align: 'center',
          key: 'serverTypeValue'
        },
        {
          title: '收费数值',
          align: 'center',
          key: 'serverCost',
          render: (h, params) => {
            if(params.row.serverType =='2'){
              return (
                <span>{params.row.debtTime}%</span>
              )
            }else if(params.row.serverType =='3'){
              return (
                <span>￥{params.row.serverCost}</span>
              )
            }else{
              return (
                <span>免费</span>
              )
            }
          }
        },
        {
          title: '出票政策',
          align: 'center',
          key: 'policyTypeValue'
        },
        {
          title: '审批类型',
          align: 'center',
          key: 'approveTypeValue'
        },
        {
          title: '差旅控制方式',
          width: 100,
          align: 'center',
          key: 'travelControlTypeValue'
        },
        {
          title: '是否有效',
          align: 'center',
          key: 'isEnable',
          render: (h, params) => {
            if(params.row.isEnable){
                return (<span>可用</span>)
            }else{
              return (<span>不可用</span>)
            }
          }
        },
        {
          title: '欠款期限',
          align: 'center',
          key: 'debtTime',
          render: (h, params) => {
            if(params.row.debtTime || params.row.debtTime == 0){
              return (
                <span>{params.row.debtTime}个月</span>
              )
            }
          }
        },
        {
          title: '操作',
          align: 'center',
          width: 150,
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
          type: 'select',
          name: 'panelname',
          showUnselect: true,
          view_name: '单位板块',
          placeholder: '请选择板块',
          data: 53
        },
        {
          type: 'select',
          name: 'isEnable',
          view_name: '是否有效',
          showUnselect: true,
          placeholder: '请选择',
          data: [{
            id: 'true',
            name: '有效'
          },
          {
            id: 'false',
            name: '无效'
          }
          ]
        }
        ],
        buttonList: [{
          num: 0,
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
