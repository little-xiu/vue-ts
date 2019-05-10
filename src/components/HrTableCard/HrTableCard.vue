<script lang="ts">
import { Component, Vue, Watch, Prop, Emit, Provide, Mixins } from 'vue-property-decorator';
import CardView from './CardView.vue';
import Header from './Header.vue';

interface rowClass {
  (row: object, index: number): any,
}

interface pageProps {
  current?: number,
  total?: number,
  pageSize?: number,
  pageSizeOpts?: number[],
  placement?: string,
  size?: string,
  simple?: boolean,
  showTotal?: boolean,
  showElevator?: boolean,
  showSizer?: boolean,
  className?: string,
  styles?: object,
  transfer?: boolean,
  prevText?: string,
  nextText?: string,
}

let itemKey = 1;

@Component({
  components: {
    CardView,
    Header,
  },
})

export default class HrTableCard extends Vue {
  // 外层控制的公共部分
  @Prop({ type: String, default: 'list' }) defaultType!: string
  @Prop(Array) value!: (string | number)[]
  @Prop(String) selectedKey!: string

  // 头部新增
  @Prop({ type: String, default: '查询结果' }) title!: string
  @Prop({ type: Boolean, default: true }) totalTitle?: boolean
  @Prop(Boolean) disabledChangeView?: boolean
  @Prop({ type: String, default: '_itemKey' }) dataKey?: string

  // 表格部分
  @Prop(Array) data!: object[]
  @Prop(Array) columns!: object[]
  @Prop(Boolean) stripe?: boolean
  @Prop(Boolean) border?: boolean
  @Prop({ type: Boolean, default: true }) showHeader?: boolean
  @Prop([String, Number]) width?: number | string
  @Prop([String, Number]) height?: number | string
  @Prop(Boolean) disabledHover?: boolean
  @Prop(Boolean) highlightRow?: boolean
  @Prop(Boolean) stopCardSelect?: boolean
  @Prop(Function) rowClassName?: rowClass
  @Prop(String) size?: string
  @Prop({ type: String, default: '暂无数据' }) noDataText?: string
  @Prop(String) noFilteredDataText?: string

  // 卡片部分
  @Prop({ type: [String, Number], default: 6 }) cardSpan!: string | number
  @Prop({ type: Number, default: 22 }) cardGutter!: number

  // loading部分
  @Prop(String) spinSize?: string
  @Prop(Boolean) loading?: boolean

  // 分页部分
  @Prop(Object) page!: pageProps
  @Prop({ type: Boolean, default: false }) disabledPage!: boolean

  // 内部变量
  public showType: string = this.defaultType
  highlightIndex: (number | string) = ''
  
  get formatData() {
    return [...this.data.map((item: any, i: (string|number)) => {
      const v = {...item};
      v._itemKey = itemKey;
      itemKey += 1;

      // 高亮内置条件处理
      if (v._higlightRow && this.highlightIndex === i) {
        v._highlight = 1;
      }

      // 多选内置条件处理
      if (this.selectedKey && this.value && this.value.length > 0) {
        if (v[this.selectedKey] && this.value.includes(v[this.selectedKey])) {
          v._checked = true;
        } else {
          v._checked = false;
        }
      } else {
        v._checked = v._checked || false;
      }
      return v;
    })]
  }

  @Emit('on-change-view')
  onChangeView(showType) {}

  @Emit('on-select')
  onSelect(list, row) {}

  @Emit('on-select-cancel')
  onSelectCancel(list, row) {}

  @Emit('on-select-all')
  onSelectAll(list) {}

  @Emit('on-select-all-cancle')
  onSelectAllCancel(list) {}

  @Emit('on-selection-change')
  onSelectionChange(list) {}

  @Emit('on-row-click')
  onRowClick(item, index) {
    this.setHighlightIndex(item, index);
  }

  @Emit('on-current-change')
  onCurrentChange(currentRow, oldCurrentRow) {}

