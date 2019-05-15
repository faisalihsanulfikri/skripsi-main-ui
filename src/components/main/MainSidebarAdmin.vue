<template>
  <el-aside class="main-sidebar">
    <el-menu background-color="#1565C0" text-color="#FFF" active-text-color="#FFF" :router="true">
      <el-menu-item>
        <ios-contact-icon w="24px" h="24px" class="ionicon"/>
        <span>{{ username() }}</span>
      </el-menu-item>

      <el-menu-item index="/admin">
        <ios-analytics-icon w="24px" h="24px" class="ionicon"/>
        <span>DASHBOARD</span>
      </el-menu-item>

      <el-submenu index="/admin/inbound">
        <template slot="title">
          <ios-list-box-icon w="24px" h="24px" class="ionicon"/>
          <span>INBOUND</span>
        </template>
        <el-menu-item index="/admin/inbound/new">All</el-menu-item>
        <el-menu-item index="/admin/inbound/consolidate">Consolidate</el-menu-item>
        <el-menu-item index="/admin/inbound/inprogres">In Progress</el-menu-item>
        <el-menu-item index="/admin/inbound/noteissues">With Issue</el-menu-item>
      </el-submenu>

      <el-submenu index="/admin/inv">
        <template slot="title">
          <ios-paper-icon w="24px" h="24px" class="ionicon"/>
          <span>INVOICES</span>
        </template>
        <el-menu-item index="/admin/invoices">Order Kirimin</el-menu-item>
        <el-menu-item index="/admin/minvoices">Membership</el-menu-item>
      </el-submenu>

      <el-submenu index="/admin">
        <template slot="title">
          <ios-filing-icon w="24px" h="24px" class="ionicon"/>
          <span>MASTER DATA</span>
        </template>
        <el-menu-item index="/admin/master/categories">Categories</el-menu-item>
        <el-menu-item index="/admin/master/warehouses">Warehouses</el-menu-item>
        <el-menu-item index="/admin/master/exchange-rates">Exchange Rates</el-menu-item>

        <el-submenu index="/admin/area">
          <template slot="title">
            <span>Area</span>
          </template>
          <el-menu-item index="/admin/master/area">Provinces</el-menu-item>
          <el-menu-item index="/admin/master/area/city">Cities</el-menu-item>
          <el-menu-item index="/admin/master/area/subdistrict">Subdistricts</el-menu-item>
          <el-menu-item index="/admin/master/area/code">Location Codes</el-menu-item>
        </el-submenu>
      </el-submenu>

      <el-submenu index="/admin/reports">
        <template slot="title">
          <ios-archive-icon w="24px" h="24px" class="ionicon"/>
          <span>REPORT</span>
        </template>
        <el-menu-item index="/admin/reports/sales">SALES</el-menu-item>
      </el-submenu>

      <el-submenu index="/admin/users">
        <template slot="title">
          <ios-contacts-icon w="24px" h="24px" class="ionicon"/>
          <span>USERS</span>
        </template>
        <el-menu-item index="/admin/users/regular">Regular</el-menu-item>
        <el-menu-item index="/admin/users/premium">Premium</el-menu-item>
        <el-menu-item index="/admin/users/agent">Agent</el-menu-item>
        <el-menu-item index="/admin/users/admin">Admin</el-menu-item>
        <el-menu-item index="/admin/user/create">Add User</el-menu-item>
        <el-menu-item index="/admin/membership">MemberShip</el-menu-item>
      </el-submenu>

      <el-menu-item v-if="level == 0" index="/admin/pages">
        <ios-apps-icon w="24px" h="24px" class="ionicon"/>
        <span>PAGES</span>
      </el-menu-item>

      <el-menu-item v-if="level == 0" index="/admin/settings">
        <ios-settings-icon w="24px" h="24px" class="ionicon"/>
        <span>SETTINGS</span>
      </el-menu-item>

      <el-menu-item>
        <ios-undo-icon w="24px" h="24px" class="ionicon"/>
        <span @click.prevent="__logout">LOGOUT</span>
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
