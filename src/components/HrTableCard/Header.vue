<template>
  <div>
    <slot name="title">
      <p>{{title}}{{totalTitle && total ? `共${total}条` : ''}}</p>
    </slot>
    <span v-show="!disabledChangeView">
      <span :class="iconClass('list')" @click="changeView('list')">table的切换icon</span>
      <span :class="iconClass('card')" @click="changeView('card')">卡片的切换icon</span>
    </span>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop, Emit, Provide, Mixins } from 'vue-property-decorator';

@Component({
  
})
export default class use extends Vue {
  @Prop(String) title!: string
  @Prop(String) showType!: string

  @Prop(Number) total!: number
  @Prop(Boolean) totalTitle!: boolean
  @Prop(Boolean) disabledChangeView: boolean

  @Emit('changeView')
  changeView(showType) {}

  iconClass(showType) {
    const cls = {
      'hr-table-card-header-icon-box': true,
      active: false,
    };
    if (showType === this.showType) {
      cls.active = true;
    }
    return cls;
  }
}
</script>
