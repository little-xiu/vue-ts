<template>
  <div>
    <Row :gutter="cardGutter" v-if="data.length > 0" type="flex" align="bottom">
      <i-col :span="cardSpan" v-for="(item, index) in data" :key="item[dataKey]">
        <div :class="getCls(item)" @click="onCardClick({...item}, index)">
          <slot name="cardView" v-bind="{item, index}"></slot>
        </div>
      </i-col>
    </Row>
    <Row v-else>
      <i-col span="24">
        <p>{{noDataText}}</p>
      </i-col>
    </Row>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop, Emit, Provide, Mixins } from 'vue-property-decorator';

interface dataItem {
  _checked: boolean,
}

@Component
export default class CardView extends Vue {
  // 独立props
  @Prop([String, Number]) public cardSpan!: string | number;
  @Prop(Number) public cardGutter!: number;
  @Prop(String) public showType!: 'list' | 'card';
  @Prop(Function) public setHightlightIndex!: (row: object, index: (string|number)) => any;
  @Prop({type: String, default: '_itemKey'}) public dataKey?: string;

  // 与table共享props
  @Prop(Array) public data!: dataItem[];
  @Prop(Array) public columns!: any[];
  @Prop(String) public noDataText?: string;
  @Prop(Boolean) public stopCardSelect?: boolean;
  @Prop(Boolean) public highlightRow?: boolean;

  public dataHighlight: boolean[] = [];

  // 是否需要可选中
  get needSelect() {
    for (const item of this.columns) {
      if (item.type && item.type === 'selection') {
        return true;
      }
    }
    return false;
  }

  @Emit('on-select')
  public onSelect(list: any, row: any): any {};

  @Emit('on-select-cancel')
  public onSelectCancel(list: any, row: any): any {};

  @Emit('on-select-change')
  public onSelectChange(list: any): any {};

  public onCardClick(row: any, index: any) {
    if (!this.stopCardSelect) {
      if (this.needSelect && !row._disabled) {
        const selectData = this.getSelectData(index);
        if (row._checked) {
          this.onSelectCancel(selectData, row);
        } else {
          this.onSelect(selectData, row);
        }
        this.onSelectChange(selectData);
      }
      if (this.highlightRow) {
        this.setHightlightIndex(row, index);
      }
    }
  }

  public getCls(item: any) {
    const cls = {
      'hr-table-card-citem': true,
      'hr-table-card-citem-disabled': this.needSelect && item._disabled,
      'hr-table-card-citem-checked': !this.stopCardSelect && this.needSelect && item._checked,
      'hr-table-card-citem-highlight': this.highlightRow && item._highlight,
    };
    return cls;
  }

  public getSelectData(index: number) {
    const selectData: dataItem[] = [];
    for (const i in this.data) {
      if (this.data[i]._checked && index !== Number(i)) {
        selectData.push({ ...this.data[i] });
      } else if (!this.data[i]._checked && index === Number(i)) {
        selectData.push({ ...this.data[i] });
      }
    }
    return selectData;
  }

}
</script>
