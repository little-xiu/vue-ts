<template>
  <div class="use">
    <Button @click="showModal">显示modal</Button>
    <hr-modal v-if="visible" :visible="visible" @on-cancel="onCancel" @on-ok="onOk" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HrModal from './HrModal.vue';

@Component({
  components: {
    HrModal,
  },
})
export default class UseModal extends Vue {
  public visible: boolean = false;
  public onCancel() {
    this.visible = false;
  }
  public onOk() {
    this.visible = false;
  }
  public showModal() {
    this.visible = true;
  }
}
</script>
