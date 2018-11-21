<template>
  <Tabs type="card">
        <TabPane label="基础信息"><basicInformation status="update"></basicInformation></TabPane>
        <!-- <TabPane label="会员证件"><membershipDocuments></membershipDocuments></TabPane>
        <TabPane label="常用地址"><commonAddress></commonAddress></TabPane> -->
        <TabPane label="结算单位"><clearingUnit></clearingUnit></TabPane>
        <!-- <TabPane label="领导列表"><leadership></leadership></TabPane>
        <TabPane label="常用乘机人"><frequentPassenger></frequentPassenger></TabPane>
        <TabPane label="会员权限"><membershipAuthority></membershipAuthority></TabPane>
        <TabPane label="常旅客卡"><commonPassenger></commonPassenger></TabPane>
        <TabPane label="信用卡"><creditCard></creditCard></TabPane>
        <TabPane label="会员积分"><membershipIntegral></membershipIntegral></TabPane> -->
        <!-- <TabPane label="积分兑换">积分兑换</TabPane> -->
        <!-- <TabPane label="常用功能"><commonFunction></commonFunction></TabPane> -->
  </Tabs>
</template>

<script>
import basicInformation from '../container/member_form'
import membershipDocuments from './memberEdit/membershipDocuments'
import commonAddress from './memberEdit/commonAddress'
import clearingUnit from './memberEdit/clearingUnit'
import leadership from './memberEdit/leadership'
import frequentPassenger from './memberEdit/frequentPassenger'
import membershipAuthority from './memberEdit/membershipAuthority'
import commonPassenger from './memberEdit/commonPassenger'
import creditCard from './memberEdit/creditCard'
import membershipIntegral from './memberEdit/membershipIntegral'
import commonFunction from './memberEdit/commonFunction'
export default {
  data () {
    return {}
  },
  components: {
    basicInformation: basicInformation,
    membershipDocuments: membershipDocuments,
    commonAddress: commonAddress,
    clearingUnit: clearingUnit,
    leadership: leadership,
    frequentPassenger: frequentPassenger,
    membershipAuthority: membershipAuthority,
    commonPassenger: commonPassenger,
    creditCard: creditCard,
    membershipIntegral: membershipIntegral,
    commonFunction: commonFunction
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
