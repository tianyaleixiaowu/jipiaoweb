<template>
  <Tabs type="card"  @on-click="refreshTravelSet">
        <TabPane label="公司基本信息"><companyForm status="update"/></TabPane>
        <TabPane label="部门管理"><departmentManage/></TabPane>
        <TabPane label="审批人"><approver/></TabPane>
        <TabPane label="差旅等级"><travelLevel/></TabPane>
        <TabPane label="城市等级"><cityLevel/></TabPane>
        <!-- <TabPane label="差旅设置"><travelSet :curTime="curTime" /></TabPane> -->
        <TabPane label="差旅设置"><travelTable :curTime="curTime" /></TabPane>
        <TabPane label="单位预算"><budgetInfo/></TabPane>
        <!-- <TabPane label=""><companySet/></TabPane> -->
        <!-- <TabPane label="发票信息"><receiptInfo/></TabPane> -->
  </Tabs>
</template>

<script>
import departmentManage from './department_manage'
import companyForm from '../container/company_form'
import approver from './approver'
import travelLevel from './travel_level'
import cityLevel from './city_level'
import travelSet from './travel_set'
import companySet from './company_set'
import receiptInfo from './receipt_info'
import budgetInfo from './budget_info'
import travelTable from './travel_table'
export default {
  data () {
    return {
      curTime: 0
    }
  },
  methods: {
    refreshTravelSet(name){
      if(name != 5){
        return false
      }
      this.curTime = new Date().getTime()
    }
  },
  components: {
    companyForm: companyForm,
    departmentManage: departmentManage,
    approver: approver,
    travelLevel: travelLevel,
    cityLevel: cityLevel,
    travelSet: travelSet,
    companySet: companySet,
    receiptInfo: receiptInfo,
    budgetInfo,
    travelTable
  }
}
</script>

<style>
.ivu-tabs-bar {
  margin-bottom: 0px;
}
.ivu-tabs .ivu-tabs-tabpane {
  background: #fff;
  padding: 15px;
}
</style>
