<template>
  <div>
    <div class="uk-overflow-auto">
      <table class="uk-table uk-table-small uk-text-small">
        <tbody v-for="(item, key) in result.items" :key="key">
          <tr>
            <td>Harga Barang</td>
            <td width="50">Rp. </td>
            <td class="uk-text-right" width="150">
              {{ item.harga | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
            </td>
          </tr>
          <tr>
            <td>Biaya Internasional</td>
            <td>Rp. </td>
            <td class="uk-text-right">
              {{ item.biayaInt | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
            </td>
          </tr>
          <tr>
            <td>Biaya Domestik</td>
            <td>Rp. </td>
            <td class="uk-text-right">
              {{ item.biayaDom | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
            </td>
          </tr>
          <tr>
            <td>Bea Masuk (7.5%)</td>
            <td>Rp. </td>
            <td class="uk-text-right">
              {{ item.beamasuk | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
            </td>
          </tr>
          <tr>
            <td>PPN (10%)</td>
            <td>Rp. </td>
            <td class="uk-text-right">
              {{ item.ppn | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
            </td>
          </tr>
          <tr>
            <td>PPH (20%)</td>
            <td>Rp. </td>
            <td class="uk-text-right">
              {{ item.pph | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
            </td>
          </tr>
          <tr>
            <td>Total</td>
            <td>Rp. </td>
            <td class="uk-text-right">
              {{ item.total | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
            </td>
          </tr>
          <tr class="uk-text-danger">
            <td>Potongan NPWP</td>
            <td>Rp. </td>
            <td class="uk-text-right">
              {{ item.npwp | currency('- ', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
            </td>
          </tr>
          <tr>
            <td>Estimasi Biaya Pengiriman</td>
            <td>Rp. </td>
            <td class="uk-text-right">
              {{ item.totalBayar | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
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
