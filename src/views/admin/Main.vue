<template>
  <el-container>
    <main-sidebar/>

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
import MainSidebar from "@/components/MainSidebar";
export default {
  components: {
    MainSidebar
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
