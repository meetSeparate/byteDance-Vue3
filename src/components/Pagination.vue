<template>
  <div v-if="visiblePagers.length" class="pagination">
    <ul class="pagination-list">
      <li
          title="上一页"
          @click="$emit('update:currentPage', Math.max(1, currentPage - 1))"
          class="pagination-item"
          :class="{ disabled: currentPage === 1 }"
      >
        <span><</span>
      </li>
      <li
          class="pagination-item"
          :class="{ current: currentPage === item }"
          v-for="(item, index) in visiblePagers"
          @click="change(item)"
          :key="index"
      >
        <span>{{ item }}</span>
      </li>
      <li
          title="下一页"
          @click="
          $emit('update:currentPage', Math.min(totalPage, currentPage + 1))
        "
          class="pagination-item"
          :class="{ disabled: currentPage === totalPage }"
      >
        <span>></span>
      </li>
    </ul>
  </div>
</template>
<script setup>
import {ref, defineProps, toRefs, computed} from "vue";
import EventBus from "../helper/EventBus/index.js";

const props = defineProps({
  total: Number,
  perPage: {
    type: Number,
    default: 10
  },
  currentPage: {
    type: Number,
    default: 1
  },
  pagerCount: {
    type: Number,
    default: 9
  }
})

const {total, perPage, currentPage, pagerCount} = toRefs(props)
// 计算属性
const totalPage = computed(() => {
  return Math.ceil(parseInt(total.value) / perPage.value);
})

const visiblePagers = () => {
  let pages = [];
  const currentPage = Math.max(
      1,
      Math.min(currentPage.value, totalPage.value)
  );

  if (totalPage.value <= pagerCount.value) {
    for (let i = 1; i <= totalPage.value; i++) {
      pages.push(i);
    }
    return pages;
  }

  if (currentPage.value >= totalPage.value - 3) {
    pages.push(1, "...");
    const minPage = Math.min(currentPage.value - 2, totalPage.value - 4);
    for (let i = minPage, len = totalPage.value; i <= len; i++) {
      pages.push(i);
    }
  } else if (currentPage.value <= 4) {
    const maxPage = Math.min(Math.max(currentPage.value + 2, 5), totalPage.value);
    for (let i = 1; i <= maxPage; i++) {
      pages.push(i);
    }
    pages.push("...", totalPage.value);
  } else {
    pages.push(1, "...");
    for (let i = currentPage.value - 2; i <= currentPage.value + 2; i++) {
      pages.push(i);
    }
    pages.push("...", totalPage.value);
  }
  return pages;
}

const change = (num) => {
  if (typeof num !== "number" ) {
    return
  }
  EventBus.emit("current-change", num)
  EventBus.emit("update:currentPage", num)
}
</script>
<style lang="less" scoped>
.pagination-list {
  display: flex;
}

.pagination-item {
  margin-right: 12px;
  cursor: pointer;
  padding: 8px;

  &.disabled {
    cursor: not-allowed;

    color: #ccc !important;
  }

  &:hover {
    color: @main-color;
  }

  &.current {
    color: @main-color;
  }
}
</style>
