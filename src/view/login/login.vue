<style lang="less">
  @import "./login.less";
</style>

<template>
  <div class="login">
    <!-- <div class="controlVersion">版权控制</div> -->
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">客服电话：40061-40061</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import {
  mapActions
} from 'vuex'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions(['handleLogin', 'getUserInfo']),
    handleSubmit ({
      account,
      password
    }) {
      console.log({
        account,
        password
      })
      this.handleLogin({
        account,
        password
      }).then(res => {
        console.log(res)
        let data = {
          name: 'admin',
          user_id: res,
          access: ['admin', 'super_admin'],
          token: 'admin',
          avator: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4'
        }
        this.$store.commit('setAvator', data.avator)
        this.$store.commit('setUserName', data.name)
        this.$store.commit('setUserId', data.user_id)
        this.$store.commit('setAccess', data.access)
        this.$store.commit('setHasGetInfo', true)
        this.$router.push({
          name: this.$config.homeName
        })
        // this.getUserInfo().then(res => {
        //   this.$router.push({
        //     name: this.$config.homeName
        //   });
        // });
      })
    }
  }
}
</script>

<style lang='less' scoped>
.controlVersion{
  position: absolute;
  color: #fff;
  bottom: 10px;
  left: 45%;
}
</style>
