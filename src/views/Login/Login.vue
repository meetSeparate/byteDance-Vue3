<template>
  <div class="container">
    <div class="login-box" v-if="isLogin">
      <div class="title">用户名登录</div>
      <div class="input">
        <input type="text" id="login-user" placeholder="用户名" v-model="loginForm.username">
      </div>
      <div class="input">
        <input type="password" id="login-password" placeholder="密码" v-model="loginForm.password">
      </div>
      <div class="btn login-btn" @click="loginButton">
        <span>登录</span>
      </div>
      <div class="change-box">
        <div class="change-btn">
          <span>没有帐号?&nbsp;<a href="#" @click.prevent="changeLogin">创建帐号</a></span>
        </div>
      </div>
    </div>
    <div class="login-box" v-if="!isLogin">
      <div class="title">用户名注册</div>
      <div class="input">
        <input type="text" id="login-user" placeholder="用户名" v-model="signForm.username">
      </div>
      <div class="input">
        <input type="password" id="login-password" placeholder="密码" v-model="signForm.password">
      </div>
      <div class="input">
        <input type="password" id="login-repassword" placeholder="确认密码" v-model="signForm.rePassword">
      </div>
      <div class="btn login-btn" @click="signButton">
        <span>注册</span>
      </div>
      <div class="change-box">
        <div class="change-btn">
          <span>已有帐号?&nbsp;<a href="#" @click.prevent="changeLogin">去登录</a></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref, getCurrentInstance} from 'vue'
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import Loading from "../../components/Loading/index.js";

const isLogin = ref(true)
// 拿到proxy对象，相当于Vue2中的this
const {proxy} = getCurrentInstance()
const store = useStore()
const router = useRouter()

// 登录数据
const loginForm = reactive({
  username: '',
  password: ''
})

const signForm = reactive({
  username: '',
  password: '',
  rePassword: '',
})

// 登录事件
const loginButton = async () => {
  let res = await proxy.$api.login(loginForm)
  ElNotification({
    title: 'Success',
    message: res.msg,
    type: 'success',
    offset: 100,
  })

  setTimeout(() => {
    store.commit('LOGIN', res)
    router.push({
      name: 'home'
    })
  }, 500)

}

// 注册事件
const signButton = async () => {
  let res = await proxy.$api.sign(signForm)
  ElNotification({
    title: 'Success',
    message: res.msg,
    type: 'success',
    offset: 100,
  })

  setTimeout(() => {
    store.commit('LOGIN', res)
    router.push({
      name: 'home'
    })
  }, 500)
}

// 字节Logo
// const svg = `
// <path d="M75.1 4.402c.32.333.48.765.48 1.284 0 .523-.16.956-.48 1.288-.318.33-.73.497-1.227.497-.496 0-.908-.167-1.226-.495-.32-.33-.48-.763-.48-1.29 0-.523.161-.956.48-1.286.318-.331.73-.498 1.226-.498.497 0 .909.168 1.227.5zm.5-.725a2.444 2.444 0 0 0-.71-.529 2.577 2.577 0 0 0-1.142-.254c-.817 0-1.484.258-1.984.77-.499.51-.751 1.187-.751 2.013 0 .38.064.74.19 1.066.127.327.318.624.568.884a2.735 2.735 0 0 0 1.977.833c.42 0 .797-.08 1.124-.24.248-.12.468-.288.66-.5v.673h1.114V2.995H75.6v.682zM80.074 2.894c-.304 0-.592.06-.856.18-.201.091-.398.22-.586.386v-.465h-1.104v5.397h1.104V5.41c0-.511.109-.898.323-1.148.21-.245.533-.37.96-.37.373 0 .638.112.81.34.174.235.262.619.262 1.14v3.02h1.115V5.28c0-.733-.182-1.32-.541-1.742-.363-.428-.863-.644-1.487-.644M86.566 6.967c-.14.177-.308.312-.504.402-.197.09-.428.136-.687.136-.482 0-.862-.164-1.163-.5-.3-.335-.452-.775-.452-1.309 0-.534.154-.977.456-1.316.305-.342.684-.507 1.159-.507.243 0 .463.04.651.12.188.08.357.206.504.374l.074.084.722-.834-.071-.064a2.583 2.583 0 0 0-.847-.518 2.996 2.996 0 0 0-1.033-.17c-.398 0-.768.066-1.1.197-.335.133-.632.33-.88.586a2.7 2.7 0 0 0-.6.924 3.077 3.077 0 0 0-.203 1.124c0 .4.068.778.203 1.122.134.345.336.655.599.92.247.254.543.45.88.584.336.134.707.201 1.1.201.385 0 .737-.06 1.045-.178.309-.119.606-.309.885-.564l.07-.064-.735-.844-.073.094zM89.474 4.268a1.67 1.67 0 0 1 1.115-.395c.426 0 .792.13 1.088.387.27.234.44.537.51.903h-3.231c.066-.357.24-.657.518-.895zm3.946 1.66c0-.911-.261-1.657-.778-2.216-.518-.563-1.205-.847-2.043-.847-.821 0-1.496.267-2.006.794-.51.526-.767 1.223-.767 2.071 0 .359.062.707.184 1.034.124.328.303.621.534.871.263.284.581.504.948.658.365.153.765.23 1.185.23.508 0 .972-.096 1.379-.285a3.38 3.38 0 0 0 1.123-.881l.066-.077-.814-.654-.062.07c-.232.267-.49.47-.768.606a2.015 2.015 0 0 1-.895.203c-.497 0-.912-.142-1.236-.421-.3-.26-.47-.584-.516-.99h4.466v-.166zM0 7.212v24.726h.002l5.427-1.394V8.606z" fill="#3960AC"></path>
// <path fill="#79CBC6" d="M31.645 31.992l-5.429 1.394V5.764l5.429 1.394z"></path>
// <path fill="#4882C2" d="M8.608 32.689l5.428-1.394V19.521l-5.428-1.394z"></path>
// <path fill="#2CBDC3" d="M17.585 15.971l5.43-1.394V29.14l-5.43-1.394z"></path>
// `

