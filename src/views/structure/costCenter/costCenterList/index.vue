<template>
  <div class="cost-list">
    costCenterList
    <Tooltip content="删除" placement="left" v-if="showIcon('on-click-delete')" :delay="500">
      <span>icon</span>
    </Tooltip>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import dateUtil from 'iview/src/utils/date';

@Component
export default class costCenterList extends Vue {
  // 使用该组件时，通过是否绑定事件来决定显示隐藏
  public showIcon(event: any) {
    if (this.$listeners[event]) {
      return true;
    }
    return false;
  }
}
</script>
