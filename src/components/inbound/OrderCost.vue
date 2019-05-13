<template>
  <div class="order-cost">
    <table style="width:100%">
      <tr>
        <td>Harga Barang</td>
        <td width="50">Rp.</td>
        <td
          class="uk-text-right"
          width="150"
        >{{ cost.itemPrice | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}</td>
      </tr>
      <tr>
        <td>Biaya Internasional</td>
        <td>Rp.</td>
        <td
          class="uk-text-right"
        >{{ cost.internationalCost | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}</td>
      </tr>
      <tr>
        <td>Bea Masuk (7.5%)</td>
        <td>Rp.</td>
        <td
          class="uk-text-right"
        >{{ cost.beaMasuk | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}</td>
      </tr>
      <tr>
        <td>PPN (10%)</td>
        <td>Rp.</td>
        <td
          class="uk-text-right"
        >{{ cost.ppn | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}</td>
      </tr>
      <tr>
        <td>PPH (20%)</td>
        <td>Rp.</td>
        <td
          class="uk-text-right"
        >{{ cost.pph | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}</td>
      </tr>
      <tr>
        <td>Biaya Pengiriman Domestik Indonesia</td>
        <td>Rp.</td>
        <td
          class="uk-text-right"
        >{{ cost.domesticCost | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}</td>
      </tr>
      <tr>
        <td>Biaya Packaging</td>
        <td>Rp.</td>
        <td
          class="uk-text-right"
        >{{ cost.packagingCost | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}</td>
      </tr>
      <tr>
        <td>Asuransi</td>
        <td>Rp.</td>
        <td
          class="uk-text-right"
        >{{ cost.insurance | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}</td>
      </tr>
      <tr style="font-weight:bold">
        <td>Total</td>
        <td>Rp.</td>
        <td
          class="uk-text-right"
        >{{ cost.estimatedShippingCost | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}</td>
      </tr>
      <tr v-if="isTaxable" class="uk-text-danger">
        <td>
          <div v-if="final">Potongan NPWP</div>
          <div v-else>
            <p class="uk-text-success">Mau potongan pembayaran dengan NPWP?</p>
            <div>
              <label>
                <input v-model="input.npwp" type="checkbox" @change="onNpwpChanged">
                <span class="uk-margin-small-left uk-text-small" style="color: #333;">Ya, saya mau.</span>
              </label>
            </div>
          </div>
        </td>
        <td>Rp.</td>
        <td
          class="uk-text-right"
        >{{ cost.npwp | currency('- ', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}</td>
      </tr>

      <!-- display on inbound page (ADMIN) -->
      <tr v-if="discount > 0" class="uk-text-danger calcu-total">
        <td>
          <div>Potongan Promo</div>
        </td>
        <td>Rp.</td>
        <td
          class="uk-text-right"
        >{{discount | currency('- ', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}</td>
      </tr>
      <tr style="font-weight:bold">
        <td>Estimasi Biaya Pengiriman</td>
        <td>Rp.</td>
        <td
          class="uk-text-right"
        >{{ cost.estimatedShippingCostFinal | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "OrderCost",
  props: {
    final: {
      default: false
    },
    cost: {
      type: Object
    },
    discount: {
      default: 0
    }
  },
  data: () => ({
    input: {
      npwp: false
    }
  }),
  computed: {
    ...mapState("kirimin", ["formula"]),
    isTaxable() {
      let priceUSD = this.cost.itemPrice / this.formula.dollar_rate;

      return priceUSD >= this.formula.minimum_taxable;
    },
    estimatedShippingCostFinal() {
      return this.input.npwp === 1
        ? this.cost.estimatedShippingCostFinal
        : this.cost.estimatedShippingCost;
    }
  },

  methods: {
    onNpwpChanged() {
      this.$emit("npwp-change", this.input.npwp);
    }
  }
};
</script>

<style>
</style>
