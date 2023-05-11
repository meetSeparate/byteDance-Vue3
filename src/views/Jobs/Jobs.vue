<template>
  <div class="jobs">
    <div class="banner">和优秀的人，做有挑战的事</div>

    <!-- 搜索 -->
    <div ref="searchBar" :class="{ fixedTop: searchBarFixedTop }" class="search-wrapper">
      <input-search
          :size="searchBarFixedTop ? 'small' : 'medium'"
          placeholder="搜索职位"
          v-model="searchKeyword"
      ></input-search>
    </div>

    <div class="main clearfix">
      <!-- 侧边栏过滤选择 -->
      <div class="clearfix aside-filter">
        <div class="header">
          <span>选择</span>
          <span :class="{ clearable }" class="clear" @click="clearFilter">清空</span>
        </div>
        <div class="job-category job-filter-block">
          <div class="title"></div>
          <checkbox-transfer
              title="职位"
              ref="jobCategory"
              v-model="job_category_id_list"
              :props="{ key: 'id', label: 'name' }"
              :data="jobCategories"
          ></checkbox-transfer>
        </div>
        <div class="job-city job-filter-block">
          <div class="title"></div>
          <checkbox-transfer
              title="城市"
              ref="location"
              v-model="location_code_list"
              :props="{ key: 'code', label: 'name' }"
              :data="jobCities"
          ></checkbox-transfer>
        </div>
      </div>
      <!-- 主体内容 -->
      <div class="content" v-loading:#ffffff7d.scrollFixed="loading">
        <h2 class="content-title">开启新的职位 ({{ results.count }})</h2>
        <ul class="content-list">
          <li class="content-item" v-for="item in results.job_post_list" :key="item.id">
            <router-link :to="`/jobs/${item.id}`">
              <h3 class="title">{{ item.title }}</h3>

              <div class="subTitle">
                <span class="city">{{ item.city_info.name }}</span>&nbsp;|
                <span class="job_category">{{ item.job_category.name }}</span>&nbsp;|
                <span class="recruitment_channel">社招</span>
              </div>
              <p class="desc">{{ item.description }}</p>
            </router-link>
          </li>
        </ul>
<!--        &lt;!&ndash; 分页器 &ndash;&gt;-->
<!--        <div v-show="!loading" class="pagination-wrapper">-->
<!--          <pagination :current-page.sync="currentPage" :total="results.count"></pagination>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, watch, getCurrentInstance, onMounted} from "vue";
import {useRoute} from "vue-router";
import {getOffsetTop} from "../../helper/utilities.js";
import EventBus from "../../helper/EventBus/index.js";
import InputSearch from '../../components/Input-Search.vue'
import CheckboxTransfer from "../../components/Checkbox-Transfer.vue";

