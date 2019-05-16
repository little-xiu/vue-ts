<template>
  <hr-container
    timeLine
    :dateList="dateList"
    :current-date="currentDate"
    :hideDelete="false"
    @on-change-date="changeDate"
    @on-click-edit="onEdit"
    @on-click-copy="onCopy"
    :wantList="wantList"
  >
    <div class="project">
      neirong
    </div>
  </hr-container>
</template>
<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator';
import HrContainer from './HrContainer.vue';
import ajax from '@/service/fetchJson';

interface wantList {
  name: string,
  path: string,
}

interface timelineList {
  date: string,
  longUuid: string,
}

@Component({
  components: {
    HrContainer,
  },
})

export default class ProjectDetail extends Vue {
  // hrContainer组件绑定属性
  currentDate: string = '';
  dateList: string[] = [];
  timelineList: timelineList[] = [];

  wantList: wantList[] = [
    { name: '新建', path: '/add' },
  ];

  longUuid: string | string[] = '';
  // 页面展示到详情信息
  formItem: any = {};

  // 时间轴点击事件
  changeDate(date: any) {
    this.currentDate = date;
    let id = '';
    this.timelineList.forEach((item) => {
      if (date === item.date) {
        const { longUuid } = item;
        id = longUuid;
      }
    });
    this.longUuid = id;
    this.initPage(this.longUuid);
  }

  initPage(longUuid) {
    const params = { longUuid };
    ajax.fetchJson('/detail.do', params).then((res) => {
      try {
        // res.date.effDate = res.date.effDate.replace(' 00:00:00', '');
        this.currentDate = res.date.effDate.slice(0, 10);
        this.formItem = res.data;
      } catch (error) {
        console.error('在处理详情数据时出错了');
      }
    })
  }

  onEdit() {

  }

  onCopy() {

  }
}
</script>
