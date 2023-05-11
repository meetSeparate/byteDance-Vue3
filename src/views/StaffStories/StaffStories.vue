<template>
  <div class="staff-story">
    <div class="banner" :style="`background-image:url(${dataInfo.bannerImage})`">
      <div class="textContent">
        <div class="remark">{{ dataInfo.remark }}</div>
        <div class>{{ dataInfo.name }}-{{ dataInfo.department }}</div>
      </div>
    </div>
    <div class="content">
      <h1 class="title">{{ dataInfo.title }}</h1>
      <div class="department">{{ dataInfo.department }}</div>
      <div class="richContent" v-html="dataInfo.richContent"></div>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import {useRoute} from 'vue-router'

const route = useRoute()

const {id} = route.params;

const dataInfo = reactive({
  "id": 1,
  "name": "熊典",
  "avatar": "https://sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/story/xiongdianavarta.png",
  "bannerImage": "//sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/story/xiongdianBanner.jpg",
  "remark": "“公司没有让我们把所有时间都用来完成目标，仍然给大家很多时间，去做与业务没有直接关联的技术研究，大家都能停下脚步思考更多问题。”",
  "title": "体验最极致的成就感",
  "department": "IOS-抖音",
  "richContent": "<p style='-webkit-font-smoothing: antialiased; margin: 20px auto; padding: 0px; line-height: 2.14; color: rgb(81, 86, 93); font-family: Gilroy-regular, -apple-system, system-ui, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;'>我是熊典，在抖音起步不久就加入了字节跳动，在这里发了第一版 TikTok 。</p><p style='-webkit-font-smoothing: antialiased; margin: 20px auto; padding: 0px; line-height: 2.14; color: rgb(81, 86, 93); font-family: Gilroy-regular, -apple-system, system-ui, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;'>我本科毕业于北大法学院，应该算是“非典型工程师”，当时很多北大信科的师兄向我推荐字节跳动，说这里创业氛围和技术氛围都很浓厚，我觉得能有自己施展的空间，就过来了。</p><p style='-webkit-font-smoothing: antialiased; margin: 20px auto; padding: 0px; line-height: 2.14; color: rgb(81, 86, 93); font-family: Gilroy-regular, -apple-system, system-ui, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;'>来了后我发现，公司的技术氛围特别纯粹，虽然业务顶着很大的压力，我们每周都会举办技术分享会，讨论技术方面的前沿问题。公司没有让大家把所有时间都用来完成业务目标，依然很支持我们研究与业务没有直接关联的技术架构，这样我们能有时间和精力思考更多问题。另外，公司整体上对用户体验和技术细节的追求很高，比如当我们收到一条推送时，只需要重压推送，就可以在小窗里看到完整的视频内容。这个功能可能不会在数据上产生直接收益，但只要对用户体验有帮助，我们都会抽时间去做。</p><img src='https://sf3-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/story/xiongdian_blue.jpeg' alt='' style='-webkit-font-smoothing: antialiased; vertical-align: middle; width: 720px; margin: 12px auto; color: rgb(31, 35, 41); font-family: Gilroy-regular, -apple-system, system-ui, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;'><span style='color: rgb(31, 35, 41); font-family: Gilroy-regular, -apple-system, system-ui, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;'></span><p style='-webkit-font-smoothing: antialiased; margin: 20px auto; padding: 0px; line-height: 2.14; color: rgb(81, 86, 93); font-family: Gilroy-regular, -apple-system, system-ui, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;'>当然，在一家全球月活用户超过 15 亿的公司里工作，我们也会遇到很多挑战。TikTok 起步阶段时，iOS 这边只有我一个全职同学，另外一个是实习生。这对个人能力提出了考验，但同时也意味着，你可以做很多创新和有意思的事，比如我们支持了阿拉伯语从右往左写的场景，还支持了全世界不同肤色、不同人种的美颜。现在我们支持 150 个国家和地区的国际化项目，看到抖音和TikTok 登上十几个国家 App Store 榜首，自己作为贡献其中的一员，非常有成就感。</p><img src='https://sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/story/xiongdianstory1Img1.png' alt='' style='-webkit-font-smoothing: antialiased; vertical-align: middle; width: 720px; margin: 12px auto; color: rgb(31, 35, 41); font-family: Gilroy-regular, -apple-system, system-ui, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;'><span style='color: rgb(31, 35, 41); font-family: Gilroy-regular, -apple-system, system-ui, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;'></span><p style='-webkit-font-smoothing: antialiased; margin: 20px auto; padding: 0px; line-height: 2.14; color: rgb(81, 86, 93); font-family: Gilroy-regular, -apple-system, system-ui, &quot;Segoe UI&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;'>总体来说，在字节跳动工作，我还是很有成就感的。之前参加 WWDC 技术大会，在会场发现，开场的 App 墙里有我们的产品，排队入场时听到前面的人在讨论 TikTok。WWDC 的参会者都是从全球各地过来，对 Apple 文化很痴迷的人，我在后面看着他们，心里还是很自豪的。</p>"
},)

const otherStaffStories = ref([
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
</script>

<style scoped lang="less">
.staff-story {
  .banner {
    height: 550px;
    min-width: @main-width;
    background-repeat: no-repeat;
    background-size: 160%;
    padding: 120px;
    color: #fff;
    font-size: @font-size-medium;
    font-weight: @font-weight-primary;
    line-height: @font-line-height-large;
    background-position: center top;

    .textContent {
      width: 500px;

      .remark {
        margin-bottom: 30px;
      }
    }
  }

  .content {
    width: 720px;
    margin: auto;

    .title {
      margin-top: 20px;
      margin-bottom: 10px;
    }
  }
}
</style>