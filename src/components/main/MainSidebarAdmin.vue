<template>
  <el-aside class="main-sidebar">
    <el-menu
      background-color="#1565C0"
      text-color="#FFF"
      active-text-color="#FFF"
      :router="true"
    >
      <el-menu-item index="/admin">
        <ios-contact-icon w="24px" h="24px" class="ionicon" />
        <span>CLIENT AREA</span>
      </el-menu-item>

      <el-submenu index="/admin/website">
        <template slot="title">
          <ios-paper-icon w="24px" h="24px" class="ionicon" />
          <span>WEBSITE</span>
        </template>
        <el-menu-item index="/websites">Produk</el-menu-item>
      </el-submenu>

      <el-menu-item @click="__logout">
        <ios-undo-icon w="24px" h="24px" class="ionicon" />
        <span>LOGOUT</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "main-sidebar",
  props: {
    level: {
      type: Number,
      required: false
    }
  },
  methods: {
    username() {
      return window.localStorage.getItem("user_name").toUpperCase();
    }
  }
};
</script>

<style lang="scss" scoped>
.main-sidebar {
  .el-menu {
    height: 100%;
  }
}

.el-aside {
  width: 200px !important;
  transition: all 200ms ease-in-out;
}

.ionicon {
  margin-right: 1rem;
}

@media screen and (min-width: 300px) and (max-width: 720px) {
  .el-aside {
    width: 0px !important;
  }

  .slide {
    width: 90% !important;
    position: absolute;
    height: 100vh !important;
    z-index: 10;
  }
}
</style>
