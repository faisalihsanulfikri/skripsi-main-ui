<template>
  <el-container>
    <el-aside>
      <el-menu
        background-color="#1565C0"
        text-color="#FFF"
        active-text-color="#FFF"
        :router="true">
        <el-menu-item index="/agent">DASHBOARD</el-menu-item>
        <el-menu-item index="/agent/orders">ORDERS</el-menu-item>
        <el-menu-item index="/agent/orders">REPORT</el-menu-item>

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
