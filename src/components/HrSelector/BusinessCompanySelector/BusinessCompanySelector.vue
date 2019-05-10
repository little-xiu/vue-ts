<script lang="ts">
import { Component, Vue, Watch, Prop, Emit, Provide, Mixins } from 'vue-property-decorator';
import Selector from '../common/Selector.vue';

@Component
export default class BusinessCompanySelector extends Vue {
  baseValue: string = 'buId'

  baseName: string = 'shortName'

  baseUrl: string = '/api/businessList/data1.json'

  @Prop({ type: String, default: '请选择' }) placeholder!: string

  @Prop(Boolean) transfer!: boolean

  @Prop({ type: Boolean, default: true }) clearable!: boolean

  @Prop(Boolean) labelInValue!: boolean

  @Prop(Boolean) itemInValue!: boolean

  @Prop({ type: Boolean, default: true }) defaultRequest!: boolean

  // value 是v-model的值
  @Prop(String) value!: string

  @Prop({ type: Object, default: () => ({ searchKey: '', effStatus: '' }) }) params!: object

  @Prop(Boolean) disabled!: boolean

  @Watch('value')
  updateValue(val) {
    this.$emit('input', val);
  }

  render(h) {
    return h(Selector, {
      class: ['hr-business-company-selector'],
      props: {
        ...this.$props,
        baseValue: this.baseValue,
        baseName: this.baseName,
        baseUrl: this.baseUrl,
      },
      scopedSlots: {
        ...this.$scopedSlots
      },
      on: {
        ...this.$listeners,
      },
    });
  }
}

</script>