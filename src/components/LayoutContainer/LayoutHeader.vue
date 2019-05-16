<template>
  <Header>
    <Row>
      <Col span="8">
        <Menu mode="horizontal" class="top-menu" :active-name="activeName">
          <MenuItem name="/home" to="/home">工作台</MenuItem>
          <MenuItem name="/personal" to="/personal">个人主页</MenuItem>
        </Menu>
      </Col>
      <Col span="8">
        <Input search />
      </Col>
      <img src="../../assets/logo.png" />
    </Row>
  </Header>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class LayoutHeader extends Vue {
  activeName!: string;
  created() {
    this.activeName = this.$route.path;
  }
}
</script>
