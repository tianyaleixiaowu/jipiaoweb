<template>
  <TableModel :tableConfig="tableConfig" v-bind:hasSearch="hasSearch" v-bind:table_column="table_column" v-bind:searchUrl="searchUrl">
  </TableModel>
</template>

<script>
import TableModel from '../model/table_model'
import Axios from 'axios'
import Qs from 'qs'
export default {
  data () {
    return {
      hasSearch: false,
      table_column: [
        {
          title: '差旅等级',
          align: 'center',
          key: 'level'
        },
        {
          title: '等级名称',
          align: 'center',
          key: 'levelName'
        },
        // {
        //   title: '等级类型',
        //   align: 'center',
        //   key: 'levelType'
        // },
        {
          title: '是否可用',
          align: 'center',
          key: 'isEnable',
          render: (h, params) => {
            return h('div', [
              h(
                'i-switch', {
                  props: {
                    value: params.row.isEnable
                  },
                  on: {
                    'on-change': (status) => {
                      this.submiteData(status, params.row.id)
                    }
                  }
                }
              )
            ])
          }
        }
      ],
      searchUrl: `/api/companyTravelLevel/list?companyId=${this.$route.query.id}&city=true`,
      tableConfig: {
        searchUrl: `/api/companyTravelLevel/list?companyId=${this.$route.query.id}&city=true`,
        buttonList: [{
          type: 'modal',
          text: '添加城市等级',
          url: '/api/company/add',
          state: 'add',
          component: 'CityForm'
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
        if(res.data.code == 200){
          this.$Message.success('更改成功')
        }
        // this.$store.commit('refreshTable', { curtime: new Date().getTime() })
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
