<template>
  <div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <Row v-if="!updateStatus">
              <FormItem label="控制方式" prop="travelControlType">
                <RadioGroup v-model="travelControlType">
                    <Radio v-for="item in getterGroup(55)" v-if="travelControlType == item.dKey" :key="item.dKey" :label="item.dKey">{{item.dValue}}</Radio>
                </RadioGroup>
              </FormItem>
          </Row>
          <!-- <div v-if="!controlStatus" class="enoughData">
              数据不全面
          </div> -->
          <div v-if="controlStatus">
            <Row>
                <FormItem label="差旅等级" prop="travelLevelId">
                  <Select style="width:200px" :disabled="updateStatus" v-model="formValidate.travelLevelId" filterable>
                      <Option v-for="item in leaderList" :value="item.id" :key="item.id">{{ item.levelName }}</Option>
                  </Select>
                </FormItem>
          </Row>

        <Row>
            <Col span="8">
              <FormItem label="飞机舱位">
                  <!-- <Checkbox  v-model="formValidate.isPlane">不允许做飞机</Checkbox> -->
                  <Select style="width:200px" v-model="formValidate.planeLevel" filterable>
                    <Option v-for="item in getterGroup(62)" :value="item.dKey" :key="item.dKey">{{ item.dValue }}</Option>
                  </Select>
              </FormItem>
            </Col>
        </Row>
        <Row>
            <FormItem label="火车坐席">
                <Select style="width:200px" v-model="formValidate.trainLevel" filterable>
                  <Option v-for="item in getterGroup(63)" :value="item.dKey" :key="item.dKey">{{ item.dValue }}</Option>
                </Select>
            </FormItem>
        </Row>
        <Row >
            <FormItem label="住宿标准">
                <Checkbox  v-model="isHotel">不做控制</Checkbox>
                <Row v-if="!isHotel" class="marginT" v-for="item in hotels" :key="item.cityLevelId">
                  <Col span="5">
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
  props: ['curTime'],
  data () {
    return {
      updateStatus: false,
      isTrain: false,
      controlStatus: true,
      isHotel: false,
      travelControlType: '1',
      formValidate: {
        trainLevel: '',
        travelLevelId: 108,
        planeLevel: ''
      },
      hotels: [],
      leaderList: [],
      ruleValidate: {
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
    changeHotelStatus(status){
      this.isHotel = status
    },
    handleSubmit () {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          // this.$refs.formValidate.resetFields()
          this.submiteData(this.formValidate)
        }
      })
    },
    submiteData (formData) {
      formData.hotels = this.hotels
      let sumitUrl = '/api/companyTravelSetting/add'
      if (this.$store.state.modal.state === 'update') {
        sumitUrl = '/api/companyTravelSetting/update'
      }
      let hotesList = []
      if (this.isHotel && this.hotels.length > 0) {
        this.hotels.map((item, index) => {
          item.hotelFeeValue = -1
          hotesList.push(item)

        })
        formData.hotels = hotesList
        console.log(formData.hotels)
      }
      if (!this.isHotel && this.hotels.length > 0) {
        this.hotels.map((item, index) => {
          if(item.hotelFeeValue){
            hotesList.push(item)
          }
        })
        console.log(hotesList)
        formData.hotels = hotesList
      }
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
        console.log(res)
          if (res.data.code === 200) {
            this.status == 'update'?this.$Message.success('更新成功'):this.$Message.success('添加成功')
            this.cancelModal()
            this.refreshTable()
          }else{
            this.$Message.error(res.data.message)
          }
      })
    },
    getCityList () {
      Axios({
        method: 'GET',
        url: `/api/companyTravelLevel/list?companyId=${this.$route.query.id}&city=true`,
        headers: {
          'userId': this.$store.state.user.userId
        }
      }).then(res => {
        if(res.data.data.list){
          let hotelList = res.data.data.list
          hotelList.map((item, index)=>{
            if(!item.isEnable){
              return
            }
            this.hotels.push({
              levelName: item.levelName,
              cityLevelId: item.id,
              hotelFeeValue: '',
              currency: 'CNY'
            })
          })
        }
      })
    },
    changeLevel (curId) {
      Axios({
        method: 'get',
        url: `/api/companyTravelSetting/query?travelLevelId=${curId}`,
        headers: {
          userId: this.$store.state.user.userId
        }
      }).then(res => {
        console.log(res)
        if (res.data.data && res.data.data.hotels.length >= 0 && res.data.data.hotels[0] && res.data.data.hotels[0].hotelFeeValue == -1) {
          this.isHotel = true
          this.formValidate.travelLevelId = res.data.data.travelLevelId
          this.formValidate.planeLevel = res.data.data.planeLevel
          this.formValidate.trainLevel = res.data.data.trainLevel

          this.hotels.map((item, index) => {
            if(item.hotelFeeValue == -1){
              item.hotelFeeValue = ''
            }
          })
        } else {
          let curHotels = res.data.data.hotels
          this.isHotel = false
          this.hotels.map((item, index) => {
            if(item.hotelFeeValue == -1){
              item.hotelFeeValue = ''
            }
            curHotels.map((curItem, index)=>{
              if (!curItem) return
              if(item.cityLevelId == curItem.cityLevelId){
                item.hotelFeeValue = curItem.hotelFeeValue
              }
            })
          })
          this.formValidate.planeLevel = res.data.data.planeLevel
          this.formValidate.travelLevelId = res.data.data.travelLevelId
          this.formValidate.trainLevel = res.data.data.trainLevel
        }
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
        if (res.data.data.travelControlType == '1') {
          this.controlStatus = false
        }else{
          this.controlStatus = true
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
        let curLevalList = []
        if(res.data.data && res.data.data.list && res.data.data.list.length>0){
            res.data.data.list.map((item, index)=>{
              if(item.isEnable){
                curLevalList.push(item)
              }
            })
            this.leaderList = curLevalList
        }else{
          this.leaderList = res.data.data.list
        }
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  async mounted () {
    this.getCompanyDetail()
    this.getTravelLeavel()

    // this.changeLevel()
    await this.getCityList()
    if (this.$store.state.modal.state === 'update') {
      this.updateStatus = true
      this.changeLevel(this.$store.state.modal.curId)
    }
  },
  watch: {
    curTime(){
        this.getCompanyDetail()
        this.getTravelLeavel()
        // this.changeLevel()
    }
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
.enoughData{
  margin-top: 30px;
  margin-left: 24px;
  font-size: 24px;

}
</style>
