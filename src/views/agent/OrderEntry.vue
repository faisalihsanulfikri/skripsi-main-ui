<template>
  <div class="uk-card uk-card-default uk-card-small">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__back">
            <router-link :to="{ name: 'agent-main' }">
              <font-awesome-icon icon="chevron-left"></font-awesome-icon>
            </router-link>
          </div>
        </div>
        <div class="uk-width-expand">
          <div class="app--card-header_title">
            <h3>{{ title }}</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="uk-card-body">
      <div class="uk-margin">
        <label class="uk-form-label">Kode Pelanggan</label>
        <el-input v-model="input.code"></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Nama Pengirim</label>
        <el-input v-model="input.name"></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Nama Barang</label>
        <el-input v-model="input.price"></el-input>
      </div>
      <div class="uk-flex">
        <div class="uk-card uk-card-default uk-card-body">
          <label class="uk-form-label">Berat Barang</label>
          <el-input v-model="input.price"></el-input>
        </div>
        <div class="uk-card uk-card-default uk-card-body uk-margin-left">
          <label class="uk-form-label">Panjang Barang</label>
          <el-input v-model="input.price"></el-input>
        </div>
        <div class="uk-card uk-card-default uk-card-body uk-margin-left">
          <label class="uk-form-label">Lebar Barang</label>
          <el-input v-model="input.price"></el-input>
        </div>
        <div class="uk-card uk-card-default uk-card-body uk-margin-left">
          <label class="uk-form-label">Tinggi Barang</label>
          <el-input v-model="input.price"></el-input>
        </div>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Catatan</label>
        <el-input v-model="input.address" type="textarea" rows="5"></el-input>
      </div>
      <el-alert
          v-if="error"
          title="ERROR"
          type="error"
          :description="errorMessage"
          show-icon>
        </el-alert>
    </div>
    <div class="uk-card-footer uk-text-right">
      <el-button type="primary" @click="save">SAVE</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      edit: false,
      title: 'Entry Order',
      input: {
        code: '',
        name: '',
        price: '',
        address: '',
        zipcode: ''
      },
      error: false,
      errorMessage: ''
    }
  },
  methods: {
    getWareHouse () {
      this.error = false
      this.errorMessage = ''
      this.$authHttp.get(`/v1/cfees/${this.$route.params.id}`).then(res => {
        this.input.code = res.data[0].code
        this.input.name = res.data[0].name
        this.input.price = res.data[0].price
        this.input.address = res.data[0].address
        this.input.zipcode = res.data[0].zipcode
      }).catch(err => {
        if (err.response) {
          this.error = true
          this.errorMessage = err.response.data.message ? err.response.data.message : err.response.statusText

          this.$notify({
            title: 'ERROR',
            message: this.errorMessage,
            type: 'error'
          })

          this.$router.push({ name: 'agent-category' })
        }
      })
    },
    save () {
      if (this.edit) {
        this.update()
      } else {
        this.store()
      }
    },
    store () {
      this.error = false
      this.errorMessage = ''

      this.$authHttp.post('/v1/cfees', this.input).then(res => {
        this.$notify({
          title: 'SUCCESS',
          message: res.data.message,
          type: 'success'
        })

        this.$router.push({ name: 'agent-order' })
      }).catch(err => {
        if (err.response) {
          this.error = true
          this.errorMessage = err.response.data.message ? err.response.data.message : err.response.statusText
        }
      })
    },
    update () {
      this.error = false
      this.errorMessage = ''

      this.$authHttp.put(`/v1/cfees/${this.$route.params.id}`, this.input).then(res => {
        this.$notify({
          title: 'SUCCESS',
          message: res.data.message,
          type: 'success'
        })

        this.$router.push({ name: 'agent-order' })
      }).catch(err => {
        if (err.response) {
          this.error = true
          this.errorMessage = err.response.data.message ? err.response.data.message : err.response.statusText
        }
      })
    }
  },
  created () {
    if (this.$route.params.id) {
      this.edit = true
      this.title = 'Edit Warehouse'

      this.getWareHouse()
    }
  }
}
</script>
