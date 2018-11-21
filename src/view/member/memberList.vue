<template>
  <TableModel v-bind:hasSearch="hasSearch" :tableConfig="tableConfig" v-bind:table_column="table_column" v-bind:searchUrl="searchUrl">
  </TableModel>
</template>

<script>
import { mapGetters } from 'vuex'
import TableModel from '../model/table_model'
import Axios from 'axios'
export default {
  data () {
    return {
      hasSearch: true,
      table_column: [
        {
          title: '卡号',
          align: 'center',
          width: 118,
          key: 'cardNum'
        },
        {
          title: '类型',
          align: 'center',
          width: 118,
          key: 'memberTypeValue'
        },
        {
          title: '姓名',
          align: 'center',
          width: 118,
          key: 'realName'
        },
        {
          title: '所属单位',
          align: 'center',
          width: 118,
          key: 'companyIdValue'
        },
        {
          title: '手机号码',
          align: 'center',
          width: 118,
          key: 'cellPhone'
        },
        {
          title: '性别',
          align: 'center',
          width: 118,
          key: 'gender'
        },
        {
          title: '职务',
          align: 'center',
          width: 118,
          key: 'positionValue'
        },
        {
          title: '行政级别',
          align: 'center',
          width: 118,
          key: 'administrativeLevelValue'
        },
        {
          title: '修改',
          align: 'center',
          width: 202,
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
                      this.editUrl(params.row.cardNum)
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
                      this.confirm(params.row.cardNum)
                    }
                  }
                },
                '禁用'
              )
            ])
          }
        }
      ],
      searchUrl: '/api/member/list',
      tableConfig: {
        searchUrl: '/api/member/list',
        searchObj: [{
          type: 'input',
          name: 'cardNum',
          view_name: '会员卡号',
          placeholder: '请输入会员卡号'
        },
        {
          type: 'select',
          name: 'memberType',
          view_name: '会员类型',
          placeholder: '请选择会员类型',
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
          name: 'realName',
          view_name: '会员姓名',
          placeholder: '请输入会员姓名'
        },
        {
          type: 'input',
          name: 'companyId',
          view_name: '所属单位',
          placeholder: '请输入会员姓名'
        },
        {
          type: 'input',
          name: 'cellPhone',
          view_name: '手机号码',
          placeholder: '请输入手机号码'
        },
        {
          type: 'input',
          name: 'paperNum',
          view_name: '证件号码',
          placeholder: '请输入证件号码'
        },
        {
          type: 'select',
          name: 'administrativeLevel',
          view_name: '行政级别',
          placeholder: '请选择行政级别',
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
              name: '是vip'
            },
            {
              id: 0,
              name: '不是vip'
            }
          ]
        },
        {
          type: 'select',
          name: 'isEnable',
          view_name: '是否有效',
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
        }
        ],
        buttonList: [
          {
            num: 0,
            type: 'modal',
            text: '新建会员',
            url: '/api/company/add',
            state: 'add',
            component: 'MemberForm'
          }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'getterGroup'
    ])
  },
  methods: {
    editUrl (id) {
      this.$router.push({
        name: 'memberEdit',
        query: { id: id }
      })
    },
    delMember (cardNum) {
      Axios({
        method: 'POST',
        url: `/api/member/delete/${cardNum}`,
        headers: {
          userId: this.$store.state.user.userId
        }
      }).then(res => {
        if (res.data.code == 200) {
          // this.$Message.info(res.data.data)
          this.$Message.info('禁用成功')
          this.$store.commit('refreshTable', { curtime: new Date().getTime() })
        }
      })
    },
    confirm (cardNum) {
      this.$Modal.confirm({
        title: '删除会员',
        content: '你确定要删除此证件么',
        onOk: () => {
          this.delMember(cardNum)
        },
        onCancel: () => {
          this.$Message.info('Clicked cancel')
        }
      })
    },
    changeProperty (list) {
      list.map((item, index) => {
        item.name = item.dValue
      })
      return list
    }
  },
  mounted () {
    // this.searchObj[1]['data']
    let memberType = this.getterGroup(7)
    this.tableConfig.searchObj[1]['data'] = this.changeProperty(memberType)
    let administrater = this.getterGroup(31)
    this.tableConfig.searchObj[6]['data'] = this.changeProperty(administrater)
  },
  components: {
    TableModel
  }
}
</script>

<style lang='less' scoped>

</style>
