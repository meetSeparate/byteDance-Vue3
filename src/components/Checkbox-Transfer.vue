<template>
  <div class="checkbox">
    <h2>{{ title }}</h2>

    <ul class="checkbox-list">
      <li class="checkbox-item" v-for="(item, index) in targetData" :key="index">
        <input
            @change="check(item, $event)"
            type="checkbox"
            :id="item[props.key]"
            :checked="checked[index]"
        />
        <label :for="item[props.key]" class="label-text">
          {{
            item[props.label]
          }}
        </label>
      </li>
    </ul>
    <div class="search" v-if="sourceData.length">
      <input
          @blur="onInputBlur"
          @focus="focusing = true"
          class="search-input"
          :class="{ focusing }"
          :placeholder="placeholder"
          type="text"
          v-model="filterKeyword"
      />
      <ul class="search-list" v-show="focusing">
        <li
            v-for="item in filterableData"
            :key="item[props.key]"
            class="search-item"
            @click="addToTarget(item)"
        >
          <span>{{ item[props.label] }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import {toRefs, ref, computed, watch, onMounted} from "vue";
import EventBus from "../helper/EventBus/index.js";

const focusing = ref(false)
const filterKeyword = ref("")
const targets = ref([])

const prop = defineProps({
  title: String,
  targetCount: {
    type: Number,
    default: 5
  },
  data: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: Array,
    default: () => []
  },
  props: {
    type: Object,
    default() {
      return {
        key: "key",
        label: "label"
      };
    }
  },
})

const emit = defineEmits(['update:modelValue'])

const {title, targetCount, data, modelValue, props} = toRefs(prop)

// 计算属性
const checked = computed(() => {
  return targets.value.map(key => modelValue.value.includes(key))
})

const targetData = computed(() => {
  return targets.value.map(key => {
    return data.value.find(item => item[props.value.key] === key)
  }).filter(item => item && item[props.value.key])
})

const sourceData = computed(() => {
  return data.value.filter(
      item => targets.value.indexOf(item[props.value.key]) === -1
  );
})

const filterableData = computed(() => {
  return sourceData.value.filter(item => {
    return item[props.value.label].startsWith(filterKeyword.value);
  });
})

const placeholder = computed(() => {
  return !focusing.value ? "更多" : "搜索"
})


// 监视函数
watch(data, (newValue, oldValue) => {
  targets.value = data.value.slice(0, 6).map(item => item[props.value.key]);
  checked.value.length = targets.value.length;
  modelValue.value.forEach(key => {
    if (!targets.value.includes(key)) {
      targets.value.push(key);
      checked.value.push(true);
    }
  });
})


// 事件
const clearChecked = () => {
  for (let i = 0, l = modelValue.value.length; i < l; i++) {
    modelValue.value.pop();
  }
}

const onInputBlur = (e) => {
  setTimeout(() => {
    focusing.value = false;
  }, 200);
}

const addToTarget = (item) => {
  if (item[props.value.key]) {
    targets.value.push(item[props.value.key]);
    modelValue.value.push(item[props.value.key]);
  }

  filterKeyword.value = "";
}

const check = (item, e) => {
  if (!e.target.checked) {
    const delIndex = modelValue.value.indexOf(item[props.value.key]);
    if (delIndex > -1) {
      modelValue.value.splice(delIndex, 1);
    }
  } else {
    if (!modelValue.value.includes(item[props.value.key])) {
      modelValue.value.push(item[props.value.key]);
    }
  }
  EventBus.emit("check", e.target.checked)
  EventBus.emit("check", item[props.value.key])
  emit('update:modelValue', [...modelValue.value])
}
</script>
<style lang="less" scoped>
.checkbox {
  max-width: 200px;

  h2 {
    font-weight: @font-weight-regular;
    margin-bottom: 12px;
    color: black;
    font-size: @font-size-large;
  }

  &-item {
    margin-bottom: 8px;
    // cursor: pointer;
    input,
    label {
      cursor: pointer;
    }

    input {
      transform: scale(1.4);
    }

    .label-text {
      margin-left: 3px;
      vertical-align: middle;
    }

    &:hover {
      border-color: @main-color;
    }
  }
}

.search {
  position: relative;

  &-placeholder {
    cursor: pointer;
    // border-bottom: 1px solid @border-lighter-color;
  }

  &-input {
    border-width: 0 0 1px 0;
    outline: none;
    width: 100%;
    padding: 5px;
    border-color: @border-lighter-color;

    &.focusing {
      border-color: @main-color;
    }
  }

  &-list {
    padding-top: 10px;
    position: absolute;

    z-index: 10000;
    background-color: #fff;
    max-height: 300px;
    width: 100%;
    overflow: auto;
    line-height: 34px;
    box-shadow: 0 10px 30px 0 rgba(136, 150, 171, 0.15);
  }

  &-item {
    padding: 0 20px;

    &:hover {
      cursor: pointer;
      background: @bg-base-color;
    }
  }
}
</style>
