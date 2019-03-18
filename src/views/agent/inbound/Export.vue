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
              <span>Import Order</span>
            </h3>
          </div>
        </div>
        <div class="uk-width-auto">
        </div>
      </div>
    </div>
    <div class="uk-card-body uk-card-small">
      <div class="uk-margin uk-grid-small" uk-grid>
        <div v-if="!files">
          <h4>Select Excel</h4>
          <input type="file" id="files" ref="files" @change="onFileChange($event)" class="space">

          <!-- <a href="" target="_blank">Download</a> -->
          <!-- <form>
            <input type="button" value="Download" onClick="window.location.href='../../../assets/file/excel.xlsx'">
          </form> -->
        </div>
        <div v-else>
          {{files.name}}
          <a v-on:click="removeexcel" style="padding-left:10px">
            <font-awesome-icon icon="trash-alt" style="color:grey"></font-awesome-icon>
          </a>
          <br>
          <el-button type="primary" size="mini" @click="exports">
            Import
          </el-button>
        </div>
      </div>

      <div class="uk-margin uk-grid-small" uk-grid>
        <label style="margin-left:5px;">Download Excel File Template</label>
        <!-- <a :href="item">Download</a> -->
      </div>
      <div style="">
        <a :href="item" class="el-button el-button--primary el-button--mini decore" size="mini">
          Download
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import csvFile from "../../../assets/file/example-import-file.xlsx"
export default {
  name: "Template",
  data() {
    return{
      files: '',
      item: csvFile
      }
    },

    methods: {
      onFileChange(e) {
        // console.log(e.target.files[0])
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
        this.files = e.target.files[0];
        // this.files = this.$refs.files.files;
      // this.createexcel(files[0]);

      },
      createexcel(file) {
        var reader = new FileReader();
        var vm = this;

        reader.onload = (e) => {
          vm.files = e.target.result;
        };
        // reader.readAsDataURL(file);
      },
      removeexcel: function (e) {
        this.files = '';
      },
      async exports () {
        this.__startLoading()
        // try {
          let data = new FormData()
          let config = {
            headers: {
              'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
          }
          data.append("excel", this.files, this.files.name),
          data.append("description", '.xlsx'),
          // console.log(this.files),
          await this.$authHttp.post('/importOrder/excel/kirimin', data, config).then(res => {

            this.$notify({
              title: 'SUCCESS',
              message: res.data.message,
              type: 'success'
            })
          }).catch(err => {
            // this.$refs.upload.clearFiles()
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

<style lang="scss" scoped>
.decore {
  text-decoration: none;
}
.space {
  margin-bottom: 30px;
}
</style>
