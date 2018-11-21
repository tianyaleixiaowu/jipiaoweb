<template>
  <div class="searchMain">
     <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="left" :label-width="80">
        <Row :gutter="15">
                      <Col span="6">
                          <FormItem label="收件人名">
                              <Input :maxlength="30" v-model="formValidate.name"></Input>
                          </FormItem>
                      </Col>
                      <Col span="6">
                         <FormItem label="联系手机" prop="tel">
                              <Input :maxlength="11" v-model="formValidate.tel"></Input>
                          </FormItem>
                      </Col>
                       <Col span="6">
                         <FormItem label="联系座机">
                              <Input v-model="formValidate.phone"></Input>
                          </FormItem>
                      </Col>
                       <Col span="6">
                         <FormItem label="邮政编码">
                              <Input :maxlength="6" v-model="formValidate.postalCode"></Input>
                          </FormItem>
                      </Col>
          </Row>
          <Row :gutter="15">
                      <Col span="12">
                          <FormItem label="所属区域">
                              <al-selector gutter="0" v-model="formValidate.area" level="2" />
                          </FormItem>
                      </Col>
                       <Col span="12">
                         <FormItem label="街道地址">
                              <Input style="width:80%;float:left;" :maxlength="100" v-model="formValidate.address" placeholder="请输入街道地址"></Input>
                              <Checkbox style="margin-left:15px;" v-model="formValidate.isDefault">是否默认</Checkbox>
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
      formValidate: {
        name: '',
        tel: '',
        phone: '',
        postalCode: '',
        area: ['130000', '130700', '130730'],
        address: '',
        isDefault: false
      },
      columns1: [
        {
          title: '收件人姓名',
          align: 'center',
          key: 'name'
        },
        {
          title: '所在地区',
          align: 'center',
          key: 'area'
        },
        {
          title: '街道地址',
          align: 'center',
          key: 'address'
        },
        {
          title: '邮政编码',
          align: 'center',
          key: 'postalCode'
        },
        {
          title: '手机号码',
          align: 'center',
          key: 'tel'
        },
        {
          title: '电话号码',
          align: 'center',
          key: 'phone'
        },
        {
          title: '默认地址',
          align: 'center',
          key: 'isDefault'
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
          name: '李小明',
          area: '北京市北京市昌平区',
          address: '街道地址测试信息',
          postalCode: '100010',
          tel: '15712922032',
          phone: '010-12321234',
          isDefault: '是'
        }
      ],
      ruleValidate: {
        name: [
          { required: true, message: '请输入收件人姓名', trigger: 'blur' }
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
        ]
      }
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
