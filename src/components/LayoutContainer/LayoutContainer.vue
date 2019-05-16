<template>
  <Layout>
    <layout-header />
    <Content class="content">
      <div class="main">
        <slot></slot>
      </div>
    </Content>
  </Layout>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import LayoutHeader from './LayoutHeader.vue';

@Component({
  components: {
    LayoutHeader,
  },
})
export default class LayoutContainer extends Vue {
  
}
</script>