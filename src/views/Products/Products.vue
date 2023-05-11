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
const products = ref([
  {
    "name": "faceu",
    "title": "激萌",
    "logo": "//sf3-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/Faceu2x_1574665474719.png",
    "cover": "//sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/jimeng.jpeg",
    "description": "Faceu激萌，4 亿年轻人都爱用的卖萌自拍神器。",
    "subDescription": "一款能社交的 AR 相机，海量酷炫贴纸、 激萌表情包 、实时美颜、 趣味特效让聊天姿势更丰富更有趣，满足全方位拍摄需求。累计用户量超过 4 亿， 平均每天为用户提供 1.7 亿次拍摄服务。",
    "id": 1,
    "link": "https://www.faceu.com"
  },
  {
    "name": "lightFaceCamera",
    "title": "轻颜相机",
    "logo": "https://sf6-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/qingyan_square_logo_1577262252373.png",
    "cover": "//sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/qingyan-bg2.jpg",
    "description": "轻颜相机是一款主打高级感的质感自拍相机，连续霸榜应用商店。拥有时下最流行的滤镜、美颜效果、和海量拍照“姿势”模板，一键就能 get 潮流自拍。",
    "subDescription": "",
    "id": 2,
    "link": "https://m.ulikecam.com/"
  },
  {
    "name": "headNews",
    "title": "今日头条",
    "logo": "https://sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/toutiao_square_logo_1577262251819.png",
    "cover": "//sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/toutiao_new_2.png",
    "description": "今日头条是一款个性化资讯推荐引擎产品，致力于连接人与信息，让优质、丰富的信息得到高效、精准的分发，为用户创造价值。",
    "subDescription": "今日头条目前拥有科技、体育、健康、美食、教育、三农、国风、NBA 等超过 100 个垂直领域，覆盖了图文、图集、小视频、短视频、短内容、直播、小程序等多种信息体裁。",
    "id": 3,
    "link": "https://m.ulikecam.com/"
  },
  {
    "name": "trillShortVideo",
    "title": "抖音短视频",
    "logo": "https://sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/douyin_square_logo_1577262251779.png",
    "cover": "//sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/douyin-bg2.jpg",
    "description": "抖音是一个帮助用户表达自我，记录美好生活的短视频平台。截至 2020 年 1 月，日活跃用户数已经突破 4 亿，并继续保持高速增长。",
    "subDescription": "",
    "id": 4,
    "link": "https://douyin.com/"
  },
  {
    "name": "trillShortVideo",
    "title": "西瓜视频",
    "logo": "https://sf6-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/xigua_square_logo_1577262253312.png",
    "cover": "//sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/xigua-bg2.jpg",
    "description": "西瓜视频是字节跳动旗下的一款视频 App，作为聚合多元文化的综合视频平台，它通过个性化推荐，源源不断地为不同人群提供丰富的优质内容，同时鼓励多样化创作，帮助人们轻松地向全世界分享视频作品。",
    "subDescription": "目前西瓜视频累计用户数超过 3.5 亿，日均播放量超过 40 亿。",
    "id": 5,
    "link": "https://ixigua.com/"
  },
  {
    "name": "trillShortVideo",
    "title": "懂车帝",
    "logo": "https://sf6-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/dongchedi_square_logo_1577262251826.png",
    "cover": "//sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/dongche-bg2.jpg",
    "description": "懂车帝是“看车、选车、买车”一站式汽车媒体和服务平台，产品基于个性化推荐引擎帮助用户发现感兴趣的汽车内容，同时配有车型库、360 度全景看车等选车工具，首创短视频社区“车友圈”，为用户打造内容 + 社区 + 工具的多元生态。目前，懂车帝已经成长为增长最快的汽车类手机应用。",
    "subDescription": "目前西瓜视频累计用户数超过 3.5 亿，日均播放量超过 40 亿。",
    "id": 6,
    "link": "https://www.dongchediapp.com/"
  },
  {
    "name": "gogokid",
    "logo": "https://sf6-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/gogokid_square_logo_1577262251773.png",
    "title": "GoGoKid",
    "id": 7,
    "description": "GoGokid 是一个面向 4 - 12 岁孩子的在线少儿英语 1 对 1学习平台。主打 100% 纯北美外教；教材对标美国小学主流课标（CCSS），融入 SED（社交情商培养）、多元智能理论，为中国孩子带来高效的英语学习体验。",
    "cover": "//sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/gogokid-bg2.jpg",
    "link": "https://www.gogokid.com.cn"
  },
  {
    "name": "naughtyShrimp",
    "logo": "https://sf6-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/pipixia_square_logo_1577262251826.png",
    "title": "皮皮虾",
    "id": 8,
    "description": "今日头条官方爆笑社区，一个只要打开就能让你笑到停不下来的 App。",
    "cover": "//sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/pipi_new.png",
    "subDescription": "皮皮虾一直坚持「传播快乐，分享生活」的目标，以特有的「神评」玩法形成了独特的社区氛围。之后，皮皮虾将不断提供更多有趣的功能，帮助用户创造出更多优质的内容。",
    "link": "https://mp.pipix.com"
  },
  {
    "name": "urgentLetter",
    "logo": "https://sf6-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/feishu_squre.png",
    "title": "飞书",
    "id": 9,
    "description": "飞书是新一代企业办公套件，整合即时沟通、日历、音视频会议、在线文档、云盘、工作台等功能于一体，为企业提供全方位协作解决方案，成就组织和个人，更高效、更愉悦。",
    "cover": "//sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/feishu_bg.jpg",
    "subDescription": "",
    "link": "https://www.feishu.com"
  }
])
const activeIndex = ref(0)
const loading = ref(false)
const scrolling = ref(false)
const duration = ref(1000)
const transitionName = ref("")

// created生命周期钩子 --- vue3setup
// loading.value = true

if (route.query.id) {
  activeIndex.value = products.value.findIndex(item => item.id == route.query.id)
}

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
  return products.value[activeIndex.value] || {};
})


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