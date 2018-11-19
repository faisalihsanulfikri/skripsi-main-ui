<template>
  <div class="app--column-sort" @click="changeOrder">
    <div class="sort-title">{{ title }}</div>
    <div class="sort-caret">
      <span :class="{'sort-caret-active': order === 'asc' && active }">
        <font-awesome-icon icon="caret-up"></font-awesome-icon>
      </span>
      <span :class="{'sort-caret-active': order === 'desc' && active }">
        <font-awesome-icon icon="caret-down"></font-awesome-icon>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: 'Title'
    },
    field: {
      required: true
    },
    activeField: {
      required: true
    }
  },

  data () {
    return {
      order: 'asc'
    }
  },

  computed: {
    active () {
      return this.field === this.activeField
    }
  },

  methods: {
    changeOrder () {
      if (this.field === this.activeField) {
        this.order = this.order === 'asc' ? 'desc' : 'asc'
      } else {
        this.order = 'asc'
      }

      this.$emit('change', {
        field: this.field,
        order: this.order
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app--column-sort {
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
  user-select: none;

  .sort-title {
    display: flex;
    flex: 1;
    min-width: 1px;
    align-items: center;
  }

  .sort-caret {
    width: 10px;

    .sort-caret-active {
      color: #03A9F4;
    }
  }

  .sort-caret > * {
    display: flex;
  }
}
</style>