const route = useRoute()
const {proxy} = getCurrentInstance()
let positionY = 0;
let searchBarClientHeight = 0
const {keyword, job_category_id} = route.query
const searchBarFixedTop = ref(false)
// 工作种类数组
const job_category_id_list = ref(job_category_id ? [job_category_id] : [])
// 工作地点数组
const location_code_list = ref([])
// 搜索内容
const searchKeyword = ref("")
// 岗位种类列表
const jobCategories = ref([
  {
    "id": "6704215862603155720",
    "name": "研发",
    "en_name": "R\u0026D",
    "i18n_name": "研发",
    "depth": 1,
    "parent": null,
    "children": null
  },
  {
    "id": "6704215882479962371",
    "name": "运营",
    "en_name": "Operations",
    "i18n_name": "运营",
    "depth": 1,
    "parent": null,
    "children": null
  },
  {
    "id": "6704215864629004552",
    "name": "产品",
    "en_name": "Product",
    "i18n_name": "产品",
    "depth": 1,
    "parent": null,
    "children": null
  },
  {
    "id": "6709824272505768200",
    "name": "销售",
    "en_name": "Sales",
    "i18n_name": "销售",
    "depth": 1,
    "parent": null,
    "children": null
  },
  {
    "id": "6704215913488451847",
    "name": "职能 / 支持",
    "en_name": "Corporate Function / Support",
    "i18n_name": "职能 / 支持",
    "depth": 1,
    "parent": null,
    "children": null
  },
  {
    "id": "6704215901438216462",
    "name": "市场",
    "en_name": "Marketing",
    "i18n_name": "市场",
    "depth": 1,
    "parent": null,
    "children": null
  },
  {
    "id": "6709824272514156812",
    "name": "设计",
    "en_name": "Design",
    "i18n_name": "设计",
    "depth": 1,
    "parent": null,
    "children": null
  },
  {
    "id": "6850051244971526414",
    "name": "游戏策划",
    "en_name": "Game Design",
    "i18n_name": "游戏策划",
    "depth": 1,
    "parent": null,
    "children": null
  },
  {
    "id": "6794746007419619592",
    "name": "教研教学",
    "en_name": "Teaching and researching",
    "i18n_name": "教研教学",
    "depth": 1,
    "parent": null,
    "children": null
  }
])
// 岗位城市列表
const jobCities = ref([
  {
    "code": "CT_11",
    "name": "北京",
    "en_name": "Beijing",
    "location_type": 3,
    "i18n_name": "北京",
    "py_name": "beijing",
    "mdm_code": null
  },
  {
    "code": "CT_125",
    "name": "上海",
    "en_name": "Shanghai",
    "location_type": 3,
    "i18n_name": "上海",
    "py_name": "shanghai",
    "mdm_code": null
  },
  {
    "code": "CT_128",
    "name": "深圳",
    "en_name": "Shenzhen",
    "location_type": 3,
    "i18n_name": "深圳",
    "py_name": "shenzhen",
    "mdm_code": null
  },
  {
    "code": "CT_52",
    "name": "杭州",
    "en_name": "Hangzhou",
    "location_type": 3,
    "i18n_name": "杭州",
    "py_name": "hangzhou",
    "mdm_code": null
  },
  {
    "code": "CT_163",
    "name": "新加坡",
    "en_name": "Singapore",
    "location_type": 3,
    "i18n_name": "新加坡",
    "py_name": "xinjiapo",
    "mdm_code": null
  },
  {
    "code": "CT_1103355",
    "name": "圣何塞",
    "en_name": "San Jose",
    "location_type": 3,
    "i18n_name": "圣何塞",
    "py_name": "shenghesai",
    "mdm_code": null
  },
  {
    "code": "CT_45",
    "name": "广州",
    "en_name": "Guangzhou",
    "location_type": 3,
    "i18n_name": "广州",
    "py_name": "guangzhou",
    "mdm_code": null
  },
  {
    "code": "CT_22",
    "name": "成都",
    "en_name": "Chengdu",
    "location_type": 3,
    "i18n_name": "成都",
    "py_name": "chengdu",
    "mdm_code": null
  },
  {
    "code": "CT_157",
    "name": "西雅图",
    "en_name": "Seattle",
    "location_type": 3,
    "i18n_name": "西雅图",
    "py_name": "xiyatu",
    "mdm_code": null
  },

  {
    "code": "CT_94",
    "name": "洛杉矶",
    "en_name": "Los Angeles",
    "location_type": 3,
    "i18n_name": "洛杉矶",
    "py_name": "luoshanji",
    "mdm_code": null
  },
  {
    "code": "CT_243",
    "name": "山景城",
    "en_name": "Mountain View",
    "location_type": 3,
    "i18n_name": "山景城",
    "py_name": "shanjingcheng",
    "mdm_code": null
  },
  {
    "code": "CT_114",
    "name": "纽约",
    "en_name": "New York",
    "location_type": 3,
    "i18n_name": "纽约",
    "py_name": "niuyue",
    "mdm_code": null
  },
  {
    "code": "CT_93",
    "name": "伦敦",
    "en_name": "London",
    "location_type": 3,
    "i18n_name": "伦敦",
    "py_name": "lundun",
    "mdm_code": null
  },
  {
    "code": "CT_37",
    "name": "都柏林",
    "en_name": "Dublin",
    "location_type": 3,
    "i18n_name": "都柏林",
    "py_name": "dubolin",
    "mdm_code": null
  },
  {
    "code": "CT_98",
    "name": "曼谷",
    "en_name": "Bangkok",
    "location_type": 3,
    "i18n_name": "曼谷",
    "py_name": "mangu",
    "mdm_code": null
  },
  {
    "code": "CT_190",
    "name": "重庆",
    "en_name": "Chongqing",
    "location_type": 3,
    "i18n_name": "重庆",
    "py_name": "chongqing",
    "mdm_code": null
  },
  {
    "code": "CT_154",
    "name": "武汉",
    "en_name": "Wuhan",
    "location_type": 3,
    "i18n_name": "武汉",
    "py_name": "wuhan",
    "mdm_code": null
  },
  {
    "code": "CT_65",
    "name": "吉隆坡",
    "en_name": "Kuala Lumpur",
    "location_type": 3,
    "i18n_name": "吉隆坡",
    "py_name": "jilongpo",
    "mdm_code": null
  },
  {
    "code": "CT_169",
    "name": "雅加达",
    "en_name": "Jakarta",
    "location_type": 3,
    "i18n_name": "雅加达",
    "py_name": "yajiada",
    "mdm_code": null
  },
  {
    "code": "CT_34",
    "name": "东京",
    "en_name": "Tokyo",
    "location_type": 3,
    "i18n_name": "东京",
    "py_name": "dongjing",
    "mdm_code": null
  },
  {
    "code": "CT_60",
    "name": "胡志明市",
    "en_name": "Ho Chi Minh City",
    "location_type": 3,
    "i18n_name": "胡志明市",
    "py_name": "huzhimingshi",
    "mdm_code": null
  },
  {
    "code": "CT_107",
    "name": "南京",
    "en_name": "Nanjing",
    "location_type": 3,
    "i18n_name": "南京",
    "py_name": "nanjing",
    "mdm_code": null
  },
  {
    "code": "CT_155",
    "name": "西安",
    "en_name": "Xi'an",
    "location_type": 3,
    "i18n_name": "西安",
    "py_name": "xian",
    "mdm_code": null
  },
  {
    "code": "CT_233",
    "name": "华盛顿哥伦比亚特区",
    "en_name": "Washington D.C.",
    "location_type": 3,
    "i18n_name": "华盛顿哥伦比亚特区",
    "py_name": "huashengdun",
    "mdm_code": null
  },
  {
    "code": "CT_6",
    "name": "柏林",
    "en_name": "Berlin",
    "location_type": 3,
    "i18n_name": "柏林",
    "py_name": "bolin",
    "mdm_code": null
  },
  {
    "code": "CT_247",
    "name": "奥斯汀",
    "en_name": "Austin",
    "location_type": 3,
    "i18n_name": "奥斯汀",
    "py_name": "aositing",
    "mdm_code": null
  },
  {
    "code": "CT_75",
    "name": "旧金山",
    "en_name": "San Francisco",
    "location_type": 3,
    "i18n_name": "旧金山",
    "py_name": "jiujinshan",
    "mdm_code": null
  },
  {
    "code": "CT_244",
    "name": "悉尼",
    "en_name": "Sydney",
    "location_type": 3,
    "i18n_name": "悉尼",
    "py_name": "xini",
    "mdm_code": null
  },
  {
    "code": "CT_33",
    "name": "迪拜",
    "en_name": "Dubai",
    "location_type": 3,
    "i18n_name": "迪拜",
    "py_name": "dibai",
    "mdm_code": null
  },
  {
    "code": "CT_97",
    "name": "马尼拉",
    "en_name": "Manila",
    "location_type": 3,
    "i18n_name": "马尼拉",
    "py_name": "manila",
    "mdm_code": null
  },
  {
    "code": "CT_134",
    "name": "首尔",
    "en_name": "Seoul",
    "location_type": 3,
    "i18n_name": "首尔",
    "py_name": "shouer",
    "mdm_code": null
  },
  {
    "code": "CT_130",
    "name": "圣保罗",
    "en_name": "Sao Paulo",
    "location_type": 3,
    "i18n_name": "圣保罗",
    "py_name": "shengbaoluo",
    "mdm_code": null
  },
  {
    "code": "CT_158",
    "name": "厦门",
    "en_name": "Xiamen",
    "location_type": 3,
    "i18n_name": "厦门",
    "py_name": "xiamen",
    "mdm_code": null
  },
  {
    "code": "CT_66",
    "name": "济南",
    "en_name": "Jinan",
    "location_type": 3,
    "i18n_name": "济南",
    "py_name": "jinan",
    "mdm_code": null
  },
  {
    "code": "CT_100065",
    "name": "三亚",
    "en_name": "Sanya",
    "location_type": 3,
    "i18n_name": "三亚",
    "py_name": "sanya",
    "mdm_code": null
  },
  {
    "code": "CT_143",
    "name": "天津",
    "en_name": "Tianjin",
    "location_type": 3,
    "i18n_name": "天津",
    "py_name": "tianjin",
    "mdm_code": null
  },
  {
    "code": "CT_55",
    "name": "合肥",
    "en_name": "Hefei",
    "location_type": 3,
    "i18n_name": "合肥",
    "py_name": "hefei",
    "mdm_code": null
  },
  {
    "code": "CT_80",
    "name": "昆明",
    "en_name": "Kunming",
    "location_type": 3,
    "i18n_name": "昆明",
    "py_name": "kunming",
    "mdm_code": null
  },
  {
    "code": "CT_20",
    "name": "长沙",
    "en_name": "Changsha",
    "location_type": 3,
    "i18n_name": "长沙",
    "py_name": "changsha",
    "mdm_code": null
  },
  {
    "code": "CT_101459",
    "name": "塔吉格",
    "en_name": "Taguig",
    "location_type": 3,
    "i18n_name": "塔吉格",
    "py_name": "tagige",
    "mdm_code": null
  },
  {
    "code": "CT_188",
    "name": "郑州",
    "en_name": "Zhengzhou",
    "location_type": 3,
    "i18n_name": "郑州",
    "py_name": "zhengzhou",
    "mdm_code": null
  },
  {
    "code": "CT_103",
    "name": "墨西哥城",
    "en_name": "Mexico City",
    "location_type": 3,
    "i18n_name": "墨西哥城",
    "py_name": "moxigecheng",
    "mdm_code": null
  },
  {
    "code": "CT_40",
    "name": "福州",
    "en_name": "Fuzhou",
    "location_type": 3,
    "i18n_name": "福州",
    "py_name": "fuzhou",
    "mdm_code": null
  },
  {
    "code": "CT_119",
    "name": "青岛",
    "en_name": "Qingdao",
    "location_type": 3,
    "i18n_name": "青岛",
    "py_name": "qingdao",
    "mdm_code": null
  },
  {
    "code": "CT_199",
    "name": "苏州",
    "en_name": "Suzhou",
    "location_type": 3,
    "i18n_name": "苏州",
    "py_name": "suzhou",
    "mdm_code": null
  },
  {
    "code": "CT_100762",
    "name": "亚特兰大",
    "en_name": "Atlanta",
    "location_type": 3,
    "i18n_name": "亚特兰大",
    "py_name": "yatelanda",
    "mdm_code": null
  },
  {
    "code": "CT_105",
    "name": "南昌",
    "en_name": "Nanchang",
    "location_type": 3,
    "i18n_name": "南昌",
    "py_name": "nanchang",
    "mdm_code": null
  },
  {
    "code": "CT_1000001",
    "name": "阿什本",
    "en_name": "Ashburn",
    "location_type": 3,
    "i18n_name": "阿什本",
    "py_name": "ashiben",
    "mdm_code": null
  },
  {
    "code": "CT_100766",
    "name": "阿姆斯特丹",
    "en_name": "Amsterdam",
    "location_type": 3,
    "i18n_name": "阿姆斯特丹",
    "py_name": "amusitedan",
    "mdm_code": null
  },
  {
    "code": "CT_209",
    "name": "华沙",
    "en_name": "Warsaw",
    "location_type": 3,
    "i18n_name": "华沙",
    "py_name": "huasha",
    "mdm_code": null
  },
  {
    "code": "CT_112",
    "name": "宁波",
    "en_name": "Ningbo",
    "location_type": 3,
    "i18n_name": "宁波",
    "py_name": "ningbo",
    "mdm_code": null
  },
  {
    "code": "CT_101443",
    "name": "希尔斯伯勒",
    "en_name": "Hillsboro",
    "location_type": 3,
    "i18n_name": "希尔斯伯勒",
    "py_name": "xiersibole",
    "mdm_code": null
  },
  {
    "code": "CT_204",
    "name": "米兰",
    "en_name": "Milan",
    "location_type": 3,
    "i18n_name": "米兰",
    "py_name": "milan",
    "mdm_code": null
  },
  {
    "code": "CT_141",
    "name": "太原",
    "en_name": "Taiyuan",
    "location_type": 3,
    "i18n_name": "太原",
    "py_name": "taiyuan",
    "mdm_code": null
  },
  {
    "code": "CT_48",
    "name": "哈尔滨",
    "en_name": "Harbin",
    "location_type": 3,
    "i18n_name": "哈尔滨",
    "py_name": "haerbin",
    "mdm_code": null
  },
  {
    "code": "CT_25",
    "name": "大连",
    "en_name": "Dalian",
    "location_type": 3,
    "i18n_name": "大连",
    "py_name": "dalian",
    "mdm_code": null
  },
  {
    "code": "CT_100772",
    "name": "波哥大",
    "en_name": "Bogota",
    "location_type": 3,
    "i18n_name": "波哥大",
    "py_name": "bogeda",
    "mdm_code": null
  },
  {
    "code": "CT_221",
    "name": "芝加哥",
    "en_name": "Chicago",
    "location_type": 3,
    "i18n_name": "芝加哥",
    "py_name": "zhijiage",
    "mdm_code": null
  },
  {
    "code": "CT_36",
    "name": "东莞",
    "en_name": "Dongguan",
    "location_type": 3,
    "i18n_name": "东莞",
    "py_name": "dongguan",
    "mdm_code": null
  },
  {
    "code": "CT_129",
    "name": "沈阳",
    "en_name": "Shenyang",
    "location_type": 3,
    "i18n_name": "沈阳",
    "py_name": "shenyang",
    "mdm_code": null
  },
  {
    "code": "CT_39",
    "name": "佛山",
    "en_name": "Foshan",
    "location_type": 3,
    "i18n_name": "佛山",
    "py_name": "foshan",
    "mdm_code": null
  },
  {
    "code": "CT_242",
    "name": "多伦多",
    "en_name": "Toronto",
    "location_type": 3,
    "i18n_name": "多伦多",
    "py_name": "duolunduo",
    "mdm_code": null
  },
  {
    "code": "CT_5",
    "name": "巴黎",
    "en_name": "Paris",
    "location_type": 3,
    "i18n_name": "巴黎",
    "py_name": "bali",
    "mdm_code": null
  },
  {
    "code": "CT_249",
    "name": "特拉维夫",
    "en_name": "Tel Aviv",
    "location_type": 3,
    "i18n_name": "特拉维夫",
    "py_name": "telaweifu",
    "mdm_code": null
  },
  {
    "code": "CT_121",
    "name": "泉州",
    "en_name": "Quanzhou",
    "location_type": 3,
    "i18n_name": "泉州",
    "py_name": "quanzhou",
    "mdm_code": null
  },
  {
    "code": "CT_49",
    "name": "海口",
    "en_name": "Haikou",
    "location_type": 3,
    "i18n_name": "海口",
    "py_name": "haikou",
    "mdm_code": null
  },
  {
    "code": "CT_88",
    "name": "临汾",
    "en_name": "Linfen",
    "location_type": 3,
    "i18n_name": "临汾",
    "py_name": "linfen",
    "mdm_code": null
  },
  {
    "code": "CT_151",
    "name": "无锡",
    "en_name": "Wuxi",
    "location_type": 3,
    "i18n_name": "无锡",
    "py_name": "wuxi",
    "mdm_code": null
  },
  {
    "code": "CT_1102285",
    "name": "斯德哥尔摩",
    "en_name": "Stockholm",
    "location_type": 3,
    "i18n_name": "斯德哥尔摩",
    "py_name": "sidegeermo",
    "mdm_code": null
  },
  {
    "code": "CT_100",
    "name": "孟买",
    "en_name": "Mumbai",
    "location_type": 3,
    "i18n_name": "孟买",
    "py_name": "mengmai",
    "mdm_code": null
  },
  {
    "code": "CT_108",
    "name": "南宁",
    "en_name": "Nanning",
    "location_type": 3,
    "i18n_name": "南宁",
    "py_name": "nanning",
    "mdm_code": null
  },
  {
    "code": "CT_173",
    "name": "宜宾",
    "en_name": "Yibin",
    "location_type": 3,
    "i18n_name": "宜宾",
    "py_name": "yibin",
    "mdm_code": null
  },
  {
    "code": "CT_96",
    "name": "马德里",
    "en_name": "Madrid",
    "location_type": 3,
    "i18n_name": "马德里",
    "py_name": "madeli",
    "mdm_code": null
  },
  {
    "code": "CT_101382",
    "name": "阿斯塔纳",
    "en_name": "Astana",
    "location_type": 3,
    "i18n_name": "阿斯塔纳",
    "py_name": "asitana",
    "mdm_code": null
  },
  {
    "code": "CT_77",
    "name": "卡萨布兰卡",
    "en_name": "Casablanca",
    "location_type": 3,
    "i18n_name": "卡萨布兰卡",
    "py_name": "kasabulanka",
    "mdm_code": null
  },
  {
    "code": "CT_79",
    "name": "开罗",
    "en_name": "Cairo",
    "location_type": 3,
    "i18n_name": "开罗",
    "py_name": "kailuo",
    "mdm_code": null
  },
  {
    "code": "CT_206",
    "name": "伊斯坦布尔",
    "en_name": "Istanbul",
    "location_type": 3,
    "i18n_name": "伊斯坦布尔",
    "py_name": "yisitanbuer",
    "mdm_code": null
  },
  {
    "code": "CT_47",
    "name": "贵阳",
    "en_name": "Guiyang",
    "location_type": 3,
    "i18n_name": "贵阳",
    "py_name": "guiyang",
    "mdm_code": null
  },
  {
    "code": "CT_159",
    "name": "中国香港",
    "en_name": "Hong Kong (China)",
    "location_type": 3,
    "i18n_name": "中国香港",
    "py_name": "zhongguoxianggang",
    "mdm_code": null
  },
  {
    "code": "CT_19",
    "name": "长春",
    "en_name": "Changchun",
    "location_type": 3,
    "i18n_name": "长春",
    "py_name": "changchun",
    "mdm_code": null
  },
  {
    "code": "CT_218",
    "name": "约翰内斯堡",
    "en_name": "Johannesburg",
    "location_type": 3,
    "i18n_name": "约翰内斯堡",
    "py_name": "yuehanneisibao",
    "mdm_code": null
  },
  {
    "code": "CT_71",
    "name": "金华",
    "en_name": "Jinhua",
    "location_type": 3,
    "i18n_name": "金华",
    "py_name": "jinhua",
    "mdm_code": null
  },
  {
    "code": "CT_189",
    "name": "中山",
    "en_name": "Zhongshan",
    "location_type": 3,
    "i18n_name": "中山",
    "py_name": "zhongshan",
    "mdm_code": null
  },
  {
    "code": "CT_100764",
    "name": "波士顿",
    "en_name": "Boston",
    "location_type": 3,
    "i18n_name": "波士顿",
    "py_name": "boshidun",
    "mdm_code": null
  },
  {
    "code": "CT_83",
    "name": "兰州",
    "en_name": "Lanzhou",
    "location_type": 3,
    "i18n_name": "兰州",
    "py_name": "lanzhou",
    "mdm_code": null
  },
  {
    "code": "CT_226",
    "name": "慕尼黑",
    "en_name": "Munich",
    "location_type": 3,
    "i18n_name": "慕尼黑",
    "py_name": "munihei",
    "mdm_code": null
  },
  {
    "code": "CT_203",
    "name": "圣地亚哥",
    "en_name": "San Diego",
    "location_type": 3,
    "i18n_name": "圣地亚哥",
    "py_name": "shengdeyage",
    "mdm_code": null
  },
  {
    "code": "CT_1100743",
    "name": "汉堡",
    "en_name": "Hamburg",
    "location_type": 3,
    "i18n_name": "汉堡",
    "py_name": "hanbao",
    "mdm_code": null
  },
  {
    "code": "CT_100051",
    "name": "澄迈",
    "en_name": "chengmai",
    "location_type": 3,
    "i18n_name": "澄迈",
    "py_name": "chengmai",
    "mdm_code": null
  },
  {
    "code": "CT_133",
    "name": "石家庄",
    "en_name": "Shijiazhuang",
    "location_type": 3,
    "i18n_name": "石家庄",
    "py_name": "shijiazhuang",
    "mdm_code": null
  },
  {
    "code": "CT_127",
    "name": "绍兴",
    "en_name": "Shaoxing",
    "location_type": 3,
    "i18n_name": "绍兴",
    "py_name": "shaoxing",
    "mdm_code": null
  },
  {
    "code": "CT_100747",
    "name": "底特律",
    "en_name": "Detroit",
    "location_type": 3,
    "i18n_name": "底特律",
    "py_name": "ditelv",
    "mdm_code": null
  },
  {
    "code": "CT_149",
    "name": "温州",
    "en_name": "Wenzhou",
    "location_type": 3,
    "i18n_name": "温州",
    "py_name": "wenzhou",
    "mdm_code": null
  },
  {
    "code": "CT_44",
    "name": "古尔冈",
    "en_name": "Gurgaon",
    "location_type": 3,
    "i18n_name": "古尔冈",
    "py_name": "guergang",
    "mdm_code": null
  },
  {
    "code": "CT_100166",
    "name": "内江",
    "en_name": "Neijiang",
    "location_type": 3,
    "i18n_name": "内江",
    "py_name": "neijiang",
    "mdm_code": null
  },
  {
    "code": "CT_100755",
    "name": "拉各斯",
    "en_name": "Lagos",
    "location_type": 3,
    "i18n_name": "拉各斯",
    "py_name": "Lagesi",
    "mdm_code": null
  },
  {
    "code": "CT_101",
    "name": "绵阳",
    "en_name": "Mianyang",
    "location_type": 3,
    "i18n_name": "绵阳",
    "py_name": "mianyang",
    "mdm_code": null
  },
  {
    "code": "CT_195",
    "name": "淄博",
    "en_name": "Zibo",
    "location_type": 3,
    "i18n_name": "淄博",
    "py_name": "zibo",
    "mdm_code": null
  },
  {
    "code": "CT_104",
    "name": "纳什维尔",
    "en_name": "Nashville",
    "location_type": 3,
    "i18n_name": "纳什维尔",
    "py_name": "nashenweier",
    "mdm_code": null
  },
  {
    "code": "CT_89",
    "name": "临沂",
    "en_name": "Linyi",
    "location_type": 3,
    "i18n_name": "临沂",
    "py_name": "linyi",
    "mdm_code": null
  },
  {
    "code": "CT_90",
    "name": "柳州",
    "en_name": "Liuzhou",
    "location_type": 3,
    "i18n_name": "柳州",
    "py_name": "liuzhou",
    "mdm_code": null
  },
  {
    "code": "CT_170",
    "name": "烟台",
    "en_name": "Yantai",
    "location_type": 3,
    "i18n_name": "烟台",
    "py_name": "yantai",
    "mdm_code": null
  },
  {
    "code": "CT_142",
    "name": "唐山",
    "en_name": "Tangshan",
    "location_type": 3,
    "i18n_name": "唐山",
    "py_name": "tangshan",
    "mdm_code": null
  },
  {
    "code": "CT_137",
    "name": "台州",
    "en_name": "Taizhou",
    "location_type": 3,
    "i18n_name": "台州",
    "py_name": "taizhou",
    "mdm_code": null
  },
  {
    "code": "CT_100026",
    "name": "清远",
    "en_name": "Qingyuan",
    "location_type": 3,
    "i18n_name": "清远",
    "py_name": "qingyuan",
    "mdm_code": null
  },
  {
    "code": "CT_177",
    "name": "银川",
    "en_name": "Yinchuan",
    "location_type": 3,
    "i18n_name": "银川",
    "py_name": "yinchuan",
    "mdm_code": null
  },
  {
    "code": "CT_1103347",
    "name": "凤凰城",
    "en_name": "Phoenix",
    "location_type": 3,
    "i18n_name": "凤凰城",
    "py_name": "fenghuangcheng",
    "mdm_code": null
  },
  {
    "code": "CT_123",
    "name": "汕头",
    "en_name": "Shantou",
    "location_type": 3,
    "i18n_name": "汕头",
    "py_name": "shantou",
    "mdm_code": null
  },
  {
    "code": "CT_167",
    "name": "徐州",
    "en_name": "Xuzhou",
    "location_type": 3,
    "i18n_name": "徐州",
    "py_name": "xuzhou",
    "mdm_code": null
  },
  {
    "code": "CT_32",
    "name": "德州",
    "en_name": "Dezhou",
    "location_type": 3,
    "i18n_name": "德州",
    "py_name": "dezhou",
    "mdm_code": null
  },
  {
    "code": "CT_27",
    "name": "大同",
    "en_name": "Datong",
    "location_type": 3,
    "i18n_name": "大同",
    "py_name": "datong",
    "mdm_code": null
  },
  {
    "code": "CT_120",
    "name": "曲靖",
    "en_name": "Qujing",
    "location_type": 3,
    "i18n_name": "曲靖",
    "py_name": "qujing",
    "mdm_code": null
  },
  {
    "code": "CT_118",
    "name": "秦皇岛",
    "en_name": "Qinhuangdao",
    "location_type": 3,
    "i18n_name": "秦皇岛",
    "py_name": "qinhuangdao",
    "mdm_code": null
  },
  {
    "code": "CT_117",
    "name": "齐齐哈尔",
    "en_name": "Qiqihaer",
    "location_type": 3,
    "i18n_name": "齐齐哈尔",
    "py_name": "qiqihaer",
    "mdm_code": null
  },
  {
    "code": "CT_68",
    "name": "嘉兴",
    "en_name": "Jiaxing",
    "location_type": 3,
    "i18n_name": "嘉兴",
    "py_name": "jiaxing",
    "mdm_code": null
  },
  {
    "code": "CT_111",
    "name": "南阳",
    "en_name": "Nanyang",
    "location_type": 3,
    "i18n_name": "南阳",
    "py_name": "nanyang",
    "mdm_code": null
  },
  {
    "code": "CT_43",
    "name": "赣州",
    "en_name": "Ganzhou",
    "location_type": 3,
    "i18n_name": "赣州",
    "py_name": "ganzhou",
    "mdm_code": null
  },
  {
    "code": "CT_124",
    "name": "商丘",
    "en_name": "Shangqiu",
    "location_type": 3,
    "i18n_name": "商丘",
    "py_name": "shangqiu",
    "mdm_code": null
  },
  {
    "code": "CT_126",
    "name": "上饶",
    "en_name": "Shangrao",
    "location_type": 3,
    "i18n_name": "上饶",
    "py_name": "shangrao",
    "mdm_code": null
  },
  {
    "code": "CT_241",
    "name": "红河",
    "en_name": "Honghe",
    "location_type": 3,
    "i18n_name": "红河",
    "py_name": "honghe",
    "mdm_code": null
  },
  {
    "code": "CT_24",
    "name": "赤峰",
    "en_name": "Chifeng",
    "location_type": 3,
    "i18n_name": "赤峰",
    "py_name": "chifeng",
    "mdm_code": null
  },
  {
    "code": "CT_110",
    "name": "南通",
    "en_name": "Nantong",
    "location_type": 3,
    "i18n_name": "南通",
    "py_name": "nantong",
    "mdm_code": null
  },
  {
    "code": "CT_235",
    "name": "布鲁塞尔",
    "en_name": "Brussels",
    "location_type": 3,
    "i18n_name": "布鲁塞尔",
    "py_name": "bulusaier",
    "mdm_code": null
  },
  {
    "code": "CT_50",
    "name": "邯郸",
    "en_name": "Handan",
    "location_type": 3,
    "i18n_name": "邯郸",
    "py_name": "handan",
    "mdm_code": null
  },
  {
    "code": "CT_106",
    "name": "南充",
    "en_name": "Nanchong",
    "location_type": 3,
    "i18n_name": "南充",
    "py_name": "nanchong",
    "mdm_code": null
  },
  {
    "code": "CT_147",
    "name": "潍坊",
    "en_name": "Weifang",
    "location_type": 3,
    "i18n_name": "潍坊",
    "py_name": "weifang",
    "mdm_code": null
  },
  {
    "code": "CT_57",
    "name": "衡水",
    "en_name": "Hengshui",
    "location_type": 3,
    "i18n_name": "衡水",
    "py_name": "hengshui",
    "mdm_code": null
  },
  {
    "code": "CT_59",
    "name": "呼和浩特",
    "en_name": "Huhehot",
    "location_type": 3,
    "i18n_name": "呼和浩特",
    "py_name": "huhehaote",
    "mdm_code": null
  },
  {
    "code": "CT_230",
    "name": "西昌",
    "en_name": "Xichang",
    "location_type": 3,
    "i18n_name": "西昌",
    "py_name": "xichang",
    "mdm_code": null
  },
  {
    "code": "CT_23",
    "name": "承德",
    "en_name": "Chengde",
    "location_type": 3,
    "i18n_name": "承德",
    "py_name": "chengde",
    "mdm_code": null
  },
  {
    "code": "CT_62",
    "name": "淮安",
    "en_name": "Huaian",
    "location_type": 3,
    "i18n_name": "淮安",
    "py_name": "huaian",
    "mdm_code": null
  },
  {
    "code": "CT_100913",
    "name": "尔湾",
    "en_name": "Irvine",
    "location_type": 3,
    "i18n_name": "尔湾",
    "py_name": "erwan",
    "mdm_code": null
  },
  {
    "code": "CT_186",
    "name": "肇庆",
    "en_name": "Zhaoqing",
    "location_type": 3,
    "i18n_name": "肇庆",
    "py_name": "zhaoqing",
    "mdm_code": null
  },
  {
    "code": "CT_227",
    "name": "大理",
    "en_name": "Dali",
    "location_type": 3,
    "i18n_name": "大理",
    "py_name": "dali",
    "mdm_code": null
  },
  {
    "code": "CT_224",
    "name": "自贡",
    "en_name": "Zigong",
    "location_type": 3,
    "i18n_name": "自贡",
    "py_name": "zigong",
    "mdm_code": null
  },
  {
    "code": "CT_74",
    "name": "九江",
    "en_name": "Jiujiang",
    "location_type": 3,
    "i18n_name": "九江",
    "py_name": "jiujiang",
    "mdm_code": null
  },
  {
    "code": "CT_15",
    "name": "沧州",
    "en_name": "Cangzhou",
    "location_type": 3,
    "i18n_name": "沧州",
    "py_name": "cangzhou",
    "mdm_code": null
  },
  {
    "code": "CT_171",
    "name": "盐城",
    "en_name": "Yancheng",
    "location_type": 3,
    "i18n_name": "盐城",
    "py_name": "yancheng",
    "mdm_code": null
  },
  {
    "code": "CT_150",
    "name": "乌鲁木齐",
    "en_name": "Urumqi",
    "location_type": 3,
    "i18n_name": "乌鲁木齐",
    "py_name": "wulumuqi",
    "mdm_code": null
  },
  {
    "code": "CT_162",
    "name": "新德里",
    "en_name": "New Delhi",
    "location_type": 3,
    "i18n_name": "新德里",
    "py_name": "xindeli",
    "mdm_code": null
  },
  {
    "code": "CT_166",
    "name": "邢台",
    "en_name": "Xingtai",
    "location_type": 3,
    "i18n_name": "邢台",
    "py_name": "xingtai",
    "mdm_code": null
  },
  {
    "code": "CT_87",
    "name": "聊城",
    "en_name": "Liaocheng",
    "location_type": 3,
    "i18n_name": "聊城",
    "py_name": "liaocheng",
    "mdm_code": null
  },
  {
    "code": "CT_197",
    "name": "衢州",
    "en_name": "Quzhou",
    "location_type": 3,
    "i18n_name": "衢州",
    "py_name": "quzhou",
    "mdm_code": null
  },
  {
    "code": "CT_192",
    "name": "珠海",
    "en_name": "Zhuhai",
    "location_type": 3,
    "i18n_name": "珠海",
    "py_name": "zhuhai",
    "mdm_code": null
  },
  {
    "code": "CT_9",
    "name": "保定",
    "en_name": "Baoding",
    "location_type": 3,
    "i18n_name": "保定",
    "py_name": "baoding",
    "mdm_code": null
  },
  {
    "code": "CT_17",
    "name": "常熟",
    "en_name": "Changshu",
    "location_type": 3,
    "i18n_name": "常熟",
    "py_name": "changshu",
    "mdm_code": null
  },
  {
    "code": "CT_92",
    "name": "龙岩",
    "en_name": "Longyan",
    "location_type": 3,
    "i18n_name": "龙岩",
    "py_name": "longyan",
    "mdm_code": null
  },
  {
    "code": "CT_185",
    "name": "张家口",
    "en_name": "Zhangjiakou",
    "location_type": 3,
    "i18n_name": "张家口",
    "py_name": "zhangjiakou",
    "mdm_code": null
  },
  {
    "code": "CT_182",
    "name": "湛江",
    "en_name": "Zhanjiang",
    "location_type": 3,
    "i18n_name": "湛江",
    "py_name": "zhanjiang",
    "mdm_code": null
  },
  {
    "code": "CT_95",
    "name": "洛阳",
    "en_name": "Luoyang",
    "location_type": 3,
    "i18n_name": "洛阳",
    "py_name": "luoyang",
    "mdm_code": null
  },
  {
    "code": "CT_174",
    "name": "宜昌",
    "en_name": "Yichang",
    "location_type": 3,
    "i18n_name": "宜昌",
    "py_name": "yichang",
    "mdm_code": null
  },
  {
    "code": "CT_100004",
    "name": "亳州",
    "en_name": "Bozhou",
    "location_type": 3,
    "i18n_name": "亳州",
    "py_name": "bozhou",
    "mdm_code": null
  },
  {
    "code": "CT_100156",
    "name": "眉山",
    "en_name": "Meishan",
    "location_type": 3,
    "i18n_name": "眉山",
    "py_name": "meishan",
    "mdm_code": null
  }])