const changeLogin = () => {
  Loading.show()
  setTimeout(() => {
    isLogin.value = !isLogin.value
    Loading.close()
  }, 1000)
}
</script>

<style scoped lang="less">

@keyframes verticalDance {
  0% {
    transform: translate3d(0, 10px, 0);
  }
  50% {
    transform: translate3d(0, -10px, 0);
  }
  100% {
    transform: translate3d(0, 10px, 0);
  }
}


.el-loading-spinner .circular {
  width: 9px;
  margin: 0 2px;
  animation-name: verticalDance;
  animation-duration: 400ms;
  animation-iteration-count: infinite;

  &:first-child {
    background-color: #2d5fb2;
    height: 29px;

    animation-delay: -300ms;
  }

  &:nth-child(2) {
    background-color: #3682c7;
    height: 14px;
    animation-delay: -400ms;
  }

  &:nth-child(3) {
    animation-delay: -600ms;
    background-color: #00bfc5;
    height: 14px;
  }

  &:last-child {
    animation-delay: -900ms;
    background-color: #5acec6;
    height: 29px;
  }
}

.container {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, .9);
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 1s;
}


.title {
  margin-top: 10px;
  position: relative;
  margin-right: 46px;
  line-height: 33px;
  font-size: 24px;
  font-weight: 600;
  cursor: pointer;
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: .4s;
}

.login-box .title {
  color: #3370ff;
  text-shadow: 0 0 7px rgba(255, 255, 255, .9);

  &:after {
    content: ' ';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    border-radius: 3px;
    background-color: #3370ff;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }
}

.input {
  width: 480px;
  height: 40px;
  position: relative;
  margin: 40px auto;
  /* border-radius: 45px;
  overflow: hidden; */
}

input {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid #bbbfc4;
  outline: none;
  /* box-sizing: border-box; */
  font-size: 16px;
  background-color: white;
  border-radius: 20px;
  padding-left: 16px;
  transition: .4s;
}

.login-box input:focus {
  border-color: #3370ff;
  border-right-width: 1px !important;
}

.login-box input:hover {
  border-color: #3370ff;
  border-right-width: 1px !important;
}

.btn {
  height: 40px;
  width: 480px;
  position: relative;
  margin: 20px auto;
  background-color: #3370ff;
  border-radius: 20px;
  font-size: 16px;
  line-height: 1.5;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: .4s;
  border: 1px solid transparent;
}

.change-box {
  width: 480px;
  margin: 20px auto;
  height: 32px;
  transition: .4s;
  line-height: 22px;
}

.change-btn {
  width: 100%;
  height: 100%;
}

.change-btn span {
  text-align: left;
  font-size: 14px;
  color: #8f959e;
  font-weight: 500;
}

.change-btn span a {
  color: #3370ff;
}

.change-btn:hover {
  text-shadow: 0 0 3px rgba(200, 200, 200, .8);
  cursor: pointer;
}


.login-btn:hover {
  background: #82a7fc;
  border-color: #82a7fc;
}

.login-change {
  background-color: rgba(255, 255, 255, .8);
}

.login-box {
  height: 686px;
  width: 520px;
  margin-top: 120px;
  transition: .4s;
  z-index: 1;
  transform-origin: 0 100%;
}
</style>