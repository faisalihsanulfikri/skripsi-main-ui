<template>
  <nav class="navbar-mobile">
    <div class="username">
      <ios-contact-icon w="24px" h="24px" class="ionicon"/>
      <span>{{ user.name }}</span>
    </div>
    <div class="menu-button">
      <a href="#" @click.prevent="showMenu" v-if="!isMenuOpen">
        <ios-menu-icon w="24px" h="24px" class="ionicon"/>
      </a>
      <a href="#" @click.prevent="closeMenu" v-else>
        <ios-close-icon w="24px" h="24px" class="ionicon"/>
      </a>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarMobile",
  data() {
    return {
      user: {},
      isMenuOpen: false,
      mainSidebar: ""
    };
  },
  methods: {
    showMenu() {
      this.mainSidebar.classList.add("slide");
      window.localStorage.setItem("main_sidebar", "open");
      this.isMenuOpen = true;
    },
    closeMenu() {
      this.mainSidebar.classList.remove("slide");
      window.localStorage.setItem("main_sidebar", "close");
      this.isMenuOpen = false;
    }
  },
  async created() {
    this.user = await this.$auth.getUser();
    this.mainSidebar = document.querySelector(".main-sidebar");
  }
};
</script>

<style lang="scss" scoped>
.navbar-mobile {
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1465c0;
  padding: 0.5rem;
  z-index: 10;
}
.username {
  color: white;
  display: flex;
  align-items: center;
}
.ionicon {
  margin-right: 0.5rem;
  color: white;
}
.menu-button {
  height: 24px;
  .ionicon {
    margin-right: 1rem;
    &:hover,
    &:focus {
      color: yellow;
    }
  }
}

@media screen and (min-width: 721px) {
  .navbar-mobile {
    display: none;
  }
}
@media screen and (min-width: 300px) and (max-width: 720px) {
  .navbar-mobile {
    display: flex;
  }
}
</style>
