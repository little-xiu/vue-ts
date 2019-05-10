<template>
  <div>
    <Modal
      v-model="localVisible"
      title="modal1"
      width="500"
      @on-cancel="onCancel"
      :mask-closable="false"
      class-name="add-modal"
    >
      <div class="main">
        neirong
      </div>
      <p slot="footer">
        <Button @click="onCancel">取消</Button>
        <Button @click="onOk">确定</Button>
      </p>
    </Modal>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';

@Component
export default class HrModal extends Vue {
  // vue的类型校验，ts的类型校验
  @Prop({ type: Boolean, default: false }) public visible!: boolean;
  @Prop(Number) public checkedNum!: number;
  // 相当于this.$emit('modal-cancel'),handler是onCancel函数
  public localVisible: boolean = this.visible;
  // 父组件设置了v-if来确定显示与隐藏，可以不用监听
  // @Watch('visible')
  // public setVisibel(val: boolean) {
  //   this.localVisible = val;
  // }
  @Emit('on-cancel')
  public onCancel() {};
  public onOk() {
    this.$emit('on-ok');
  }
}
</script>
