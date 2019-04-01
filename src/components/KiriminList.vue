<template>
  <table class="uk-table uk-table-divider uk-width-expand">
    <caption>List</caption>
    <thead>
      <th>Jenis Barang</th>
      <th>Nama Barang</th>
      <th>Harga</th>
      <th>Berat</th>
      <th>Dimensi</th>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td class="uk-width-1-6">{{ item.jenisBarang }}</td>
        <td class="uk-width-1-6">{{ item.namaBarang }}</td>
        <td class="uk-width-1-6">{{ item.hargaBarang }}</td>
        <td class="uk-width-1-6">{{ item.beratBarang }}</td>
        <td class="uk-width-1-6">{{ item.dimensiBarang }}</td>
        <td class="uk-width-1-6">
          <button class="uk-button uk-button-danger" @click="remove">Remove</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    items: {
      jenisBarang: '',
      namaBarang: '',
      hargaBarang: '',
      beratBarang: '',
      dimensiBarang: ''
    }
  },
  method: {
    remove () {
      console.log('remove')
    }
  }
}
</script>
