<template>
  <Form :model="searchModel" label-position="left" :label-width="70">
    <Row :gutter="15">
      <Col span="6"  v-for="item in searchObj" v-bind:key="item.name">
        <FormItem v-if="item.type === 'input'" :label="item.view_name">
          <Input v-model="searchModel[item.name]" :placeholder="item.placeholder"></Input>
        </FormItem>
        <FormItem v-else-if="item.type === 'select'" :label="item.view_name">
          <Select v-model="searchModel[item.name]"  :placeholder="item.placeholder" filterable>
                    <Option v-for="option in item.data" :value="option.id" :key="option.name">{{ option.name }}</Option>
          </Select>
        </FormItem>
      </Col>
      <Col span="4">
            <Button @click="getTableData()" type="primary" icon="ios-search">查询</Button>
      </Col>
    </Row>
  </Form>
</template>

<script>
export default {
  props: ['searchObj', 'searchModel', 'searchUrl'],
  data () {
    return {}
  },
  methods: {
    getTableData () {
      this.$store.commit('setSearchData', { searchData: this.searchModel, searchUrl: this.searchUrl, curtime: new Date().getTime() })
    }
  },
  computed: {
    // 计算属性的 getter

    // generateSearchForm: function() {
    //   return JSON.stringify(this.searchObj)
    // }
  }
}
</script>

<style lang='less' scoped>

</style>
