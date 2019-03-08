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
          <input type="text" ref="search" @keyup.enter="" v-model = "input.code">
          <button type="button" @click="scan">scan</button>
      </div>
      <div v-if="">
        <ul>
          <span v-for="(format,index) in formats" :key="index">
            <input type="checkbox" v-bind:value="format.code" v-model="checked" v-bind:checked=true> {{ format.code +' - '+ format.name+' - '+format.address }}
            <br>
          </span>
          {{checked}}
          <button type="button">Create Manifest</button>
        </ul>
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
      input: {
        code: ""
      },
      data: {
        code:"",
        name:"",
        address:""
      },
      bol: true,
      checked: [],
      formats: [{
        code:"",
        name:"",
        address:""
      }]
      // format: {code:"", name:"", address:""}
    }
  },
  mounted() {
    this.setFocus()
  },
  computed: {
    selected: {
      get: function () {

      },
      set: function () {

      }
    }
  },
  methods: {
    setFocus: function()
    {
      this.$refs.search.focus()
    },
     async scan () {
      this.__startLoading()
      try {
        await this.$service.awb.scan(this.input.code).then(res => {
          if(res.data.data.length>0){
            // console.log(res.data.data[0].order_code,res.data.data[0].detail.receiver_name,res.data.data[0].detail.receiver_address)
            this.formats.push({ code: res.data.data[0].order_code, name: res.data.data[0].detail.receiver_name, address:res.data.data[0].detail.receiver_address })
          }
        })
        // this.data = res.data
        // this.users.push({ code: this.data[0].order_code, name: this.data[0].detail.receiver_name, address:this.data[0].detail.receiver_address })
        // console.log(this.data.data[0].order_code)
      } catch (e) {
        this.__handleError(this, err, true)
      }
      this.__stopLoading()

    },
    search (){
      // this.users.push({ code: this.data.name, name: this.user.age, address:this.data })
    }
  }
}

</script>
