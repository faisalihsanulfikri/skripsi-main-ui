<template>
  <div>
    <div class="uk-card uk-card-default uk-card-small uk-card-body">
      <div uk-grid>
        <div class="uk-width-medium@m">
          <ul class="uk-tab-left" uk-tab>
            <li :class="{ 'uk-active': $route.name === 'member-account' }">
              <router-link :to="{ name: 'member-account' }">Data Personal</router-link>
            </li>
            <li :class="{ 'uk-active': $route.name === 'member-account-address' }">
              <router-link :to="{ name: 'member-account-address' }">Alamat</router-link>
            </li>
            <li :class="{ 'uk-active': $route.name === 'member-account-password' }">
              <router-link :to="{ name: 'member-account-password' }">Ganti Kata Sandi</router-link>
            </li>
            <li :class="{ 'uk-active': $route.name === 'member-account-file' }">
              <router-link :to="{ name: 'member-account-file' }">Upload Dokumen</router-link>
            </li>
          </ul>
        </div>
        <div class="uk-width-expand">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
