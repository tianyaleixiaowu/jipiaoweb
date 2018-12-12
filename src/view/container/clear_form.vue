
<template>
  <Form ref='formValidate' :model="formValidate" :rules="ruleValidate" label-position="left" :label-width="70">
    <Row :gutter="15">
      <Col span="9" v-if="status">
          <FormItem label="所属单位" prop="parentId">
            <Select @on-change="changeCompanyList" v-model="formValidate.companyId" filterable>
              <Option v-for="item in companyList" :value="item.id + ''" :key="item.id">{{ companyName = item.companyName }}</Option>
            </Select>
          </FormItem>
      </Col>
      <Col span="10">
      <FormItem label="等级类型" prop="travelLevelId">
        <Select filterable v-model="formValidate.travelLevelId" placeholder="请选择审批类型">
            <Option  v-for="item in travelList"   :value="item.id" :key="item.id">{{ item.levelName }}</Option>
        </Select>
      </FormItem>
      </Col>

      <Col span="4">
        <FormItem  prop="isEnable">
          <!-- style="margin-left:15px;margin-top:5px;" -->
          <Checkbox  v-model="formValidate.isEnable">是否可用</Checkbox>
        </FormItem>
      </Col>
    </Row>
    <FormItem>
      <Button type="primary" @click="handleSubmit()">提交</Button>
    </FormItem>
  </Form>
</template>

<script>
import Axios from 'axios'
import Qs from 'qs'
export default {
  data () {
    return {
      status: true,
      companyName: '',
      formValidate: {
        cardNum: '',
        companyId: '',
        travelLevelId: '0',
        isEnable: true,
      },
      ruleValidate: {
        level: [{
          required: true,
          // type: "number",
          message: '请输入差旅等级',
          trigger: 'blur'
        }],
        levelName: [{
          required: true,
          message: '请输入等级名称',
          trigger: 'blur'
        }]
      },
      travelList: [
      ],
      companyList: [],
      curMember: {}
    }
  },
  computed: {
  },
  methods: {
    cancelModal () {
      let cur_modal = this.$store.state.modal
      cur_modal.curtime = new Date().getTime()
      cur_modal.status = false
      cur_modal.component = 'Input'
      this.$store.commit('modalStatus', cur_modal)
    },
    refreshTable () {
      this.$store.commit('refreshTable', { curtime: new Date().getTime() })
    },
    changeCompanyList () {
      let companyId = this.formValidate.companyId
      Axios({
        method: 'get',
        url: `/api/companyTravelLevel/list?companyId=${companyId}`,
        headers: {
          userId: this.$store.state.user.userId
        }
      }).then(res => {
        this.travelList = res.data.data.list
        this.formValidate.travelLevelId = res.data.data.list[0] && res.data.data.list[0]['id'] || '0'
      }).catch(function (error) {
        console.log(error)
      })
    },
    async handleSubmit () {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          this.submiteData(this.formValidate)
        }
      })
    },
    // 获取表单详情
    getFormDetail () {
      let curId = this.$store.state.modal.rowId
      Axios({
        method: 'get',
        url: `/api/memberBalanceCompany?id=${curId}`,
        headers: {
          userId: this.$store.state.user.userId
        }
      }).then(res => {
        this.formValidate = res.data.data
        this.changeCompanyList()
      }).catch(function (error) {
        // console.log(error)
      })
    },
    beforeSubmit (formData) {
      let factoryData = Object.assign(formData)
      factoryData.cardNum = this.$route.query.id
      factoryData.companyName = this.companyName
      return factoryData
    },
    submiteData (formValidate) {
      let formData = this.beforeSubmit(formValidate)
      console.log(formData)

      // console.log(formData)
      let sumitUrl = '/api/memberBalanceCompany/add'
      if (this.$store.state.modal.state === 'update') {
        formData.id = this.$store.state.modal.rowId
        sumitUrl = '/api/memberBalanceCompany/update'
      }
      // this.$store.commit('setCurUrl', `/api/memberBalanceCompany/${this.$route.query.id}`)
      let data = Qs.stringify(formData)
      Axios({
        method: 'POST',
        url: sumitUrl,
        data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'userId': this.$store.state.user.userId
        }
      }).then(res => {

        if (res.data.code === 200) {
          this.cancelModal()
          this.refreshTable()
        }else{
          this.$Message.error('请选择所属公司与等级类型')
        }
      })
    }
  },
  mounted () {
    if (this.$store.state.modal.state === 'update') {
      this.getFormDetail()
      this.status = false
    }
    // 获取成员列表
    Axios({
      method: 'get',
      url: '/api/company/list?&size=1000',
      headers: {
        userId: this.$store.state.user.userId
      }
    }).then(res => {
      this.companyList = res.data.data.list
    }).catch(function (error) {
      // console.log(error)
    })
  }
}
</script>

<style lang='less' scoped>

</style>

<style lang='less' scoped>

</style>
