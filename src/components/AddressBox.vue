<template>
  <article class="uk-article uk-width-expand">
      <h2 class="uk-article-title"><a class="uk-link-reset" href="">Cara Pengiriman dari {{ title }}</a></h2>
      <p class="uk-article-meta">Petunjuk cara pengisian</p>

      <h2 class="uk-heading-bullet">Alamat pengiriman :</h2>
      <p class="uk-text-lead">{{ address }}</p>

      <h3>Petunjuk</h3>

      <div class="uk-card uk-card-default uk-card-body uk-width-auto">
          <h3 class="uk-card-title">Pengisian dengan 1 baris alamat</h3>
          <form class="uk-form-stacked">
              <div class="uk-margin">
                  <label class="uk-form-label" for="form-stacked-text">First Name</label>
                  <div class="uk-form-controls">
                      <input class="uk-input" id="form-stacked-text" type="text" :value="customerFirstName" readonly>
                  </div>
                  <label class="uk-form-label" for="form-stacked-text">Last Name</label>
                  <div class="uk-form-controls">
                      <input class="uk-input" id="form-stacked-text" type="text" :value="customerLastName + ' ' + customerId" readonly>
                  </div>
                  <label class="uk-form-label" for="form-stacked-text">Address Line 1</label>
                  <div class="uk-form-controls">
                      <input class="uk-input" id="form-stacked-text" type="text" :value="address" readonly>
                  </div>
                  <label class="uk-form-label" for="form-stacked-text">Zipcode</label>
                  <div class="uk-form-controls">
                      <input class="uk-input" id="form-stacked-text" type="text" :value="zipcode" readonly>
                  </div>
              </div>
          </form>
      </div>

      <div class="uk-card uk-card-default uk-card-body uk-width-expand">
          <h3 class="uk-card-title">Pengisian dengan 2 baris alamat</h3>
          <form class="uk-form-stacked">
              <div class="uk-margin">
                  <label class="uk-form-label" for="form-stacked-text">First Name</label>
                  <div class="uk-form-controls">
                      <input class="uk-input" id="form-stacked-text" type="text" :value="customerFirstName" readonly>
                  </div>
                  <label class="uk-form-label" for="form-stacked-text">Last Name</label>
                  <div class="uk-form-controls">
                      <input class="uk-input" id="form-stacked-text" type="text" :value="customerLastName" readonly>
                  </div>
                  <label class="uk-form-label" for="form-stacked-text">Address Line 1</label>
                  <div class="uk-form-controls">
                      <input class="uk-input" id="form-stacked-text" type="text" :value="address"  readonly>
                  </div>
                  <label class="uk-form-label" for="form-stacked-text">Address Line 2</label>
                  <div class="uk-form-controls">
                      <input class="uk-input" id="form-stacked-text" type="text" :value="customerId" readonly>
                  </div>
                  <label class="uk-form-label" for="form-stacked-text">Zipcode</label>
                  <div class="uk-form-controls">
                      <input class="uk-input" id="form-stacked-text" type="text" :value="zipcode" readonly>
                  </div>
              </div>
          </form>
      </div>
  </article>
</template>

<script>
export default {
  props: {
    title: '',
    price: '',
    metaPrice: '',
    address: '',
    customerFirstName: '',
    customerLastName: '',
    customerId: '',
    zipcode: ''
  }
}
</script>
