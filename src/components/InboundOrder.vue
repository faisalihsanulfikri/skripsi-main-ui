<template>
 <table class="uk-table uk-table-divider uk-table-small">
    <thead>
      <tr>
        <th>Rincian</th>
        <th width="100">Order No</th>
        <th>Nama Customer</th>
        <th class="uk-text-right">Status</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(order, index) in listorders">
        <tr :key="index">
          <td class="app--table-column__collapse-toggle" @click.prevent="collapseToggle(index)">
            <a href="#">
              <font-awesome-icon v-if="order.collapse" icon="angle-right"></font-awesome-icon>
              <font-awesome-icon v-else icon="angle-down"></font-awesome-icon>
            </a>
          </td>
          <td>{{ order.code }}</td>
          <td>{{ order.user_id }}</td>
          <td class="uk-text-right">{{ order.status }}</td>
        </tr>
        <tr v-show="!order.collapse" :key="`d${index}`">
          <td colspan="4">
            <form class="uk-margin-large">
              <div uk-grid>
                  <div class="uk-margin">
                    <table>
                      <thead>
                      <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Berat</th>
                        <th>Harga</th>
                        <th>Panjang</th>
                        <th>Lebar</th>
                        <th>Tinggi</th>
                        <th></th>
                        <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <template v-for="(item, initem) in order.items">
                          <tr :key="item.id">
                          <td>{{initem + 1}}</td>
                          <td> {{ item.name }}</td>
                          <td>{{ item.weight }} {{ order.detail.formula.weight_unit }}</td>
                          <td>{{ item.price }} </td>
                          <td>{{ item.length }} {{ order.detail.formula.volume_unit }}</td>
                          <td>{{ item.width }} {{ order.detail.formula.volume_unit }}</td>
                          <td>{{ item.height }} {{ order.detail.formula.volume_unit }}</td>
                          <td>
                            <button class="uk-button uk-button-primary" type="button" >Confirm</button>
                          </td>
                          <td>
                            <button class="uk-button uk-button-danger" type="button" @click="print">Print AWB</button>
                          </td>
                          </tr>
                        </template>
                      </tbody>
                    </table>
                  </div>
              </div>
            </form>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    orders: {
      default: ''
    }
  },
  computed: {
    listorders () {
      return this.orders
    }
  },
  methods: {
    collapseToggle (index) {
      this.listorders[index].collapse = !this.listorders[index].collapse
    }
  }
}
</script>
