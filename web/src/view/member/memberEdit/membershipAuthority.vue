<template>
  <div class="membership">
    <Form :model="formValidate" :label-width="150">
        <Row>
            <Col span="6">
                  <FormItem label="预订机票是否允许垫付">
                      <i-switch v-model="formValidate.switch1" size="large">
                          <span slot="open">开启</span>
                          <span slot="close">关闭</span>
                      </i-switch>
                 </FormItem>
            </Col>
            <Col span="6">
                  <FormItem label="预订酒店是否允许垫付">
                      <i-switch v-model="formValidate.switch2" size="large">
                          <span slot="open">开启</span>
                          <span slot="close">关闭</span>
                      </i-switch>
                 </FormItem>
            </Col>
            <Col span="6">
                  <FormItem label="预订火车票是否允许垫付">
                      <i-switch v-model="formValidate.switch3" size="large">
                          <span slot="open">开启</span>
                          <span slot="close">关闭</span>
                      </i-switch>
                 </FormItem>
            </Col>
            <Col span="6">
                  <FormItem label="预订机票是否需要审核">
                      <i-switch v-model="formValidate.switch4" size="large">
                          <span slot="open">开启</span>
                          <span slot="close">关闭</span>
                      </i-switch>
                 </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="6">
                  <FormItem label="预订机票是否允许垫付">
                      <i-switch v-model="formValidate.switch5" size="large">
                          <span slot="open">开启</span>
                          <span slot="close">关闭</span>
                      </i-switch>
                 </FormItem>
            </Col>
            <Col span="6">
                  <FormItem label="预订酒店是否允许垫付">
                      <i-switch v-model="formValidate.switch6" size="large">
                          <span slot="open">开启</span>
                          <span slot="close">关闭</span>
                      </i-switch>
                 </FormItem>
            </Col>
            <Col span="6">
                  <FormItem label="预订火车票是否允许垫付">
                      <i-switch v-model="formValidate.switch7" size="large">
                          <span slot="open">开启</span>
                          <span slot="close">关闭</span>
                      </i-switch>
                 </FormItem>
            </Col>
            <Col span="6">
                  <FormItem label="预订机票是否需要审核">
                      <i-switch v-model="formValidate.switch8" size="large">
                          <span slot="open">开启</span>
                          <span slot="close">关闭</span>
                      </i-switch>
                 </FormItem>
            </Col>
        </Row>
       <FormItem>
            <Button type="primary" @click="">保存</Button>
        </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formValidate: {
        switch1: false,
        switch2: false,
        switch3: false,
        switch4: false,
        switch5: false,
        switch6: false,
        switch7: false,
        switch8: false
      }
    }
  },
  methods: {}
}
</script>

<style>
.membership .ivu-form-item {
  margin-bottom: 10px;
}
</style>