// 加载
const loading = ref(false)
const currentPage = ref(1)
const results = ref({})

// 加载动画
// const loadingIns = proxy.$loading()
//
// setTimeout(() => {
//   loadingIns.close()
// }, 500)

// 计算属性
const clearable = computed(() => {
  return (
      job_category_id_list.value.length !== 0 || location_code_list.value.length !== 0
  )
})
const searchBar = ref()

// mounted
onMounted(() => {
  proxy.$nextTick(() => {
    positionY = getOffsetTop(document.body, searchBar.value);

    searchBarClientHeight = searchBar.value.clientHeight;
  })

  const onPageScroll = () => {
    const top = searchBar.value.getBoundingClientRect().top;

    searchBarFixedTop.value =
        window.scrollY > positionY - searchBarClientHeight / 2;
  }

  window.addEventListener("scroll", onPageScroll);

  EventBus.on("hook:destroyed", () => {
    window.removeEventListener("scroll", onPageScroll);
  });

})

const queryFilter = computed(() => {
  return {
    job_category_id_list: job_category_id_list.value,
    location_code_list: location_code_list.value,
    keyword: searchKeyword.value,
    offset: Math.max(0, currentPage.value - 1) * 10
  }
})

watch(queryFilter.value, (newValue, oldValue) => {
  searchBarFixedTop.value && window.scrollTo(0, positionY)
})

