<template>
  <Form ref="formSearch" :model="searchModelData" label-position="left" :label-width="70">
    <Row :gutter="15">
      <Col :span="item.type==='checkbox'?8:8"  v-for="item in searchObj" v-bind:key="item.name">
        <FormItem v-if="item.type === 'input'" :label="item.view_name" :prop="item.name">
          <Input v-model="searchModelData[item.name]" :placeholder="item.placeholder"></Input>
        </FormItem>
        <FormItem v-if="item.type === 'searchBlear'" :label="item.view_name" :prop="item.name">
          <Input style="width:60%" v-model="searchModelData[item.name]" :placeholder="item.placeholder"></Input>
          <Checkbox  style="margin-left: 10px" v-model="searchModelData[item.blear]">{{item.blear_name}}</Checkbox>
        </FormItem>
        <FormItem v-if="item.type === 'checkbox'" >
          <Checkbox  v-model="searchModelData[item.name]">{{item.view_name}}</Checkbox>
        </FormItem>
        <FormItem v-else-if="item.type === 'select' && !item.data.length" :label="item.view_name">
          <Select v-model="searchModelData[item.name]"  :placeholder="item.placeholder" filterable>
            <Option v-if="item.showUnselect" value="">无</Option>
            <Option v-for="option in getterGroup(item.data)" :value="option.dKey" :key="option.dKey">{{ option.dValue }}</Option>
          </Select>
        </FormItem>
        <FormItem v-else-if="item.type === 'select' && item.data.length" :label="item.view_name">
          <Select v-model="searchModelData[item.name]"  :placeholder="item.placeholder" filterable>
            <Option v-if="item.showUnselect" value="">无</Option>
            <Option v-for="option in item.data" :value="option.id" :key="option.id">{{ option.name }}</Option>
          </Select>
        </FormItem>
        <FormItem v-else-if="item.type === 'companyList'" :label="item.view_name">
          <Select v-model="searchModelData[item.name]"  :placeholder="item.placeholder" filterable>
            <Option v-if="item.showUnselect" value="">无</Option>
             <Option v-for="item in companyList" :value="item.id + ''" :key="item.id">{{ item.companyName }}</Option>
          </Select>
        </FormItem>
      </Col>
      <Col span="8">
            <Button @click="getTableData()" type="primary" icon="ios-search">查询</Button>
            <Button @click="resetForm()" style="margin-left:15px" type="warning" icon="ios-refresh">重置</Button>
      </Col>
    </Row>
  </Form>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['searchObj', 'searchModel', 'searchUrl', 'companyList'],
  data () {
    return {
      searchModelData: this.searchModel
    }
  },
  methods: {
    getTableData () {
      this.$store.commit('setSearchData', { searchData: this.searchModelData, searchUrl: this.searchUrl, curtime: new Date().getTime() })
    },
    resetForm(){
      let tempObj = {}
      this.searchObj.map((item)=>{
        console.log(item.name)
        tempObj[item.name] = undefined
      })
      this.searchModelData = tempObj;
      // this.$refs.formSearch.resetFields()
    }
  },
  computed: {
    ...mapGetters([
      'getterGroup'
    ])
  }
}
</script>

<style lang='less' scoped>

</style>
