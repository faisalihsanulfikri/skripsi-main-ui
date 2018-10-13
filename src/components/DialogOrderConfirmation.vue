<template>
  <el-dialog
    title="Konfirmasi Order"
    :visible="visible"
    @close="close">
    <form>
      <div class="uk-margin">
        <label class="uk-form-label">Anda akan melakukan transaksi sebesar Rp xx.xxx.xxx </label>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Silahkan lakukan pembayaran ke nomor rekening berikut </label>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">BCA: xxxxxxxx (PT. Kirimin) </label>
      </div>
    </form>
    <h4>{{ message }}</h4>
    <div slot="footer">
      <button class="uk-button uk-button-danger" @click="confirm">YA</button>
      <button class="uk-button uk-button-default uk-margin-small-left" @click="close">TIDAK</button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      default: false
    },
    message: {
      default: 'Lanjutkan transaksi ini?'
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    confirm () {
      this.$emit('confirm')
    }
  }
}
</script>
