<template>
  <div class="uk-card uk-card-default">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__icon">
            <font-awesome-icon icon="shipping-fast"></font-awesome-icon>
          </div>
        </div>
        <div class="uk-width-expand">
          <div class="app--card-header_title">
            <h3>
              <span>Air Waybill Report</span>
            </h3>
          </div>
        </div>
        <div class="uk-width-auto">
        </div>
      </div>
    </div>
    <div class="uk-card-body uk-card-small">
      <div class="uk-margin">
        <div class="uk-grid-small" uk-grid>
          <div class="uk-width-auto">
            <el-date-picker
              v-model="filter.time"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="To"
              start-placeholder="Start date"
              end-placeholder="End date">
            </el-date-picker>
          </div>
          <div class="uk-width-auto">
            <el-button type="default" @click="fetchAirWaybills">Filter</el-button>
          </div>
          <div class="uk-width-auto">
            <el-button type="default" @click="exportReport">
              <font-awesome-icon icon="file-excel"></font-awesome-icon>
            </el-button>
          </div>
        </div>
      </div>
      <div class="uk-overflow-auto">
        <table class="uk-table uk-table-divider uk-table-small uk-text-small">
          <thead>
            <tr>
              <th>Date</th>
              <th>Order Code</th>
              <th>AWB</th>
              <th>Total Item`s</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(awb, index) in airWaybills" :key="index">
              <td>{{ awb.created_at }}</td>
              <td>{{ awb.order_code }}</td>
              <td>{{ awb.awb }}</td>
              <td>{{ awb.item_count }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
      airWaybills: [],
      filter: {
        time: []
      }
    }
  },

  created () {
    this.filter.time = [
      moment().startOf('month').format('YYYY-MM-DD'),
      moment().endOf('month').format('YYYY-MM-DD')
    ]

    this.fetchAirWaybills()
  },

  methods: {
    async exportReport () {
      this.__startLoading()

      try {
        let res = await this.$service.report.airWaybillExport(this.filter)

        let content = res.request.getResponseHeader('Content-Disposition')
        let regexResult = content.match('"(.*)"')
        let filename = regexResult[1]

        let blob = window.URL.createObjectURL(new Blob([res.data]))
        let link = document.createElement('a')

        link.style.cssText = 'visibility:hidden;'
        link.href = blob

        link.setAttribute('download', filename)
        link.click()
        link.remove()
      } catch (err) {
        this.__handleError(this, err, true)
      }

      this.__stopLoading()
    },
    async fetchAirWaybills () {
      this.__startLoading()

      try {
        let res = await this.$service.report.airWaybill(this.filter)

        this.airWaybills = res.data
      } catch (err) {
        this.__handleError(this, err, true)
      }

      this.__stopLoading()
    }
  }
}
</script>