  @Watch('data')
  dataUpdate() {
    this.clearCurrentRow();
  }

  // 设置高亮的下标
  setHighlightIndex(item, index) {
    if (this.highlightRow && this.highlightIndex !== index) {
      this.onCurrentChange(item, this.highlightIndex !== '' ? this.formatData[this.highlightIndex] : null);
      this.highlightIndex = index;
    }
  }

  // 清除高亮
  clearCurrentRow() {
    this.highlightIndex = '';
  }

  // 切换视图的方法
  changView(showType) {
    if (this.showType !== showType) {
      this.onChangeView(showType);
      this.showType = showType;
      this.$forceUpdate();
    }
  }

  // 带选项方法
  onSelectData(list, row, noEvent) {
    if (this.selectedKey && row[this.selectedKey] && this.value && !this.value.includes(row[this.selectedKey])) {
      this.value.push(row[this.selectedKey]);
    }
    if (!noEvent) {
      this.onSelect(list, row);
    }
  }

  onSelectCancelData(list, row, noEvent) {
    if (this.selectedKey && row[this.selectedKey] && this.value && this.value.includes(row[this.selectedKey])) {
      this.value.splice(this.value.indexOf(row[this.selectedKey]), 1);
    }
    if (!noEvent) {
      this.onSelectCancel(list, row);
    }
  }

  onSelectAllData(list) {
    for (const row of list) {
      this.onSelectData(list, row, true);
    }
    this.onSelectAll(list);
  }

  onSelectAllCancelData(list) {
    for (const row of this.data) {
      this.onSelectCancelData(list, row, true);
    }
    this.onSelectAllCancel(list);
  }

  render(h) {
    return h('div', {
      class: {
        'hr-table-card': true,
      },
    }, [
      h(Header, {
        props: {
          title: this.title,
          total: this.$props.page ? this.$props.page.total : 0,
          totalTitle: this.totalTitle,
          showType: this.showType,
          disabledChangeView: this.disabledChangeView,
        },
        on: {
          changView: this.changView,
        },
        scopedSlots: {
          title: this.$scopedSlots.title,
        },
      }),
      h('div', {
        style: {
          position: 'relative',
        },
      }, [
        h('Table', {
          props: {
            ...this.$props,
            loading: false,
            data: this.formatData,
          },
          style: {
            display: this.showType === 'list' ? 'block' : 'none',
          },
          scopedSlots: {
            ...this.$scopedSlots,
          },
          on: {
            ...this.$listeners,
            'on-select': this.onSelectData,
            'on-select-cancel': this.onSelectCancelData,
            'on-select-all': this.onSelectAllData,
            'on-select-all-cancel': this.onSelectAllCancelData,
            'on-row-click': this.onRowClick,
            'on-current-change': () => {},
          },
        }),
        h(CardView, {
          props: {
            ...this.$props,
            data: this.formatData,
            setHighlightIndex: this.setHighlightIndex,
          },
          style: {
            display: this.showType === 'card' ? 'block' : 'none',
          },
          scopedSlots: {
            cardView: this.$scopedSlots.cardView,
          },
          on: {
            'on-select': this.onSelectData,
            'on-select-cancel': this.onSelectCancelData,
            'on-selection-change': this.onSelectionChange,
          },
        }),
        h('Spin', {
          props: {
            size: this.spinSize,
            fix: true,
          },
          style: {
            display: this.loading ? 'block' : 'none',
          },
        }, this.$slots.spin),
      ]),
      h('div', {
        class: {
          'hr-table-card-page': true,
        },
      }, [
        !this.disabledPage && h('Page', {
          props: {
            ...this.$props.page,
            size: 'small',
          },
          on: this.$listeners,
        }, this.$slots.page),
      ]),
    ]);
  }

}

</script>
<style lang="less">
.hr-table-card-page {
  margin: 15px 0;
  text-align: right;
  overflow: hidden;
}
</style>
