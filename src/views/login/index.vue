<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="账号登录">
      <template #left>
        <van-icon name="arrow-left" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <van-form ref="loginForm">
      <van-field clearable v-model="user.mobile" placeholder="请输入账号">
        <!--   :rules='rulesForm.mobile' -->
      </van-field>
      <van-field
        clearable
        type="password"
        v-model="user.password"
        placeholder="请输入密码"
      >
        <!--   :rules='rulesForm.password'  -->
      </van-field>
      <div style="margin: 16px" class="button">
        <van-button
          block
          type="info"
          native-type="submit"
          @click="onSubmit(user.mobile, user.password)"
        >
          登录
        </van-button>
        <div class="text"><a href="#">还没有账号，去注册~</a></div>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/use.js'
export default {
  data() {
    return {
      user: {
        mobile: '',
        password: '',
      },
    }
  },
  methods: {
    async onSubmit(mobile, password) {
      console.log(mobile, password)
      let regMB = /^[a-zA-Z0-9]{5,8}$/
      let regPW = /^[a-zA-Z0-9]{5,12}$/
      if (mobile === '') {
        this.$toast('账户不能为空')
        return false
      }
      if (!regMB.test(mobile)) {
        this.$toast('用户名格式5-8位的字母和数字')
        return false
      }
      if (password === '') {
        this.$toast('密码不能为空')
        return false
      }
      if (!regPW.test(password)) {
        this.$toast('密码格式5-12位的字母和数字')
      }
      try {
        let res = await login({ username: mobile, password: password })
        console.log(res.data)
        // if(res.data.status===400){
        //   this.$toast.fail(res.data.description)
        //   return
        // }
        this.$store.commit('setUser', res.data.body)
        this.$router.push('/home/my') //成功之后跳转路由
        this.$toast.success(res.data.description)
      } catch (error) {
        console.dir(error)
      }
    },
  },
}
</script>
<style scoped lang="less">
.van-nav-bar {
  background-color: rgb(33, 185, 122);
  .van-nav-bar__title {
    color: #fff;
    font-size: 18px;
  }
  .van-icon-arrow-left {
    color: #fff;
  }
}
.van-button {
  background-color: rgb(33, 185, 122);
  border: none;
}
.text {
  text-align: center;
  margin: 20px auto;
}
a {
  color: #666;
  font-size: 14px;
}
/deep/.van-field__control {
  height: 60px;
}
</style>