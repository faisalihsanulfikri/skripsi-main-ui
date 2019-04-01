<template>
  <div class="el-input el-input-group el-input-group--append">
    <input
      ref="input"
      type="text"
      class="el-input__inner"
      :class="{ 'error': error }"
      :readonly="readonly">
    <div class="el-input-group__append">
      <slot name="append"></slot>
    </div>
    <slot name="input"></slot>
  </div>
</template>

<script>
import Cleave from 'cleave.js'

export default {
  name: 'ElInputAppendMask',

  props: {
    value: {
      default: null,
      required: true
    },
    options: {
      type: Object,
      default: () => ({})
    },
    raw: {
      type: Boolean,
      default: true
    },
    error: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      cleave: null
    }
  },

  watch: {
    value (newValue) {
      if (!this.cleave) return

      if (this.raw && newValue === this.cleave.getRawValue()) return

      if (!this.raw && newValue === this.$el.value) return

      this.cleave.setRawValue(newValue)
    }
  },

  mounted () {
    this.cleave = new Cleave(this.$refs.input, this.getOptions(this.options))
    this.cleave.setRawValue(this.value)
  },

  methods: {
    onValueChanged (e) {
      let value = this.raw ? e.target.rawValue : e.target.value

      this.$emit('input', value)
    },
    onBlur (e) {
      let value = this.raw ? this.cleave.getRawValue() : this.$el.value

      this.$emit('blur', value)
    },
    getOptions (options) {
      return Object.assign({}, options, {
        onValueChanged: this.onValueChanged
      })
    }
  }
}
</script>

<style scoped>
.error {
  color: #f0506e;
  border-color: #f0506e;
}
</style>
