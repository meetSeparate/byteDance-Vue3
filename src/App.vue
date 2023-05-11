<template>
  <div id="container">
    <header>
      <Header
          @enter.enter="onAnimationStart"
          :class="{ [animationName]: $route.name === 'home' }"
          :fixedToTop="$route.path === '/'"
          ref="header"
          :theme-color="themeColor"
      ></Header>
    </header>
    <main>
      <router-view v-slot="{ Component }" :key="$route.path">
        <transition :name="animationName">
          <component :is="Component"/>
        </transition>
      </router-view>
    </main>
    <footer v-if="$route.name !== 'products'">
      <Footer></Footer>
    </footer>
  </div>

</template>

<script setup>
import Header from "./components/header.vue";
import Footer from "./components/footer.vue";
import {ref, reactive, getCurrentInstance, computed, watch, onMounted} from "vue";
import {useRoute} from 'vue-router'
import EventBus from './helper/EventBus'

const route = useRoute()
const {proxy} = getCurrentInstance()

const animationName = ref("slideInDown")
const pageTransitionName = ref("")
const homeScrollY = ref(0)

onMounted(() => {
  // window添加事件
  window.addEventListener('scroll', menu)
})

// 监听鼠标滚动事件
const menu = () => {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  // 滚动条滚动的距离
  let scrollStep = scrollTop - homeScrollY.value;
  // 更新——滚动前，滚动条距文档顶部的距离
  homeScrollY.value = scrollTop;
  if (scrollStep < 0) {
    animationName.value = "slideInDown";
  } else {
    animationName.value = "slideOutUp";
  }
}

EventBus.on("home-scrolling", (pos) => {
  homeScrollY.value = pos.y
})

const themeColor = computed(() => {
  return route.path === "/" ? homeScrollY.value < 400 ? "is-transparent" : "main-color" : "main-color"
})

watch(route, (newValue, oldValue) => {
  pageTransitionName.value = ["products", "home"].includes(newValue.name)
      ? ""
      : "jumpPage";
})

const onAnimationStart = (e) => {
  if (e.animationName === "slideInDown") {
    e.target.style.top = 0;
  } else {
    e.target.style.top = -64;
  }
}

</script>

<style scoped lang="scss">
@keyframes slideInDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slideOutUp {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
}

.slideInDown {
  position: fixed;
  top:0;
  transition: all 0.4s;
  //animation: slideInDown 0.4s;
}

.slideOutUp {
  position: fixed;
  top:-64px;
  transition: all 0.4s;
  //animation: slideOutUp 0.4s;
}

.jumpPage-leave-active {
  display: none;
}

.jumpPage-enter {
  transform: translate3d(0, 80px, 0);
  opacity: 0;
}

.jumpPage-enter-active {
  transition: all 0.3s;
}

#container {
  min-width: 1200px;
}

footer {
  //margin-top: 100px;
}

header {
  position: relative;
  z-index: 1000;
}

a {
  text-decoration: none;
}
</style>
