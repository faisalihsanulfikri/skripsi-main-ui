<template>
  <div class="uk-card uk-card-default uk-card-small">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__back">
            <!-- <router-link :to="{ name: 'admin-user', params: { level: input.level } }">
              <font-awesome-icon icon="chevron-left"></font-awesome-icon>
            </router-link>-->
            <!-- <a href="/admin/users/${input.level}"> -->
            <!-- <a href="/admin/users/" onclick="location.href=this.href+input.level;return false;">
              <font-awesome-icon icon="chevron-left"></font-awesome-icon>
            </a>-->
          </div>
        </div>
        <div class="uk-width-expand">
          <div class="app--card-header_title">
            <h3>{{title}} {{input.userLevel}}</h3>
          </div>
        </div>
      </div>
    </div>

    <div class="uk-card-body">
      <div uk-grid>
        <div class="uk-width-1-1">
          <div class="uk-margin">
            <table class="detail">
              <tr>
                <th>Code</th>
                <td>: {{input.code}}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>: {{input.name}}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>: {{input.email}}</td>
              </tr>
              <tr>
                <th>Phone Number</th>
                <td>: {{input.phone}}</td>
              </tr>
              <tr>
                <th>Level</th>
                <td>: {{input.userLevel}}</td>
              </tr>
              <tr>
                <th>Active</th>
                <td>: {{input.userActive}}</td>
              </tr>
            </table>
          </div>

          <hr>

          <div class="uk-margin">
            <div class="head-address">
              <span class="title">Alamat</span>
              <button class="btn" @click="createAddress">+</button>
            </div>
          </div>

          <dialog-input-address
            :title="dialogInput.title"
            :visible.sync="dialogInput.visible"
            :edit="dialogInput.edit"
            :address="dialogInput.address"
            :user_code="input.code"
            @close="onInputClose"
          />

          <div
            class="uk-grid uk-grid-small uk-child-width"
            uk-grid
            uk-height-match="target: .uk-card-body"
          >
            <div v-for="(address, index) in addresses" :key="address.id">
              <div class="uk-card uk-card-default uk-card-small">
                <div v-if="index === 0" class="is-favorite">
                  <div class="uk-card-body">
                    <div class="marker">
                      <img src="/img/set-favorite-address-icon.png" alt="set favorite address icon">
                    </div>
                    <h4>{{ address.alias }}</h4>
                    <p>{{ `${address.province}, ${address.city}, ${address.sub_district}, ${address.address}, ${address.postal_code}` }}</p>
                    <p>{{ `${address.name} - ${address.phone}` }}</p>
                  </div>
                </div>
                <div v-else>
                  <div class="uk-card-body">
                    <h4>{{ address.alias }}</h4>
                    <p>{{ `${address.province}, ${address.city}, ${address.sub_district}, ${address.address}, ${address.postal_code}` }}</p>
                    <p>{{ `${address.name} - ${address.phone}` }}</p>
                  </div>
                </div>
                <div class="uk-card-footer uk-text-right">
                  <el-tooltip
                    :content="address.primary ? 'Alamat Utama': 'Set Alamat Utama'"
                    placement="top"
                  >
                    <a
                      :class="address.primary ? 'primary-address': 'non-primary-address'"
                      href="#"
                      @click.prevent="setPrimaryAddress(index)"
                    >
                      <font-awesome-icon icon="star" class="icon"/>
                    </a>
                  </el-tooltip>
                  <el-tooltip content="Ubah" placement="top">
                    <a class="uk-margin-left" href="#" @click.prevent="editAddress(index)">
                      <font-awesome-icon icon="edit" class="icon"/>
                    </a>
                  </el-tooltip>
                  <el-tooltip content="Hapus" placement="top">
                    <a
                      class="uk-text-danger uk-margin-left"
                      href="#"
                      @click.prevent="showConfirmDelete(index)"
                    >
                      <font-awesome-icon icon="trash-alt" class="icon"/>
                    </a>
                  </el-tooltip>
                </div>
              </div>
            </div>
          </div>

          <el-alert v-if="error" title="ERROR" type="error" :description="errorMessage" show-icon></el-alert>

          <div class="uk-card-footer uk-text-right">
            <dialog-confirm-delete
              :visible.sync="dialogDelete.visible"
              @close="onConfirmDeleteClose"
              @confirm="onConfirmDelete"
            />
            <!-- <el-button type="primary" @click="save">SAVE</el-button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DialogInputAddress from "@/components/DialogInputAddress";
