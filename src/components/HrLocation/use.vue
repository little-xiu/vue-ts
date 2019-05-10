<template>
  <use-wrap>
    <template v-slot:hrLocation>
      <router-link to="/"><Icon type="ios-arrow-back" style="marginRight: 2px" />Home</router-link>
      <router-link to="/demo">demo1</router-link>
    </template>
    <div></div>
  </use-wrap>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop, Emit, Provide, Mixins } from 'vue-property-decorator';
import useWrap from './useWrap.vue';

@Component({
  components: {
    useWrap,
  },
})
export default class use extends Vue {

}
</script>
