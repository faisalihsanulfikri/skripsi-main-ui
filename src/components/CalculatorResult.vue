<template>
  <div>
    <div class="uk-overflow-auto">
      <table class="uk-table uk-table-small uk-text-small">
        <tbody v-for="(item, key) in result.items" :key="key">
          <tr>
            <td>Harga Barang</td>
            <td class="uk-text-right">
              {{ item.harga | currency('Rp. ', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
            </td>
          </tr>
          <tr>
            <td>Biaya Internasional</td>
            <td class="uk-text-right">
              {{ item.biayaInt | currency('Rp. ', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
            </td>
          </tr>
          <tr>
            <td>Biaya Domestik</td>
            <td class="uk-text-right">
              {{ item.biayaDom | currency('Rp. ', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
            </td>
          </tr>
          <tr>
            <td>Bea Masuk (7.5%)</td>
            <td class="uk-text-right">
              {{ item.beamasuk | currency('Rp. ', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
            </td>
          </tr>
          <tr>
            <td>PPN (10%)</td>
            <td class="uk-text-right">
              {{ item.ppn | currency('Rp. ', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
            </td>
          </tr>
          <tr>
            <td>PPH (20%)</td>
            <td class="uk-text-right">
              {{ item.pph | currency('Rp. ', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
            </td>
          </tr>
          <tr>
            <td>Total</td>
            <td class="uk-text-right">
              {{ item.total | currency('Rp. ', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
            </td>
          </tr>
          <tr>
            <td>Potongan NPWP</td>
            <td class="uk-text-right uk-text-danger">
              {{ item.npwp | currency('Rp. ', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
            </td>
          </tr>
          <tr>
            <td>Estimasi Biaya Pengiriman</td>
            <td class="uk-text-right">
              {{ item.totalBayar | currency('Rp. ', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    result: {
      default: () => {
        return {
          items: [
            {
              harga: 0,
              biayaInt: 0,
              biayaDom: 0,
              beamasuk: 0,
              ppn: 0,
              pph: 0,
              total: 0,
              npwp: 0,
              totalBayar: 0
            }
          ]
        }
      }
    }
  }
}
</script>
