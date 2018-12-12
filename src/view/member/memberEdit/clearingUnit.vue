<template>
  <TableModel :tableConfig="tableConfig" v-bind:hasSearch="hasSearch" v-bind:table_column="table_column" v-bind:searchUrl="searchUrl">
  </TableModel>
</template>

<script>
import TableModel from '../../model/table_model'
import Axios from 'axios'
import Qs from 'qs'
export default {
  data () {
    return {
      hasSearch: false,
      table_column: [
        {
          title: '公司名',
          align: 'center',
          key: 'companyName'
        },
        {
          title: '会员卡号',
          align: 'center',
          key: 'cardNum'
        },
        {
          title: '差旅等级',
          align: 'center',
          key: 'travelLevelName'
        },
        {
          title: '是否可用',
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
          title: '操作',
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
                      console.log(params.row)
                      this.editUrl(params.row.companyId, params.row.id)
                    }
                  }
                },
                '修改'
              )
            ])
          }
        }
      ],

      searchUrl: `/api/memberBalanceCompany/${this.$route.query.id}`,
      tableConfig: {
        searchUrl: `/api/memberBalanceCompany/${this.$route.query.id}`,
        buttonList: [{
          type: 'modal',
          text: '添加结算单位',
          url: '/api/company/add',
          state: 'add',
          component: 'ClearForm'
        }]
      }
    }
  },
  methods: {
    submiteData (status, curId) {
      let formData = {}
      formData.id = curId
      formData.enable = status
      let sumitUrl = '/api/companyTravelLevel/enable'
      var data = Qs.stringify(formData)
      Axios({
        method: 'POST',
        url: sumitUrl,
        data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'userId': this.$store.state.user.userId
        }
      }).then(res => {
        // this.$store.commit('refreshTable', { curtime: new Date().getTime() })
      })
    },
    editUrl (curId, rowId) {
      let editModal = {
        type: 'modal',
        text: '结算修改',
        url: '/api/company/add',
        state: 'update',
        component: 'ClearForm'
      }
      editModal.curtime = new Date().getTime()
      editModal.status = true
      editModal.curId = curId
      editModal.rowId = rowId
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
