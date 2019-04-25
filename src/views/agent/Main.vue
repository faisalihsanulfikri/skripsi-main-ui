<template>
  <el-container>
    <MainSidebarMobile/>
    <MainSidebarAgent/>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import MainSidebarAgent from "@/components/main/MainSidebarAgent";
import MainSidebarMobile from "@/components/main/MainSidebarMobile";
export default {
  components: {
    MainSidebarAgent,
    MainSidebarMobile
  }
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 300px) and (max-width: 720px) {
  .el-main {
    margin-top: 3rem;
  }
}
</style>
