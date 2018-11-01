<template>
  <div>
    <div class="uk-grid uk-grid-small" uk-grid>
      <div class="uk-width-expand">
        <h3>Dokumen</h3>
      </div>
      <div class="uk-width-auto">
        <div>
          <el-upload
            ref="upload"
            :action="`${$http.defaults.baseURL}/v1/doc`"
            :auto-upload="true"
            :http-request="upload">
            <button class="uk-button uk-button-primary">Unggah</button>
          </el-upload>
        </div>
      </div>
    </div>
    <hr>
    <div class="uk-margin">
      <ul class="uk-list uk-list-divider">
        <li v-for="doc in documents" :key="doc.id">
          <div class="uk-grid-small" uk-grid>
            <div class="uk-width-auto uk-text-center uk-flex uk-flex-middle">
              <div style="width: 50px">
                <font-awesome-icon v-if="isImage(doc.type)" icon="image" size="2x"></font-awesome-icon>
                <font-awesome-icon v-else-if="isDocument(doc.type)" icon="file-alt" size="2x"></font-awesome-icon>
                <font-awesome-icon v-else icon="question" size="2x"></font-awesome-icon>
              </div>
            </div>
            <div class="uk-width-expand uk-flex uk-flex-middle">
              <div class="uk-text-small">{{ doc.filename }}</div>
            </div>
            <div class="uk-width-auto uk-text-center uk-flex uk-flex-middle">
              <div style="width: 50px">
                <a href="#" @click.prevent="download(doc)">
                  <font-awesome-icon icon="cloud-download-alt"></font-awesome-icon>
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      documents: []
    }
  },
  methods: {
    isImage (type) {
      let regex = /jpg|jpeg|png/

      if (type.match(regex)) return true

      return false
    },
    isDocument (type) {
      let regex = /pdf/

      if (type.match(regex)) return true

      return false
    },
    fetchDocuments () {
      this.$authHttp.get('/v1/doc').then(res => {
        this.documents = res.data.data.map(item => {
          let result = item.type.match(/\/(.*)/)

          item.ext = result === null ? null : result[1]

          return item
        })
      }).catch(err => {
        if (err.response) {
          let message = err.response.data.message ? err.reponse.data.message : err.response.statusText

          this.$notify({
            title: 'ERROR',
            message: message,
            type: 'error'
          })
        }
      })
    },
    upload (req) {
      let data = new FormData()

      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      data.append('file', req.file)
      data.append('type', req.file.type)
      data.append('description', '')

      this.$authHttp.post('/v1/doc', data, config).then(res => {
        this.$notify({
          title: 'SUCCESS',
          message: res.data.message,
          type: 'success'
        })

        this.$refs.upload.clearFiles()

        this.fetchDocuments()
      }).catch(err => {
        if (err.response) {
          let message = err.response.data.message ? err.reponse.data.message : err.response.statusText

          this.$notify({
            title: 'ERROR',
            message: message,
            type: 'error'
          })
        }
      })
    },
    download (doc) {
      this.$authHttp.get(`/v1/doc/${doc.id}/raw`, {
        responseType: 'blob'
      }).then(res => {
        let blob = window.URL.createObjectURL(new Blob([res.data]))
        let link = document.createElement('a')

        link.style.cssText = 'visibility:hidden;'
        link.href = blob

        link.setAttribute('download', doc.filename)
        link.click()
        link.remove()
      }).catch(err => {
        if (err.response) {
          let message = err.response.data.message ? err.reponse.data.message : err.response.statusText

          this.$notify({
            title: 'ERROR',
            message: message,
            type: 'error'
          })
        }
      })
    }
  },
  created () {
    this.fetchDocuments()
  }
}
</script>