const clearFilter = () => {
  if (job_category_id_list.value.length) {
    job_category_id_list.value = []
  }
  if (location_code_list.value.length) {
    location_code_list.value = []
  }
}

const fetchList = () => {
  loading.value = true
  setTimeout(() => {
    results.value = {
      "job_post_list": [
        {
          "id": "7225444089478367548",
          "title": "机器人感知工程师-AILab",
          "sub_title": "",
          "description": "1、负责开展机器人3D感知相关领域的研究和开发工作，进行对应的方案调研、算法设计和模型优化等工作。\n2、协助团队完成相关前沿的技术应用和创新，力求实现科技和业务的完美结合。",
          "requirement": "1、熟悉各种计算机视觉、计算机图形学、深度学习等相关理论，具备良好的算法分析和设计能力；\n2、熟悉NERF、深度估计、BEV等相关3D感知的工作，并具有相关算法的实践经验；\n3、熟练使用Python等编程语言，熟练使用pytorch等相关工具；\n4、具有良好的英语阅读、写作能力，能够阅读和理解相关领域的英文文献；\n5、具备独立承担科研项目的能力，有相关领域顶会论文者优先。",
          "job_category": {
            "id": "6704215862603155720",
            "name": "研发",
            "en_name": "R&D",
            "i18n_name": "研发",
            "depth": 1,
            "parent": null,
            "children": null
          },
          "city_info": {
            "code": "CT_11",
            "name": "北京",
            "en_name": "Beijing",
            "location_type": null,
            "i18n_name": "北京",
            "py_name": null,
            "mdm_code": null
          },
          "recruit_type": {
            "id": "101",
            "name": "正式",
            "en_name": "Regular",
            "i18n_name": "正式",
            "depth": 2,
            "parent": {
              "id": "1",
              "name": "社招",
              "en_name": "Experienced",
              "i18n_name": "社招",
              "depth": 1,
              "parent": null,
              "children": null,
              "active_status": 1,
              "selectability": 1
            },
            "children": null,
            "active_status": 1,
            "selectability": 1
          },
          "publish_time": 1682304868000,
          "job_hot_flag": 2,
          "job_subject": null,
          "code": "A151429",
          "department_id": null,
          "job_function": null,
          "job_process_id": "6694104661676411150",
          "recommend_id": null,
          "city_list": [
            {
              "code": "CT_11",
              "name": "北京",
              "en_name": "Beijing",
              "location_type": null,
              "i18n_name": "北京",
              "py_name": null,
              "mdm_code": null
            }
          ],
          "job_post_info": {
            "id": null,
            "job_id": null,
            "title": null,
            "sub_title": null,
            "address_id": null,
            "address": null,
            "city": null,
            "education": null,
            "experience": null,
            "description": null,
            "requirement": null,
            "min_salary": null,
            "max_salary": null,
            "currency": null,
            "head_count": null,
            "crator_id": null,
            "expiry_time": null,
            "progress": null,
            "department_id": null,
            "job_type": null,
            "recruitment_type": {
              "id": "101",
              "name": "正式",
              "en_name": "Regular",
              "i18n_name": "正式",
              "depth": 2,
              "parent": {
                "id": "1",
                "name": "社招",
                "en_name": "Experienced",
                "i18n_name": "社招",
                "depth": 1,
                "parent": null,
                "children": null,
                "active_status": 1,
                "selectability": 1
              },
              "children": null,
              "active_status": 1,
              "selectability": 1
            },
            "job_process_time": null,
            "job_in_charge_user_id": null,
            "biz_create_time": null,
            "HighlightList": null,
            "JobChannelPublishList": null,
            "required_degree": null,
            "never_expiry": null,
            "job_hot_flag": null,
            "subject": null,
            "sequence": null,
            "min_level": null,
            "max_level": null,
            "job_post_object_value_map": {},
            "code": null,
            "job_active_status": null,
            "job_process_type": null,
            "biz_modify_time": null,
            "job_function": null,
            "job_process": null,
            "job_process_id": null,
            "job_category": null,
            "address_list": null,
            "city_list": null,
            "correlation_job_list": null,
            "tag_list": null,
            "department": null
          }
        },

        {
          "id": "7225148933311318333",
          "title": "销售运营管理负责人",
          "sub_title": "",
          "description": "1、根据公司年度经营战略，搭建销售管理体系，制定标准化的工作流程；\n2、梳理并规划销售管理相关流程，赋能销售体系运转顺畅，支持业务快速增长同时保障业务环节合规，风险可控；\n3、带领团队完成经营数预测，月度季度经营数据分析；\n4、结合业务模式制定业务管理的制度体系、业务流程、以及激励考核机制，并确保落地实施，通过对目标的层层细化，调整策略，提升业务目标达成率。",
          "requirement": "1、本科及以上学历，8年以上销售运营或销售管理相关经验相关工作经验，有消费电子硬件行业背景优先；\n2、具备优秀的数据分析能力；能够独立完成数据获取、数据处理、数据分析并产出分析报告；\n3、有较强的推动力强、能落地，具备跨部门、跨组织沟通协调经验，能够应对复杂的项目环境；\n4、具备持续学习的能力，责任心强，有良好的团队合作精神；\n5、英语口语优秀者优先。",
          "job_category": {
            "id": "6709824273038444807",
            "name": "销售管理",
            "en_name": "Sales Manager",
            "i18n_name": "销售管理",
            "depth": 2,
            "parent": {
              "id": "6709824272505768200",
              "name": "销售",
              "en_name": "Sales",
              "i18n_name": "销售",
              "depth": 1,
              "parent": null,
              "children": null
            },
            "children": null
          },
          "city_info": {
            "code": "CT_11",
            "name": "北京",
            "en_name": "Beijing",
            "location_type": null,
            "i18n_name": "北京",
            "py_name": null,
            "mdm_code": null
          },
          "recruit_type": {
            "id": "101",
            "name": "正式",
            "en_name": "Regular",
            "i18n_name": "正式",
            "depth": 2,
            "parent": {
              "id": "1",
              "name": "社招",
              "en_name": "Experienced",
              "i18n_name": "社招",
              "depth": 1,
              "parent": null,
              "children": null,
              "active_status": 1,
              "selectability": 1
            },
            "children": null,
            "active_status": 1,
            "selectability": 1
          },
          "publish_time": 1682236538000,
          "job_hot_flag": 2,
          "job_subject": null,
          "code": "A112715",
          "department_id": null,
          "job_function": null,
          "job_process_id": "6694104661676411150",
          "recommend_id": null,
          "city_list": [{
            "code": "CT_11",
            "name": "北京",
            "en_name": "Beijing",
            "location_type": null,
            "i18n_name": "北京",
            "py_name": null,
            "mdm_code": null
          }],
          "job_post_info": {
            "id": null,
            "job_id": null,
            "title": null,
            "sub_title": null,
            "address_id": null,
            "address": null,
            "city": null,
            "education": null,
            "experience": null,
            "description": null,
            "requirement": null,
            "min_salary": null,
            "max_salary": null,
            "currency": null,
            "head_count": null,
            "crator_id": null,
            "expiry_time": null,
            "progress": null,
            "department_id": null,
            "job_type": null,
            "recruitment_type": {
              "id": "101",
              "name": "正式",
              "en_name": "Regular",
              "i18n_name": "正式",
              "depth": 2,
              "parent": {
                "id": "1",
                "name": "社招",
                "en_name": "Experienced",
                "i18n_name": "社招",
                "depth": 1,
                "parent": null,
                "children": null,
                "active_status": 1,
                "selectability": 1
              },
              "children": null,
              "active_status": 1,
              "selectability": 1
            },
            "job_process_time": null,
            "job_in_charge_user_id": null,
            "biz_create_time": null,
            "HighlightList": null,
            "JobChannelPublishList": null,
            "required_degree": null,
            "never_expiry": null,
            "job_hot_flag": null,
            "subject": null,
            "sequence": null,
            "min_level": null,
            "max_level": null,
            "job_post_object_value_map": {},
            "code": null,
            "job_active_status": null,
            "job_process_type": null,
            "biz_modify_time": null,
            "job_function": null,
            "job_process": null,
            "job_process_id": null,
            "job_category": null,
            "address_list": null,
            "city_list": null,
            "correlation_job_list": null,
            "tag_list": null,
            "department": null
          }
        },
        {
          "id": "7226993338502482213",
          "title": "泛垂类内容质量运营",
          "sub_title": "",
          "description": "1、对「今日头条」APP泛垂类（主要包含生活、美食、家居、时尚、教育、汽车、体育、情感、旅游）等领域内容质量和画风进行把控；\n2、熟悉相关垂类领域的优质内容，有独立证伪能力，可以快速辨别相关领域文章中的虚假内容和低质内容；\n3、协助维护今日头条站内泛垂类内容质量与画风，改善用户体验；\n4、优化相关运营向策略规则，提升运营效率。",
          "requirement": "1、本科及以上学历，3年及以上相关内容从业经验，熟悉相关领域的内容生态；\n2、善于洞察目前内容行业动态，对内容风险、新闻价值、PGC/UGC内容优劣有准确判断力；\n3、有原创内容编辑、行业分析研究等工作经验者优先；\n4、对互联网行业有一定了解，乐于接受新事物，自我驱力强，能适应快节奏工作，可接受排班。\n",
          "job_category": {
            "id": "6704215961064442123",
            "name": "内容运营",
            "en_name": "Content ops",
            "i18n_name": "内容运营",
            "depth": 2,
            "parent": {
              "id": "6704215882479962371",
              "name": "运营",
              "en_name": "Operations",
              "i18n_name": "运营",
              "depth": 1,
              "parent": null,
              "children": null
            },
            "children": null
          },
          "city_info": {
            "code": "CT_11",
            "name": "北京",
            "en_name": "Beijing",
            "location_type": null,
            "i18n_name": "北京",
            "py_name": null,
            "mdm_code": null
          },
          "recruit_type": {
            "id": "101",
            "name": "正式",
            "en_name": "Regular",
            "i18n_name": "正式",
            "depth": 2,
            "parent": {
              "id": "1",
              "name": "社招",
              "en_name": "Experienced",
              "i18n_name": "社招",
              "depth": 1,
              "parent": null,
              "children": null,
              "active_status": 1,
              "selectability": 1
            },
            "children": null,
            "active_status": 1,
            "selectability": 1
          },
          "publish_time": 1682665614000,
          "job_hot_flag": 2,
          "job_subject": null,
          "code": "A153582",
          "department_id": null,
          "job_function": null,
          "job_process_id": "6694104661676411150",
          "recommend_id": null,
          "city_list": [{
            "code": "CT_11",
            "name": "北京",
            "en_name": "Beijing",
            "location_type": null,
            "i18n_name": "北京",
            "py_name": null,
            "mdm_code": null
          }],
          "job_post_info": {
            "id": null,
            "job_id": null,
            "title": null,
            "sub_title": null,
            "address_id": null,
            "address": null,
            "city": null,
            "education": null,
            "experience": null,
            "description": null,
            "requirement": null,
            "min_salary": null,
            "max_salary": null,
            "currency": null,
            "head_count": null,
            "crator_id": null,
            "expiry_time": null,
            "progress": null,
            "department_id": null,
            "job_type": null,
            "recruitment_type": {
              "id": "101",
              "name": "正式",
              "en_name": "Regular",
              "i18n_name": "正式",
              "depth": 2,
              "parent": {
                "id": "1",
                "name": "社招",
                "en_name": "Experienced",
                "i18n_name": "社招",
                "depth": 1,
                "parent": null,
                "children": null,
                "active_status": 1,
                "selectability": 1
              },
              "children": null,
              "active_status": 1,
              "selectability": 1
            },
            "job_process_time": null,
            "job_in_charge_user_id": null,
            "biz_create_time": null,
            "HighlightList": null,
            "JobChannelPublishList": null,
            "required_degree": null,
            "never_expiry": null,
            "job_hot_flag": null,
            "subject": null,
            "sequence": null,
            "min_level": null,
            "max_level": null,
            "job_post_object_value_map": {},
            "code": null,
            "job_active_status": null,
            "job_process_type": null,
            "biz_modify_time": null,
            "job_function": null,
            "job_process": null,
            "job_process_id": null,
            "job_category": null,
            "address_list": null,
            "city_list": null,
            "correlation_job_list": null,
            "tag_list": null,
            "department": null
          }
        },
        {
          "id": "7224394926765721913",
          "title": "EMU/FPGA工程师",
          "sub_title": "",
          "description": "1、Emulation/FPGA平台搭建和维护；\n2、支持芯片项目的Emulation/FPGA联合调试工作。",
          "requirement": "1、微电子、计算机专业硕士研究生及以上学历，3年以上Emulation/FPGA相关经验；\n2、精通Palladium/Protium/Zebu/Veloce/Haps/S2C等至少一种平台；\n3、掌握至少一种高速接口在EMU/FPGA上的调试经验：DDR/PCLe;\n4、熟悉主流处理器体系架构和芯片互联技术；\n5、熟悉掌握C、汇编语言和底层软件代码开发调试；\n6、熟练使用python/shell/tcl/perl等脚本语言；\n7、有完整芯片TO经历及有验证相关工作经历为加分项。",
          "job_category": {
            "id": "6704215862603155720",
            "name": "研发",
            "en_name": "R&D",
            "i18n_name": "研发",
            "depth": 1,
            "parent": null,
            "children": null
          },
          "city_info": {
            "code": "CT_125",
            "name": "上海",
            "en_name": "Shanghai",
            "location_type": null,
            "i18n_name": "上海",
            "py_name": null,
            "mdm_code": null
          },
          "recruit_type": {
            "id": "101",
            "name": "正式",
            "en_name": "Regular",
            "i18n_name": "正式",
            "depth": 2,
            "parent": {
              "id": "1",
              "name": "社招",
              "en_name": "Experienced",
              "i18n_name": "社招",
              "depth": 1,
              "parent": null,
              "children": null,
              "active_status": 1,
              "selectability": 1
            },
            "children": null,
            "active_status": 1,
            "selectability": 1
          },
          "publish_time": 1682060594000,
          "job_hot_flag": 2,
          "job_subject": null,
          "code": "A200445",
          "department_id": null,
          "job_function": null,
          "job_process_id": "6694104661676411150",
          "recommend_id": null,
          "city_list": [{
            "code": "CT_125",
            "name": "上海",
            "en_name": "Shanghai",
            "location_type": null,
            "i18n_name": "上海",
            "py_name": null,
            "mdm_code": null
          }],
          "job_post_info": {
            "id": null,
            "job_id": null,
            "title": null,
            "sub_title": null,
            "address_id": null,
            "address": null,
            "city": null,
            "education": null,
            "experience": null,
            "description": null,
            "requirement": null,
            "min_salary": null,
            "max_salary": null,
            "currency": null,
            "head_count": null,
            "crator_id": null,
            "expiry_time": null,
            "progress": null,
            "department_id": null,
            "job_type": null,
            "recruitment_type": {
              "id": "101",
              "name": "正式",
              "en_name": "Regular",
              "i18n_name": "正式",
              "depth": 2,
              "parent": {
                "id": "1",
                "name": "社招",
                "en_name": "Experienced",
                "i18n_name": "社招",
                "depth": 1,
                "parent": null,
                "children": null,
                "active_status": 1,
                "selectability": 1
              },
              "children": null,
              "active_status": 1,
              "selectability": 1
            },
            "job_process_time": null,
            "job_in_charge_user_id": null,
            "biz_create_time": null,
            "HighlightList": null,
            "JobChannelPublishList": null,
            "required_degree": null,
            "never_expiry": null,
            "job_hot_flag": null,
            "subject": null,
            "sequence": null,
            "min_level": null,
            "max_level": null,
            "job_post_object_value_map": {},
            "code": null,
            "job_active_status": null,
            "job_process_type": null,
            "biz_modify_time": null,
            "job_function": null,
            "job_process": null,
            "job_process_id": null,
            "job_category": null,
            "address_list": null,
            "city_list": null,
            "correlation_job_list": null,
            "tag_list": null,
            "department": null
          }
        },
        {
          "id": "7225121652648167738",
          "title": "抖音电商-战略发展专家",
          "sub_title": "",
          "description": "1、通过竞品跟踪和内外部对标，为内部业务痛点提供外部经验参考，并主动探索发掘业务机会点，并输出短中长期可落地的解决方案、推进各方落地；\n2、深度参与业务不同阶段的核心项目，通过定性调研或定量分析，帮忙厘清业务方向；并横向联动电商各团队，推动部门间重点项目的沟通协作，保障关键动作落地；\n3、协助业务制定年度/季度业务目标和规划，并对业务核心指标进行定期复盘和分析，为业务及管理层提供决策支持。",
          "requirement": "1、本科及以上学历，5年以上相关工作经验，计算机、统计学、经济学、金融、营销学专业优先；\n2、有咨询行业或大型互联网公司产品/分析/运营经验优先，具备良好的hardskills(包括但不限于问题拆解，数据分析， PPT/doc呈现等)；\n3、有较强的好奇心、自驱力及结构化思维；对电商或内容行业有兴趣，对参与业务、快速成长有激情，愿意承担工作的压力与使命；\n4、有较强的执行力、项目管理、跨团队协调能力，能独立推动项目落地并达成预期结果。",
          "job_category": {
            "id": "6704215955154667787",
            "name": "用户运营",
            "en_name": "User ops",
            "i18n_name": "用户运营",
            "depth": 2,
            "parent": {
              "id": "6704215882479962371",
              "name": "运营",
              "en_name": "Operations",
              "i18n_name": "运营",
              "depth": 1,
              "parent": null,
              "children": null
            },
            "children": null
          },
          "city_info": {
            "code": "CT_125",
            "name": "上海",
            "en_name": "Shanghai",
            "location_type": null,
            "i18n_name": "上海",
            "py_name": null,
            "mdm_code": null
          },
          "recruit_type": {
            "id": "101",
            "name": "正式",
            "en_name": "Regular",
            "i18n_name": "正式",
            "depth": 2,
            "parent": {
              "id": "1",
              "name": "社招",
              "en_name": "Experienced",
              "i18n_name": "社招",
              "depth": 1,
              "parent": null,
              "children": null,
              "active_status": 1,
              "selectability": 1
            },
            "children": null,
            "active_status": 1,
            "selectability": 1
          },
          "publish_time": 1682230070000,
          "job_hot_flag": 2,
          "job_subject": null,
          "code": "A101124",
          "department_id": null,
          "job_function": null,
          "job_process_id": "6694104661676411150",
          "recommend_id": null,
          "city_list": [{
            "code": "CT_125",
            "name": "上海",
            "en_name": "Shanghai",
            "location_type": null,
            "i18n_name": "上海",
            "py_name": null,
            "mdm_code": null
          }],
          "job_post_info": {
            "id": null,
            "job_id": null,
            "title": null,
            "sub_title": null,
            "address_id": null,
            "address": null,
            "city": null,
            "education": null,
            "experience": null,
            "description": null,
            "requirement": null,
            "min_salary": null,
            "max_salary": null,
            "currency": null,
            "head_count": null,
            "crator_id": null,
            "expiry_time": null,
            "progress": null,
            "department_id": null,
            "job_type": null,
            "recruitment_type": {
              "id": "101",
              "name": "正式",
              "en_name": "Regular",
              "i18n_name": "正式",
              "depth": 2,
              "parent": {
                "id": "1",
                "name": "社招",
                "en_name": "Experienced",
                "i18n_name": "社招",
                "depth": 1,
                "parent": null,
                "children": null,
                "active_status": 1,
                "selectability": 1
              },
              "children": null,
              "active_status": 1,
              "selectability": 1
            },
            "job_process_time": null,
            "job_in_charge_user_id": null,
            "biz_create_time": null,
            "HighlightList": null,
            "JobChannelPublishList": null,
            "required_degree": null,
            "never_expiry": null,
            "job_hot_flag": null,
            "subject": null,
            "sequence": null,
            "min_level": null,
            "max_level": null,
            "job_post_object_value_map": {},
            "code": null,
            "job_active_status": null,
            "job_process_type": null,
            "biz_modify_time": null,
            "job_function": null,
            "job_process": null,
            "job_process_id": null,
            "job_category": null,
            "address_list": null,
            "city_list": null,
            "correlation_job_list": null,
            "tag_list": null,
            "department": null
          }
        },
        {
          "id": "7225150434724677945",
          "title": "抖音增长策略产品-裂变方向",
          "sub_title": "",
          "description": "用户增长（User Growth）团队负责字节跳动旗下产品的增长工作。我们帮助产品量身定做增长方案，并利用各种营销、产品、数据分析手段达成业务增长目标。UG 团队维护和优化一系列类似付费广告、自然新增等成熟的产品增长方案，并熟练将其应用到各种不同的业务中，推动业务增长；同时当发现新的增长机会时，我们也及时构建新的解决方案，帮助业务实现突破。加入 UG 团队，可以负责亿级用户产品的增长工作，掌握业界先进、第一手的增长实践。\n\n1、负责抖音/抖音极速版的增长裂变/营销活动，统筹裂变的策划、开发、上线迭代和复盘；\n2、结合用户完整生命周期建立长效拉新系统，通过产品化赋能用户自传播，实现规模化增长；\n3、对数据敏感，搭建为获取新用户or 老用户召回等业务指标的线上玩法，例如拼团，助力等激励活动；\n4、跨部门推动上下游业务各个部门，例如策略，数据，开发，风控等各个职能的同事一起协作，作为owner，保证整体项目效果。",
          "requirement": "1、本科及以上学历，有用户增长、游戏化、自传播活动产品经验的优先；\n2、对增长裂变有自己的思考，具备将创意和目标效果结合的能力，持续寻找新的增长点；\n3、强目标导向，主观能动性强，逻辑/数据sense好，能够高质量完成目标拆解、优先级判断以及项目推进；\n4、有较强的综合决策能力，能在外部环境快速变化时找到正确的角度&方向，做出正确的决策。",
          "job_category": {
            "id": "6704215864629004552",
            "name": "产品",
            "en_name": "Product",
            "i18n_name": "产品",
            "depth": 1,
            "parent": null,
            "children": null
          },
          "city_info": {
            "code": "CT_11",
            "name": "北京",
            "en_name": "Beijing",
            "location_type": null,
            "i18n_name": "北京",
            "py_name": null,
            "mdm_code": null
          },
          "recruit_type": {
            "id": "101",
            "name": "正式",
            "en_name": "Regular",
            "i18n_name": "正式",
            "depth": 2,
            "parent": {
              "id": "1",
              "name": "社招",
              "en_name": "Experienced",
              "i18n_name": "社招",
              "depth": 1,
              "parent": null,
              "children": null,
              "active_status": 1,
              "selectability": 1
            },
            "children": null,
            "active_status": 1,
            "selectability": 1
          },
          "publish_time": 1682236447000,
          "job_hot_flag": 2,
          "job_subject": null,
          "code": "A167127",
          "department_id": null,
          "job_function": null,
          "job_process_id": "6694104661676411150",
          "recommend_id": null,
          "city_list": [{
            "code": "CT_11",
            "name": "北京",
            "en_name": "Beijing",
            "location_type": null,
            "i18n_name": "北京",
            "py_name": null,
            "mdm_code": null
          }],
          "job_post_info": {
            "id": null,
            "job_id": null,
            "title": null,
            "sub_title": null,
            "address_id": null,
            "address": null,
            "city": null,
            "education": null,
            "experience": null,
            "description": null,
            "requirement": null,
            "min_salary": null,
            "max_salary": null,
            "currency": null,
            "head_count": null,
            "crator_id": null,
            "expiry_time": null,
            "progress": null,
            "department_id": null,
            "job_type": null,
            "recruitment_type": {
              "id": "101",
              "name": "正式",
              "en_name": "Regular",
              "i18n_name": "正式",
              "depth": 2,
              "parent": {
                "id": "1",
                "name": "社招",
                "en_name": "Experienced",
                "i18n_name": "社招",
                "depth": 1,
                "parent": null,
                "children": null,
                "active_status": 1,
                "selectability": 1
              },
              "children": null,
              "active_status": 1,
              "selectability": 1
            },
            "job_process_time": null,
            "job_in_charge_user_id": null,
            "biz_create_time": null,
            "HighlightList": null,
            "JobChannelPublishList": null,
            "required_degree": null,
            "never_expiry": null,
            "job_hot_flag": null,
            "subject": null,
            "sequence": null,
            "min_level": null,
            "max_level": null,
            "job_post_object_value_map": {},
            "code": null,
            "job_active_status": null,
            "job_process_type": null,
            "biz_modify_time": null,
            "job_function": null,
            "job_process": null,
            "job_process_id": null,
            "job_category": null,
            "address_list": null,
            "city_list": null,
            "correlation_job_list": null,
            "tag_list": null,
            "department": null
          }
        },
        {
          "id": "7225905859737602362",
          "title": "数据科学家",
          "sub_title": "",
          "description": "1、业务数据监控及分析：通过数据监控，主导专项分析，发现审核业务问题并提出解决建议或方案，进行团队协调沟通及推动业务执行落地；\n2、支持业务决策及改进：深入理解审核业务，从多维度拆解现有平台产品业务，围绕数据分析，发现审核业务中的问题及痛点，发现业务价值洼地，通过搭建完善的数据服务，驱动业务快速迭代发展；\n3、平台用户行为分析：通过规范化的用户埋点事件，收集并处理用户行为数据，对用户行为挖掘及活跃用户分析，洞察平台产品的问题并提出改进意见；\n4、负责对抖音业务安全产品模块建立AB测试试验体系，完成方案设计并推动落地，开展上线前后的效果评估，支持数据驱动的平台建设，提升业务数据化能力。",
          "requirement": "1、3年以上分析相关工作经验，硕士或以上优先，熟练掌握Hive，SQL，Excel，PPT，Python或R，Tableau等工具，熟悉常用的统计分析模型；\n2、对数字敏感，具备良好的逻辑分析、系统性思维、结构化拆解能力；有清晰的分析方法论沉淀，具备准确定位分析解决问题能力；\n3、熟练掌握数据挖掘技能，如数据预处理、特征工程、监督学习和无监督学习算法的应用和调优，熟练使用聚类、回归、决策树、神经网络等机器学习模型，能够自主处理并挖掘数据，发现规律及价值；\n4、有产品设计经验优先，熟悉常用的产品策略，能够将数据分析解决方案转化为实际应用，并确保应用的可持续性和可扩展性；\n5、掌握AB试验的技巧，有较丰富的AB实验经验，清楚指标管理，假设检验方法，能够独立设计AB实验评估体系和方案等；\n6、沟通协调能力强，工作严谨负责，能够独立思考；具备团队合作精神，能够与团队成员合作完成项目。",
          "job_category": {
            "id": "6704216224387041544",
            "name": "数据分析",
            "en_name": "Data analysis",
            "i18n_name": "数据分析",
            "depth": 2,
            "parent": {
              "id": "6704215864629004552",
              "name": "产品",
              "en_name": "Product",
              "i18n_name": "产品",
              "depth": 1,
              "parent": null,
              "children": null
            },
            "children": null
          },
          "city_info": {
            "code": "CT_11",
            "name": "北京",
            "en_name": "Beijing",
            "location_type": null,
            "i18n_name": "北京",
            "py_name": null,
            "mdm_code": null
          },
          "recruit_type": {
            "id": "101",
            "name": "正式",
            "en_name": "Regular",
            "i18n_name": "正式",
            "depth": 2,
            "parent": {
              "id": "1",
              "name": "社招",
              "en_name": "Experienced",
              "i18n_name": "社招",
              "depth": 1,
              "parent": null,
              "children": null,
              "active_status": 1,
              "selectability": 1
            },
            "children": null,
            "active_status": 1,
            "selectability": 1
          },
          "publish_time": 1682412742000,
          "job_hot_flag": 2,
          "job_subject": null,
          "code": "A49086",
          "department_id": null,
          "job_function": null,
          "job_process_id": "6694104661676411150",
          "recommend_id": null,
          "city_list": [{
            "code": "CT_11",
            "name": "北京",
            "en_name": "Beijing",
            "location_type": null,
            "i18n_name": "北京",
            "py_name": null,
            "mdm_code": null
          }],
          "job_post_info": {
            "id": null,
            "job_id": null,
            "title": null,
            "sub_title": null,
            "address_id": null,
            "address": null,
            "city": null,
            "education": null,
            "experience": null,
            "description": null,
            "requirement": null,
            "min_salary": null,
            "max_salary": null,
            "currency": null,
            "head_count": null,
            "crator_id": null,
            "expiry_time": null,
            "progress": null,
            "department_id": null,
            "job_type": null,
            "recruitment_type": {
              "id": "101",
              "name": "正式",
              "en_name": "Regular",
              "i18n_name": "正式",
              "depth": 2,
              "parent": {
                "id": "1",
                "name": "社招",
                "en_name": "Experienced",
                "i18n_name": "社招",
                "depth": 1,
                "parent": null,
                "children": null,
                "active_status": 1,
                "selectability": 1
              },
              "children": null,
              "active_status": 1,
              "selectability": 1
            },
            "job_process_time": null,
            "job_in_charge_user_id": null,
            "biz_create_time": null,
            "HighlightList": null,
            "JobChannelPublishList": null,
            "required_degree": null,
            "never_expiry": null,
            "job_hot_flag": null,
            "subject": null,
            "sequence": null,
            "min_level": null,
            "max_level": null,
            "job_post_object_value_map": {},
            "code": null,
            "job_active_status": null,
            "job_process_type": null,
            "biz_modify_time": null,
            "job_function": null,
            "job_process": null,
            "job_process_id": null,
            "job_category": null,
            "address_list": null,
            "city_list": null,
            "correlation_job_list": null,
            "tag_list": null,
            "department": null
          }
        },
        {
          "id": "7223639035725596985",
          "title": "商业化内容运营-飞书",
          "sub_title": "",
          "description": "1、洞察行业客户痛点，结合产品提出解决方案，并用视频、图文等形式进行包装，助力客户转化；\n2、提炼面向行业的产品价值，制作相关内容物料，包括产品手册、演示、销售工具等；\n3、与产品相关团队紧密合作，用工具推动内容分发，追踪各类内容素材的效果，迭代优化。",
          "requirement": "1、本科及以上学历，拥有To B内容运营（尤其是视频）相关经验，有销售经验优先，熟练使用飞书优先；\n2、有业务视角，能敏锐洞察客户共性需求，具备出色的内容生产能力和沟通转化意识，有独立的项目管理及执行完成的成功案例经验；\n3、对企业服务、消费零售、文娱传媒、制造等任一行业有比较深的认知和经验积累；\n4、有产品化思维，学习能力强，适应挑战变化的环境，有主人翁意识，能有效推动跨部门项目的进展。",
          "job_category": {
            "id": "6704215882438019342",
            "name": "商业运营",
            "en_name": "Commerce ops",
            "i18n_name": "商业运营",
            "depth": 2,
            "parent": {
              "id": "6704215882479962371",
              "name": "运营",
              "en_name": "Operations",
              "i18n_name": "运营",
              "depth": 1,
              "parent": null,
              "children": null
            },
            "children": null
          },
          "city_info": {
            "code": "CT_125",
            "name": "上海",
            "en_name": "Shanghai",
            "location_type": null,
            "i18n_name": "上海",
            "py_name": null,
            "mdm_code": null
          },
          "recruit_type": {
            "id": "101",
            "name": "正式",
            "en_name": "Regular",
            "i18n_name": "正式",
            "depth": 2,
            "parent": {
              "id": "1",
              "name": "社招",
              "en_name": "Experienced",
              "i18n_name": "社招",
              "depth": 1,
              "parent": null,
              "children": null,
              "active_status": 1,
              "selectability": 1
            },
            "children": null,
            "active_status": 1,
            "selectability": 1
          },
          "publish_time": 1681884656000,
          "job_hot_flag": 2,
          "job_subject": null,
          "code": "A70989",
          "department_id": null,
          "job_function": null,
          "job_process_id": "6694104661676411150",
          "recommend_id": null,
          "city_list": [{
            "code": "CT_125",
            "name": "上海",
            "en_name": "Shanghai",
            "location_type": null,
            "i18n_name": "上海",
            "py_name": null,
            "mdm_code": null
          }],
          "job_post_info": {
            "id": null,
            "job_id": null,
            "title": null,
            "sub_title": null,
            "address_id": null,
            "address": null,
            "city": null,
            "education": null,
            "experience": null,
            "description": null,
            "requirement": null,
            "min_salary": null,
            "max_salary": null,
            "currency": null,
            "head_count": null,
            "crator_id": null,
            "expiry_time": null,
            "progress": null,
            "department_id": null,
            "job_type": null,
            "recruitment_type": {
              "id": "101",
              "name": "正式",
              "en_name": "Regular",
              "i18n_name": "正式",
              "depth": 2,
              "parent": {
                "id": "1",
                "name": "社招",
                "en_name": "Experienced",
                "i18n_name": "社招",
                "depth": 1,
                "parent": null,
                "children": null,
                "active_status": 1,
                "selectability": 1
              },
              "children": null,
              "active_status": 1,
              "selectability": 1
            },
            "job_process_time": null,
            "job_in_charge_user_id": null,
            "biz_create_time": null,
            "HighlightList": null,
            "JobChannelPublishList": null,
            "required_degree": null,
            "never_expiry": null,
            "job_hot_flag": null,
            "subject": null,
            "sequence": null,
            "min_level": null,
            "max_level": null,
            "job_post_object_value_map": {},
            "code": null,
            "job_active_status": null,
            "job_process_type": null,
            "biz_modify_time": null,
            "job_function": null,
            "job_process": null,
            "job_process_id": null,
            "job_category": null,
            "address_list": null,
            "city_list": null,
            "correlation_job_list": null,
            "tag_list": null,
            "department": null
          }
        },
        {
          "id": "7224465349646797117",
          "title": "AI-Lab高性能计算研发工程师—语音方向",
          "sub_title": "",
          "description": "1、负责语音场景下高性能训推计算平台开发，支撑各业务场景下的训练、推理性能优化需求并推动业务落地；\n2、负责训推高性能方案建设，跟进前沿技术，补足关键能力，构建领先的高性能训推平台。",
          "requirement": "1、精通C++，有良好的数据结构和算法基础，有3年以上高性能优化相关工作经验；\n2、熟悉主流的并行编程以及性能优化技术，熟悉CUDA和tensorcore编程，有相关高性能优化经验优先；\n3、熟悉TVM/MLIR/XLA等自动化编译技术的优先；\n4、熟悉深度学习常用算法和模型结构，有CV/NLP/语言场景模型优化经验优先；\n5、了解FasterTransformer模型推理优化框架优化；\n6、有量化/稀疏化高性能优化经验优先；\n7、了解Pytorch/Tensorflow/Paddle深度学习框架优先；\n8、有团队管理经验优先；\n9、有跨团队合作经验优先。",
          "job_category": {
            "id": "6704215862603155720",
            "name": "研发",
            "en_name": "R&D",
            "i18n_name": "研发",
            "depth": 1,
            "parent": null,
            "children": null
          },
          "city_info": {
            "code": "CT_125",
            "name": "上海",
            "en_name": "Shanghai",
            "location_type": null,
            "i18n_name": "上海",
            "py_name": null,
            "mdm_code": null
          },
          "recruit_type": {
            "id": "101",
            "name": "正式",
            "en_name": "Regular",
            "i18n_name": "正式",
            "depth": 2,
            "parent": {
              "id": "1",
              "name": "社招",
              "en_name": "Experienced",
              "i18n_name": "社招",
              "depth": 1,
              "parent": null,
              "children": null,
              "active_status": 1,
              "selectability": 1
            },
            "children": null,
            "active_status": 1,
            "selectability": 1
          },
          "publish_time": 1682077641000,
          "job_hot_flag": 2,
          "job_subject": null,
          "code": "A14035",
          "department_id": null,
          "job_function": null,
          "job_process_id": "6694104661676411150",
          "recommend_id": null,
          "city_list": [{
            "code": "CT_125",
            "name": "上海",
            "en_name": "Shanghai",
            "location_type": null,
            "i18n_name": "上海",
            "py_name": null,
            "mdm_code": null
          }],
          "job_post_info": {
            "id": null,
            "job_id": null,
            "title": null,
            "sub_title": null,
            "address_id": null,
            "address": null,
            "city": null,
            "education": null,
            "experience": null,
            "description": null,
            "requirement": null,
            "min_salary": null,
            "max_salary": null,
            "currency": null,
            "head_count": null,
            "crator_id": null,
            "expiry_time": null,
            "progress": null,
            "department_id": null,
            "job_type": null,
            "recruitment_type": {
              "id": "101",
              "name": "正式",
              "en_name": "Regular",
              "i18n_name": "正式",
              "depth": 2,
              "parent": {
                "id": "1",
                "name": "社招",
                "en_name": "Experienced",
                "i18n_name": "社招",
                "depth": 1,
                "parent": null,
                "children": null,
                "active_status": 1,
                "selectability": 1
              },
              "children": null,
              "active_status": 1,
              "selectability": 1
            },
            "job_process_time": null,
            "job_in_charge_user_id": null,
            "biz_create_time": null,
            "HighlightList": null,
            "JobChannelPublishList": null,
            "required_degree": null,
            "never_expiry": null,
            "job_hot_flag": null,
            "subject": null,
            "sequence": null,
            "min_level": null,
            "max_level": null,
            "job_post_object_value_map": {},
            "code": null,
            "job_active_status": null,
            "job_process_type": null,
            "biz_modify_time": null,
            "job_function": null,
            "job_process": null,
            "job_process_id": null,
            "job_category": null,
            "address_list": null,
            "city_list": null,
            "correlation_job_list": null,
            "tag_list": null,
            "department": null
          }
        },
        {
          "id": "7226992796943026487",
          "title": "泛资讯内容质量运营",
          "sub_title": "",
          "description": "1、按照相关标准，对「今日头条」APP军事、文史等内容做出有效评估和处理，维护好前端画风，保证内容安全和质量；\n2、针对热点事件、历史周年纪念等高热话题，结合平台实际需求，拟定和灵活调整相关运营策略与方案；\n3、定期对业务案例、数据做出分析与总结，推动运营策略、业务流程优化迭代。",
          "requirement": "1、本科及以上学历，有门户网站、热点运营策划、军事/文史相关专业领域工作经验；\n2、具有较高新闻敏感度与深厚军事/文史领域专业知识储备，对热点事件有很强的发掘与跟踪意识；\n3、结果导向，较强的自我驱动和责任心，有独立负责项目经验者优先，可接受排班。",
          "job_category": {
            "id": "6704215961064442123",
            "name": "内容运营",
            "en_name": "Content ops",
            "i18n_name": "内容运营",
            "depth": 2,
            "parent": {
              "id": "6704215882479962371",
              "name": "运营",
              "en_name": "Operations",
              "i18n_name": "运营",
              "depth": 1,
              "parent": null,
              "children": null
            },
            "children": null
          },
          "city_info": {
            "code": "CT_11",
            "name": "北京",
            "en_name": "Beijing",
            "location_type": null,
            "i18n_name": "北京",
            "py_name": null,
            "mdm_code": null
          },
          "recruit_type": {
            "id": "101",
            "name": "正式",
            "en_name": "Regular",
            "i18n_name": "正式",
            "depth": 2,
            "parent": {
              "id": "1",
              "name": "社招",
              "en_name": "Experienced",
              "i18n_name": "社招",
              "depth": 1,
              "parent": null,
              "children": null,
              "active_status": 1,
              "selectability": 1
            },
            "children": null,
            "active_status": 1,
            "selectability": 1
          },
          "publish_time": 1682665650000,
          "job_hot_flag": 2,
          "job_subject": null,
          "code": "A64679",
          "department_id": null,
          "job_function": null,
          "job_process_id": "6694104661676411150",
          "recommend_id": null,
          "city_list": [{
            "code": "CT_11",
            "name": "北京",
            "en_name": "Beijing",
            "location_type": null,
            "i18n_name": "北京",
            "py_name": null,
            "mdm_code": null
          }],
          "job_post_info": {
            "id": null,
            "job_id": null,
            "title": null,
            "sub_title": null,
            "address_id": null,
            "address": null,
            "city": null,
            "education": null,
            "experience": null,
            "description": null,
            "requirement": null,
            "min_salary": null,
            "max_salary": null,
            "currency": null,
            "head_count": null,
            "crator_id": null,
            "expiry_time": null,
            "progress": null,
            "department_id": null,
            "job_type": null,
            "recruitment_type": {
              "id": "101",
              "name": "正式",
              "en_name": "Regular",
              "i18n_name": "正式",
              "depth": 2,
              "parent": {
                "id": "1",
                "name": "社招",
                "en_name": "Experienced",
                "i18n_name": "社招",
                "depth": 1,
                "parent": null,
                "children": null,
                "active_status": 1,
                "selectability": 1
              },
              "children": null,
              "active_status": 1,
              "selectability": 1
            },
            "job_process_time": null,
            "job_in_charge_user_id": null,
            "biz_create_time": null,
            "HighlightList": null,
            "JobChannelPublishList": null,
            "required_degree": null,
            "never_expiry": null,
            "job_hot_flag": null,
            "subject": null,
            "sequence": null,
            "min_level": null,
            "max_level": null,
            "job_post_object_value_map": {},
            "code": null,
            "job_active_status": null,
            "job_process_type": null,
            "biz_modify_time": null,
            "job_function": null,
            "job_process": null,
            "job_process_id": null,
            "job_category": null,
            "address_list": null,
            "city_list": null,
            "correlation_job_list": null,
            "tag_list": null,
            "department": null
          }
        }
      ],
      "count": 10000,
    }
    loading.value = false
  }, 1000)
}

