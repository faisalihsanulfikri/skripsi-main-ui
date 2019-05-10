<template>
  <el-aside class="main-sidebar">
    <el-menu background-color="#1565C0" text-color="#FFF" active-text-color="#FFF" :router="true">
      <el-menu-item>
        <ios-contact-icon w="24px" h="24px" class="ionicon"/>
        <span>{{ username() }}</span>
      </el-menu-item>

      <el-menu-item index="/agent">
        <ios-analytics-icon w="24px" h="24px" class="ionicon"/>
        <span>DASHBOARD</span>
      </el-menu-item>

      <el-menu-item index="/agent/orders/create">
        <ios-journal-icon w="24px" h="24px" class="ionicon"/>
        <span>ENTRY ORDER</span>
      </el-menu-item>

      <el-submenu index="/agent/orders">
        <template slot="title">
          <ios-list-box-icon w="24px" h="24px" class="ionicon"/>
          <span>INBOUND</span>
        </template>
        <el-menu-item index="/agent/inbound/simplified">SIMPLIFIED</el-menu-item>
        <el-menu-item index="/agent/inbound/advanced">ADVANCED</el-menu-item>
        <el-menu-item index="/agent/inbound/import">IMPORT ORDER</el-menu-item>
        <el-menu-item index="/agent/inbound/export">EXPORT ORDER</el-menu-item>
      </el-submenu>

      <el-submenu index="/agent/order">
        <template slot="title">
          <ios-paper-icon w="24px" h="24px" class="ionicon"/>
          <span>OUTBOUND</span>
        </template>
        <el-menu-item index="/agent/outbound/scan-awb">SCAN AWB</el-menu-item>
      </el-submenu>

      <el-submenu index="/agent/report">
        <template slot="title">
          <ios-stats-icon w="24px" h="24px" class="ionicon"/>
          <span>REPORT</span>
        </template>
        <el-menu-item index="/agent/reports/order">ORDER</el-menu-item>
        <el-menu-item index="/agent/reports/air-waybill">AIR WAYBILL</el-menu-item>
        <el-menu-item index="/agent/reports/manifest">MANIFEST</el-menu-item>
      </el-submenu>

      <el-menu-item @click="__logout">
        <ios-undo-icon w="24px" h="24px" class="ionicon"/>
        <span>LOGOUT</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "MainSidebarAgent",
  props: {
    // level: {
    //   type: Number,
    //   required: false
    // }
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