<template>
<div>
  <Table style="margin-top:15px" border :columns="table_column" :data="table_data">
  </Table>
   <!-- <Affix :offset-bottom="0"> -->
    <Page v-if="dataTotal - pageSize > 0" :total="dataTotal" :page-size="pageSize" show-total  @on-change="changepage"></Page>
    <!-- </Affix> -->

</div>
</template>

<script>

import { getTableData } from '../../api/data'

/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
const getHandledValue = num => {
  return num < 10 ? '0' + num : num
}

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
     getDate(timeStamp){
        const d = new Date(timeStamp)
        const year = d.getFullYear()
        const month = getHandledValue(d.getMonth() + 1)
        const date = getHandledValue(d.getDate())
        const hours = getHandledValue(d.getHours())
        const minutes = getHandledValue(d.getMinutes())
        const second = getHandledValue(d.getSeconds())
        let resStr = year + '-' + month + '-' + date
        return resStr
    },
    composeUrl (url, params) {
      if (url.indexOf('?') < 0 && params) {
        url += '?'
      }
      for (let key in params) {
        if (params[key] || params[key] === 0) {
          url = url + `${key}=${params[key]}&`
        }
      }
      if (url.substr(url.length - 1, 1) === '?') {
        url = url.substr(0, url.length - 1)
      }

      if (url.substr(url.length - 1, 1) === '&') {
        url = url.substr(0, url.length - 1)
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
      if(data[0].hasOwnProperty('startDate')){
          data.map((item, key) => {
            item['startDate'] = this.getDate(item['startDate'])
            return item
        })
      }
      if(data[0].hasOwnProperty('endDate')){
          data.map((item, key) => {
              item['endDate'] = this.getDate(item['endDate'])
              return item
          })
      }

      return data
    },
    async changepage (page) {
      let searchData = this.$store.state.table
      // let url = this.composeUrl(this.searchUrl, searchData.searchData)
       let url
      if((this.$route.path === '/memberList' || this.$route.path === '/companyEdit')){
        url = this.composeUrl(this.searchUrl, searchData.searchData)
      }else{
        url = this.searchUrl
      }
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
        if(!data.data.data){
          return false
        }
        let new_data = this.filters(data.data.data.list)
        data.data.data.list = new_data
        return data
      })
      if(!getData){
        this.$Message.error('服务器报错')
        return false
      }
      console.log(getData.data.data.list)
      this.table_data = getData.data.data.list
      this.pageSize =  10
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
      let url
      console.log(this.$route.path)
      if((this.$route.path == '/memberList' || this.$route.path == '/companyList')){
        url = this.composeUrl(this.searchUrl, searchData.searchData)
      }else{
        url = this.searchUrl
      }
      // url += `page=${0}`
      // if (url !== this.$store.state.table.curUrl) {
      //   return false
      // }
      this.$store.commit('setPgae', 0)
      this.refreshTable(url)
    }
  }
}
</script>

<style lang='less' scoped>

</style>
