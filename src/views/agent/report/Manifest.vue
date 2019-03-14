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
              <span>Manifest Report</span>
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
            <el-button type="default" @click="">Filter</el-button>
          </div>
          <div class="uk-width-auto">
            <el-button type="default" @click="">
              <font-awesome-icon icon="file-excel"></font-awesome-icon>
            </el-button>
          </div>
        </div>
      </div>
      <div class="uk-overflow-auto">
        <table class="uk-table uk-table-divider uk-table-small uk-text-small">
          <thead>
            <tr>
              <th></th>
              <th>Manifest Number</th>
              <th>Date</th>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <template v-for="(manifest, index) in manifests">
              <tr :key="index">
                <td class="app--table-column__collapse-toggle" @click.prevent="collapseToggle(index)">
                  <a href="#">
                    <font-awesome-icon v-if="manifest.collapse" icon="angle-right"></font-awesome-icon>
                    <font-awesome-icon v-else icon="angle-down"></font-awesome-icon>
                  </a>
                </td>
                <td @click.prevent="collapseToggle(index)"><a href="#!"
                    class="custom-link-black">{{ manifest.manifest_no }}</a></td>
                <td>{{ moment(manifest.created_at).format('MMM DD YYYY, HH:mm:ss') }}</td>
                <td>
                  <el-button type="primary" size="mini" @click="printManifest(manifest.manifest_no)">
                    <font-awesome-icon icon="print"></font-awesome-icon>
                  </el-button>
                </td>
                <!-- <td>{{ awb.awb }}</td>
                <td>{{ awb.item_count }}</td> -->
              </tr>
              <tr v-show="!manifest.collapse" :key="`${index}_info`">
                <td colspan="3">
                  <table style="width : 100%">
                    <template  v-for="(awb , index) in manifest.order_awb">
                      <tr>
                        <td><h5 class="uk-margin-small">AWB {{awb.awb}}</h5></td>
                        <td><h5 class="uk-margin-small">Receiver {{awb.detail.receiver_name}}</h5></td>
                        <td><h5 class="uk-margin-small">Address {{awb.detail.receiver_address}}</h5></td>
                      </tr>
                    </template>
                  </table>
                </td>
              </tr>
            </template>

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
      filter: {
        time: []
      },
      manifests: []
    }
  },

  created () {
    this.getManifest()
  },

  methods: {
    async getManifest () {
      this.__startLoading()

      try {
        let res = await this.$service.manifest.get()
        this.manifests = res.data.data.map(function(item, index){
          return {
            ...item,
            collapse : true
          }
        })
      } catch (err) {
        this.__handleError(this, err, true)
      }

      this.__stopLoading()
    },
    collapseToggle(index) {
      this.manifests[index].collapse = !this.manifests[index].collapse
    },
    printManifest(code) {
      window.open(
        `/print-manifest/${code}`,
        'Kirimin - Print Manifest',
        'directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=0,resizable=0,width=800'
      )
    }
  }
}
</script>
