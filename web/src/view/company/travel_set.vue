<template>
  <div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Row>
              <FormItem label="控制方式" prop="travelControlType">
                <RadioGroup v-model="travelControlType">
                    <Radio v-for="item in getterGroup(55)" v-if="travelControlType == item.dKey" :key="item.dKey" :label="item.dKey">{{item.dValue}}</Radio>
                </RadioGroup>
              </FormItem>
        </Row>
        <div v-if="controlStatus">
          <Row>
              <FormItem label="领导层成员" prop="travelLevelId">
                <Select @on-change="changeLevel()" v-model="formValidate.travelLevelId" filterable>
                    <Option v-for="item in leaderList" :value="item.id" :key="item.id">{{ item.levelName }}</Option>
                </Select>
              </FormItem>
        </Row>
        <Row>
            <Col span="8">
              <FormItem label="飞机舱位">
                  <!-- <Checkbox  v-model="formValidate.isPlane">不允许做飞机</Checkbox> -->
                  <Select v-model="formValidate.planeLevel" filterable>
                    <Option v-for="item in getterGroup(62)" :value="item.dKey" :key="item.dKey">{{ item.dValue }}</Option>
                  </Select>
              </FormItem>
            </Col>
        </Row>
        <Row>
              <FormItem label="火车坐席">
                <Checkbox  v-model="isTrain">不允许做火车</Checkbox>
                <!-- <Row>
                  <Col span="4">
                      高铁G/城际C可订：
                  </Col>
                  <Col span="20">
                    <RadioGroup v-model="formValidate.member">
                        <Radio label="1">高级管理成员</Radio>
                        <Radio label="2">正副处级成员</Radio>
                        <Radio label="3">科级及以下成员</Radio>
                    </RadioGroup>
                  </Col>
                </Row>
                <Row>
                  <Col span="4">
                      动车D可订：
                  </Col>
                  <Col span="20">
                    <RadioGroup v-model="formValidate.member">
                        <Radio label="1">高级管理成员</Radio>
                        <Radio label="2">正副处级成员</Radio>
                        <Radio label="3">科级及以下成员</Radio>
                    </RadioGroup>
                  </Col>
                </Row> -->
                  <RadioGroup v-if="!isTrain" v-model="formValidate.trainLevel">
                      <Radio v-for="item in getterGroup(63)"  :key="item.dKey" :label="item.dKey">{{item.dValue}}</Radio>
                    <!-- <Radio label="0">不做控制</Radio> -->
                  </RadioGroup>

              </FormItem>
        </Row>
        <Row >
            <FormItem label="住宿标准">
                <Checkbox  v-model="isHotel">不做控制</Checkbox>
                <Row v-if="!isHotel" class="marginT" v-for="item in hotels" :key="item.cityLevelId">
                  <Col span="3">
                      {{item.levelName}}:
                  </Col>
                  <Col span="6">
                    <Input v-model="item.hotelFeeValue" placeholder="请输入住宿标准"/>
                  </Col>
                  <Col span="4" class="marginL">
                    元/间夜
                  </Col>
                </Row>
              </FormItem>
        </Row>
        <FormItem>
            <Button type="primary" @click="handleSubmit()">保存</Button>
        </FormItem>
        </div>

    </Form>
  </div>
</template>

<script>
import Axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isTrain: false,
      controlStatus: true,
      isHotel: false,
      travelControlType: '1',
      formValidate: {
        trainLevel: '',
        travelLevelId: 108,
        planeLevel: ''
      },
      leaderList: [{
        lable: '高级管理员',
        id: '1'
      }, {
        lable: '正副处级成员',
        id: '2'
      }, {
        lable: '科级成员',
        id: '3'
      }],
      hotels: [],
      ruleValidate: {
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
  computed: {
    ...mapGetters([
      'getterGroup'
    ])
  },
  methods: {
    async handleSubmit () {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          // this.$refs.formValidate.resetFields()
          this.submiteData(this.formValidate)
        }
      })
    },
    submiteData (formData) {
      formData.hotels = this.hotels
      let sumitUrl = '/api/companyTravelSetting/update'
      if (this.isTrain) {
        formData.trainLevel = -1
      }
      if (this.isHotel) {
        formData.hotels.map((item, index) => {
          item.hotelFeeValue = -1
          return item
        })
      }
      console.log(formData)
      // var data =  Qs.stringify(formData);
      Axios({
        method: 'POST',
        url: sumitUrl,
        data: formData,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'userId': this.$store.state.user.userId
        }
      }).then(res => {
        this.$Message.success(res.data.data)
        console.log(res)
      })
    },
    changeLevel () {
      let curId = this.formValidate.travelLevelId
      Axios({
        method: 'get',
        url: `/api/companyTravelSetting/query?travelLevelId=${curId}`,
        headers: {
          userId: this.$store.state.user.userId
        }
      }).then(res => {
        if (res.data.data.hotels.length >= 0 && res.data.data.hotels[0].hotelFeeValue == -1) {
          this.isHotel = true
        } else {
          this.isHotel = false
        }
        this.formValidate.planeLevel = res.data.data.planeLevel
        this.formValidate.trainLevel = res.data.data.trainLevel
        this.hotels = res.data.data.hotels
      }).catch(function (error) {
        console.log(error)
      })
    },
    getCompanyDetail () {
      let companyId = this.$route.query.id
      Axios({
        method: 'get',
        url: `/api/company/${companyId}`,
        headers: {
          userId: this.$store.state.user.userId
        }
      }).then(res => {
        this.travelControlType = res.data.data.travelControlType
        console.log(res.data.data.travelControlType)
        if (res.data.data.travelControlType == '1') {
          this.controlStatus = false
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    getTravelLeavel () {
      Axios({
        method: 'get',
        url: `/api/companyTravelLevel/list?companyId=${this.$route.query.id}`,
        headers: {
          userId: this.$store.state.user.userId
        }
      }).then(res => {
        this.leaderList = res.data.data.list
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  mounted () {
    this.getCompanyDetail()
    this.getTravelLeavel()
    this.changeLevel()
  }
}
</script>

<style scoped lang="less">
.marginL{
  margin-left: 15px;
}
.marginT{
  margin-top: 10px;
}
</style>
