<template>
  <div>
    <div class="uk-card uk-card-default uk-card-small uk-card-body">
      <div uk-grid>
        <div class="uk-width-medium@m">
          <ul class="uk-tab-left" uk-switcher="#user-tab" uk-tab>
            <li>
              <a href="#">Data Personal</a>
            </li>
            <li>
              <a href="#">Alamat</a>
            </li>
            <li>
              <a href="#">Ganti Kata Sandi</a>
            </li>
          </ul>
        </div>
        <div class="uk-width-expand">
          <ul id="user-tab" class="uk-switcher">
            <li><profile/></li>
            <li><my-address/></li>
            <li><change-password/></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Profile from './UserProfile'
import MyAddress from './UserAddress'
import ChangePassword from './UserChangePassword'

export default {
  components: {
    Profile,
    MyAddress,
    ChangePassword
  }
}
</script>
