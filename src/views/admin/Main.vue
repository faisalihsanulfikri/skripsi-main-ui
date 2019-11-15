<template>
  <el-container>
    <MainSidebarAdmin :level="level" />

    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import MainSidebarAdmin from "@/components/main/MainSidebarAdmin";

export default {
  data() {
    return {
      user: {}
    };
  },
  components: {
    MainSidebarAdmin
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
