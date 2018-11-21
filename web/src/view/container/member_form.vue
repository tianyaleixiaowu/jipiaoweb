<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
    <Row>
      <Col span="8">
      <FormItem label="真实姓名" prop="realName">
        <Input v-model="formValidate.realName" placeholder="请输入真实姓名"></Input>
      </FormItem>
      </Col>
      <Col span="8">
      <FormItem label="会员类型" prop="memberType">
        <RadioGroup v-model="formValidate.memberType">
          <Radio v-for="item in getterGroup(7)"  :key="item.dKey" :label="item.dKey">{{item.dValue}}</Radio>
        </RadioGroup>
      </FormItem>
      </Col>
      <Col span="8">
      <FormItem label="会员性别" prop="gender">
        <RadioGroup v-model="formValidate.gender + ''">
          <Radio label="1">男</Radio>
          <Radio label="0">女</Radio>
        </RadioGroup>
      </FormItem>
      </Col>
    </Row>
      <Row v-if="formValidate.memberType=='32'">
        <Col span="8">
        <FormItem label="所属单位" prop="companyId">
          <Select filterable v-model="formValidate.companyId" @on-change="selectCompany">
            <Option v-for="item in companyList" :value="item.id" :key="item.value">{{ item.companyName }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="部门名称" prop="departmentId">
          <Select filterable v-model="formValidate.departmentId">
            <Option v-for="item in departmentList" :value="item.id" :key="item.value">{{ item.departmentName }}</Option>
          </Select>
        </FormItem>
        </Col>
      </Row>

    <Row>
      <Col span="8">
      <FormItem>
        <Checkbox style="margin-left:15px;margin-top:5px;" v-model="formValidate.isSecretary">是否秘书</Checkbox>
      </FormItem>
      </Col>
      <Col span="8">
      <FormItem label="人员类型" prop="personnelType">
        <!-- <RadioGroup v-model="formValidate.personnelType">
            <Radio label="0">成人</Radio>
            <Radio label="1">儿童</Radio>
            <Radio label="2">婴儿</Radio>
          </RadioGroup> -->
        <RadioGroup v-model="formValidate.personnelType">
          <Radio v-for="item in getterGroup(54)" :key="item.dKey" :label="item.dKey">{{item.dValue}}</Radio>
        </RadioGroup>
      </FormItem>
      </Col>
      <Col span="8">
      <FormItem label="会员级别" prop="memberClass">
        <Select filterable v-model="formValidate.memberClass">
              <Option v-for="item in getterGroup(41)" :value="item.dKey" :key="item.dKey">{{ item.dValue }}</Option>
            </Select>
      </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="8">
      <FormItem label="职务" prop="position">
        <Select filterable v-model="formValidate.position" placeholder="请选择会员级别">
            <Option v-for="item in getterGroup(49)" :value="item.dKey" :key="item.dKey">{{ item.dValue }}</Option>
          </Select>
      </FormItem>
      </Col>
      <Col span="8">
      <FormItem label="职称" prop="jobTitle">
        <Select filterable v-model="formValidate.jobTitle" placeholder="请选择会员级别">
            <Option v-for="item in getterGroup(50)" :value="item.dKey" :key="item.dKey">{{ item.dValue }}</Option>
          </Select>
      </FormItem>
      </Col>
      <Col span="8">
      <FormItem label="行政级别" prop="administrativeLevel">
        <Select filterable v-model="formValidate.administrativeLevel" placeholder="请选择行政级别">
            <Option v-for="item in getterGroup(31)" :value="item.dKey" :key="item.dKey">{{ item.dValue }}</Option>
        </Select>
      </FormItem>
      </Col>
      </Row>
      <Row>
      <Col span="8">
      <FormItem label="乘机姓名" prop="passengerName">
        <Input :maxlength="28" v-model="formValidate.passengerName"></Input>
      </FormItem>
      </Col>
      <Col span="8">
      <FormItem label="会员国籍" prop="country">
        <Select filterable v-model="formValidate.country" placeholder="请选择会员国籍">
              <Option v-for="item in getterCountry()" :value="item.countryCode" :key="item.countryCode">{{ item.cnName }}</Option>
          </Select>
      </FormItem>
      </Col>
      <Col span="8">
      <FormItem label="所属民族" prop="nation">
        <Select filterable v-model="formValidate.nation" placeholder="请选择所属民族">
            <Option v-for="item in getterGroup(8)" :value="item.dKey" :key="item.dKey">{{ item.dValue }}</Option>
          </Select>
      </FormItem>
      </Col>
      </Row>
      <Row>
      <Col span="8">
      <FormItem label="手机号码" prop="cellPhone">
        <Input :maxlength="11" v-model="formValidate.cellPhone" placeholder="请输入手机号"></Input>
      </FormItem>
      </Col>
      <Col span="8">
      <FormItem label="备用手机" prop="backupCellPhone">
        <Input :maxlength="11" v-model="formValidate.backupCellPhone" placeholder="请输入备用手机号"></Input>
      </FormItem>
      </Col>
      <Col span="8">
      <FormItem label="电话号码" prop="phoneNum">
        <Input :maxlength="20" v-model="formValidate.phoneNum" placeholder="请输入电话号码"></Input>
      </FormItem>
      </Col>
      </Row>
      <Row>
      <Col span="8">
      <FormItem label="电子邮箱" prop="email">
        <Input :maxlength="50" v-model="formValidate.email" placeholder="请输入电子邮箱"></Input>
      </FormItem>
      </Col>
      <Col span="8">
      <FormItem label="身份证号" prop="paperNum">
        <Input :maxlength="20" v-model="formValidate.paperNum" placeholder="请输入身份证号"></Input>
      </FormItem>
      </Col>
      <Col span="8">
      <FormItem label="出生日期" prop="birthday">
        <DatePicker   @on-change="(e)=>{
            changeDatePicker(e, 'birthday')
           }"  formate="yyyy-MM-dd" style="width:100%" type="date" placeholder="请选择出生日期" ></DatePicker>
      </FormItem>
      </Col>
      </Row>
      <Row>
      <Col span="12">
      <FormItem label="个人备注" prop="remark">
        <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="formValidate.remark" placeholder="请输入个人备注"></Input>
      </FormItem>
      </Col>
    </Row>
    <FormItem>
      <Button type="primary" @click="handleSubmit()">{{submitText}}</Button>
    </FormItem>
  </Form>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import Axios from 'axios'
