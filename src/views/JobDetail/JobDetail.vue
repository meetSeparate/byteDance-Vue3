<template>
  <div class="job-detail">
    <h1 class="job-detail-title">{{ jobDetail.title }}</h1>
    <div class="job-detail-subTitle" v-if="jobDetail.id">
      <span class="city_info">{{ jobDetail.city_info.name }}</span
      >&nbsp;|
      <span class="job_category">{{ jobDetail.job_category.name }}</span
      >&nbsp;|
      <span class="recruit_type">{{ jobDetail.recruit_type.name }}</span>
    </div>
    <div class="job-detail-description job-detail-block">
      <h2>职位描述</h2>
      <pre class="textContent">{{ jobDetail.description }}</pre>
    </div>
    <div class="job-detail-requirement job-detail-block">
      <h2>职位要求</h2>
      <pre class="textContent">{{ jobDetail.requirement }}</pre>
    </div>
    <div class="job-detail-button job-detail-block">
      <bytedance-button @click="delivery" size="large">投递</bytedance-button>
    </div>
  </div>
</template>
<script setup>
import BytedanceButton from '../../components/Bytedance-Button.vue'
import {reactive, getCurrentInstance} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

const {proxy} = getCurrentInstance()

// 加载动画（有问题）
// let loading = proxy.$loading({ position: { top: 60 } })
// setTimeout(() => {
//   loading.close()
// })
const jobDetail = reactive({
  "id": "7225929779840829752",
  "title": "国际化广告算法工程师-App Ads与游戏",
  "sub_title": "",
  "description": "1、负责广告投放中定向、召回、粗排、精排、出价各个阶段模型和策略的改进，极致优化变现效率和客户体验；\n2、利用业界最先进的手段，持续优化深度转化模型，极致提升LTV、付费率、留存率的预估准确度；\n3、探索并落地联邦学习、多方计算等前沿技术，持续提升隐私保护环境下的广告投放效果；\n4、深入了解行业痛点，利用策略和模型的手段，从广告主诉求视角出发，探索最新的商业变现技术和商业产品设计。",
  "requirement": "1、良好的数据结构、数理统计和概率论等基础；优秀的编码能力，熟练掌握C++/Go更佳；\n2、扎实的机器学习/深度学习理论基础，熟练掌握至少一种主流深度学习编程框架；\n3、较好的产品意识，愿意将产品效果作为工作最重要的驱动因素；\n4、有deep model在广告和推荐业务经验者优先。",
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
  "publish_time": 1682418035000,
  "delivery_info_id": null,
  "channel_online_status": 1,
  "job_hot_flag": 2,
  "job_subject": null,
  "code": "A73289",
  "department_id": null,
  "job_function": null,
  "job_id": "7216268434823891237",
  "city_list": [{
    "code": "CT_11",
    "name": "北京",
    "en_name": "Beijing",
    "location_type": 3,
    "i18n_name": "北京",
    "py_name": "beijing",
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
    "job_post_object_value_map": {"7154429338292128008": "", "7154429338292144392": ""},
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
  },
  "city_info_list_for_delivery": null
})
const store = useStore()
const route = useRoute()

const id = route.params.id
const delivery = () => {
  ElMessage({
    showClose: true,
    message: '该功能还在开发中'
  })
}

</script>
<style lang="less" scoped>
.job-detail {
  width: 800px;

  margin: auto;
  margin-top: 100px;
  line-height: 2em;

  &-subTitle {
    font-size: @font-size-base;
    color: @primary-text-color;
    margin: 20px 0;
  }

  &-description {
    .textContent {
      white-space: pre-line;
    }
  }

  &-block {
    h2 {
      margin-bottom: 20px;
    }

    margin: 40px 0;

    .textContent {
      font-size: @font-size-base;
      color: @primary-text-color;
    }
  }

  &-button {
    width: 200px;
  }
}
</style>
