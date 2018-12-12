<template>
  <TableModel v-bind:hasSearch="hasSearch" :tableConfig="tableConfig" v-bind:table_column="table_column" v-bind:searchUrl="searchUrl">
  </TableModel>
</template>

<script>
import TableModel from '../../model/table_model'
export default {
  data () {
    return {
      hasSearch: true,
      table_column: [
        {
          title: '领导卡号',
          align: 'center',
          key: 'companyName'
        },
        {
          title: '领导姓名',
          align: 'center',
          key: 'panelname'
        },
        {
          title: '领导电话',
          align: 'center',
          key: 'serverType'
        },
        {
          title: '企业名称',
          align: 'center',
          key: 'serverCost'
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
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.editUrl(params.row.id)
                    }
                  }
                },
                '删除'
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
          view_name: '会员卡号',
          placeholder: '请输入单位名称'
        },
        {
          type: 'select',
          name: 'membertype',
          view_name: '会员类型',
          placeholder: '请选择',
          data: [
            {
              id: 1,
              name: '有效'
            },
            {
              id: 0,
              name: '无效'
            }
          ]
        },
        {
          type: 'select',
          name: 'memberlevel',
          view_name: '会员等级',
          placeholder: '请选择',
          data: [
            {
              id: 1,
              name: '有效'
            },
            {
              id: 0,
              name: '无效'
            }
          ]
        },
        {
          type: 'input',
          name: 'memebername',
          view_name: '会员姓名',
          placeholder: '请输入会员姓名'
        },
        {
          type: 'input',
          name: 'company',
          view_name: '所属单位',
          placeholder: '请输入会员姓名'
        },
        {
          type: 'input',
          name: 'belong_number',
          view_name: '所属号码',
          placeholder: '请输入会员姓名'
        },
        {
          type: 'input',
          name: 'idfine',
          view_name: '身份证号',
          placeholder: '请输入会员姓名'
        },
        {
          type: 'input',
          name: 'phone_number',
          view_name: '手机号',
          placeholder: '请输入会员姓名'
        },
        {
          type: 'select',
          name: 'level',
          view_name: '行政级别',
          placeholder: '请选择',
          data: [
            {
              id: 1,
              name: '有效'
            },
            {
              id: 0,
              name: '无效'
            }
          ]
        },
        {
          type: 'select',
          name: 'plane_level',
          view_name: '仓位级别',
          placeholder: '请选择',
          data: [
            {
              id: 1,
              name: '有效'
            },
            {
              id: 0,
              name: '无效'
            }
          ]
        },
        {
          type: 'select',
          name: 'isVip',
          view_name: '是否VIP',
          placeholder: '请选择',
          data: [
            {
              id: 1,
              name: '是'
            },
            {
              id: 0,
              name: '否'
            }
          ]
        },
        {
          type: 'select',
          name: 'isEnable2',
          view_name: '是否有效',
          placeholder: '请选择',
          data: [
            {
              id: 1,
              name: '是'
            },
            {
              id: 0,
              name: '否'
            }
          ]
        }
        ],
        buttonList: [
          //   {
          //   num: 0,
          //   type: 'modal',
          //   text: '添加公司',
          //   url: '/api/company/add',
          //   state: 'add',
          //   component: 'CompanyForm'
          // },
          {
            num: 0,
            type: 'modal',
            text: '保存',
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
        query: { id: id }
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