import DialogConfirmDelete from "@/components/DialogConfirmDelete";

export default {
  components: {
    DialogInputAddress
  },

  data() {
    return {
      dialogDelete: {
        visible: false
      },
      dialogInput: {
        title: "Tambah Alamat",
        visible: false,
        edit: false,
        address: {}
      },
      index: "",
      route_name: "",
      edit: false,
      title: "Detail User",
      input: {
        code: "",
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        phone: "",
        gender: "",
        birthdate: "",
        birthdateSplited: {
          year: "",
          month: "",
          day: ""
        },
        active: "",
        active_name: "",
        level: "",
        userLevel: "",
        userActive: ""
      },
      addresses: [],
      selectedAddress: {},
      error: false,
      errorMessage: ""
    };
  },

  async created() {
    if (this.$route.params.id) {
      this.title = "Detail User";

      this.fetchUsers();
      this.fetchAddresses();
    }
  },

  methods: {
    async fetchUsers() {
      this.__startLoading();

      this.error = false;
      this.errorMessage = "";

      try {
        let res = await this.$service.user.getUserData(this.$route.params.id);

        this.input = res.data;
      } catch (err) {
        this.__handleError(this, err, true);
      }

      this.__stopLoading();
    },
    async onInputClose() {
      this.dialogInput.visible = false;
      this.__startLoading();

      await this.fetchAddresses();

      this.__stopLoading();
    },

    async fetchAddresses() {
      let res = await this.$service.user.getAddressesById(
        this.$route.params.id
      );

      this.addresses = res.data;

      console.log(this.addresses);
    },
    createAddress() {
      this.dialogInput.title = "Tambah Alamat";
      this.dialogInput.visible = true;
      this.dialogInput.edit = false;
      // this.dialogInput.address = {};
    },
    editAddress(index) {
      this.dialogInput.title = "Ubah Alamat";
      this.dialogInput.visible = true;
      this.dialogInput.edit = true;
      this.dialogInput.address = this.addresses[index];
    },
    showConfirmDelete(index) {
      this.selectedAddress = this.addresses[index];
      this.dialogDelete.visible = true;
    },
    onConfirmDeleteClose() {
      this.selectedAddress = {};
      this.dialogDelete.visible = false;
    },
    onConfirmDelete() {
      this.deleteAddress();

      this.selectedAddress = {};
      this.dialogDelete.visible = false;
    },
    async deleteAddress() {
      this.__startLoading();

      await this.$authHttp
        .delete(`/admin/user/addresses/${this.selectedAddress.id}`)
        .then(res => {
          this.fetchAddresses();

          this.$notify({
            title: "SUCCESS",
            message: res.data.message,
            type: "success"
          });
        })
        .catch(err => {
          if (err.response) {
            this.$notify({
              title: "ERROR",
              message: err.response.data.message,
              type: "error"
            });
          }
        });

      this.__stopLoading();
    }
    // async setPrimaryAddress(index) {
    //   let address = this.addresses[index];

    //   if (address.primary) return;

    //   this.__startLoading();

    //   await this.$authHttp
    //     .put(`/user/addresses/${address.id}/primary`)
    //     .then(res => {
    //       this.fetchAddresses();

    //       this.$notify({
    //         title: "SUCCESS",
    //         message: res.data.message,
    //         type: "success"
    //       });
    //     })
    //     .catch(err => {
    //       if (err.response) {
    //         this.$notify({
    //           title: "ERROR",
    //           message: err.response.data.message,
    //           type: "error"
    //         });
    //       }
    //     });

    //   this.__stopLoading();
    // }
  }
};
</script>

<style lang="scss" scoped>
.req-doc {
  padding-top: 10px;
  .btn-r {
    padding-right: 5px;
    padding-left: 5px;
  }
}
.detail {
  th {
    text-align: left;
  }
}

.head-address {
  .title {
    font-weight: 700;
  }
  .btn {
    margin-left: 10px;
  }
}
</style>
