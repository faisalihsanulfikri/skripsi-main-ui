<template>
  <v-app>
    <div class="app--navbar-default">
      <div class="uk-container">
        <nav uk-navbar>
          <div class="uk-navbar-left">
            <router-link to="/">
              <img class="app--navbar-logo" src="../../assets/logo-kirimin.jpg"/>
            </router-link>
          </div>
          <div class="uk-navbar-right">
            <ul class="uk-navbar-nav">
              <template v-if="$auth.hasAuth()">
                <li>
                  <a href="#">
                    <font-awesome-icon icon="user"/>
                    <span class="uk-margin-small-left">{{ user.name }}</span>
                  </a>
                  <div class="uk-navbar-dropdown">
                    <ul class="uk-nav uk-navbar-dropdown-nav">
                      <li>
                        <router-link :to="{ name: 'member-account' }">Akun</router-link>
                      </li>
                      <li>
                        <a href="#" @click.prevent="__logout">Keluar</a>
                      </li>
                    </ul>
                  </div>
                </li>
              </template>
              <template v-else>
                <li>
                  <router-link :to="{ name: 'general-kalkulator' }">Kalkulator</router-link>
                </li>
                <li>
                  <a href="#">Cara Kerja</a>
                  <div class="uk-navbar-dropdown">
                      <ul class="uk-nav uk-navbar-dropdown-nav">
                          <li>
                            <router-link :to="{ name: 'howto-kirimin' }">Kirimin</router-link>
                          </li>
                          <li>
                            <router-link :to="{ name: 'howto-beliin' }">Beliin</router-link>
                          </li>
                      </ul>
                  </div>
                </li>
                <li>
                  <a href="#">Fitur</a>
                  <div class="uk-navbar-dropdown">
                      <ul class="uk-nav uk-navbar-dropdown-nav">
                          <li>
                            <router-link :to="{ name: 'feature-kirimin' }">Kirimin</router-link>
                          </li>
                          <li>
                            <router-link :to="{ name: 'feature-beliin' }">Beliin</router-link>
                          </li>
                      </ul>
                  </div>
                </li>
                <li>
                  <router-link :to="{ name: 'faq' }">FAQ</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'login' }">Masuk</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'register' }">Daftar</router-link>
                </li>
              </template>
            </ul>
          </div>
        </nav>
      </div>
    </div>
    <div v-if="$auth.hasAuth()" class="app--navbar-secondary">
      <div class="uk-container">
        <nav uk-navbar>
          <div class="uk-navbar-center">
            <ul class="uk-navbar-nav">
              <li>
                <router-link :to="{ name: 'member-address' }">
                  <div class="uk-text-center">
                    <font-awesome-icon icon="warehouse" size="2x"/>
                    <div>Alamat</div>
                  </div>
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'member-account' }">
                  <div class="uk-text-center">
                    <font-awesome-icon icon="user" size="2x"/>
                    <div>Profil</div>
                  </div>
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'member-kirimin' }">
                  <div class="uk-text-center">
                    <font-awesome-icon icon="file-alt" size="2x"/>
                    <div>Kirimin</div>
                  </div>
                </router-link>
              </li>
              <!--<li>
                <router-link :to="{ name: 'member-beliin' }">
                  <div class="uk-text-center">
                    <font-awesome-icon icon="file-alt" size="2x"/>
                    <div>Beliin</div>
                  </div>
                </router-link>
              </li>-->
              <li>
                <router-link :to="{ name: 'member-order' }">
                  <div class="uk-text-center">
                    <font-awesome-icon icon="file-invoice" size="2x"/>
                    <div>Pesanan</div>
                  </div>
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'member-calculator' }">
                  <div class="uk-text-center">
                    <font-awesome-icon icon="calculator" size="2x"/>
                    <div>Kalkulator</div>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
    <main>
      <div class="uk-container">
        <div class="uk-margin-top uk-margin-bottom uk-margin-small" uk-grid>
          <div class="uk-width-expand">
            <transition
              name="router-anim"
              enter-active-class="animated zoomIn delay-1s"
              leave-active-class="animated zoomOut">
              <router-view></router-view>
            </transition>
          </div>
        </div>
      </div>
    </main>
    <footer class="app--footer app--dark">
      <div class="uk-container">
        <div class="uk-grid-small" uk-grid>
          <div class="uk-width-1-3">
            <p class="uk-margin-small">Terima Pembayaran</p>
            <ul class="app--footer-nav-horizontal">
              <li>
                <a href="#" target="_blank">
                  <img data-toggle="tooltip" src="../../assets/images/payment/bca.png" alt="bca">
                </a>
              </li>
            </ul>
          </div>
          <div class="uk-width-1-3">
            <p class="uk-margin-small">&nbsp;</p>
          </div>
          <div class="uk-width-1-3 uk-text-right">
            <p class="uk-margin-small">&nbsp;</p>
          </div>
        </div>
        <div class="uk-margin-large-top uk-text-center">
          <ul class="app--footer-nav-horizontal">
            <li>
              <router-link :to="{ name: 'aboutus' }">Tentang Kami</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'faq' }">FAQ</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'contactus' }">Hubungi Kami</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'terms' }">Syarat dan Ketentuan</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'privacy' }">Kebijakan Privasi</router-link>
            </li>
          </ul>
        </div>
        <div class="app--footer-copy-right">
          <p class="app--footer-copy-right-text uk-margin-remove">
            Copyright &copy; 2018 <a href="#">Kirimin</a>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      user: {}
    }
  },
  async created () {
    this.user = await this.$auth.getUser()
  }
}
</script>
