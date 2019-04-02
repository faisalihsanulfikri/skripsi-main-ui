import Vue from 'vue'
import * as Sentry from '@sentry/browser'

Sentry.init({
  dsn: process.env.VUE_APP_SENTRY_DSN,
  integrations: [new Sentry.Integrations.Vue({ Vue })]
})
