<template>
  <div class="home">
    <div ref="banner" class="banner content-item-block">
      <div class="video-wrapper">
        <video
            ref="video"
            class="video"
            preload="auto"
            muted
            loop
            playsinline
            autoplay
            poster="//sf3-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/video-poster_1576231362701.png"
            src="//sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/gongquhunjian_1080.min.mp4"
            tabindex="-1"
        ></video>
      </div>
      <h1 class="banner-title">
        激发创造 丰富生活
        <div class="subTitle">JOIN BYTEDANCE</div>
      </h1>
      <div class="search">
        <input-search placeholder="输入城市或职位进行搜索"></input-search>
      </div>
      <div class="bottom-tips">
        <span class="arrow-down" @click="scrollDown">
          <i>⤓</i>
        </span>
        <span class="vertical-dashed"></span>
      </div>
    </div>

    <!-- 产品 -->
    <div class="main">
      <div ref="product" class="product content-item-block">
        <h1 class="title">Inspire creativity, enrich life</h1>
        <div class="desc">截至目前，字节跳动产品已覆盖超过 150 个国家和地区，75 个语种</div>
        <ul class="product-list">
          <li
              class="product-item"
              v-for="(item, key) in products"
              :key="key"
              @click="jumpToDetail(item)"
          >
            <img :src="item.logo" alt/>
            <div>{{ item.title }}</div>
          </li>
        </ul>
        <router-link to="/products">
          <div class="more">
            <!-- <span class="more-button">了解更多</span> -->
            <bytedance-button size="large">了解更多</bytedance-button>
          </div>
        </router-link>
      </div>

      <!-- 职位 -->
      <div class="job-category content-item-block">
        <h2 class="job-category-title title">探索你感兴趣的职位</h2>
        <ul class="job-category-list clearfix">
          <li v-for="item in jobCategories" :key="item.nid" class="job-category-item">
            <router-link :to="{ name: 'jobs', query: { job_category_id: item.nid } }">
              <div class="image" :style="`background-image:url(${item.image})`">
                <span class="overlay" v-if="!item.nid">{{ item.name }}</span>
              </div>
              <div v-if="item.nid" class="name">{{ item.name }}</div>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- 字节范 -->
      <div class="byteStandard content-item-block">
        <h1 class="title">字节范</h1>
        <div class="desc">字节范是字节跳动企业文化的重要组成部分，是我们共同认可的行为准则</div>
        <div class="content">
          <div class="image">
            <span
                v-show="productLayerVisible"
                class="layer"
                @animationend="onScrollRightAnimationEnd"
            ></span>
            <img
                v-if="byteStandards[byteStandardActiveIndex]"
                style="width: 100%; height: 100%"
                :src="byteStandards[byteStandardActiveIndex].image"
                alt
            />
          </div>
          <div class="indicator">
            <ul>
              <li class="indicator-item" v-for="(item, index) in byteStandards" :key="index">
                <h3
                    :class="{ active: byteStandardActiveIndex === index }"
                    @click="
                  () => {
                    byteStandardActiveIndex = index;
                    productLayerVisible = true;
                  }
                "
                >{{ item.title }}</h3>
                <p v-html="item.content" v-show="byteStandardActiveIndex === index"></p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 字节生活 -->
      <div class="byteLife content-item-block">
        <h1 class="byteLife-title">字节生活</h1>
        <div class="block-item block-item-one">
          <div class="block-item-column block-item-column-text">
            <h2 class="block-item-column-title">在扁平开放的氛围 里工作</h2>
            <div class="content">
              <div class="content-item">
                <h2 class="content-item-title">务实扁平的工作氛围</h2>
                <p class="content-item-desc">不讲 title 和层级，敢于授权新人，专注完成业务目标，没有领地意识</p>
              </div>
              <div class="content-item">
                <h2 class="content-item-title">务实扁平的工作氛围</h2>
                <p class="content-item-desc">不讲 title 和层级，敢于授权新人，专注完成业务目标，没有领地意识</p>
              </div>
              <div class="content-item">
                <h2 class="content-item-title">务实扁平的工作氛围</h2>
                <p class="content-item-desc">不讲 title 和层级，敢于授权新人，专注完成业务目标，没有领地意识</p>
              </div>
            </div>
          </div>
          <div class="block-item-column block-item-column-image">
            <img src="https://sf3-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/life_1.png" alt/>
          </div>
        </div>

        <div class="block-item block-item-one">
          <div class="block-item-column block-item-column-text">
            <h2 class="block-item-column-title">在扁平开放的氛围 里工作</h2>
            <div class="content">
              <div class="content-item">
                <h2 class="content-item-title">务实扁平的工作氛围</h2>
                <p class="content-item-desc">不讲 title 和层级，敢于授权新人，专注完成业务目标，没有领地意识</p>
              </div>
              <div class="content-item">
                <h2 class="content-item-title">务实扁平的工作氛围</h2>
                <p class="content-item-desc">不讲 title 和层级，敢于授权新人，专注完成业务目标，没有领地意识</p>
              </div>
              <div class="content-item">
                <h2 class="content-item-title">务实扁平的工作氛围</h2>
                <p class="content-item-desc">不讲 title 和层级，敢于授权新人，专注完成业务目标，没有领地意识</p>
              </div>
            </div>
          </div>
          <div class="block-item-column block-item-column-image">
            <img src="https://sf3-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/life_1.png" alt/>
          </div>
        </div>
      </div>

      <!-- 员工故事 -->
      <div class="staffStory content-item-block">
        <h2 class="title">员工故事</h2>
        <ul class="staffStory-list clearfix">
          <router-link
              tag="li"
              :to="`/staff-stories/${item.id}`"
              v-for="item in staffStories"
              :key="item.id"
              class="staffStory-item"
          >
            <div class="avatar">
              <img style="width: 100%" :src="item.avatar" alt srcset/>
            </div>
            <div class="text">
              <h2 class="title">{{ item.title }}</h2>
              <div class="desc">{{ item.name }}&nbsp;|&nbsp;{{ item.department }}</div>
              <p class="remark">{{ item.remark }}</p>
            </div>
            <div class="circular-button">→</div>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, reactive, getCurrentInstance, onMounted, onUnmounted} from "vue";
