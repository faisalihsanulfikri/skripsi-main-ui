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
              <span>Scan AWB</span>
            </h3>
          </div>
        </div>
        <div class="uk-width-auto">
        </div>
      </div>
    </div>
    <div class="uk-card-body uk-card-small">
      <div class="uk-margin uk-grid-small" uk-grid>
          scan awb
          <input type="text" ref="search" @keyup.enter="scan" v-model = "code">
          <button type="button" @click="scan">scan</button>
      </div>
      <div>
        <span v-for="(format,index) in formats" :key="index">
          <input type="checkbox" v-bind:value="format.awb" v-model="format.checked" v-bind:checked=true> {{ format.awb +' - '+ format.name+' - '+format.address }}
          <br>
        </span>
        <!-- {{checkedNames}} -->
        <button type="button" @click="create">Create Manifest</button>
        <!-- <input type="checkbox" id="jack" value="Jack" v-model="checkedManifest">
        <label for="jack">Jack</label>
        <input type="checkbox" id="john" value="John" v-model="checkedManifest">
        <label for="john">John</label>
        <input type="checkbox" id="mike" value="Mike" v-model="checkedManifest">
        <label for="mike">Mike</label>
        <br>
        <span>Checked names: {{ checkedManifest }}</span> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkedManifest: [],
      input: [],
      code: "",
      data: {
        awb:"",
        name:"",
        address:""
      },
      test: [],
      checked: [],
      formats: [],
      selected: []
    }
  },
  mounted() {
    this.setFocus()
  },
  computed: {
    checkedNames () {
        return this.formats
     }

    // checked: {
    //   get: function () {
    //     return true
    //   }
      // set: function (value) {
      //   var selected = [];
      //   if (value) {
      //       this.users.forEach(function (user) {
      //           selected.push(user.id);
      //       });
      //   }
      //   his.selected = selected;
      // }
    // }
  },
  methods: {
    setFocus: function()
    {
      this.$refs.search.focus()
    },
     async scan () {
      this.__startLoading()
      try {
        return this.$service.awb.scan(this.code)
        .then(res => {
          var count = this.formats.filter(el=>{
            return el.awb == this.code
          })
          if(res.data.data.length>0 && count==0){
            this.formats.push({ awb: res.data.data[0].awb, name: res.data.data[0].detail.receiver_name, address:res.data.data[0].detail.receiver_address, checked:true })
          }
          this.__stopLoading()
        })
      } catch (e) {
        this.__handleError(this, err, true)
        this.__stopLoading()
      }
      this.__stopLoading()

    },
    async create () {
      this.__startLoading()
      try {
        this.input = this.formats.filter(function(obj) {
          return obj.checked
        }).map(function(obj) { return {awb:obj.awb,name:obj.name,address:obj.address} })

        let res = await this.$service.manifest.create(this.input)
        console.log(res)
        this.$notify({
          title: "SUCCESS",
          message: res.data.message,
          type: "success"
        })
        this.formats=""
      } catch (e) {
        his.__handleError(this, err, true);
      }
      this.__stopLoading()
    }
  }
}

</script>
