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
              :props="{ key: 'nid', label: 'name' }"
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
        <h2 class="content-title">开启新的职位 ({{ results.total }})</h2>
        <ul class="content-list">
          <li class="content-item" v-for="item in results.data" :key="item.nid">
            <router-link :to="`/jobs/${item.nid}`" target="_blank">
              <h3 class="title">{{ item.title }}</h3>

              <div class="subTitle">
                <span class="city">{{ item.city_name }}</span>&nbsp;|
                <span class="job_category">{{ item.category_name }}</span>&nbsp;|
                <span class="recruitment_channel">{{ item.recruit_type }}</span>
              </div>
              <p class="desc">{{ item.description }}</p>
            </router-link>
          </li>
        </ul>
        <!--        &lt;!&ndash; 分页器 &ndash;&gt;-->
        <!--        <div v-show="!loading" class="pagination-wrapper">-->
        <!--          <pagination :current-page.sync="currentPage" :total="results.count"></pagination>-->
        <!--        </div>-->
        <el-pagination
            class="pager"
            v-model:current-page="pageOperation.page"
            v-model:page-size="pageOperation.limit"
            :background="false"
            layout="prev, pager, next, jumper"
            :total="results.total || 10"
            @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, getCurrentInstance, onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {getOffsetTop} from "../../helper/utilities.js";
import EventBus from "../../helper/EventBus/index.js";
import InputSearch from '../../components/Input-Search.vue'
import CheckboxTransfer from "../../components/Checkbox-Transfer.vue";
import Loading from "../../components/Loading/index.js";

const route = useRoute()
const {proxy} = getCurrentInstance()
let positionY = 0;
let searchBarClientHeight = 0
const {keyword, job_category_id} = route.query
const searchBarFixedTop = ref(false)
// 工作种类数组
const job_category_id_list = ref(job_category_id ? [Number(job_category_id)] : [])
// 工作地点数组
const location_code_list = ref([])
// 搜索内容
const searchKeyword = ref("")
// 岗位种类列表
const jobCategories = ref([])
// 岗位城市列表
const jobCities = ref([])
// 加载
const loading = ref(false)
const results = ref({})

// 获取岗位种类列表
const getCategory = async () => {
  let res = await proxy.$api.getCategory()

  jobCategories.value = res.data.filter(item => item.name !== '全部')
}

// 获取城市列表
const getCity = async () => {
  let res = await proxy.$api.getCity()
  jobCities.value = res.data
}

const pageOperation = ref({
  limit: 5,
  page: 1
})

// 分类及城市分类以及搜索配置
const config = computed(() => {
  return {
    limit: pageOperation.value.limit,
    page: pageOperation.value.page,
    job_category_id_list: job_category_id_list.value,
    location_code_list: location_code_list.value,
  }
})

const handleCurrentChange = () => {
  console.log('fen ye')
}

// 计算属性
const clearable = computed(() => {
  return (
      job_category_id_list.value.length !== 0 || location_code_list.value.length !== 0
  )
})

const searchBar = ref("")

// 获取岗位信息
const getJobList = async () => {
  loading.value = true
  let res = await proxy.$api.getJobList(config.value)
  results.value = res
  loading.value = false
}

// mounted
onMounted(() => {
  proxy.$nextTick(() => {
    positionY = getOffsetTop(document.body, searchBar.value);

    searchBarClientHeight = searchBar.value.clientHeight;
  })

  const onPageScroll = () => {
    searchBarFixedTop.value =
        window.scrollY > positionY - searchBarClientHeight / 2;
  }

  window.addEventListener("scroll", onPageScroll);

  EventBus.on("hook:destroyed", () => {
    window.removeEventListener("scroll", onPageScroll);
  });

  getCategory()
  getCity()
  getJobList()
  Loading.show()

  Promise.all([getCategory, getCity, getJobList]).then(() => {
    Loading.close()
  })
})

watch(config, (newValue, oldValue) => {
  console.log(config.value)
  searchBarFixedTop.value && window.scrollTo(0, positionY)
  getJobList()
})


const clearFilter = () => {
  if (job_category_id_list.value.length) {
    job_category_id_list.value = []
  }
  if (location_code_list.value.length) {
    location_code_list.value = []
  }
}

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
    position: relative;

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

.pager {
  margin-bottom: 10px;
  float: right;
}
</style>