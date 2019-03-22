<template>
  <div class="uk-card uk-card-default">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__icon">
            <font-awesome-icon icon="file-alt"></font-awesome-icon>
          </div>
        </div>
        <div class="uk-width-expand">
          <div class="app--card-header_title">
            <h3>
              <span>Export Order</span>
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
          <div class="uk-width-1-1">
            <el-date-picker v-model="filter.time" type="daterange" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
              range-separator="To" start-placeholder="Start date" end-placeholder="End date">
            </el-date-picker>
          </div>
          <div class="uk-width-1-1">

            <el-button type="default" @click="exportReportXLSX">
              <font-awesome-icon icon="file-excel"></font-awesome-icon>
              Download Excel
            </el-button>

            <el-button type="default" @click="exportReportCSV">
              <font-awesome-icon icon="file-excel"></font-awesome-icon>
              Download CSV
            </el-button>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import saveAs from 'file-saver'

  export default {
    data() {
      return {
        filter: {
          time: []
        }
      }
    },

    created() {
      this.filter.time = [
        moment().startOf('month').format('YYYY-MM-DD'),
        moment().endOf('month').format('YYYY-MM-DD')
      ]
    },

    methods: {
      async exportReportCSV() {
        this.__startLoading()

        try {
          let res = await this.$service.report.orderExportCSV(this.filter)

          let content = res.request.getResponseHeader('Content-Disposition')
          let regexResult = content.match('filename=(.*)')
          let filename = regexResult[1].replace(new RegExp('"', 'g'), '')
          let blob = new Blob([res.data])

          saveAs(blob, filename)
        } catch (err) {
          this.__handleError(this, err, true)
        }

        this.__stopLoading()
      },
      async exportReportXLSX() {
        this.__startLoading()

        try {
          let res = await this.$service.report.orderExportXLSX(this.filter)

          let content = res.request.getResponseHeader('Content-Disposition')
          let regexResult = content.match('filename=(.*)')
          let filename = regexResult[1].replace(new RegExp('"', 'g'), '')
          let blob = new Blob([res.data])

          saveAs(blob, filename)
        } catch (err) {
          this.__handleError(this, err, true)
        }

        this.__stopLoading()
      }
    }
  }
</script>
