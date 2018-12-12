<template>
  <div class="searchMain">
     <Form :model="searchForm" label-position="left" :label-width="70">
        <Row :gutter="15">
                      <Col span="6">
                          <FormItem label="会员卡号">
                              <Input disabled v-model="searchForm.memberCode"></Input>
                          </FormItem>
                      </Col>
                      <Col span="6">
                      <FormItem label="证件类型">
                              <Select v-model="searchForm.type" placeholder="请选择证件类型">
                                  <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                              </Select>
                          </FormItem>
                      </Col>
                      <Col span="6">
                         <FormItem label="证件号码">
                              <Input v-model="searchForm.idNumber"></Input>
                          </FormItem>
                      </Col>
                      <Col span="6">
                          <FormItem label="有效期">
                              <DatePicker style="width:100%" type="date" placeholder="请选择有效期" v-model="searchForm.validDate"></DatePicker>
                          </FormItem>
                      </Col>
          </Row>
           <FormItem>
            <Button type="primary" @click="">保存</Button>
            <Button style="margin-left:15px;" type="success" @click="">重置</Button>
          </FormItem>
     </Form>
      <Table style="margin-top:15px" border :columns="columns1" :data="data1"></Table>
      <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
              <Page :total="100" :current="1" :page-size="10" show-elevator show-sizer @on-change="changePage"></Page>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        memberCode: '1312312312',
        type: '',
        idNumber: '',
        validDate: ''
      },
      typeList: [
        {
          value: '0',
          label: '军官证'
        }
      ],
      columns1: [
        {
          title: '会员卡号',
          align: 'center',
          key: 'memberCode'
        },
        {
          title: '证件类型',
          align: 'center',
          key: 'idType',
          render: (h, params) => {
            return h('div', this.getType(params.row.idType))
          }
        },
        {
          title: '证件号码',
          align: 'center',
          key: 'idNumber'
        },
        {
          title: '有效期',
          align: 'center',
          key: 'validDate'
        },
        {
          title: '是否可用',
          align: 'center',
          key: 'isUse',
          render: (h, params) => {
            return h('div', this.isUse(params.row.isUse))
          }
        },
        {
          title: '操作',
          align: 'center',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      data1: [
        {
          memberCode: '10281121',
          idType: '0',
          idNumber: '410511127722221123',
          validDate: '2018-12-13',
          isUse: '0'
        },
        {
          memberCode: '10281121',
          idType: '1',
          idNumber: '410511127722221123',
          validDate: '2018-12-13',
          isUse: '1'
        }
      ]
    }
  },
  methods: {
    getType (type) {
      if (type == '0') {
        return '军官证'
      } else {
        return '身份证'
      }
    },
    isUse (type) {
      if (type == '0') {
        return '有效'
      } else {
        return '无效'
      }
    },
    changePage () {}
  }
}
</script>

<style>
.searchMain .ivu-form-item {
  margin-bottom: 10px;
}
</style>
