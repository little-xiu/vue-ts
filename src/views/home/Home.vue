<template>
  <div class="home">
    <router-link :to="{path: '/structure/costCenter'}">成本中心</router-link>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {

}
</script>
