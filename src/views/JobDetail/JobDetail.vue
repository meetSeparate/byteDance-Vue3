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
import {reactive, getCurrentInstance, ref, onMounted} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

const {proxy} = getCurrentInstance()

// 加载动画（有问题）
// let loading = proxy.$loading({ position: { top: 60 } })
// setTimeout(() => {
//   loading.close()
// })
const jobDetail = ref({})
const store = useStore()
const route = useRoute()

const id = route.params.id

// 获取岗位详情
const getJobDetail = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  let res = await proxy.$api.getJobDetail(id)
  jobDetail.value = res.data
  loading.close()
}

onMounted(() => {
  getJobDetail()
})

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
