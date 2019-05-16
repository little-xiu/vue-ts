<template>
  <div>
    <layout-container>
      <hr-location>
        <slot name="hrLocation"></slot>
      </hr-location>
      <div class="hr-detail-container">
        <div v-if="timeLine" class="hr-detail-left" :style="{flexBasis: width}"> 
          <slot name="timeLine">
            <Timeline>
              <template v-for="date in formatDateList">
                <TimelineItem :key="date.effDate" :class="getTimelineCls(date)">
                  <span @click="clickTimeLine(date)">{{date.effDate || date}}</span>
                  <img src="@/assets/logo.png" v-if="date.isNow" alt="" />
                </TimelineItem>
              </template>
            </TimelineItem>
          </slot>
        </div>
        <div class="hr-detail-middle" :style="{width: timeLine ? `calc(100% - ${width})` : '100%'}">
          <slot></slot>
          <div class="hr-detail-icon-bar"
            v-if="(!hideEdit && showIcon('on-click-edit'))
              || (!hideCopy && showIcon('on-click-copy'))"
          >
            <Tooltip content="编辑" placement="right" v-if="!hideEdit && showIcon('on-click-edit')" :delay="500" theme="light">
              <span @click="onClickEdit" class="hr-detail-icon hr-detail-icon-edit"></span>
            </Tooltip>
            <Tooltip content="复制" placement="right" v-if="!hideCopy && showIcon('on-click-copy')" :delay="500" theme="light">
              <span @click="onClickCopy" class="hr-detail-icon hr-detail-icon-edit"></span>
            </Tooltip>
          </div>
          <div class="hr-detail-footer">
            <div v-if="wantList">
              <span>你可能想要</span>
              <router-link v-for="item in wantList" :key="item.name" :to="item.path">{{item.name}}</router-link>
            </div>
          </div>
        </div>
      </div>
    </layout-container>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator';
import LayoutContainer from './LayoutContainer.vue';
import HrLocation from '@/components/HrLocation';
// utils.parserDate
import utils from '@/utils/utils.ts';

interface wantList {
  name: string,
  path: string,
}

interface dateObj {
  effDate: string,
  longUuid?: string,
  nextEffDate?: any,
  structId?: any,
  effStatus?: string,
}

@Component({
  components: {
    LayoutContainer,
    HrLocation,
  },
})
export default class HrContainer extends Vue {
  public timeLineType: 'object' || 'string' = 'string';

  // 时间线
  @Prop({ type: String, default: '180' }) public leftWidth!: string
  @Prop({ type: Boolean, default: false }) timeLine!: boolean // 是否需要显示时间线内容
  @Prop(String) currentDate!: string // 选中的日期

  @Prop(Array) dateList!: any[] // 日期列表

  @Prop(Array) wantList!: wantList[]

  // 按钮组
  @Prop(Boolean) hideEdit!: boolean
  @Prop(Boolean) hideCopy!: boolean

  @Emit('on-change-date')
  onChangeDate(date) {}

  // 按钮组
  // 一组相当于this.$emit('on-click-edit')
  @Emit('on-click-edit')
  onClickEdit() {}

  @Emit('on-click-copy')
  onClickCopy() {}

  get width() {
    let width: string = this.leftWidth;
    if (!this.leftWidth.includes('%')) {
      width += 'px';
    }
    return width;
  }

  get formatDateList() {
    if (this.dateList.length === 0 && this.currentDate) {
      return [this.currentDate];
    }
    let newList: any[] = [];

    if (typeof this.dateList[0] === 'string') {
      newList = [...this.dateList];
      // 按时间从大到小排序
      newList.sort((a, b) => {
        const dateA = utils.parserDate(a).getTime();
        const dateB = utils.parserDate(b).getTime();
        return dateB - dateA;
      });
      return newList;
    }

    for (const item of this.dateList) {
      if (item.effDate && item.nextEffDate) {
        // 计算isNow，是否是当前系统正在使用到版本
        const effDate = utils.parserDate(item.effDate);
        const nowDate = new Date();
        const nextEffDate = utils.parserDate(item.nextEffDate);
        const isNow = item.effStatus === 'A' && effDate <= nowDate && effDate < nextEffDate;
        const _item = {
          ...item,
          effDate: item.effDate.replace(' 00:00:00', ''),
          isNow,
        };
        newList.push(_item);
      }
    }
    newList.sort((a, b) => {
      const dateA = utils.parserDate(a).getTime();
      const dateB = utils.parserDate(b).getTime();
      return dateB - dateA;
    });
    return newList;
  }

  showIcon(event) {
    if (this.$listeners[event]) {
      return true;
    }
    return false;
  }

  getTimeLineCls(date) {
    const effDate = date.effDate || date;

    let cls = 'timeline-history';
    if (this.currentDate === effDate) {
      cls = 'timeline-current';
    } else if (utils.parserDate(effDate).getTime() > utils.parserDate(this.currentDate).getTime()) {
      cls = 'timeline-future';
    }
    return cls;
  }

  clickTimeLine(date) {
    this.onChangeDate(date);
  }

}
</script>