<template>
  <div>
    <button @click="add">点击</button>
    <span>{{ testArray }}</span>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";

let i = 0
const array = ref([])

const add = () => {
  array.value = [i]
  i++
}

const testArray = computed(() => {
  console.log(123)
  return array.value
})

</script>

<style scoped>

</style>