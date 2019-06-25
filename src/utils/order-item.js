import Vue from 'vue'

const orderItemUtil = {
  stringCurrency (items) {
    return items.map(item => {
      item['stringPrice'] = Vue.options.filters.currency(item.price, '', 2, { thousandsSeparator: '.', decimalSeparator: ',' })
      item['stringPriceUser'] = Vue.options.filters.currency(item.price_user, '', 2, { thousandsSeparator: '.', decimalSeparator: ',' })
      item['stringQuantity'] = Vue.options.filters.currency(item.quantity, '', 0, { thousandsSeparator: '.', decimalSeparator: ',' })
      item['stringWeight'] = Vue.options.filters.currency(item.weight, '', 2, { thousandsSeparator: '.', decimalSeparator: ',' })
      item['stringLength'] = Vue.options.filters.currency(item.length, '', 2, { thousandsSeparator: '.', decimalSeparator: ',' })
      item['stringWidth'] = Vue.options.filters.currency(item.width, '', 2, { thousandsSeparator: '.', decimalSeparator: ',' })
      item['stringHeight'] = Vue.options.filters.currency(item.height, '', 2, { thousandsSeparator: '.', decimalSeparator: ',' })

      return item
    })
  }
}

export default orderItemUtil
