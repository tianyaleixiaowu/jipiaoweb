
<template>
  <Form ref='formValidate' :model="formValidate" :rules="ruleValidate" label-position="left" :label-width="70">
    <Row :gutter="15">
      <Col span="6">
      <FormItem label="开始日期" prop="startDate">
         <DatePicker @on-change="(e)=>{
            changeDatePicker(e, 'startDate')
           }" formate="yyyy-mm-dd" style="width:100%" type="date" placeholder="请选择出开始日期" ></DatePicker>
      </FormItem>
      </Col>
      <Col span="6">
      <FormItem label="截止日期"   prop="endDate">
        <DatePicker @on-change="(e)=>{
            changeDatePicker(e, 'endDate')
           }" formate="yyyy-mm-dd" style="width:100%" type="date" placeholder="请选择结束" v-model="formValidate.endDate"></DatePicker>
      </FormItem>
      </Col>
      <Col span="6">
      <FormItem label="总预算" prop="totalCost">
        <Input  v-model="formValidate.totalCost" placeholder="请输入总预算"></Input>
      </FormItem>
      </Col>
      <Col span="6">
      <FormItem label="剩余预算" prop="totalCost">
        <Input  v-model="formValidate.surplusCost" placeholder="请输入剩余预算"></Input>
      </FormItem>
      </Col>
    </Row>
    <FormItem>
      <Button type="primary" @click="handleSubmit()">{{submitText}}</Button>
    </FormItem>
  </Form>
</template>

<script>
const validateMobile = (rule, value, callback) => {
    if (!Number.isInteger(+value)) {
        callback(new Error('请输入数字值'));
    } else {
        callback();
    }
}
import Axios from 'axios'
import Qs from 'qs'
export default {
  data () {
    return {
      submitText: '提交',
      formValidate: {
        startDate: '',
        endDate: '',
        totalCost: '',
        surplusCost: ''
      },
      ruleValidate: {
        startDate: [{
          required: true,
          type: 'string',
          message: '请选择开始时间',
          trigger: 'change'
        }],
        endDate: [{
          required: true,
          type: 'string',
          message: '请选择结束时间',
          trigger: 'change'
        }],
        totalCost: [{
          required: true,
          message: '请输入数字',
          trigger: 'blur'
        },{validator: validateMobile, trigger: 'blur'}],
        surplusCost: [{
          required: true,
          message: '请输入数字',
          trigger: 'blur'
        },{validator: validateMobile, trigger: 'blur'}]
      }
    }
  },
  computed: {

  },
  methods: {
    cancelModal () {
      let cur_modal = this.$store.state.modal
      cur_modal.curtime = new Date().getTime()
      cur_modal.status = false
      this.$store.commit('modalStatus', cur_modal)
    },
    changeDatePicker (e, dateVal) {
      this.formValidate[dateVal] = e
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
      let sumitUrl = '/api/companyBudget/add'
      this.$store.commit('setCurUrl', `/api/companyBudget/list?companyId=${this.$route.query.id}`)
      formData.companyId = this.$route.query.id
      if(new Date(formData.startDate).getTime() > new Date(formData.endDate).getTime()){
         this.$Message.error('起始时间不能大于结束时间')
               return false
      }
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
  }
}
</script>

<style lang='less' scoped>

</style>
