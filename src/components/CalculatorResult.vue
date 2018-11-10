<template>
  <div>
    <div class="uk-overflow-auto">
      <table class="uk-table uk-table-small uk-text-small">
        <tbody>
          <tr>
            <td>Harga Barang</td>
            <td width="50">Rp. </td>
            <td class="uk-text-right" width="150">
              {{ cost.itemPrice | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
            </td>
          </tr>
          <tr>
            <td colspan="3"><hr/></td>
          </tr>
          <tr>
            <td>Biaya Internasional</td>
            <td>Rp. </td>
            <td class="uk-text-right">
              {{ cost.internationalCost | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
            </td>
          </tr>
          <tr>
            <td>Bea Masuk (7.5%)</td>
            <td>Rp. </td>
            <td class="uk-text-right">
              {{ cost.beaMasuk | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
            </td>
          </tr>
          <tr>
            <td>PPN (10%)</td>
            <td>Rp. </td>
            <td class="uk-text-right">
              {{ cost.ppn | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
            </td>
          </tr>
          <tr>
            <td>PPH (20%)</td>
            <td>Rp. </td>
            <td class="uk-text-right">
              {{ cost.pph | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
            </td>
          </tr>
          <tr>
            <td>Biaya Pengiriman Domestik Indonesia</td>
            <td>Rp. </td>
            <td class="uk-text-right">
              {{ cost.domesticCost | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
            </td>
          </tr>
          <tr>
            <td>Biaya Packaging</td>
            <td>Rp. </td>
            <td class="uk-text-right">
              {{ cost.packagingCost | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
            </td>
          </tr>
          <tr>
            <td>Asuransi</td>
            <td>Rp. </td>
            <td class="uk-text-right">
              {{ cost.insurance | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
            </td>
          </tr>
          <tr>
            <td colspan="3"><hr/></td>
          </tr>
          <tr>
            <td>Total</td>
            <td>Rp. </td>
            <td class="uk-text-right">
              {{ cost.estimatedShippingCost | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
            </td>
          </tr>
          <tr class="uk-text-danger">
            <td>Potongan NPWP</td>
            <td>Rp. </td>
            <td class="uk-text-right">
              {{ cost.npwp | currency('- ', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
            </td>
          </tr>
          <tr>
            <td colspan="3"><hr/></td>
          </tr>
          <tr>
            <td>Estimasi Biaya Pengiriman</td>
            <td>Rp. </td>
            <td class="uk-text-right">
              {{ cost.estimatedShippingCostFinal | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
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
    cost: {
      default: () => {
        return {
          beaMasuk: 0,
          domesticCost: 0,
          estimatedCost: 0,
          estimatedShippingCost: 0,
          estimatedShippingCostFinal: 0,
          insurance: 0,
          internationalCost: 0,
          itemPrice: 0,
          npwp: 0,
          pph: 0,
          ppn: 0,
          packagingCost: 0
        }
      }
    }
  }
}
</script>