import {watchScrollDirection} from "../../helper/utilities.js";
import EventBus from '../../helper/EventBus'
import InputSearch from '../../components/Input-Search.vue'
import BytedanceButton from '../../components/Bytedance-Button.vue'
import {useRouter} from 'vue-router'

const {proxy} = getCurrentInstance()
const router = useRouter()
const productLayerVisible = ref(false)

// 产品列表
const products = ref([])
// 岗位列表
const jobCategories = ref([])

// 获取岗位列表
const getJobCategory = async () => {
  let res = await proxy.$api.getCategory()
  jobCategories.value = res.data
}
// 字节标准列表
const byteStandards = ref([
  {
    "title": "追求极致",
    "content": "不断提高要求，延迟满足感<br>在更大范围里找最优解，不放过问题，思考本质<br>持续学习和成长",
    "image": "https://sf3-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/bytestyle1clear.png"
  },
  {
    "title": "务实敢为",
    "content": "直接体验，深入事实<br>不自嗨，注重效果，能突破有担当，打破定式<br>尝试多种可能，快速迭代",
    "image": "https://sf3-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/story/tancheng.png"
  },
  {
    "title": "开放谦逊",
    "content": "内心阳光，信任伙伴<br>乐于助人和求助，合作成大事<br>格局大，上个台阶想问题<br>对外敏锐谦虚，ego 小，听得进意见",
    "image": "https://sf3-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/style03_1576395987141.png"
  },
  {
    "title": "坦诚清晰",
    "content": "敢当面表达真实想法<br>能承认错误，不装不爱面子<br>实事求是，暴露问题，反对“向上管理”<br>准确、简洁、直接，有条理有重点",
    "image": "https://sf3-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/story/tancheng.png"
  },
  {
    "title": "始终创业",
    "content": "自驱，不设边界，不怕麻烦<br>有韧性，直面现实并改变它<br>拥抱变化，对不确定性保持乐观<br>始终像公司创业第一天那样思考",
    "image": "https://sf3-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/bytestyle5clear.png"
  },
  {
    "title": "多元兼容",
    "content": "理解并重视差异和多元，建立火星视角<br>打造多元化的团队，欢迎不同背景的人才，激发潜力<br>鼓励人人参与，集思广益，主动用不同的想法来挑战自己<br>创造海纳百川，兼容友好的工作环境",
    "image": "https://sf3-ttcdn-tos.pstatp.com/obj/atsx-fe/p/assets/duoyuanjianrong_1584512668065.jpg"
  }
])
const byteStandardActiveIndex = ref(0)
// 员工故事
const staffStories = ref([
  {
    "id": 1,
    "name": "熊典",
    "avatar": "https://sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/story/xiongdianavarta.png",
    "bannerImage": "//sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/story/xiongdianBanner.jpg",
    "remark": "“公司没有让我们把所有时间都用来完成目标，仍然给大家很多时间，去做与业务没有直接关联的技术研究，大家都能停下脚步思考更多问题。”",
    "title": "体验最极致的成就感",
    "department": "IOS-抖音",
    "richContent": "<p style='-webkit-font-smoothing: antialiased; margin: 20px auto; padding: 0px; line-height: 2.14; color: rgb(81, 86, 93); font-family: Gilroy-regular, -apple-system, system-ui, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;'>我是熊典，在抖音起步不久就加入了字节跳动，在这里发了第一版 TikTok 。</p><p style='-webkit-font-smoothing: antialiased; margin: 20px auto; padding: 0px; line-height: 2.14; color: rgb(81, 86, 93); font-family: Gilroy-regular, -apple-system, system-ui, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;'>我本科毕业于北大法学院，应该算是“非典型工程师”，当时很多北大信科的师兄向我推荐字节跳动，说这里创业氛围和技术氛围都很浓厚，我觉得能有自己施展的空间，就过来了。</p><p style='-webkit-font-smoothing: antialiased; margin: 20px auto; padding: 0px; line-height: 2.14; color: rgb(81, 86, 93); font-family: Gilroy-regular, -apple-system, system-ui, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;'>来了后我发现，公司的技术氛围特别纯粹，虽然业务顶着很大的压力，我们每周都会举办技术分享会，讨论技术方面的前沿问题。公司没有让大家把所有时间都用来完成业务目标，依然很支持我们研究与业务没有直接关联的技术架构，这样我们能有时间和精力思考更多问题。另外，公司整体上对用户体验和技术细节的追求很高，比如当我们收到一条推送时，只需要重压推送，就可以在小窗里看到完整的视频内容。这个功能可能不会在数据上产生直接收益，但只要对用户体验有帮助，我们都会抽时间去做。</p><img src='https://sf3-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/story/xiongdian_blue.jpeg' alt='' style='-webkit-font-smoothing: antialiased; vertical-align: middle; width: 720px; margin: 12px auto; color: rgb(31, 35, 41); font-family: Gilroy-regular, -apple-system, system-ui, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;'><span style='color: rgb(31, 35, 41); font-family: Gilroy-regular, -apple-system, system-ui, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;'></span><p style='-webkit-font-smoothing: antialiased; margin: 20px auto; padding: 0px; line-height: 2.14; color: rgb(81, 86, 93); font-family: Gilroy-regular, -apple-system, system-ui, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;'>当然，在一家全球月活用户超过 15 亿的公司里工作，我们也会遇到很多挑战。TikTok 起步阶段时，iOS 这边只有我一个全职同学，另外一个是实习生。这对个人能力提出了考验，但同时也意味着，你可以做很多创新和有意思的事，比如我们支持了阿拉伯语从右往左写的场景，还支持了全世界不同肤色、不同人种的美颜。现在我们支持 150 个国家和地区的国际化项目，看到抖音和TikTok 登上十几个国家 App Store 榜首，自己作为贡献其中的一员，非常有成就感。</p><img src='https://sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/story/xiongdianstory1Img1.png' alt='' style='-webkit-font-smoothing: antialiased; vertical-align: middle; width: 720px; margin: 12px auto; color: rgb(31, 35, 41); font-family: Gilroy-regular, -apple-system, system-ui, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;'><span style='color: rgb(31, 35, 41); font-family: Gilroy-regular, -apple-system, system-ui, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;'></span><p style='-webkit-font-smoothing: antialiased; margin: 20px auto; padding: 0px; line-height: 2.14; color: rgb(81, 86, 93); font-family: Gilroy-regular, -apple-system, system-ui, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;'>总体来说，在字节跳动工作，我还是很有成就感的。之前参加 WWDC 技术大会，在会场发现，开场的 App 墙里有我们的产品，排队入场时听到前面的人在讨论 TikTok。WWDC 的参会者都是从全球各地过来，对 Apple 文化很痴迷的人，我在后面看着他们，心里还是很自豪的。</p>"
  },
  {
    "id": 2,
    "name": "王司羊",
    "avatar": "https://sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/story/siyangAvata.png",
    "bannerImage": "//sf3-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/story/story2_bg2x_1576834857930.jpg",
    "remark": "“作为应届生加入公司，我参与了很多国际化项目，这些国际化项目经历了从 0 到 1 的过程，我一上来就可以自己带项目，这在其他公司是很少见的，对我来说也是一个极具成长性的机会。”  ",
    "title": "每个人的声音都可以被听到",
    "department": "薪酬福利绩效",
    "richContent": "<p style='-webkit-font-smoothing: antialiased; margin: 20px auto; padding: 0px; line-height: 2.14; color: rgb(81, 86, 93); font-family: Gilroy-regular, -apple-system, system-ui, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;'>2017 年 7 月，我从 UIUC 毕业后选择加入字节跳动。理由很简单，字节跳动是我遇见的唯一一家采用结构化面试的公司，我是人力资源专业出身，这种面试方式在 HR 领域是很先进的，所以我就来了。</p><img src='https://sf3-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/story/story2_img1_1577068552076.jpg' alt='' style='-webkit-font-smoothing: antialiased; vertical-align: middle; width: 720px; margin: 12px auto; color: rgb(31, 35, 41); font-family: Gilroy-regular, -apple-system, system-ui, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;'><span style='color: rgb(31, 35, 41); font-family: Gilroy-regular, -apple-system, system-ui, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;'></span><p style='-webkit-font-smoothing: antialiased; margin: 20px auto; padding: 0px; line-height: 2.14; color: rgb(81, 86, 93); font-family: Gilroy-regular, -apple-system, system-ui, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;'>也许因为我有留学背景，入职后，公司安排我参与国际化工作。我需要在 mentor 的帮助下，制定很多国家的福利政策，这些业务上的挑战，一是培养了我的全局视角，养成用国际化视角去看问题的习惯，二是我要去学习不同国家的文化和习俗，对不同的文化越来越敏感。刚开始接触国际化，我支持的国家数是个位数，现在国际化业务越来越大，我需要支持的国家已经有了几十个，而且公司的产品也去到了一百多个国家。接触从 0 到 1 的过程，独立完成很多国家福利政策的制定，收到来自外籍员工的肯定和鼓励，还是挺有成就感的。</p><p style='-webkit-font-smoothing: antialiased; margin: 20px auto; padding: 0px; line-height: 2.14; color: rgb(81, 86, 93); font-family: Gilroy-regular, -apple-system, system-ui, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;'>公司文化上有两点特质，是我非常喜欢的。首先，公司鼓励大家坦诚表达自己的想法和意见。我们会定期举办 CEO 面对面，有次我在 CEO 面对面上直接向一鸣提出，希望公司能够成立国际化业务的小组，会后我觉得当时表述的不是很清楚，于是又在公司内部的 IM 沟通工具上跟他说了一遍。一鸣很快读了这条消息，并且回复了我。更惊喜的是，大概过了半个月，我发现这个国际化小组真的成立了。在字节跳动，坦诚的意见无关 title，每个人的声音都可以被听到。</p><img src='https://sf3-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/story/siyangimg2.jpeg' alt='' style='-webkit-font-smoothing: antialiased; vertical-align: middle; width: 720px; margin: 12px auto; color: rgb(31, 35, 41); font-family: Gilroy-regular, -apple-system, system-ui, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;'><span style='color: rgb(31, 35, 41); font-family: Gilroy-regular, -apple-system, system-ui, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;'></span><p style='-webkit-font-smoothing: antialiased; margin: 20px auto; padding: 0px; line-height: 2.14; color: rgb(81, 86, 93); font-family: Gilroy-regular, -apple-system, system-ui, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;'>其次是公司对待员工的方式。比如说在员工性别问题上，感觉不到女性是特殊群体。我们 team 曾有一个很重要的前沿岗位在招人，最后我的 leader 录用了一个正在怀孕的准妈妈，在她休产假交接工作的邮件里，leader 也会请大家帮忙处理好工作，让她安心休息，这个事情给了我很大的信心。公司里也有很多女性 leader，像抖音的负责人等等，她们都在重要的一线岗位上发挥着自己的能量。</p><p style='-webkit-font-smoothing: antialiased; margin: 20px auto; padding: 0px; line-height: 2.14; color: rgb(81, 86, 93); font-family: Gilroy-regular, -apple-system, system-ui, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;'>我加入字节跳动已经两年多了，说实话我好像真的没有什么不满意的地方，有问题吐槽出来，也会及时得到解决。在工作之前我其实有很多期待，没想到来了之后几乎跟我想的一模一样。所以我觉得，哇，真的来对了！</p>"
  },
  {
    "id": 3,
    "name": "左儒哲",
    "avatar": "https://sf3-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/story/story3_avatar2x_1576834857749.jpg",
    "bannerImage": "//sf3-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/story/story3_bg2x_1576834857917.jpg",
    "remark": "“比起其他公司，字节跳动可能更浪漫，或者说，有更大的梦想。这里不设边界，只要连接人与信息的事情，我们都会尝试去做。” ",
    "title": "在这里，看见更大的世界",
    "department": "飞书-客户端",
    "richContent": "<p style='-webkit-font-smoothing: antialiased; margin: 20px auto; padding: 0px; line-height: 2.14; color: rgb(81, 86, 93); font-family: Gilroy-regular, -apple-system, system-ui, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;'>我是 Roger 左儒哲，一个土生土长的美国人。在哈佛毕业之后，我和许多美国技术人才一样，漂到西海岸的硅谷，在亚马逊、Facebook 这类大厂和初创公司间跳来跳去，大厂小厂都待过后，我发现硅谷变了，这里的技术水平仍然很好，但大公司却越来越趋于稳定保守，不想冒险做创新的事情。</p><img src='https://sf3-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/story/story3_img12x_1577069327983.jpg' alt='' style='-webkit-font-smoothing: antialiased; vertical-align: middle; width: 720px; margin: 12px auto; color: rgb(31, 35, 41); font-family: Gilroy-regular, -apple-system, system-ui, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;'><span style='color: rgb(31, 35, 41); font-family: Gilroy-regular, -apple-system, system-ui, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;'></span><p style='-webkit-font-smoothing: antialiased; margin: 20px auto; padding: 0px; line-height: 2.14; color: rgb(81, 86, 93); font-family: Gilroy-regular, -apple-system, system-ui, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;'>后来我发现，九千多公里外的北京，倒是更像早期的硅谷。移动支付、二维码、共享经济……中国的互联网世界出现了好多创新，北京很多方面的发展比硅谷还要快，于是我决定，一定要来这里看看。</p><p style='-webkit-font-smoothing: antialiased; margin: 20px auto; padding: 0px; line-height: 2.14; color: rgb(81, 86, 93); font-family: Gilroy-regular, -apple-system, system-ui, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;'>其实早在 2016 年的时候我就知道字节跳动，那时候只知道今日头条、抖音，还有海外的一些应用，入职后才知道，我们产品的覆盖范围其实比想象中大很多。 现在我主要在做飞书这个产品的客户端，目前还处于创新、创建、探索的阶段，很多的系统还没那么成熟，但这是一个全新的机会，我可以完整参与到做出一个兼具创新性和实用性的产品的过程中去，同事们的技术能力很强。飞书把日历、文档、聊天都放在一个 App 内，这样的工作模型非常方便，未来也很有潜力，很多硅谷的科技公司，也没有一个这么完整的办公软件。飞书的海外版本 Lark 已经发布，我也会给美国的朋友主动推广我们的产品，他们对 Lark 的反馈也都很不错！</p><p style='-webkit-font-smoothing: antialiased; margin: 20px auto; padding: 0px; line-height: 2.14; color: rgb(81, 86, 93); font-family: Gilroy-regular, -apple-system, system-ui, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;'>当然，工作有成就感的同时，我也面临一些挑战，公司的工作节奏很快，每个人需要同时做很多事情。目前我们每两周发布一个新版本，关于产品计划，需要提前思考，这两周要发布什么新功能，功能上线后我需要管理哪些新的功能，修复哪些 bug，如何管理自己的时间等等。</p><p style='-webkit-font-smoothing: antialiased; margin: 20px auto; padding: 0px; line-height: 2.14; color: rgb(81, 86, 93); font-family: Gilroy-regular, -apple-system, system-ui, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;'>工作下来我最大的感受是， 字节跳动有一个产品至上的概念，视用户为中心，所有的价值观和工作方法都在围绕这个概念展开。与此同时，这里的文化非常开放包容，没有太多的限制——我中文沟通还比较慢，但也可以来到北京和中国的同事一起工作。比起其他公司，字节跳动可能更浪漫，或者说，有更大的梦想。公司不设边界，只要连接人与信息的事情，我们都会尝试去做。</p>"
  }
])

