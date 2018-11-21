
<template>
  <Form ref='formValidate' :model="formValidate" :rules="ruleValidate" label-position="left" :label-width="70">
    <Row :gutter="15">
      <Col span="6">
      <FormItem label="部门名称" prop="departmentName">
        <Input  v-model="formValidate.departmentName"></Input>
      </FormItem>
      </Col>
      <Col span="6">
      <FormItem  prop="isDeptApprove">
        <Checkbox v-model="formValidate.isDeptApprove">部门审批</Checkbox>
      </FormItem>
      </Col>
      <Col span="6">
      <FormItem label="审批类型" prop="approveType">
       <Select v-model="formValidate.approveType" filterable>
              <Option v-for="item in getterGroup(61)" :value="'' + item.dKey" :key="item.dKey">{{ item.dValue }}</Option>
        </Select>
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
        departmentName: '',
        isDeptApprove: false,
        approveType: '',
        isEnable: true
      },
      ruleValidate: {
        departmentName: [{
          required: true,
          message: '请输入部门名称',
          trigger: 'blur'
        }]
      },
      typeList: [{
        value: '0',
        label: '军官证'
      }]
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
      cur_modal.component = 'Input'
      this.$store.commit('modalStatus', cur_modal)
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
    submiteData (formData) {
      let sumitUrl = '/api/companyDepartment/add'
      if (this.$store.state.modal.state == 'update') {
        sumitUrl = '/api/companyDepartment/update'
      } else {
        formData.companyId = this.$route.query.id
      }
      this.$store.commit('setCurUrl', `/api/companyDepartment/list?companyId=${this.$route.query.id}`)
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
    },
    getFormDetail () {
      let curId = this.$store.state.modal.curId
      Axios({
        method: 'get',
        url: `/api/companyDepartment/${curId}`,
        headers: {
          userId: this.$store.state.user.userId
        }
      }).then(res => {
        let curData = res.data.data
        this.formValidate.id = curData.id
        this.formValidate.companyId = curData.companyId
        this.formValidate.departmentName = curData.departmentName
        this.formValidate.isDeptApprove = curData.isDeptApprove
        this.formValidate.approveType = curData.approveType
        this.formValidate.isEnable = curData.isEnable
        // this.changeCompanyList()
      }).catch(function (error) {
        // console.log(error)
      })
    }
  },
  mounted () {
    if (this.$store.state.modal.state === 'update') {
      this.status = 'update'
      this.getFormDetail()
    }
  }
}
</script>

<style lang='less' scoped>

</style>