import Qs from 'qs'
export default {
  props: ['status'],
  data () {
    return {
      submitText: '添加会员',
      formValidate: {
        cardNum: '',
        realName: '',
        memberType: '1',
        gender: '1',
        isSecretary: false,
        companyId: '0',
        departmentId: '0',
        memberClass: '1',
        personnelType: '1',
        position: '03',
        jobTitle: '03',
        administrativeLevel: '1',
        passengerName: '',
        country: 'AF',
        nation: '33',
        cellPhone: '',
        backupCellPhone: '',
        phoneNum: '',
        email: '',
        paperNum: '',
        birthday: '',
        remark: ''
      },
      ruleValidate: {
        realName: [{
          required: true,
          message: '请输入真实姓名',
          trigger: 'blur'
        }],
        birthday: [{
          required: true,
          type: 'string',
          message: '请选择出生日期',
          trigger: 'change'
        }],
        paperNum: [{
          required: true,
          message: '请输入身份证号',
          trigger: 'blur'
        },
        {
          validator: function (rule, value, callback) {
            //
            var MobileRegex = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/ // /\d{15}|\d{18}/
            if (!MobileRegex.test(value)) {
              callback(new Error('身份证号格式不正确！'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }
        ],
        phoneNum: [{
          pattern: /^[0-9-()（）]{1,20}$/,
          message: '请输入正确的电话号码',
          trigger: 'blur'
        }],
        cellPhone: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        },
        {
          required: true,
          validator: function (rule, value, callback) {
            var MobileRegex = /^[1][0-9]{10}$/
            if (value == '' || value == null) {
              callback()
            }
            if (!MobileRegex.test(value)) {
              callback(new Error('手机号码格式不正确！'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }
        ],
        backupCellPhone: [{
          validator: function (rule, value, callback) {
            var MobileRegex = /^[1][0-9]{10}$/
            if (value == '' || value == null) {
              callback()
            }
            if (!MobileRegex.test(value)) {
              callback(new Error('手机号码格式不正确！'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }],
        email: [{
          required: true,
          message: '请输入电子邮箱',
          trigger: 'blur'
        },
        {
          required: true,
          validator: function (rule, value, callback) {
            var MobileRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
            if (value == '' || value == null) {
              callback()
            }
            if (!MobileRegex.test(value)) {
              callback(new Error('电子邮箱格式不正确！'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }
        ]
      },
      departmentList: [],
      adminList: [],
      shippingList: [],
      countryList: [],
      nationList: [],
      companyList: [{
        value: '0',
        label: '北京精诚博源科技有限公司'
      },
      {
        value: '1',
        label: '北京中油瑞飞科技有限公司'
      }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'getterGroup',
      'getterCountry'
    ])
  },
  methods: {
    selectCompany () {
      this.setDipartmentList(this.formValidate.companyId)
    },
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
    setDipartmentList (companyId) {
      Axios({
        method: 'get',
        url: `/api/companyDepartment/list?companyId=${companyId}`,
        headers: {
          userId: this.$store.state.user.userId
        }
      }).then(res => {
        this.departmentList = res.data.data.list
      })
    },
    submiteData (submiteData) {
      let sumitUrl = `/api/member/add`
      if (this.status == 'update') {
        sumitUrl = '/api/member/update'
      }
      let data = Qs.stringify(submiteData)
      Axios({
        method: 'post',
        url: sumitUrl,
        data: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'userId': this.$store.state.user.userId
        }
      }).then(res => {
        if (!this.status && res.data.code === 200) {
          this.cancelModal()
          this.refreshTable()
          this.$refs.formValidate.resetFields()
        } else if (this.status && res.data.code === 200) {
          this.$Message.success('更新成功')
        } else {
          console.log('error')
        }
      })
    },
    async handleSubmit () {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          let submiteData = this.formValidate
          if (submiteData.memberType == '1') {
            submiteData.companyId = 0
            submiteData.departmentId = 0
          }
          if (submiteData.isSecretary) {
            submiteData.isSecretary = 1
          } else {
            submiteData.isSecretary = 0
          }
          submiteData.cardNum = this.$route.query.id
          // this.$refs.formValidate.resetFields()
          this.submiteData(submiteData)
        }
      })
    },
    getMemberDetail () {
      let memberId = this.$route.query.id
      Axios({
        method: 'get',
        url: `/api/member/${memberId}`,
        headers: {
          userId: this.$store.state.user.userId
        }
      }).then(res => {
        this.formValidate = res.data.data
      }).catch(function (error) {
        // console.log(error)
      })
    }
  },
  mounted () {
    if (this.status == 'update') {
      this.getMemberDetail()
      this.submitText = '更新会员信息'
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
      if (res.data.data.list.length > 0) {
        let companyId = res.data.data.list[0].id
        this.formValidate.companyId = companyId
        this.setDipartmentList(companyId)
      }
      //  /companyDepartment/list
    }).catch(function (error) {
      console.log(error)
    })
  }
}
</script>

<style lang='less' scoped>

</style>
