<template>
  <div>
    <Form ref="costForm" :model="formItem" :label-width="90" class="main-form" :rules="ruleValidate">
      <FormItem prop="buId" label="专业公司" :label-width="80">
        <business-company-selector style="width: 200px" placeholder="" v-model="formItem.buId" />
      </FormItem>
    </Form>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop, Emit, Provide, Mixins } from 'vue-property-decorator';
import BusinessCompanySelector from '@/components/HrSelector/BusinessCompanySelector';
import { Form } from 'iview';

interface formItem {
  buId: string,
}

@Component({
  components: {
    BusinessCompanySelector,
  },
})
export default class use extends Vue {
  $refs!: { costForm: Form }

  formItem: formItem = {
    buId: '',
  };

  get ruleValidate() {
    return {
      buId: [{ required: true, message: '请输入', trigger: 'change' }]
    };
  }
}

</script>
