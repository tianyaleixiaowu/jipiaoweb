<template>
   <Form ref='formValidate' :model="formValidate" :rules="ruleValidate" :label-width="80">
     <!-- <div>{{JSON.stringify(formValidate)}}</div> -->
      <Row>
        <Col span="6">
          <FormItem label="单位名称" prop="companyName">
            <Input  v-model="formValidate.companyName"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="上级单位" prop="parentId">
            <Select v-model="formValidate.parentId" filterable>
              <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.companyName }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="单位简称" prop="simpleName">
            <Input  v-model="formValidate.simpleName"></Input>
          </FormItem>
        </Col>
        <!-- <Col span="6">
          <FormItem label="单位拼音" prop="pinYin">
            <Input  v-model="formValidate.pinYin"></Input>
          </FormItem>
        </Col> -->
         <Col span="6">
          <FormItem label="单位板块" prop="panelname">
            <Select v-model="formValidate.panelname" filterable>
              <Option  value="00">无</Option>
              <Option v-for="item in getterGroup(53)" :value="'' + item.dKey " :key="item.dKey + ''">{{ item.dValue }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="单位电话" prop="telphone">
            <Input  v-model="formValidate.telphone"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="单位传真" prop="fax">
            <Input  v-model="formValidate.fax"></Input>
          </FormItem>
        </Col>
          <!-- <Col span="6">
          <FormItem label="城市选择" prop="address">
            <Cascader :data="areaJson" v-model="value2"></Cascader>
          </FormItem>
        </Col> -->
        <Col span="6">
          <FormItem label="详细地址" prop="address">
            <Input  v-model="formValidate.address" placeholder="省-市-区-详细地址"></Input>
          </FormItem>
        </Col>


        <Col span="6">
          <FormItem label="收取方式" prop="serverType">
            <Select v-model="formValidate.serverType"  filterable>
              <Option v-for="item in getterGroup(58)" :value="'' + item.dKey" :key="item.dKey">{{ item.dValue }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="收费数值" prop="serverCost">
            <Input  v-model="formValidate.serverCost" placeholder="请输入收费数值"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="出票政策" prop="policyType">
            <Select v-model="formValidate.policyType" filterable>
              <Option  value="00">无</Option>
              <Option v-for="item in getterGroup(60)" :value="'' + item.dKey" :key="item.dKey">{{ item.dValue }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="欠款期限" prop="debtTime">
            <Input  v-model="formValidate.debtTime"  placeholder="单位为月"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="短信方式" prop="sendMessageType">
            <Select v-model="formValidate.sendMessageType" filterable>
              <Option v-for="item in getterGroup(59)" :value="item.dKey" :key="item.dValue">{{ item.dValue }}</Option>
            </Select>
          </FormItem>
        </Col>

        <Col span="6">
          <FormItem label="审批类型" prop="approveType">
            <Select v-model="formValidate.approveType" filterable>
              <Option v-for="item in getterGroup(61)" :value="'' + item.dKey" :key="item.id">{{ item.dValue }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="差旅控制" prop="travelControlType">
            <Select v-model="formValidate.travelControlType" filterable>
              <Option v-for="item in getterGroup(55)" :value="'' + item.dKey" :key="item.id">{{ item.dValue }}</Option>
            </Select>
          </FormItem>
        </Col>
         <Col style="margin-left:20px;margin-top:4px" span="3">
            <!-- style="margin-left:15px;margin-top:5px;" -->
            <Checkbox  v-model="formValidate.isBalance">是否允许结算</Checkbox>
        </Col>
        <Col style="margin-left:20px;margin-top:4px" span="2">
            <!-- style="margin-left:15px;margin-top:5px;" -->
            <Checkbox  v-model="formValidate.isEnable">是否可用</Checkbox>
        </Col>
        <Col span="16">
          <FormItem label="备注" prop="remark">
            <Input type="textarea" :autosize="{minRows: 4,maxRows: 4}"  v-model="formValidate.remark" placeholder="请输入备注"></Input>
          </FormItem>
        </Col>
      </Row>
      <FormItem>
        <Button type="primary" @click="handleSubmit()">{{submitText}}</Button>
      </FormItem>

   </Form>
</template>

<script>
import { mapGetters } from 'vuex'
// import areaJson from '@/assets/area.js'
import Axios from 'axios'
import Qs from 'qs'
let PARENTID = 0
export default {
  props: ['status'],
  data () {
    return {
      value2: ['110000', '110100', '110101'],
      // areaJson: areaJson,
      companyList: [
        {
          name: '公司一',
          id: 0
        },
        {
          name: '公司二',
          id: 1
        }
      ],
      submitText: '添加公司',
      formValidate: {
        companyName: '',
        parentId: '',
        simpleName: '',
        pinYin: '',
        // panelname: "00",
        panelname: "00",
        telphone: '',
        fax: '',
        address: '',
        isEnable: true,
        serverType: '3',
        serverCost: 0,
        // policyType: '00',
        policyType: '00',
        debtTime: '1',
        sendMessageType: '1',
        isBalance: true,
        approveType: '0',
        travelControlType: '2',
        remark: ''
      },
      ruleValidate: {
        companyName: [{
          required: true,
          message: '请输入公司名',
          trigger: 'blur'
        }],
        pinYin: [{
          required: true,
          message: '请输入公司拼音',
          trigger: 'blur'
        }],
        telphone: [{
          pattern: /^[0-9-()（）]{1,20}$/,
          message: '请输入正确的电话号码',
          trigger: 'blur'
        }]
      }
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
      let sumitUrl = '/api/company/add'
      if (this.status == 'update') {
        sumitUrl = '/api/company/update'
        if(this.$route.query.id == this.formValidate.parentId){
          this.$Message.error('上级单位不能与编辑公司相同')
          return
        }
      }
      console.log(formData)
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
          this.status == 'update'?this.$Message.success('更新成功'):this.$Message.success('添加成功')
          this.cancelModal()
          this.refreshTable()
        }else{
          this.$Message.error(res.data.message)
        }
      })
    },
    // 获取公司信息
    getCompanyDetail () {
      let companyId = this.$router.history.current.query.id
      Axios({
        method: 'get',
        url: `/api/company/${companyId}`,
        headers: {
          userId: this.$store.state.user.userId
        }
      }).then(res => {
        this.formValidate = res.data.data
        PARENTID = res.data.data.parentId
      }).catch(function (error) {
        // console.log(error)
      })
    }
  },
  mounted () {
    if (this.status == 'update') {
      this.getCompanyDetail()
      this.submitText = '更新公司信息'
    }
    // 公司部门 二级联动
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

      //  setTimeout(() => {
      //     this.$set(this.formValidate, 'companyId', 0)
      //   }, 200);
        setTimeout(() => {
          this.$set(this.formValidate, 'parentId', 2)
        }, 200);
        setTimeout(() => {
          this.$set(this.formValidate, 'parentId', parseInt(PARENTID))
        }, 300);
  }
}
</script>

<style lang='less' scoped>

</style>
