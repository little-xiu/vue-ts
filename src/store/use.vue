<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action, Mutation, namespace } from 'vuex-class';
const stdStationModule = namespace('stdStation');

export default class UseModal extends Vue {
  @stdStationModule.Action stdStationListAsync
  @stdStationModule.State staStationList

  data: any = [];

  async initPage() {
    const params = '';
    await this.stdStationListAsync(params);
    if (this.staStationList.responseCode === '10001') {
      this.data = this.staStationList.data;
    }
  }
}
</script>
