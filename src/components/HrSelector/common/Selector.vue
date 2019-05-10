<template>
  <Select
    v-model="localValue"
    :class="{ 'no-arrow': noArrow }"
    transfer
    filterable
    :clearable="clearable"
    :placeholder="placeholder"
    :label-in-value="labelInValue"
    @on-change="onChange"
    @on-query-change="onQueryChange"
    @on-clear="onClear"
    @on-open-change="onOpenChange"
    ref="selector"
  >
    <Option v-for="item in options" :value="item[baseValue]" :key="item[baseValue]">
      {{showKey ? `${item[baseValue]}-${item[baseValue]}` : item[baseName]}}
    </Option>
  </Select>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop, Emit, Provide, Mixins } from 'vue-property-decorator';
import Emitter from 'iview/src/mixins/emitter';
import ajax from '@/service/fetchJson';
import axios from 'axios';

const { CancelToken } = axios;

@Component({
  components: {
  },
})
export default class HrSelect extends Mixins(Emitter) {
  dispatch: Emitter

  $refs!: any

  timer: any = null;
  loading: boolean = false;
  // 用来记录取消ajax请求
  static cancelToken: any = null;

  @Prop({ type: String, required: true }) baseValue!: string
  @Prop({ type: String, required: true }) baseName!: string
  @Prop({ type: String, required: true }) baseUrl!: string
  @Prop({ type: String, default: '请选则' }) placeholder!: string
  @Prop({ type: Boolean, default: true }) showKey!: boolean
  @Prop(Boolean) transfer!: boolean

  @Prop({ type: Boolean, default: true }) filterable!: boolean
  @Prop(Boolean) remote!: boolean
  @Prop(Boolean) remoteMethod!: boolean
  @Prop(Boolean) noArrow!: boolean
  @Prop(Boolean) clearable!: boolean
  @Prop(Boolean) labelInValue!: boolean
  @Prop(Boolean) itemInValue!: boolean

  @Prop({ type: Boolean, default: true }) queryInChange!: boolean
  @Prop({ type: Boolean, default: true }) clearInParamsChange!: boolean
  @Prop(Boolean) defaultRequest!: boolean
  @Prop(String) value!: string
  @Prop({ type: Object, default: () => ({}) }) params!: object
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: String, default: 'list' }) list!: string
  @Prop(Array) optionList!: any[] // 传入的选项列表

  @Watch('localValue')
  public emitLocalValue(val: any):void {
    this.$emit('input', val || '');
    if (!val && !this.defaultRequest) {
      this.$refs.selector.reset();
      this.options = [];
      this.clear();
    }
  }

  @Watch('optionList', { immediate: true })
  setOption(val) {
    if (this.optionList && this.optionList.length) {
      this.options = val.filter(v => v[this.baseValue]);
    }
  }

  @Watch('value')
  emitValue(val) {
    this.localValue = val || '';
    if (!val && this.remote) {
      this.$refs.selector.reset();
      this.options = [];
    }
  }

  @Watch('params')
  emitParams(val, oldVal) {
    if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
      if (this.clearInParamsChange) {
        this.localValue = '';
      }
      if (val && !this.remote) {
        this.getData(this.params);
      }
    }
  }

  options: any[] = []
  localValue: string = this.value || ''

  onChange(val) {
    let item = val;
    if (this.itemInValue && val) {
      // for of 循环数组，字符串，maps，不能循环普通对象
      for (const v of this.options) {
        if (val === v[this.baseValue]) {
          item = { ...v };
        }
      }
    }
    this.$emit('on-change', item);
    this.$emit('input', this.labelInValue ? val.value : val);
    this.localValue = this.labelInValue ? val.value : val;
  }

  onQueryChange(query) {
    this.$emit('on-query-change', query);
    if (!this.defaultRequest) {
      if (!query && this.remote) {
        this.$refs.selector.reset();
        this.options = [];
        this.clear();
      } else if (query && this.queryInChange) {
        this.getDataInput({ ...this.params, searchKey: query });
      }
    }
  }

  onClear(val) {
    this.$emit('on-clear');
  }

  getDataInput(payload?: object) {
    this.clear();
    this.loading = true;
    this.timer = setTimeout(async () => {
      const { data } = await ajax.fetchJson(this.baseUrl, payload, {
        cancelToken: new CancelToken((c) => {
          HrSelect.cancelToken = c;
        }),
      });
      this.loading = false;
      this.options = data.list;
    }, 500);
  }

  // 清除定时器并结束上一次请求
  clear() {
    clearTimeout(this.timer);
    this.timer = null;
    if (HrSelect.cancelToken) {
      HrSelect.cancelToken();
    }
  }

  onOpenChange(isOpen) {
    this.$emit('on-open-change', isOpen);
  }

  async getData(payload?) {
    const { data } = await ajax.fetchJson(this.baseUrl, payload);
    this.$emit('on-load-data', data ? data[this.list] : []);
    this.options = data ? data[this.list] : [];
  }

  setKeyDownClear() {
    // 退格删除所以内容，不然界面一直渲染老值而不能更改
    if (this.$refs.selector.$el.querySelector('.ivu-select-input')) {
      (this.$refs.selector.$el.querySelector('.ivu-select-input').onkeydown = (e) => {
        // keyCode === 8 表示键盘删除按钮BackSpace
        if (e && e.keyCode === 8) this.localValue = '';
      });
    }
  }

  onOpenChange(isOpen) {
    this.$emit('on-open-change', isOpen);
    if (!this.defaultRequest) {
      const arr = this.options.filter((item: any) => {
        const result = `${item[this.baseValue]}-${item[this.baseName]}`.indexOf(this.localValue) >= 0;
        return result;
      });
      this.options = [
        ...arr,
      ];
    }
  }

  created() {
    if (this.defaultRequest) {
      this.getData(this.params);
    }
  }
  
  mounted() {
    this.setKeyDownClear();
  }
}
</script>