// setup生命周期钩子
fetchList()
</script>

<style scoped lang="less">
.banner {
  height: 400px;
  line-height: 400px;
  color: #fff;
  width: 100%;
  min-width: @main-width;
  background-image: url("//sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/joblistbanner2x.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  text-align: center;
  font-size: @font-size-larger;
}

.search-wrapper {
  position: absolute;
  width: 100%;
  padding: 0 200px;
  transform: translateY(-50%);
  z-index: 100;

  &.fixedTop {
    position: fixed;

    box-shadow: 0 5px 4px rgba(0, 0, 0, 0.1);
    top: 0;
    padding: 20px 130px;
    z-index: 1000;
    background-color: #fff;
    transform: translateY(0);
  }
}

.main {
  width: @main-width;
  margin: 0 auto;
  margin-top: 100px;
  padding: 0 100px 0 200px;

  .aside-filter {
    float: left;
    width: 300px;
    padding-right: 20px;

    .header {
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      border-bottom: 1px solid @border-lighter-color;
      padding-bottom: 10px;
      width: 100%;

      .clear {
        &.clearable {
          color: @main-color;
          cursor: pointer;
        }
      }
    }

    .job-filter-block {
      margin-bottom: 40px;
    }
  }

  .content {
    min-height: 500px;
    padding-left: 20px;
    border-left: 1px solid @border-lighter-color;
    margin-left: 300px;

    &-title {
      margin-bottom: 30px;
      margin-left: 20px;
    }

    &-item {
      margin-bottom: 10px;
      padding: 10px 20px;
      cursor: pointer;

      .title {
        margin: 12px 0;
      }

      .subTitle {
        color: @regular-text-color;
      }

      .desc {
        white-space: pre-line;
        font-size: 14px;
        color: @secondary-text-color;

        //.text-overflow-visible-line(2);
        text-overflow: clip;
      }

      &:hover {
        border-radius: 3px;
        background: #fff;
        box-shadow: 0 10px 30px 0 rgba(136, 150, 171, 0.15);
      }
    }

    .pagination-wrapper {
      margin-top: 50px;
      text-align: right;
    }
  }
}
</style>