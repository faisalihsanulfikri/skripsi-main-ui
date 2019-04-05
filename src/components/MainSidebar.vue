<template>
  <el-aside class="main-sidebar">
    <el-menu background-color="#1565C0" text-color="#FFF" active-text-color="#FFF" :router="true">
      <el-menu-item index="/admin">DASHBOARD</el-menu-item>
      <el-menu-item index="/admin/inbound">INBOUND</el-menu-item>
      <el-menu-item index="/admin/invoices">INVOICES</el-menu-item>
      <!-- <el-menu-item index="/admin/orders">ORDERS</el-menu-item> -->
      <el-submenu index="/admin">
        <template slot="title">
          <span>MASTER DATA</span>
        </template>
        <el-menu-item index="/admin/master/categories">Categories</el-menu-item>
        <el-menu-item index="/admin/master/warehouses">Warehouses</el-menu-item>
        <el-menu-item index="/admin/master/exchange-rates">Exchange Rates</el-menu-item>
        <!-- <el-menu-item index="/admin/master/area">Area</el-menu-item> -->
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

      <el-submenu index="/admin/users">
        <template slot="title">
          <span>USERS</span>
        </template>
        <el-menu-item index="/admin/users/regular">Regular</el-menu-item>
        <el-menu-item index="/admin/users/premium">Premium</el-menu-item>
        <el-menu-item index="/admin/users/agent">Agent</el-menu-item>
        <el-menu-item index="/admin/users/admin">Admin</el-menu-item>
        <el-menu-item index="/admin/user/create">Add User</el-menu-item>
      </el-submenu>
      <el-menu-item v-if="level == 0" index="/admin/pages">PAGES</el-menu-item>
      <el-menu-item v-if="level == 0" index="/admin/settings">SETTINGS</el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "main-sidebar",

  props: {
    level: {
      type: Number,
      required: true
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
</style>

