<template>
  <el-dialog
    title="HAPUS"
    :visible="visible"
    @close="close">
    <h5>{{ message }}</h5>
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
      default: 'Anda yakin akan menghapus data ini?'
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
