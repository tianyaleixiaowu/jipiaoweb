<template>
  <div class="searchMain">
      <SearchForm style="margin-bottom: 15px" v-if="hasSearch" v-bind:searchObj="tableConfig.searchObj" v-bind:companyList="companyList" v-bind:searchUrl="tableConfig.searchUrl" v-bind:searchModel="getFormModel()">
      </SearchForm>
      <Button :class="curButton.num != 0 ?'searchBtnStyle':null" v-for="curButton in tableConfig.buttonList" :key="curButton.url" type="primary" @click="addButton(curButton)">{{curButton.text}}</Button>
      <!-- table -->
      <ViewTable style="margin-top:15px" v-bind:table_column="table_column" v-bind:searchUrl="searchUrl || tableConfig.searchUrl" border ></ViewTable>
  </div>
</template>

<script>
// import SearchForm from '../container/search_form'
// import renderHeader from '../container/test';
import SearchForm from '../container/search_form'
import ViewTable from '../container/view_table'
export default {
  props: ['tableConfig', 'table_column', 'searchUrl', 'hasSearch', 'companyList'],
  data () {
    return {

    }
  },
  methods: {
    getFormModel () {
      let searchObj = this.tableConfig.searchObj
      let searchObjLen = searchObj.length
      let formModelObj = {}
      searchObj.map((item, index) => {
        if (item.type === 'input') {
          formModelObj[item.name] = ''
        } else if (item.type === 'select') {
          formModelObj[item.name] = ''
        }
      })
      return formModelObj
    },
    // button类型转化
    addButton (cur_button) {
      cur_button.curtime = new Date().getTime()
      cur_button.status = true
      if (cur_button.type === 'modal') {
        this.$store.commit('modalStatus', cur_button)
      }
    }
  },
  components: {
    SearchForm,
    ViewTable
  }
}
</script>

<style lang='less' scoped>
  .searchMain .ivu-form-item {
    margin-bottom: 10px;
  }
  .text-line {
    text-decoration: underline;
    cursor: pointer;
  }
  .searchBtnStyle{
    margin-left: 15px;
  }
</style>
