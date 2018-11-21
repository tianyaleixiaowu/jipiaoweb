<template>
  <div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Row>
            <Col span="6">
              <FormItem label="会员卡号" prop="code">
                  <Input disabled v-model="formValidate.code" ></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="真实姓名" prop="name">
                  <Input v-model="formValidate.name" placeholder="请输入真实姓名"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="会员类型" prop="type">
                  <RadioGroup v-model="formValidate.type">
                    <Radio label="0">个人</Radio>
                    <Radio label="1">企业</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="会员性别" prop="gender">
                  <RadioGroup v-model="formValidate.gender">
                    <Radio label="male">男</Radio>
                    <Radio label="female">女</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
        </Row>
        <Row v-if="formValidate.type=='1'">
            <Col span="12">
              <FormItem label="所属单位" prop="company">
                 <Select v-model="formValidate.company" filterable>
                    <Option v-for="item in companyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="6">
                <Checkbox style="margin-left:15px;margin-top:5px;" v-model="formValidate.isSec">是否秘书</Checkbox>
            </Col>
        </Row>
        <Row>
            <Col span="6">
              <FormItem label="人员类型" prop="peopleType">
                  <RadioGroup v-model="formValidate.peopleType">
                    <Radio label="0">成人</Radio>
                    <Radio label="1">儿童</Radio>
                    <Radio label="2">婴儿</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="会员级别" prop="memberLevel">
                  <Select v-model="formValidate.memberLevel" placeholder="请选择会员级别">
                    <Option value="0">普通</Option>
                    <Option value="1">CIP</Option>
                    <Option value="2">VIP</Option>
                    <Option value="3">黑名单</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="会员等级" prop="memberGrade">
                  <Input disabled v-model="formValidate.memberGrade" ></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="职务职称" prop="officialCapacity">
                  <Input :maxlength="40" v-model="formValidate.officialCapacity" ></Input>
              </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="6">
              <FormItem label="行政级别" prop="administrativeLevel">
                  <Select v-model="formValidate.administrativeLevel" placeholder="请选择行政级别">
                    <Option v-for="item in adminList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="舱位等级" prop="shippingSpace">
                  <Select v-model="formValidate.shippingSpace" placeholder="请选择舱位等级">
                    <Option v-for="item in shippingList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="乘机姓名" prop="flightName">
                  <Input :maxlength="28" v-model="formValidate.flightName" ></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="会员国籍" prop="country">
                  <Select v-model="formValidate.country" placeholder="请选择会员国籍">
                    <Option v-for="item in countryList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="6">
              <FormItem label="所属民族" prop="nation">
                  <Select v-model="formValidate.nation" placeholder="请选择所属民族">
                    <Option v-for="item in nationList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="6">
            <FormItem label="手机号码" prop="tel">
                  <Input :maxlength="11" v-model="formValidate.tel" placeholder="请输入手机号"></Input>
            </FormItem>
            </Col>
            <Col span="6">
            <FormItem label="备用手机" prop="baktel">
                  <Input :maxlength="11" v-model="formValidate.baktel" placeholder="请输入备用手机号"></Input>
            </FormItem>
            </Col>
            <Col span="6">
            <FormItem label="办公电话" prop="phone">
                  <Input :maxlength="20" v-model="formValidate.phone" placeholder="请输入办公电话"></Input>
            </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="6">
            <FormItem label="电子邮箱" prop="email">
                  <Input :maxlength="50"  v-model="formValidate.email" placeholder="请输入电子邮箱"></Input>
            </FormItem>
            </Col>
            <Col span="6">
            <FormItem label="身份证号" prop="idCode">
                  <Input :maxlength="20" v-model="formValidate.idCode" placeholder="请输入身份证号"></Input>
            </FormItem>
            </Col>
            <Col span="6">
           <FormItem label="出生日期" prop="birthDate">
                      <DatePicker style="width:100%" type="date" placeholder="请选择出生日期" v-model="formValidate.birthDate"></DatePicker>
            </FormItem>
            </Col>
            <Col span="6">
            <FormItem label="部门名称" prop="departmentName">
                  <Input :maxlength="20" v-model="formValidate.departmentName" placeholder="请输入部门名称"></Input>
            </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="12">
            <FormItem label="办公地址" prop="address">
                  <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" :maxlength="100" v-model="formValidate.address" placeholder="请输入办公地址"></Input>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="个人备注" prop="remarks">
                  <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="formValidate.remarks" placeholder="请输入个人备注"></Input>
            </FormItem>
            </Col>
        </Row>
        <FormItem>
            <Button type="primary" @click="addMember('formValidate')">保存</Button>
        </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formValidate: {
        code: '2324234234234',
        name: '',
        type: '',
        gender: '',
        peopleType: '',
        memberLevel: '',
        memberGrade: '普通会员',
        officialCapacity: '',
        administrativeLevel: '',
        shippingSpace: '',
        flightName: '',
        country: '',
        nation: '',
        tel: '',
        baktel: '',
        phone: '',
        address: '',
        idCode: '',
        birthDate: '',
        departmentName: '',
        email: '',
        remarks: '',
        company: '',
        isSec: ''
      },
      ruleValidate: {
        name: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
        type: [
          { required: true, message: '请选择会员类型', trigger: 'change' }
        ],
        gender: [
          { required: true, message: '请选择会员性别', trigger: 'change' }
        ],
        peopleType: [
          { required: true, message: '请选择人员类型', trigger: 'change' }
        ],
        memberLevel: [
          { required: true, message: '请选择会员级别', trigger: 'change' }
        ],
        officialCapacity: [
          { required: true, message: '请输入职务职称', trigger: 'blur' }
        ],
        administrativeLevel: [
          { required: true, message: '请选择行政级别', trigger: 'change' }
        ],
        shippingSpace: [
          { required: true, message: '请选择舱位等级', trigger: 'change' }
        ],
        flightName: [
          { required: true, message: '请输入乘机姓名', trigger: 'blur' }
        ],
        country: [
          { required: true, message: '请选择会员国籍', trigger: 'change' }
        ],
        nation: [
          { required: true, message: '请选择所属民族', trigger: 'change' }
        ],
        departmentName: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入办公地址', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请输入所属单位', trigger: 'blur' }
        ],
        birthDate: [
          {
            required: true,
            type: 'date',
            message: '请选择出生日期',
            trigger: 'change'
          }
        ],
        idCode: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
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
        phone: [
          { required: true, message: '请输入办公电话', trigger: 'blur' },
          {
            pattern: /^[0-9-()（）]{1,20}$/,
            message: '请输入正确的办公电话',
            trigger: 'blur'
          }
        ],
        tel: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
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
        baktel: [
          { required: true, message: '请输入备用手机号', trigger: 'blur' },
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
        email: [
          { required: true, message: '请输入电子邮箱', trigger: 'blur' },
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
      adminList: [
        {
          value: '0',
          label: '副科级'
        },
        {
          value: '1',
          label: '正科级'
        },
        {
          value: '2',
          label: '副处级'
        },
        {
          value: '3',
          label: '正处级'
        },
        {
          value: '4',
          label: '副局级'
        },
        {
          value: '5',
          label: '正局级'
        },
        {
          value: '6',
          label: '副部级'
        },
        {
          value: '7',
          label: '正部级'
        }
      ],
      shippingList: [
        {
          value: '0',
          label: '经济舱'
        },
        {
          value: '1',
          label: '公务舱'
        },
        {
          value: '2',
          label: '头等舱'
        }
      ],
      countryList: [
        {
          value: '0',
          label: '中国'
        }
      ],
      nationList: [
        {
          value: '0',
          label: '汉族'
        }
      ],
      companyList: [
        {
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
  methods: {
    addMember (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  }
}
</script>

<style>
</style>
