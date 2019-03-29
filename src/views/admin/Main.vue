<template>
  <el-container>
    <el-aside>
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
              <span>Aera</span>
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
          <!-- <el-menu-item index="/admin/user/create">Add User</el-menu-item> -->

          <el-submenu index="/admin/adduser">
            <template slot="title">
              <span>Add User</span>
            </template>
            <!-- <el-menu-item index="/admin/user/create?level=2">Add User Regular</el-menu-item>
            <el-menu-item index="/admin/user/create?level=3">Add User Premium</el-menu-item>
            <el-menu-item index="/admin/user/create?level=4">Add User Agent</el-menu-item>
            <el-menu-item index="/admin/user/create?level=1">Add User Admin</el-menu-item>-->

            <el-menu-item>
              <router-link
                :to="{ name: 'admin-user-create', params: { level: '2' } }"
                class="user"
              >Add User Regular</router-link>
            </el-menu-item>
            <el-menu-item>
              <router-link
                :to="{ name: 'admin-user-create', params: { level: '3' } }"
                class="user"
              >Add User Premium</router-link>
            </el-menu-item>
            <el-menu-item>
              <router-link
                :to="{ name: 'admin-user-create', params: { level: '4' } }"
                class="user"
              >Add User Agent</router-link>
            </el-menu-item>
            <el-menu-item>
              <router-link
                :to="{ name: 'admin-user-create', params: { level: '1' } }"
                class="user"
              >Add User Admin</router-link>
            </el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="/admin/settings">SETTINGS</el-menu-item>
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
                  <span class="uk-margin-small-left">{{ $root.user.name }}</span>
                </a>
                <div class="uk-navbar-dropdown">
                  <ul class="uk-nav uk-navbar-dropdown-nav">
                    <li>
                      <a href="#" @click.prevent="__logout">Logout</a>
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
  watch: {
    $route: {}
  },
  methods: {
    onAddUser() {}
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

.el-menu {
  min-height: 100%;
}
</style>