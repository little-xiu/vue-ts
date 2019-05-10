<template>
  <div class="add-modal">
    <Modal v-model="visibleFlag" :title="getTitle" @on-cancel="onModalCancel" :mask-closable="false">
      <Form ref="costModelForm" :label-width="80" :model="formItem">
        <div class="">
          <FormItem label="生效时间" prop="effDate">
            <DatePicker style="width: 200px" v-model="formItem.effDate" format="yyyy-MM-dd" type="date" />
          </FormItem>
        </div>
      </Form>
      <p slot="footer">
        <Button @click="onModalCancel">取消</Button>
        <Button type="primary" @click="modelOk">确定</Button>
      </p>
    </Modal>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { Form } from 'iview';

interface formItem {
  buId: string | string[],
  effDate: string | string[],
}

@Component
export default class costAddModal extends Vue {
  public $refs!: { costModelForm: Form };
  @Prop({ type: Boolean, default: false }) public visible!: boolean;
  @Prop(String) public type!: string;
  public visibleFlag: boolean = this.visible;
  public formItem: formItem = {
    buId: '',
    effDate: '',
  };
  @Emit('modal-cancel')
  public onModalCancel() {}
  public modelOk() {
    this.onModalCancel();
  }
}
</script>
