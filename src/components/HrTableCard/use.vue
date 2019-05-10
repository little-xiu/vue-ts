<template>
  <div>
    // 跟iview一样使用table
    <hr-table-card title="列表" totalTitle
      :data="costList"
      :columns="costColumns"
      :page="{
        total: totalCount,
        showTotal: true,
        pageSize: pageSize,
      }"
      @on-change="onPageChange"
      @on-sort-change="onSortChange"
      default-type="card"
      card-span="6"
    >
      <template v-slot:cardView="{item, index}">
        <div>
          {{item.name}}
        </div>
      </template>
    </hr-table-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop, Emit, Provide, Mixins } from 'vue-property-decorator';
import HrTableCard from './HrTableCard.vue';


@Component({
  components: {
    HrTableCard,
  },
})
export default class use extends Vue {
  costList: object[] = [];
  costColumns: object[] = [
    {
      title: '名称',
      key: 'name',
    },
  ];

  page: number = 1;

  onPageChange(page) {
    this.page = page;
  }
}
</script>
