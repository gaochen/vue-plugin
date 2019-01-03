// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import CaSliderPc from 'ca-slider-pc'
import storage from './utils/storage'
import generateUUID from './utils/generateUUID'

Vue.use(CaSliderPc)

Vue.config.productionTip = false

// 唯一id
let uuid = storage.get('uuid', true)
if (!uuid) {
  uuid = generateUUID()
  storage.set('uuid', uuid, true)
}

router.beforeEach((to, from, next) => {
  let now = new Date().getTime()

  document.addEventListener('DOMContentLoaded', function(){
      let domReady = new Date().getTime()

      console.log('domReady: ' + domReady)
      console.log(domReady - now)
  }, false);

  window.onload=function(){
    let onload = new Date().getTime()

    console.log('onload: ' + onload)
    console.log(onload - now)
  }

  next()
})

Vue.directive('stat', {
  bind: (el, binding) => {
    el.addEventListener('click', () => {
      console.log(document.title)
      const value = binding.value
      console.log(value)
      console.log(uuid)
      // alert(value)
    })
  }
})

// import * as Sentry from '@sentry/browser';

// Sentry.init({
//   dsn: 'https://c0ec245739d84ba18370aac3f1ee6a77@sentry.io/1291292',
//   release: 'vuetest@1.0.0',
//   integrations: [new Sentry.Integrations.Vue({ Vue })],
// })

// window.Sentry = Sentry

// Vue.config.errorHandler = function(err, vm, info) {
//   console.log(err)
//   console.log(vm)
//   console.log(info)
// }

// Vue.prototype.$throw = function(error) {
//   return errorHandler(error, this)
// }

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})