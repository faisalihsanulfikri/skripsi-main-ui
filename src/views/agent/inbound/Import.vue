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
              <span>Import Excel</span>
            </h3>
          </div>
        </div>
        <div class="uk-width-auto">
        </div>
      </div>
    </div>
    <div class="uk-card-body uk-card-small">
      <div class="uk-margin uk-grid-small" uk-grid>
        <div v-if="!excel">
          <h2>Select Excel</h2>
          <input type="file" @change="onFileChange">
          <a :href="item">Download</a>
          <!-- <a href="" target="_blank">Download</a> -->
          <!-- <form>
            <input type="button" value="Download" onClick="window.location.href='../../../assets/file/excel.xlsx'">
          </form> -->
        </div>
        <div v-else>
          <button @click="removeexcel">Remove Excel</button>
          <button @click="exports">Export</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import csvFile from "../../../assets/file/excel.xlsx"
export default {
  name: "Template",
  data() {
    return{
      excel: '',
      item: csvFile
      }
    },

    methods: {
      onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createexcel(files[0]);

      },
      createexcel(file) {
        var reader = new FileReader();
        var vm = this;

        reader.onload = (e) => {
          vm.excel = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      removeexcel: function (e) {
        this.excel = '';
      },
      async exports() {
        this.__startLoading()
        // try {
          let data = new FormData()
          let config = {
            headers: {
              'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
          }
          data.append("excel", this.excel),
          data.append("description", '.xlsx'),
          // console.log(data.excel),
          await this.$authHttp.post('/importOrder/excel/kirimin', data, config).then(res => {
            this.$notify({
              title: 'SUCCESS',
              message: res.data.message,
              type: 'success'
            })

          }).catch(err => {
            this.$refs.upload.clearFiles()

            if (err.response) {
              let message = err.response.data.message ? err.response.data.message : err.response.statusText

              this.$notify({
                title: 'ERROR',
                message: message,
                type: 'error'
              })
            }
          })
          // let res = await this.$service.importExcel.store(this.excel);
          // console.log(res);
          // console.log(this.excel);
          // this.$notify({
          //   title: 'SUCCESS',
          //   message: res.data.message,
          //   type: 'success'
          // });
        // } catch (e) {
        //   this.__handleError(this, err, true);

        this.__stopLoading()
        }
        // this.$service.
      }
    }


</script>
