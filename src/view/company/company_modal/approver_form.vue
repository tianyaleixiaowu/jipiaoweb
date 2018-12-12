
<template>
  <Form ref='formValidate' :model="formValidate" :rules="ruleValidate" label-position="left" :label-width="70">
    <Row :gutter="15">
      <Col span="6">
        <FormItem label="审批人" prop="cardNum">
          <Select filterable v-model="formValidate.cardNum" placeholder="请选择审批人">
              <Option  v-for="item in memberList" @click.native="selectMember(item)"   :value="item.cardNum|| ''" :key="item.cardNum">{{ item.realName }}</Option>
          </Select>
        </FormItem>
      </Col>
       <Col span="6">
        <FormItem label="审批顺序" prop="approvalSort">
          <Input  v-model="formValidate.approvalSort"></Input>
        </FormItem>
      </Col>
      <Col span="6">
        <FormItem  prop="isEnable">
          <!-- style="margin-left:15px;margin-top:5px;" -->
          <Checkbox  v-model="formValidate.isEnable">是否可用</Checkbox>
        </FormItem>
      </Col>
      <Col span="6">
        <FormItem >
          <!-- style="margin-left:15px;margin-top:5px;" -->
          <Checkbox  v-model="isDepartment">是否为部门</Checkbox>
        </FormItem>
      </Col>

    </Row>
    <Row>
        <Col span="6" v-if="isDepartment">
          <FormItem label="部门列表" prop="departList">
            <Select filterable v-model="departmentId" placeholder="请选择审批人">
                <Option  v-for="item in departList"    :value="item.id" :key="item.id">{{ item.departmentName }}</Option>
            </Select>
          </FormItem>
      </Col>
    </Row>

    <FormItem>
      <Button type="primary" @click="handleSubmit()">提交</Button>
    </FormItem>
  </Form>
</template>

<script>
import { mapGetters } from 'vuex'
import Axios from 'axios'
import Qs from 'qs'
export default {
  data () {
    return {
      isDepartment: false,
      submitStatus: true,
      departmentId: '',
      formValidate: {
        approvalSort: '',
        cardNum: '',
        isEnable: true
      },
      ruleValidate: {
        // approvalSort: [{
        //   required: true,
        //   message: "请输入审批顺序",
        //   trigger: "blur"
        // }]
      },
      memberList: [],
      departList: [],
      curMember: {}
    }
  },
  computed: {
    ...mapGetters([
      'getterGroup'
    ])
  },
  methods: {
    cancelModal () {
      let cur_modal = this.$store.state.modal
      cur_modal.curtime = new Date().getTime()
      cur_modal.status = false
      this.$store.commit('modalStatus', cur_modal)
    },
    selectMember (member) {
      this.curMember = member
    },
    refreshTable () {
      this.$store.commit('refreshTable', { curtime: new Date().getTime() })
    },
    async handleSubmit () {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          // this.$refs.formValidate.resetFields()
          this.submiteData(this.formValidate)
        }
      })
    },
    getMemberList () {
      //
      Axios({
        method: 'get',

        url: `/api/member/list?companyId=${this.$route.query.id}&size=1000`,
        headers: {
          userId: this.$store.state.user.userId
        }
      }).then(res => {
        if (res.data.code === 200) {
          if(res.data.data.list.length<=0){
            this.submitStatus = false
            // this.$Message.info('审批人为空请去添加')
          }
        }else{
          this.$Message.error('网络错误')
        }

        this.memberList = res.data.data.list
      }).catch(function (error) {
        // console.log(error)
      })
    },
    getDepList () {
      //
      Axios({
        method: 'get',
        url: `/api/companyDepartment/list?companyId=${this.$route.query.id}&size=1000`,
        headers: {
          userId: this.$store.state.user.userId
        }
      }).then(res => {
        if (res.data.code === 200) {

          this.departList = res.data.data.list
        }else{
          this.$Message.error('网络错误')
        }


      }).catch(function (error) {
        // console.log(error)
      })
    },
    getFormDetail () {
      console.log(this.$store.state.modal.state, 111)
      let curId = this.$store.state.modal.curId
      let sumitUrl = `/api/companyApprover/${curId}`
      if (this.$store.state.modal.state == 'updateDep') {
        this.isDepartment = true
        sumitUrl = `/api/companyDepartmentApprover/${curId}`
      }
      Axios({
        method: 'get',
        url: sumitUrl,
        headers: {
          userId: this.$store.state.user.userId
        }
      }).then(res => {
        let curData = res.data.data
        if (this.$store.state.modal.state == 'updateDep') {
          this.departmentId = curData.departmentId
        }
        this.formValidate.id = curData.id
        this.formValidate.companyId = curData.companyId
        this.formValidate.departmentId = curData.departmentId
        this.formValidate.cardNum = curData.cardNum
        this.formValidate.realName = curData.realName
        this.formValidate.approvalSort = curData.approvalSort
        this.formValidate.isEnable = curData.isEnable

      }).catch(function (error) {
        // console.log(error)
      })
    },
    beforeSubmit (formData) {
      let factoryData = Object.assign(formData)
      let curSelectMember = this.curMember
      if (curSelectMember.companyId) {
        factoryData.companyId = curSelectMember.companyId
      }
      if (curSelectMember.realName) {
        factoryData.realName = curSelectMember.realName
      }
      return factoryData
    },
    submiteData (formValidate) {
      if(!this.submitStatus){
        this.$Message.info('审批人为空请去添加')
        return false;
      }
      let formData = this.beforeSubmit(formValidate)
      let sumitUrl = '/api/companyApprover/add'
      if (this.$store.state.modal.state == 'update') {
        sumitUrl = '/api/companyApprover/update'
      }
      if (this.isDepartment) {
        formData.departmentId = this.departmentId
        formData.id = this.$store.state.modal.curId
        sumitUrl = '/api/companyDepartmentApprover/add'
      }
      if (this.isDepartment && this.$store.state.modal.state == 'updateDep') {
        sumitUrl = '/api/companyDepartmentApprover/update'
      }

      this.$store.commit('setCurUrl', `/api/companyApprover/list?companyId=${this.$route.query.id}`)
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
        console.log(res)
        if (res.data.code === 200) {
          this.cancelModal()
          this.refreshTable()
          this.$Message.success('success')
        }else{
          this.$Message.error(res.data.message)
        }
      })
    }
  },
  mounted () {
    // 获取成员列表
    this.getMemberList()
    this.getDepList()
    if (this.$store.state.modal.state === 'update' || this.$store.state.modal.state === 'updateDep') {
      this.getFormDetail()
    }
  }
}
</script>

<style lang='less' scoped>

</style>

<style lang='less' scoped>

</style>
