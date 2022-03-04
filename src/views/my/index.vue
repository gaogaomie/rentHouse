<template>
  <div class="myContext">
    <!-- 背景图片 -->
    <div class="pic">
      <img
        v-if="user.token"
        src="@/assets/images/avatar2.png"
        alt=""
        style="width: 100%"
      />
      <img v-else src="@/assets/images/bg.png" alt="" style="width: 100%" />
    </div>
    <!-- 有token -->
    <div class="card1" v-if="user.token">
      <div class="face">
        <img :src="`http://liufusong.top:8080${userInfo.avatar}`" alt="" />
      </div>
      <div class="logout">
        <div class="text">{{ userInfo.nickname }}</div>
        <van-button type="primary" size="mini" @click="logout">退出</van-button>
        <p>编辑个人资料 <van-icon name="arrow"></van-icon></p>
      </div>
    </div>
    <!-- 无token -->
    <div class="card" v-else>
      <div class="face">
        <img src="~@/assets/images/avatar.png" alt="" />
      </div>

      <div class="login">
        <div class="text">游客</div>
        <van-button type="primary" size="small" @click="$router.push('/login')"
          >去登录</van-button
        >
      </div>
    </div>
    <div class="list">
      <!-- 宫格 -->
      <van-grid :column-num="3" style="margin-top: 18px" :border="false">
        <!--  icon="photo-o" text="文字" -->
        <van-grid-item @click="$router.push('/favorate')">
          <template #default>
            <van-icon name="star-o"></van-icon>
            <span>我的收藏</span>
          </template>
        </van-grid-item>
        <van-grid-item @click="$router.push('/rent')">
          <template #default>
            <van-icon name="wap-home-o" />
            <span>我的出租</span>
          </template>
        </van-grid-item>
        <van-grid-item>
          <template #default>
            <van-icon name="clock-o" />
            <span>看房记录</span>
          </template>
        </van-grid-item>
        <van-grid-item>
          <template #default>
            <van-icon name="ecard-pay" />
            <span>成为房主</span>
          </template>
        </van-grid-item>
        <van-grid-item>
          <template #default>
            <van-icon name="user-o" />
            <span>个人资料</span>
          </template>
        </van-grid-item>
        <van-grid-item>
          <template #default>
            <van-icon name="service-o" />
            <span>联系我们</span>
          </template>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="join">
      <img src="@/assets/images/join.png" alt="" style="width: 100%" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/use.js'
export default {
  data() {
    return {
      userInfo: {},
    }
  },
  computed: {
    ...mapState(['user']),
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    // 退出登录
    async logout() {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '您确定要退出登录吗？',
        })
        this.$store.commit('setUser', {})
        this.$toast.success('退出成功')
      } catch (error) {
        if (error.response.status !== 401) {
          this.$toast.fail('获取信息失败！')
        }
      }
    },
    // 获取用户资料
    async getUserInfo() {
      try {
        let res = await getUserInfo()
        this.userInfo = res.data.body
      } catch (error) {
        console.log('获取用户资料', error)
      }
    },
  },
}
</script>

<style lang='less' scoped>
.img {
  width: 100%;
}
.card,
.card1 {
  height: 165px;
  width: 318px;
  background-color: #fff;
  margin: -40px auto 0px;
  z-index: 99;
  position: relative;
  box-shadow: 0 0 10px 3px #ddd;
  .face {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    border: solid 5px #fff;
    box-shadow: 0 0 10px 3px #ddd;
    img {
      width: 100%;
      height: 100%;
      display: block;
      overflow: hidden;
    }
  }
}
.login,
.logout {
  position: relative;
  .text {
    position: absolute;
    font-size: 13px;
    margin-top: 35px;
    color: #333333;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
  }
  .van-button {
    margin: 100px 130px 0px;
  }
}
.logout {
  p {
    font-size: 9px;
    color: #333333;
    text-align: center;
  }
}
.card1 {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translateX(-50%);
  .login {
    span {
      font-size: 9px;
      color: #333333;
      text-align: center;
    }
  }
}
.join {
  width: 375px;
  padding: 0px 10px;
  box-sizing: border-box;
}
.myContext {
  margin-bottom: 60px;
}
.van-grid-item__content {
  i,
  span {
    font-size: 15px;
  }
}
</style>