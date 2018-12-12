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
          title: '等级名称',
          align: 'center',
          key: 'levelName'
        },
        {
          title: '火车坐席',
          align: 'center',
          key: 'trainLevelValue'
        },
        {
          title: '飞机坐席',
          align: 'center',
          key: 'planeLevelValue'
        },
        {
          title: '住宿标准',
          align: 'center',
          key: 'hotelList',
          render: (h, params) => {
            let spanList = []
            if(params.row.hotels && params.row.hotels.length > 0 && params.row.hotels[0].hotelFeeValue == -1){
              return <span>不做控制</span>
            }
            if(params.row.hotels && params.row.hotels.length > 0){
                params.row.hotels.map((item, index)=>{
                  spanList.push(h('div', item.levelName +':  '+ item.hotelFeeValue + '元/间夜'))
                })
                return spanList
            }else{
              return (<span></span>)
            }
          }
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
                      this.editUrl(params.row.travelLevelId)
                    }
                  }
                },
                '修改'
              )
            ])
          }
        }
      ],
      searchUrl: `/api/companyTravelSetting/list?companyId=${this.$route.query.id}`,
      tableConfig: {
        searchUrl: `/api/companyTravelSetting/list?companyId=${this.$route.query.id}`,
        buttonList: [{
          type: 'modal',
          text: '差旅设置',
          url: '/api/company/add',
          state: 'add',
          width: 600,
          component: 'TravelSet'
        }]
      }
    }
  },
  methods: {
    editUrl (curId) {
      let editModal = {
        type: 'modal',
        text: '差旅设置修改',
        url: '/api/company/add',
        state: 'update',
        width: 600,
        component: 'TravelSet'
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
