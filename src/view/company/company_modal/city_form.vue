
<template>
  <Form ref='formValidate' :model="formValidate" :rules="ruleValidate" label-position="left" :label-width="70">
    <Row :gutter="15">
        <Col span="6">
      <FormItem label="城市等级" prop="level">
        <Input  v-model="formValidate.level"  placeholder="请输入城市等级"></Input>
      </FormItem>
      </Col>
        <Col span="6">
      <FormItem label="等级名称" prop="levelName">
         <Select multiple filterable v-model="formValidate.cities" placeholder="请选择审批类型">
            <Option  v-for="item in cityList"   :value="item.cityId" :key="item.id">{{ item.cnName }}</Option>
        </Select>
      </FormItem>
      </Col>
      <Col span="6">
      <FormItem label="等级名称" prop="levelName">
        <Input  v-model="formValidate.levelName"  placeholder="请输入等级名称"></Input>
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
import Axios from 'axios'
import Qs from 'qs'
export default {
  data () {
    return {
      formValidate: {
        level: '',
        levelName: '',
        cities: [],
        levelType: '2',
        isEnable: true
      },
      ruleValidate: {
        level: [{
          required: true,
          // type: "number",
          message: '请输入差旅等级',
          trigger: 'blur'
        }]
        // levelName: [{
        //   required: true,
        //   message: "请输入等级名称",
        //   trigger: "blur"
        // }]
      },
      travelList: [
        {
          id: 1,
          name: '差旅等级'
        },
        {
          id: 2,
          name: '城市等级'
        }
      ],
      cityList: [],
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
    getCityList () {
      Axios({
        method: 'GET',
        url: '/api/chinaCity',
        headers: {
          'userId': this.$store.state.user.userId
        }
      }).then(res => {
        this.cityList = res.data.data
      })
    },
    async handleSubmit () {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          // this.$refs.formValidate.resetFields()
          this.submiteData(this.formValidate)
        }
      })
    },
    beforeSubmit (formData) {
      let factoryData = Object.assign(formData)
      let citiStr = factoryData.cities.join(',')
      factoryData.cities = citiStr
      factoryData.companyId = this.$route.query.id
      return factoryData
    },
    submiteData (formValidate) {
      let formData = this.beforeSubmit(formValidate)
      let sumitUrl = '/api/companyTravelLevel/add'
      //  if(this.status == 'update'){
      //    sumitUrl = '/api/companyApprover/update'
      //  }
      this.$store.commit('setCurUrl', `/api/companyTravelLevel/list?companyId=${this.$route.query.id}&city=true`)
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
        this.cancelModal()
        if (res.data.code === 200) {
          this.refreshTable()
        }
      })
    }
  },
  mounted () {
    this.getCityList()
    // 获取成员列表
  }
}
</script>

<style lang='less' scoped>

</style>

<style lang='less' scoped>

</style>
