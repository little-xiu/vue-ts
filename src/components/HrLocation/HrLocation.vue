<template>
  <div class="location">
    // 默认的slot
    <slot>
      <router-link to="/">首页</router-link>
      <template v-for="(route, i) in routeList">
        <router-link :to="route.path"
          :disabled="i===(routeList.length-1)"
          :key="route.name"
          exact
        >
          {{route.meta.breadcrumbName}}
        </router-link>
      </template>
    </slot>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop, Emit } from 'vue-property-decorator';

@Component({
  name: 'HrLocation',
})
export default class HrLocation extends Vue {
  public routeList: object[] = [];
  @Prop({ type: Number, default: 60 }) public offsetTop!: number;
  @Watch('$route')
  public routeChange(to: any, from: any): void {
    this.setRoute(to.matched);
  }
  public created(): void {
    this.setRoute(this.$route.matched);
  }
  // 导入路由链接
  public setRoute(matched: any) {
    this.routeList = matched.filter((item: any) => !!item.meta.breadcrumbName);
  }
}
</script>
<style lang="less">
  .location {
    a {
      &[disabled] {
        color: #333;
      }
      &:not(:last-child):after {
        content: '';
        display: inline-block;
      }
    }
  }
</style>
