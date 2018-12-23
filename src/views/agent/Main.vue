<template>
  <el-container>
    <el-aside>
      <el-menu
        background-color="#1565C0"
        text-color="#FFF"
        active-text-color="#FFF"
        :router="true">
        <el-menu-item index="/agent">DASHBOARD</el-menu-item>
        <el-menu-item index="/agent/orders/create">ENTRY ORDER</el-menu-item>
        <el-menu-item index="/agent/inbound">INBOUND</el-menu-item>
        <el-submenu index="/agent/report">
          <template slot="title">
            <span>REPORT</span>
          </template>
          <el-menu-item index="/agent/reports/order">ORDER</el-menu-item>
          <el-menu-item index="/agent/reports/air-waybill">AIR WAYBILL</el-menu-item>
        </el-submenu>
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
                  <span class="uk-margin-small-left" >{{ $root.user.name }}</span>
                </a>
                <div class="uk-navbar-dropdown">
                  <ul class="uk-nav uk-navbar-dropdown-nav">
                    <li>
                      <a href="#" @click.prevent="__logout">Keluar</a>
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

<style lang="scss" scoped>
.el-header {
  background-color: #FFF;
  height: 80px !important;
}

.el-menu {
  min-height: 100%;
}
</style>
