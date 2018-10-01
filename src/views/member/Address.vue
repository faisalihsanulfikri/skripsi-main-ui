<template>
  <div>
    <div class="uk-grid-small uk-grid-match uk-flex-center" uk-grid>
      <div v-for="warehouse in warehouses" :key="warehouse.id" class="uk-width-1-4">
        <price-box
          :title="warehouse.name"
          :price="`$${warehouse.price}`"
          meta-price="Per Kilogram"
          :items="[warehouse.address]"/>
      </div>
    </div>
  </div>
</template>

<script>
import PriceBox from '../../components/PriceBox'

export default {
  components: {
    PriceBox
  },
  data () {
    return {
      warehouses: [],
      addresses: [
        {
          name: 'US',
          address: '167 Chambers St, New York, NY 10007, USA',
          fee: '$12'
        },
        {
          name: 'China',
          address: '200 Wangfujing St, WangFuJing, Dongcheng Qu, Beijing Shi, China, 100006',
          fee: '$7'
        },
        {
          name: 'Singapore',
          address: '1000 ECP, #01-05 Marine Cove, Singapore 449876',
          fee: '$7'
        },
        {
          name: 'Malaysia',
          address: 'Plaza Mont Kiara, 1, Jalan Kiara, Mont Kiara, 50480 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur, Malaysia',
          fee: '$7'
        },
        {
          name: 'Thailand',
          address: 'Big C Ratchadamri 97/11 ถนน ราชดำริห์ แขวงลุมพินี Khet Pathum Wan, Krung Thep Maha Nakhon 10330, Thailand',
          fee: '$7'
        },
        {
          name: 'Korea',
          address: '93 Deokso-ro, Wabu-eup, Namyangju-si, Gyeonggi-do, South Korea',
          fee: '$7'
        },
        {
          name: 'Hongkong',
          address: '612-618 Nathan Rd, Mong Kok, Hong Kong',
          fee: '$7'
        }
      ]
    }
  },
  methods: {
    fetchWareHouses () {
      this.$authHttp.get('/v1/cfees')
        .then(reponse => {
          this.warehouses = reponse.data
        })
        .catch(() => {
          //
        })
    }
  },
  created () {
    this.fetchWareHouses()
  }
}
</script>
