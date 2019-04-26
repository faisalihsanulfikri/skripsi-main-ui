<template>
  <el-container>
    <MainSidebarMobile/>
    <MainSidebarAdmin :level="level"/>

    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import MainSidebarAdmin from "@/components/main/MainSidebarAdmin";
import MainSidebarMobile from "@/components/main/MainSidebarMobile";

export default {
  data() {
    return {
      user: {}
    };
  },
  components: {
    MainSidebarAdmin,
    MainSidebarMobile
  },

  computed: {
    level() {
      return this.user.level;
    }
  },

  async created() {
    this.user = await this.$auth.getUser();
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
