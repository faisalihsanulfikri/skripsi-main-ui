<template>
  <el-container>
    <el-aside>
      <el-menu
        background-color="#1565C0"
        text-color="#FFF"
        active-text-color="#FFF"
        :router="true">
        <el-menu-item index="/admin">DASHBOARD</el-menu-item>
        <el-menu-item index="/admin/invoices">INVOICES</el-menu-item>
        <el-menu-item index="/admin/orders">ORDERS</el-menu-item>
        <el-submenu index="/admin">
          <template slot="title">
            <span>MASTER DATA</span>
          </template>
          <el-menu-item index="/admin/master/categories">Categories</el-menu-item>
          <el-menu-item index="/admin/master/warehouses">Warehouses</el-menu-item>
          <el-menu-item index="/admin/master/exchange">Exchange Rates</el-menu-item>
          <el-menu-item index="/admin/master/area">Area</el-menu-item>
        </el-submenu>
        <el-submenu index="/admin/users">
          <template slot="title">
            <span>USERS</span>
          </template>
          <el-menu-item index="/admin/users/regular">Regular</el-menu-item>
          <el-menu-item index="/admin/users/premium">Premium</el-menu-item>
          <el-menu-item index="/admin/users/agent">Agent</el-menu-item>
          <el-menu-item index="/admin/users/admin">Admin</el-menu-item>
        </el-submenu>
        <el-menu-item index="/admin">SETTINGS</el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <nav uk-navbar="mode: click">
          <div class="uk-navbar-right">
            <ul class="uk-navbar-nav">
              <li>
                <a href="#">
                  <font-awesome-icon icon="user"/>
                  <span class="uk-margin-small-left" >{{ $auth.getUser().fullName }}</span>
                </a>
                <div class="uk-navbar-dropdown">
                  <ul class="uk-nav uk-navbar-dropdown-nav">
                    <li>
                      <a href="#" @click.prevent="logout">Keluar</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$auth.destroyToken()
      this.$router.push({
        path: '/login',
        force: true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #FFF;
  height: 80px !important;
}

.el-menu {
  min-height: 100%;
}
</style>
