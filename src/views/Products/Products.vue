<template>
  <div class="product">
    <ul class="product-fullpage-indicator">
      <li
          v-for="(item, index) in products"
          :key="item.id"
          class="product-fullpage-indicator-item"
          :class="{ active: activeIndex === index }"
          @click="activeIndex = index"
      >
        <img :src="item.logo" alt/>
      </li>
    </ul>
    <transition :duration="duration" :name="transitionName">
      <!-- ... the buttons ... -->
      <div
          :key="activeIndex"
          class="view-wrapper"
          v-if="!loading"
          :style="`background-image:url(${item.cover})`"
      >
        <div class="content">
          <div class="logo">
            <img :src="item.logo" width="100%" height="100%" alt/>
          </div>
          <h2>{{ item.title }}</h2>
          <div class="description">{{ item.description }}</div>
          <div class="subDescription">{{ item.subDescription }}</div>
          <div class="link">
            更多信息，请访问：
            <br/>
            <span>{{ item.link }}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import {ref, watch, getCurrentInstance, onMounted, onUnmounted, computed} from "vue";
import {useRoute} from "vue-router";

const route = useRoute()
const {proxy} = getCurrentInstance()
// 产品列表
const products = ref([])

const activeIndex = ref(0)
const loading = ref(false)
const scrolling = ref(false)
const duration = ref(1000)
const transitionName = ref("")

// created生命周期钩子 --- vue3setup
// loading.value = true

// 方法
const mousewheelHandler = (e) => {
  if (this.scrolling) {
    return;
  }
  this.scrolling = true;
  if (e.wheelDelta > 0) {
    transitionName.value = "move-down";
    console.log(transitionName.value)
    activeIndex.value =
        activeIndex.value === 0
            ? products.value.length - 1
            : activeIndex.value - 1;
  } else {
    transitionName.value = "move-up";
    console.log(transitionName.value)
    activeIndex.value = (activeIndex.value + 1) % products.value.length;
  }
  setTimeout(() => {
    scrolling.value = false;
  }, duration.value);
}

onMounted(() => {
  window.addEventListener("mousewheel", mousewheelHandler);
  getProductList()
})

onUnmounted(() => {
  window.removeEventListener("mousewheel", mousewheelHandler);
})

watch(activeIndex, (newValue, oldValue) => {

  if (scrolling.value) {
    return;
  }
  if (route.params.id) {
    delete route.params.id;
    return;
  }

  transitionName.value = newValue < oldValue ? "move-down" : "move-up";
})

// 计算属性
const item = computed(() => {
  // console.log(activeIndex.value)
  return products.value[activeIndex.value] || {};
})

// 获取产品列表
const getProductList = async () => {
  let res = await proxy.$api.getProductList({})
  products.value = res.data
  if (route.query.id) {
    activeIndex.value = products.value.findIndex(item => item.nid == route.query.id)
  }
}


</script>

<style scoped lang="less">
.move-up-leave-active,
.move-up-enter-active,
.move-down-leave-active,
.move-down-enter-active {
  transition: all 0.7s;
  transition-timing-function: cubic-bezier(0.66, 0, 0.34, 1);
}
.move-up-leave-to,
.move-up-enter-from,
.move-down-leave-to,
.move-down-enter-from {
  opacity: 0;
}

.move-up-leave-to,
.move-down-enter-from {
  transform: translateY(-100%);
}
.move-down-leave-to,
.move-up-enter-from {
  transform: translateY(100%);
}

.product {
  position: fixed;
  z-index: -1;
  top: 60px;
  right: 0;
  left: 0;
  bottom: 0;
  min-height: 500px;
  min-width: 700px;
  &-fullpage-indicator {
    position: absolute;
    z-index: 333;
    right: 50px;
    top: 50%;
    transform: translateY(-50%);

    &-item {
      margin: 22px 0;
      width: 5vh;
      height: 5vh;
      min-height: 30px;
      min-width: 30px;
      cursor: pointer;
      transition: all 0.3s;
      border-radius: 50%;
      overflow: hidden;

      &:hover,
      &.active {
        transform: scale(1.3);

        box-shadow: 0 0 14px 0 @box-shadow-dark-color;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .view-wrapper {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: absolute;
    height: 100vh;
    width: 100%;
    // padding-top: 100px;
    padding-left: 100px;

    .content {
      width: 300px;
      transform: translateY(-50%);
      position: absolute;
      top: 50%;
      // text-align: center;
      .logo {
        width: 80px;
        height: 80px;
      }
      h2 {
        margin: 30px 0;
      }
      .description,
      .subDescription {
        color: #aaa;
        line-height: 1.4;
      }
      .link {
        margin-top: 40px;
        span {
          color: @main-color;
        }
      }
    }
  }
}
</style>