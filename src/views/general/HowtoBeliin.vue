<template>
  <div class="uk-margin-top uk-margin-bottom">
    <div class="uk-card uk-card-default">
      <div class="uk-card-body">
        <div v-if="error" class="uk-alert-danger" uk-alert>
          {{ errorMessage }}
        </div>
        <div uk-grid>
          <img src="../../assets/images/how-p2.jpg" alt="how-to-beliin" />
        </div>
      </div>
    </div>
  </div>
</template>
