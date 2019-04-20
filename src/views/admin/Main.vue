<template>
  <el-container>
    <main-sidebar :level="level"/>

    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import MainSidebar from "@/components/MainSidebar";
export default {
  data() {
    return {
      user: {}
    };
  },
  components: {
    MainSidebar
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
.el-header {
  background-color: #fff;
  height: 80px !important;
}

.user {
  color: white;
}
</style>
