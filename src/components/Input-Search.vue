<template>
  <div class="input-search medium">
    <input
        ref="input"
        type="text"
        placeholder="输入职位进行搜索"
    />
    <span class="input-search-button"><el-icon class="icons"><Search/></el-icon></span>
  </div>
</template>
<script setup>

</script>

<style lang="less" scoped>
.input-search {
  margin-left: auto;
  margin-right: auto;
  height: 56px;
  width: 420px;
  min-width: 400px;
  max-width: @main-width;
  position: relative;
  border-radius: 30px;
  overflow: hidden;
  border: 1px solid @main-color;
  font-size: 16px;

  ::-webkit-input-placeholder {
    color: @secondary-text-color;
  }

  &.small {
    height: 40px;
    font-size: 14px;
  }

  &.large {
    height: 60px;
    font-size: 20px;
  }

  .prefix-icon {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 10px;
    display: flex;
    align-items: center;
  }

  input {
    font-size: inherit;
    height: 100%;
    width: 100%;
    line-height: 100%;
    color: #1f2329;
    border-color: transparent;
    padding: 19px 0 19px 25px;
  }

  &-button {
    background: #3370ff;
    border: none;
    color: white;
    border-radius: 24px;
    font-size: 20px;
    line-height: 46px;
    height: 48px;
    width: 48px;
    min-width: auto;
    position: absolute;
    right: 5px;
    touch-action: manipulation;
    user-select: none;
    cursor: pointer;
    transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    display: inline-block;
    font-weight: normal;
    white-space: nowrap;
    text-align: center;
    top: 4px;

    &:hover {
      // background: rgba(255, 255, 255, 0.5);
      &::before {
        position: absolute;
        top: -1px;
        right: -1px;
        bottom: -1px;
        left: -1px;
        z-index: 1;
        display: none;
        background: #fff;
        border-radius: inherit;
        opacity: 0.35;
        transition: opacity 0.2s;
        content: '';
        pointer-events: none;
      }
    }
  }
}

.el-icon {
  fill: white;
  position: absolute;
  top: 14px;
  left: 15px;
}
</style>
