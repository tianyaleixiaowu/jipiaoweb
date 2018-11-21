
<template>
  <Form ref='formValidate' :model="formValidate" :rules="ruleValidate" label-position="left" :label-width="70">
    <Row :gutter="15">
      <Col span="6">
      <FormItem label="审批人" prop="cardNum">
        <Select filterable v-model="formValidate.cardNum" placeholder="请选择审批类型">
            <Option  v-for="item in memberList" @click.native="selectMember(item)"   :value="item.cardNum" :key="item.cardNum">{{ item.realName }}</Option>
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
        console.log(this.formValidate)
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
        this.memberList = res.data.data.list
      }).catch(function (error) {
        // console.log(error)
      })
    },
    getFormDetail () {
      let curId = this.$store.state.modal.curId
      Axios({
        method: 'get',
        url: `/api/companyApprover/${curId}`,
        headers: {
          userId: this.$store.state.user.userId
        }
      }).then(res => {
        let curData = res.data.data
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
      let formData = this.beforeSubmit(formValidate)
      let sumitUrl = '/api/companyApprover/add'
      if (this.$store.state.modal.state == 'update') {
        sumitUrl = '/api/companyApprover/update'
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
        if (res.data.code === 200) {
          this.cancelModal()
          this.refreshTable()
        }
      })
    }
  },
  mounted () {
    // 获取成员列表
    this.getMemberList()
    if (this.$store.state.modal.state === 'update') {
      this.getFormDetail()
    }
  }
}
</script>

<style lang='less' scoped>

</style>

<style lang='less' scoped>

</style>
