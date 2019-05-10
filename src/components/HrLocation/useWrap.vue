<template>
  <div>
    <hr-location>
      // 自定义slot可以替换掉里面的slot
      <slot name="hrLocation"></slot>
    </hr-location>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop, Emit, Provide, Mixins } from 'vue-property-decorator';
import HrLocation from './HrLocation.vue';

@Component({
  components: {
    HrLocation,
  },
})
export default class useWrap extends Vue {

}
</script>