const onScrollRightAnimationEnd = () => {
  productLayerVisible.value = false
}

onMounted(() => {
  EventBus.emit("home-scrolling",
      {x: document.body.scrollLeft, y: document.body.scrollTop}
  )
  getProductList()
  getJobCategory()
})

// 位置跳转
const scrollDown = () => {
  proxy.$refs.product.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

// 产品跳转
const jumpToDetail = (item) => {
  router.push({
    name: "products",
    query: {
      id: item.nid
    }
  });
}

// 获取产品列表
const getProductList = async () => {
  let res = await proxy.$api.getProductList({})
  products.value = res.data
}
</script>

<style scoped lang="less">
@keyframes verticalMotion {
  0% {
    transform: translateY(6px);
  }
  50% {
    transform: translateY(-6px);
  }
  100% {
    transform: translateY(6px);
  }
}

@keyframes scrollToRight {
  0% {
    left: -100%;
  }

  100% {
    left: 100%;
  }
}

.home {
  .main {
    width: @main-width;
    margin: auto;
  }

  .content-item-block {
    .title {
      font-size: @font-size-larger;
    }
  }
}

.banner {
  height: 100vh;
  min-height: 400px;
  min-width: @main-width;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(51, 112, 255, 0.2);
  position: relative;

  .video-wrapper {
    font-size: 0;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    overflow: hidden;

    .video {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  &-title {
    color: #fff;
    font-size: 60px;
    text-align: center;

    .subTitle {
      &::after,
      &::before {
        content: "";
        position: absolute;
        background-image: linear-gradient(270deg,
        hsla(0, 0%, 100%, 0),
        #fff 47%,
        hsla(0, 0%, 100%, 0));
        height: 2px;
        width: 89px;
        top: 50%;
        transform: translateY(-50%);
      }

      &:before {
        right: 10px;
      }

      &:after {
        left: 10px;
      }

      position: relative;
      margin-top: 10px;
      font-size: @font-size-base;
      letter-spacing: 20px;
    }
  }

  .search {
    width: 500px;
    margin-top: 100px;
    margin-bottom: 40px;
  }

  .bottom-tips {
    position: absolute;
    bottom: 30px;
    width: 50px;
    height: 50px;
    flex-shrink: 0;

    text-align: center;

    .arrow-down {
      display: block;
      margin-bottom: 4px;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 1px solid #fff;
      text-align: center;
      line-height: 40px;
      color: #fff;
      cursor: pointer;
      font-size: 21px;

      i {
        animation: verticalMotion 1.3s infinite linear;
        display: inline-block;
        font-style: normal;
      }
    }

    // 分割竖线
    .vertical-dashed {
      border-left: 1px dashed #fff;
      height: 30px;

      display: inline-block;
    }
  }
}

// 产品
.product {
  margin-top: 40px;
  text-align: center;
  padding: 40px 40px;
  background-size: 100%;
  background: url(//sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/global.png);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 0 370px;

  .desc {
    margin: 40px 0;
  }

  &-list {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  &-item {
    width: 90px;
    // height: 90px;
    cursor: pointer;

    &:nth-child(1),
    &:nth-child(9) {
      margin-top: 116px;
    }

    &:nth-child(2),
    &:nth-child(8) {
      margin-top: 80px;
    }

    &:nth-child(3),
    &:nth-child(7) {
      margin-top: 55px;
    }

    &:nth-child(4),
    &:nth-child(6) {
      margin-top: 30px;
    }

    &:hover {
      color: @main-color;

      img {
        border-radius: 19px;

        transform: scale(1.2);
        transform-origin: bottom;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      }
    }

    img {
      width: 90px;
      height: 90px;
      border-radius: 19px;

      margin-bottom: 10px;
      transition: transform 0.3s;
    }
  }

  .more {
    margin: auto;
    margin-top: 170px;

    width: 149px;
  }
}

// 职位

.job-category {
  text-align: center;
  margin-top: 90px;

  &-list {
    margin-top: 70px;
  }

  &-item {
    float: left;
    margin-bottom: 16px;

    .image {
      width: 250px;
      height: 250px;
      line-height: 250px;
      background-repeat: no-repeat;
      background-size: 100%;
      border-radius: 50%;
      margin: 0 auto;

      transition: all 0.3s;
      background-position: center;
      overflow: hidden;

      &:hover {
        box-shadow: 0 0 8px 1px #ccc;
        background-size: 110%;

        & + .name {
          color: @main-color;
        }
      }

      .overlay {
        display: inline-block;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;

        font-size: 40px;
      }
    }

    .name {
      margin-top: 23px;
      font-size: @font-size-large;
    }

    margin: 0 2.5%;
    margin-bottom: 30px;
    width: 20%;
  }
}

// 字节范

.byteStandard {
  padding: 40px 40px;
  overflow: hidden;

  .title {
    margin-bottom: 30px;
  }

  .desc {
    margin-bottom: 40px;
  }

  .content {
    .image {
      .layer {
        // left: -100%;
        width: 100%;
        top: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.8);
        position: absolute;
        animation: scrollToRight 0.8s ease-in-out;
      }

      position: relative;

      float: left;
      width: 700px;
      height: 450px;
      margin-right: 100px;
      overflow: hidden;

      img {
        border-radius: 6px;
        object-fit: cover;
      }
    }
  }

  .indicator {
    color: #aaa;

    &-item {
      margin: 32px 0;

      h3 {
        &.active {
          color: black;
          font-size: 32px;
          font-weight: 400;
        }

        cursor: pointer;
      }
    }
  }
}

// 字节生活
.byteLife {
  // width:1200px;
  // overflow: hidden;
  &-title {
    margin-bottom: 70px;
  }

  padding-left: 10%;

  .block-item {
    overflow: hidden;
    margin-bottom: 100px;

    &:nth-child(odd) {
      .block-item-column {
        &-text {
          margin-right: 9%;
        }

        float: left;
      }
    }

    &:nth-child(even) {
      .block-item-column {
        &-image {
          margin-right: 9%;
        }

        float: right;
      }
    }

    &-column {
      &-title {
        margin-bottom: 40px;
        padding-bottom: 40px;
        border-bottom: 1px solid #ccc;
      }

      &-text {
        width: 30%;
      }

      &-image {
        height: 400px;
        width: 59%;
        border-radius: 8px;
        overflow: hidden;

        img {
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}

// 员工故事
.staffStory {
  padding: 40px 90px;

  .title {
    text-align: center;
    margin-bottom: 10px;
  }

  &-list {
    text-align: center;
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
  }

  &-item {
    // height: 450px;
    overflow: hidden;
    padding: 50px;
    width: 30%;
    cursor: pointer;

    &:hover {
      box-shadow: 0 10px 30px 0 @box-shadow-hover-color;

      .circular-button {
        color: @main-color;
      }
    }

    .avatar {
      width: 70%;
      margin: auto;
    }

    .text {
      .title {
        color: @primary-text-color;
        font-weight: @font-weight-regular;
        font-size: @font-size-large;
        margin: 10px 0;
        white-space: nowrap;
      }

      .desc {
        color: @primary-text-color;
        margin: 12px 0;
        font-size: @font-size-base;
      }

      .remark {
        font-size: @font-size-base;

        color: @regular-text-color;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .circular-button {
      border-radius: 50%;
      width: 30px;
      height: 30px;
      border: 1px solid;
      line-height: 30px;

      margin: auto;
      margin-top: 20px;
      color: #ccc;
    }
  }
}
</style>