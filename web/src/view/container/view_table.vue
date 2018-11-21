<template>
<div>
  <Table style="margin-top:15px" border :columns="table_column" :data="table_data">
  </Table>
  <Page :total="dataTotal" :page-size="pageSize" show-total  @on-change="changepage"></Page>
</div>
</template>

<script>
import { getTableData } from '../../api/data'
export default {
  props: ['table_column', 'table_column', 'searchUrl'],
  data () {
    return {
      dataTotal: 100,
      pageSize: 10,
      curPage: 0,
      table_data: [{
        code: '10281121',
        type: '0',
        name: '李小明',
        company: '阳光集团酒店公司',
        tel: '15712922312',
        sex: '男',
        work: '测试职务1',
        level: '副科级',
        total: '0'
      },
      {
        code: '10281121',
        type: '1',
        name: '李小明',
        company: '阳光集团酒店公司',
        tel: '15712922312',
        sex: '男',
        work: '测试职务1',
        level: '副科级',
        total: '0'
      },
      {
        code: '10281121',
        type: '1',
        name: '李小明',
        company: '阳光集团酒店公司',
        tel: '15712922312',
        sex: '男',
        work: '测试职务1',
        level: '副科级',
        total: '0'
      },
      {
        code: '10281121',
        type: '1',
        name: '李小明',
        company: '阳光集团酒店公司',
        tel: '15712922312',
        sex: '男',
        work: '测试职务1',
        level: '副科级',
        total: '0'
      },
      {
        code: '10281121',
        type: '1',
        name: '李小明',
        company: '阳光集团酒店公司',
        tel: '15712922312',
        sex: '男',
        work: '测试职务1',
        level: '副科级',
        total: '0'
      },
      {
        code: '10281121',
        type: '1',
        name: '李小明',
        company: '阳光集团酒店公司',
        tel: '15712922312',
        sex: '男',
        work: '测试职务1',
        level: '副科级',
        total: '0'
      },
      {
        code: '10281121',
        type: '1',
        name: '李小明',
        company: '阳光集团酒店公司',
        tel: '15712922312',
        sex: '男',
        work: '测试职务1',
        level: '副科级',
        total: '0'
      },
      {
        code: '10281121',
        type: '1',
        name: '李小明',
        company: '阳光集团酒店公司',
        tel: '15712922312',
        sex: '男',
        work: '测试职务1',
        level: '副科级',
        total: '0'
      },
      {
        code: '10281121',
        type: '1',
        name: '李小明',
        company: '阳光集团酒店公司',
        tel: '15712922312',
        sex: '男',
        work: '测试职务1',
        level: '副科级',
        total: '0'
      },
      {
        code: '10281121',
        type: '1',
        name: '李小明',
        company: '阳光集团酒店公司',
        tel: '15712922312',
        sex: '男',
        work: '测试职务1',
        level: '副科级',
        total: '0'
      }
      ]
    }
  },
  computed: {
    getSearchData () {
      return this.$store.state.table.curtime
    }
  },
  methods: {
    composeUrl (url, params) {
      if (url.indexOf('?') < 0 && params) {
        url += '?'
      }
      for (let key in params) {
        if (params[key] || params[key] === 0) {
          url = url + `${key}=${params[key]}&`
        }
      }
      if (url.charAt(url.length - 1) === '?') {
        url = url.split('?')[0]
      }
      return url
    },
    filters (data) {
      if (data.length <= 0) return []
      if (data[0].hasOwnProperty('gender')) {
        data.map((item, key) => {
          if (item['gender'] == 1) {
            item['gender'] = '男'
          } else {
            item['gender'] = '女'
          }
          return item
        })
      }
      return data
    },
    async changepage (page) {
      let searchData = this.$store.state.table
      let url = this.composeUrl(this.searchUrl, searchData.searchData)
      if (url.indexOf('?') < 0) {
        url += '?'
      }
      page = --page
      url += `page=${page}`
      this.refreshTable(url)
      this.$store.commit('setPgae', page)
    },
    async refreshTable (url) {
      // if(url.indexOf('page') <= -1 && url.indexOf('?')){
      //   url += `&page=${this.curPage}&`
      //   url += `size=${this.pageSize}`
      // }
      let getData = await getTableData(url, this.$store.state.user.token).then(data => {
        let new_data = this.filters(data.data.data.list)
        data.data.data.list = new_data
        return data
      })
      this.table_data = getData.data.data.list
      this.pageSize = getData.data.data.list.length || 10
      this.dataTotal = getData.data.data.totalCount
    }
  },
  async mounted () {
    let url = this.searchUrl
    this.refreshTable(url)
  },
  watch: {
    async getSearchData () {
      let searchData = this.$store.state.table
      let url = this.composeUrl(this.searchUrl, searchData.searchData)
      // url += `page=${0}`
      if (url !== this.$store.state.table.curUrl) {
        return false
      }
      this.$store.commit('setPgae', 0)
      this.refreshTable(url)
    }
  }
}
</script>

<style lang='less' scoped>

</style>
