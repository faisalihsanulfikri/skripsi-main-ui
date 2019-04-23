<template>
  <el-container>
    <navbar-mobile/>
    <main-sidebar :level="level"/>

    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import MainSidebar from "@/components/MainSidebar";
import NavbarMobile from "@/components/NavbarMobile";

export default {
  data() {
    return {
      user: {}
    };
  },
  components: {
    MainSidebar,
    NavbarMobile
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
