<template>
<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
    <!-- <div>{{JSON.stringify(formValidate.travelLevelId)}}</div> -->
    <Row>
        <FormItem label="会员类型" prop="memberType">
            <RadioGroup v-model="formValidate.memberType">
                <Radio v-for="item in getterGroup(7)" :key="item.dKey" :label="item.dKey">{{item.dValue}}</Radio>
            </RadioGroup>
        </FormItem>
    </Row>

    <Row v-if="formValidate.memberType=='2'">
        <Col span="8">
        <FormItem label="所属单位" prop="companyId">
            <Select filterable v-model="formValidate.companyId" @on-change="selectCompany">
              <Option v-for="(item, index) in companyList" :value="item.id" :key="index">{{ item.companyName }}</Option>
            </Select>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="部门名称" prop="departmentId">
            <Select filterable v-model="formValidate.departmentId">
          <Option v-for="item in departmentList" :value="item.id" :key="item.id">{{ item.departmentName }}</Option>
        </Select>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="等级类型" prop="travelLevelId">
            <Select filterable v-model="formValidate.travelLevelId" placeholder="请选择审批类型">
              <Option  v-for="item in travelList"   :value="item.id" :key="item.id">{{ item.levelName }}</Option>
          </Select>
        </FormItem>
        </Col>
    </Row>
    <Row>
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
        <FormItem label="真实姓名" prop="realName">
            <Input @input="inputRealname" v-model="formValidate.realName" placeholder="请输入真实姓名"></Input>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="手机号码" prop="cellPhone">
            <Input :maxlength="11" v-model="formValidate.cellPhone" placeholder="请输入手机号"></Input>
        </FormItem>
        </Col>
    </Row>
    <Row>
        <Col span="8">
        <FormItem label="身份证号" prop="paperNum">
            <Input :maxlength="20" v-model="formValidate.paperNum" placeholder="请输入身份证号"></Input>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="乘机姓名" prop="passengerName">
            <Input :maxlength="28" v-model="formValidate.passengerName"></Input>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="电子邮箱" prop="email">
            <Input :maxlength="50" v-model="formValidate.email" placeholder="请输入电子邮箱"></Input>
        </FormItem>
        </Col>
    </Row>
    <Row>
        <Col span="8">
        <FormItem label="会员级别" prop="memberClass">
            <Select filterable v-model="formValidate.memberClass">
              <Option v-for="item in getterGroup(41)" :value="item.dKey" :key="item.dKey">{{ item.dValue }}</Option>
            </Select>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="职务" prop="position">
            <Select filterable v-model="formValidate.position" placeholder="请选择职务">
            <Option v-for="item in getterGroup(49)" :value="item.dKey" :key="item.dKey">{{ item.dValue }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="职称" prop="jobTitle">
            <Select filterable v-model="formValidate.jobTitle" placeholder="请选择职称">
            <Option v-for="item in getterGroup(50)" :value="item.dKey" :key="item.dKey">{{ item.dValue }}</Option>
          </Select>
        </FormItem>
        </Col>
    </Row>
    <Row>
        <Col span="8">
        <FormItem label="行政级别" prop="administrativeLevel">
            <Select filterable v-model="formValidate.administrativeLevel" placeholder="请选择行政级别">
            <Option v-for="item in getterGroup(31)" :value="item.dKey" :key="item.dKey">{{ item.dValue }}</Option>
        </Select>
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
        <FormItem label="备用手机" prop="backupCellPhone">
            <Input :maxlength="11" v-model="formValidate.backupCellPhone" placeholder="请输入备用手机号"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="电话号码" prop="phoneNum">
            <Input :maxlength="20" v-model="formValidate.phoneNum" placeholder="请输入电话号码"></Input>
        </FormItem>
        </Col>

        <Col span="4">
        <FormItem prop="isEnable">
            <!-- style="margin-left:15px;margin-top:5px;" -->
            <Checkbox v-model="formValidate.isEnable">是否可用</Checkbox>
        </FormItem>
        </Col>
        <Col span="5">
        <FormItem>
            <Checkbox style="margin-left:15px;margin-top:5px;" v-model="formValidate.isSecretary">是否秘书</Checkbox>
        </FormItem>
        </Col>
    </Row>

    <Row>
        <Col span="16">
        <FormItem label="个人备注" prop="remark">
            <Input type="textarea" :rows="5" :autosize="{maxRows: 5,minRows: 5}"   v-model="formValidate.remark" placeholder="请输入个人备注"></Input>
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
let COMPANYID
export default {
    props: ['status'],
    data() {
        return {
            submitText: '添加会员',
            travelList: [],
            formValidate: {
                cardNum: '',
                realName: '',
                memberType: '1',
                gender: '1',
                isSecretary: false,
                companyId: '',
                departmentId: '0',
                memberClass: '1',
                personnelType: '1',
                position: '00',
                jobTitle: '09',
                administrativeLevel: '1',
                passengerName: '',
                country: 'CN',
                nation: '1',
                cellPhone: '',
                backupCellPhone: '',
                phoneNum: '',
                email: '',
                paperNum: '',
                birthday: '',
                remark: '',
                travelLevelId: 0,
                isEnable: true
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
                        // required: true,
                        message: '请输入电子邮箱',
                        trigger: 'blur'
                    },
                    {
                        // required: true,
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
                    id: '0',
                    companyName: '北京精诚博源科技有限公司'
                },
                {
                    id: '1',
                    companyName: '北京中油瑞飞科技有限公司'
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
        inputRealname(name) {
            this.formValidate.passengerName = name
        },
        selectCompany() {
            this.departmentId = 0
            this.travelLevelId = 0
            this.setDipartmentList(this.formValidate.companyId)
        },
        cancelModal() {
            let cur_modal = this.$store.state.modal
            cur_modal.curtime = new Date().getTime()
            cur_modal.status = false
            this.$store.commit('modalStatus', cur_modal)
        },
        changeDatePicker(e, dateVal) {
            this.formValidate[dateVal] = e
        },
        refreshTable() {
            this.$store.commit('refreshTable', {
                curtime: new Date().getTime()
            })
        },
        setDipartmentList(companyId) {
            console.log(companyId, 'companyId')
            Axios({
                method: 'get',
                url: `/api/companyDepartment/list?companyId=${companyId}`,
                headers: {
                    userId: this.$store.state.user.userId
                }
            }).then(res => {
                console.log(res.data.data.list)
                this.departmentList = res.data.data.list
            })
            Axios({
                method: 'get',
                url: `/api/companyTravelLevel/list?companyId=${companyId}`,
                headers: {
                    userId: this.$store.state.user.userId
                }
            }).then(res => {
                console.log(res.data.data.list)
                this.travelList = res.data.data.list
                // this.formValidate.travelLevelId =
            }).catch(function (error) {
                // console.log(error)
            })
        },
        submiteData(submiteData) {
            console.log(111)
            let sumitUrl = `/api/member/add`
            if (this.status == 'update') {
                sumitUrl = '/api/member/update'
            }
            if (submiteData.memberType == 2 && !(submiteData.companyId && submiteData.departmentId && submiteData.travelLevelId)) {
                console.log(1)
                this.$Message.error('部门名称与差旅等级为必选项')
                return false
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
                console.log(res)
                if (!this.status && res.data.code === 200) {
                    this.cancelModal()
                    this.refreshTable()
                    this.$refs.formValidate.resetFields()
                } else if (this.status && res.data.code === 200) {
                    this.$Message.success('更新成功')
                } else {
                    this.$Message.error(res.data.message)
                    console.log('error')
                }
            })
        },
        async handleSubmit() {
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    let submiteData = this.formValidate
                    if (submiteData.memberType == '1') {
                        submiteData.companyId = 0
                        submiteData.departmentId = 0
                        submiteData.travelLevelId = 0
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
        async getMemberDetail() {
            let memberId = this.$route.query.id
            Axios({
                method: 'get',
                url: `/api/member/${memberId}`,
                headers: {
                    userId: this.$store.state.user.userId
                }
            }).then(res => {
                this.formValidate.companyId = res.data.data.companyId
                if(res.data.data.isSecretary == 1){
                  this.formValidate.isSecretary = true
                }else{
                  this.formValidate.isSecretary = false
                }
                this.formValidate.realName = res.data.data.realName
                this.formValidate.cardNum = res.data.data.cardNum
                this.formValidate.memberType = res.data.data.memberType
                this.formValidate.departmentId = res.data.data.departmentId
                this.formValidate.memberClass = res.data.data.memberClass
                this.formValidate.personnelType = res.data.data.personnelType
                this.formValidate.position = res.data.data.position
                this.formValidate.jobTitle = res.data.data.jobTitle
                this.formValidate.administrativeLevel = res.data.data.administrativeLevel
                this.formValidate.passengerName = res.data.data.passengerName
                this.formValidate.country = res.data.data.country
                this.formValidate.nation = res.data.data.nation
                this.formValidate.cellPhone = res.data.data.cellPhone
                this.formValidate.backupCellPhone = res.data.data.backupCellPhone
                this.formValidate.phoneNum = res.data.data.phoneNum
                this.formValidate.email = res.data.data.email
                this.formValidate.paperNum = res.data.data.paperNum
                this.formValidate.remark = res.data.data.remark
                this.formValidate.isEnable = res.data.data.isEnable
                this.formValidate.travelLevelId = res.data.data.travelLevelId
                COMPANYID = res.data.data.companyId
                Axios({
                    method: 'get',
                    url: '/api/company/list?&size=1000',
                    headers: {
                        userId: this.$store.state.user.userId
                    }
                }).then(res => {
                    this.companyList = res.data.data.list


                    if (res.data.data.list.length > 0) {
                        this.setDipartmentList(COMPANYID)
                    }
                    //  /companyDepartment/list
                }).catch(function (error) {
                    console.log(error)
                })
                // Axios({
                //     method: 'get',
                //     url: '/api/company/list?&size=1000',
                //     headers: {
                //         userId: this.$store.state.user.userId
                //     }
                // }).then(res => {

                //     this.companyList = res.data.data.list
                //     if (res.data.data.list.length > 0) {
                //         let companyId = this.formValidate.companyId
                //         // this.formValidate.companyId = companyId
                //         this.setDipartmentList(companyId)
                //     }
                //     //  /companyDepartment/list
                // }).catch(function (error) {
                //     console.log(error)
                // })
            }).catch(function (error) {
                // console.log(error)
            })
        }
    },
    async mounted() {
        if (this.status == 'update') {
            await this.getMemberDetail()
            this.submitText = '更新会员信息'
        } else {
            // 公司部门 二级联动
            Axios({
                method: 'get',
                url: '/api/company/list?&size=1000',
                headers: {
                    userId: this.$store.state.user.userId
                }
            }).then(res => {
                if(res.data.data.list && res.data.data.list[0].companyId){
                  this.companyList = []
                  res.data.data.list.map((item, index)=>{
                    this.companyList.push({
                      id: item.id,
                      companyName: item.companyName
                    })
                  })
                }
                if (res.data.data.list.length > 0) {
                    let companyId = res.data.data.list[0].companyId
                    this.formValidate.companyId = companyId
                    this.setDipartmentList(companyId)
                }
                //  /companyDepartment/list
            }).catch(function (error) {
                console.log(error)
            })
        }
        setTimeout(() => {
          this.$set(this.formValidate, 'companyId', 0)
        }, 200);
        setTimeout(() => {
          this.$set(this.formValidate, 'companyId', COMPANYID)
        }, 300);

    }
}
</script>

<style lang='less' scoped>

</style>
